'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import '../../globals.css'
import global from '../../global.module.css'
import Navbar from '../../components/nav/nav'

export default function Page() {
  return (
    <>
      <div className={global.page}>
        <div><Navbar /></div>
        <div className={global.content}>
          <h1>CALENDAR</h1>
            <FullCalendar
              plugins={[ dayGridPlugin ]}
              initialView="dayGridMonth"
            />
        </div>
      </div >
    </> 
  );
}
