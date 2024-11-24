import { LoginSchema, SignupFormSchema } from '@/app/lib/definitions'
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation'

 
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
        await fetch("http://127.0.0.1:8000/api/register/", {
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
        await fetch("http://127.0.0.1:8000/api/token/", {
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
        })
    } catch (e) {
        console.log("Register error: " + e);
    } finally {
        if(!validUser) {
            return { errors: {
                password: ['Invalid Username or Password'],
            }}
        }  else {
            redirect("/dashboard");
        }
    }
  }

  export async function login(state, formData ) {
    const validatedFields = LoginSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
      })
  
    const { email, password } = validatedFields.data

    let validUser = 1;
    try {
        await fetch("http://127.0.0.1:8000/api/token/", {
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
        })
    } catch (e) {
        console.log("Register error: " + e);
    } finally {
        if(!validUser) {
            return { errors: {
                password: ['Invalid Username or Password'],
            }}
        }  else {
            redirect("/dashboard");
        }
    }
  }
