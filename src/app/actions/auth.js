import { LoginSchema, SignupFormSchema } from '@/app/lib/definitions' 
import { redirect } from 'next/dist/server/api-utils';

function setCookie(cname, cvalue) {
    if (typeof document === 'undefined') {
        // Return null or handle cookies differently on the server
        return null;
    }

    const d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    while(!document) {} // busy wait
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {

    if (typeof document === 'undefined') {
        // Return null or handle cookies differently on the server
        return null;
    }
    
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export async function signup(state, formData ) {
// 1. Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    })
    // If any form fields are invalid, return early
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      }
    }


// 2. Prepare data for insertion into database
    const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    // const hashedPassword = await bcrypt.hash(password, 10)


// 3. Insert the user into the database
    let validEmail = 1;
    try {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/register/", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            if(res.status == 400) {
                validEmail = 0;
            }
        })
    } catch (e) {
        console.log("Register error: " + e);
    } finally {
        if(!validEmail) {
            return { errors: {
                email: ['Email already in use'],
            }}
        }
    }

    // 4. Create user session
    // 5. Redirect user
    let validUser = 1;
    try {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/token/", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            if(!res.ok) {
                validUser = 0;
            }
            return res.json()
        })
        .then((json) => {
            setCookie("timesparkRefreshToken", json.refresh)
            setCookie("timesparkAccessToken", json.access)
        })
    } catch (e) {
        console.log("Register error: " + e);
    } finally {
        if(!validUser) {
            return { errors: {
                password: ['Invalid Username or Password'],
            }}
        }  else {
            window.history.pushState(null, '/login')
            window.location.replace("/dashboard");
        }
    }
  }

  export async function login(state, formData ) {
    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const { email, password } = validatedFields.data

    let validUser = 1;
    try {
        await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/api/token/", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password
            }),
            headers: {
            "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            if(res.status >= 400) {
                validUser = 0;
            } 
            return res.json()
        })
        .then((json) => {
            setCookie("timesparkRefreshToken", json.refresh)
            setCookie("timesparkAccessToken", json.access)
        })
    } catch (e) {
        console.log("Login error: " + e);
    } finally {
        if(!validUser) {
            return { errors: {
                password: ['Invalid Username or Password'],
            }}
        }  else {
            window.history.pushState(null, '/login')
            window.location.replace("/dashboard");
        }
    }
  }

import { useCookies } from 'next-client-cookies';


export async function refresh() {
    let refreshToken = getCookie("timesparkRefreshToken");
    console.log("REFRESH CALLED: " + refreshToken);
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
    .then(res => {
        if (!res.ok) {
            setCookie("timesparkRefreshToken", "");
            setCookie("timesparkAccessToken", "");
            redirect('/login');
        } else {
            return res.json();
        }
    })
    .then(json => {
        setCookie("timesparkAccessToken", json.access);
    })
}