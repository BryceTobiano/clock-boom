'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import '../../globals.css'
import global from '../../global.module.css'
import styles from './calendar.module.css'
import Navbar from '../../components/nav/nav'
import Button from '../../components/button'
import { getCookie } from '@/app/actions/auth'
import { getUserIdFromToken } from "@/app/actions/jwt";

async function CreateCalendar() {
  let token = getCookie("timesparkAccessToken");
    
  let userId = getUserIdFromToken(token);
  await fetch('http://localhost:8000/api/calendar/', {
      method: 'POST',
      body: JSON.stringify({
          name: "Default",
          description: "",
          user: userId
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${token}`, // Add the JWT token here
      }
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

export default function Page() {
  let events =   [
    {
      "title": "Event 1",
      "start": "2024-11-24T09:00:00",
      "end": "2024-11-24T18:00:00"
    },
    {
      "title": "Event 2",
      "start": "2024-11-24",
      "end": "2024-11-24"
    }
  ]
    return (
    <>
      <div className={global.page}>
        <div><Navbar /></div>
        <div className={global.content}>
          <h1>CALENDAR</h1>
          <div className={styles.container}>
            <div className={styles.calendarContainer}>
              <FullCalendar
                plugins={[ dayGridPlugin, timeGridPlugin ]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'timeGridDay timeGridWeek dayGridMonth',
                  right: 'prev,title,next'
                }}
                events={events}
              />
            </div>
          <div>
            <Button onClick={CreateCalendar} className="primary-button">+ Create Calendar</Button>
            <h2>Calendars:</h2>
            <p>Bryce</p> 
            <p>Bryce1</p> 
          </div>
        </div>

        </div>
      </div >
    </> 
  );
}
