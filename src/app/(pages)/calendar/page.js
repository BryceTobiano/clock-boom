'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import '../../globals.css'
import global from '../../global.module.css'
import Navbar from '../../components/nav/nav'
import styles from "./calendar.module.css";


export default function Page() {
  return (
    <>
      <div className={global.page}>
        <div><Navbar /></div>
        <div className={global.content}>
          <h1>CALENDAR</h1>
            <FullCalendar
              plugins={[ dayGridPlugin, timeGridPlugin ]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'dayGridDay,dayGridMonth,timeGridWeek,prev,title,next',
                right: ''
              }}
            />
        </div>
      </div >
    </> 
  );
}
