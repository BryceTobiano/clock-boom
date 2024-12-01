'use server'

// app/posts/page.js
import Calendar from './calendar'; // Import Client Component
import { cookies } from 'next/headers'
import { getUserIdFromToken } from "@/app/actions/jwt";
import { redirect } from 'next/navigation';

export default async function Page() {
  const cookieStore = await cookies();
  let token = cookieStore.get("timesparkAccessToken")?.value
  if(!token) {
    redirect('/login');
  }

  const refreshToken = cookieStore.get("timesparkRefreshToken")?.value
  const refreshRes = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/token/refresh/', {
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

  // Get Calendars
  const calendarsRes = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/calendar/?user=' + userId, {
    method: 'GET',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`, // Add the JWT token here
    }
  }).then(res => {
    return res.json();
  })
  const calendars = await calendarsRes

      
  // Get Categories
  const categoryRes = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/category/?user=' + userId, {
    method: 'GET',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`, // Add the JWT token here
    }
  })
  .then(res => {
      return res.json();
  })
  const category = await categoryRes

  // Get Events
  const eventsRes = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/?user=' + userId, {
    method: 'GET',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`, // Add the JWT token here
    }
  })
  .then(res => {
      return res.json();
  })
  const events = await eventsRes


  // Pass Server Data into client component
  return <Calendar calendars={calendars} categories={category} events={events} />;
}