'use server'

// app/posts/page.js
import Calendar from './calendar'; // Import Client Component
import { cookies } from 'next/headers'
import { getUserIdFromToken } from "@/app/actions/jwt";
import { redirect } from 'next/navigation';
import { boolean } from 'zod';

export default async function Page() {
  const cookieStore = await cookies();
  let token = cookieStore.get("timesparkAccessToken")?.value

  if(!token) {
    redirect('/login');
  }

  const refreshToken = cookieStore.get("timesparkRefreshToken")?.value
  const refreshRes = fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/token/refresh/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
  })
  .then(res => {
      if (!res.ok) {
        cookieStore.set("timesparkAccessToken", "");
        cookieStore.set("teimsparkRefreshToken", "");
        redirect('/login');
      } else {
          return res.json();
      }
  })
  .then(json => {
    token = json.access
    return json.access;
  })

  let userId = getUserIdFromToken(token);

  //*****************************************
  //*****  Fetch data on the server *********
  //*****************************************

  const userInfoRes = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/user-dashboard/' + userId, {
    method: 'GET',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`, // Add the JWT token here
    }
  }).then(res => {
    if(!res.ok) {
      redirect('/login');
    }
    return res.json();
  })
  

  // Pass Server Data into client component
  return <Calendar calendars={userInfoRes.calendars} categories={userInfoRes.categories} events={userInfoRes.events}/>;
}