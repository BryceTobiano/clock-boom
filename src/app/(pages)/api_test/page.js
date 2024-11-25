'use client'

import '../../globals.css'

import { getCookie } from '@/app/actions/auth'


export default function Page() {

  async function fetchProtectedData() {
    let token = getCookie("timesparkAccessToken");
    await fetch('http://localhost:8000/api/events', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`, // Add the JWT token here
        },
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json()
    })
    .then(json => {
      console.log(json)
    })
}

  function PrintCookie(token) {
    // console.log(getCookie("timesparkRefreshToken"));
    // console.log(getCookie("timesparkAccessToken"));
    console.log(getCookie("cookieTest"));
  }
  
    return (
    <>
      <button onClick={PrintCookie}>Print Cookie</button>
      <button onClick={fetchProtectedData}>Get Events</button>
    </> 
  );
}
