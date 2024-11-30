'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import React from 'react'
import { useState, useEffect } from 'react'
import { getCookie, refresh } from '@/app/actions/auth'
import { getUserIdFromToken } from "@/app/actions/jwt";
// CSS IMPORTS
import '../../globals.css'
import global from '../../global.module.css'
import styles from './calendar.module.css'
import Navbar from '../../components/nav/nav'
import Button from '../../components/button'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Snackbar from '@mui/material/Snackbar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

let token = getCookie("timesparkAccessToken");

export async function getServerSideProps() {

  // Fetch data from external API
  await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/calendar/?user=' + userId, {
    method: 'GET',
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        'Authorization': `Bearer ${token}`, // Add the JWT token here
    }
  })
  .then(res => {
    if (!res.ok) {
      if(res.status == 401) {
        refresh(res);
      } else {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
    }
      return res.json()
  })
  .then(json => {
    setUserCalendars(json);
  })
  // Pass data to the page via props
  return { props: { repo } }
}

export default function Page() {
  const [userCalendars, setUserCalendars] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [createCalendarModalOpen, setcreateCalendarOpen] = useState(false);
  const createCalendarOpen = () => setcreateCalendarOpen(true);
  const createCalendarClose = () => setcreateCalendarOpen(false);
  const [createEventModalOpen, setcreateEventOpen] = useState(false);
  const createEventOpen = () => setcreateEventOpen(true);
  const createEventClose = () => setcreateEventOpen(false);
  const [snackBar, setSnackbar] = useState(false);
  const openSnackbar = () => setSnackbar(true);
  const closeSnackbar = () => setSnackbar(false);
  const [snackBarMsg, setSnackbarMsg] = useState("");

  useEffect(() => {
    getUserCalendars();
    getUserCategories();
  }, []);

  let userId = getUserIdFromToken(token);
  const getUserCalendars = async () => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/calendar/?user=' + userId, {
      method: 'GET',
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${token}`, // Add the JWT token here
      }
    })
    .then(res => {
      if (!res.ok) {
        if(res.status == 401) {
          refresh(res);
        } else {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
      }
        return res.json()
    })
    .then(json => {
      setUserCalendars(json);
    })
  }

  const getUserCategories = async () => {
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/category/?user=' + userId, {
      method: 'GET',
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${token}`, // Add the JWT token here
      }
    })
    .then(res => {
        if (!res.ok) {
            if(res.status == 401) {
              refresh(res);
            } else {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        return res.json()
    })
    .then(json => {
      setUserCategories(json)
    })
  }

  const createCalendar = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
      
    let userId = getUserIdFromToken(token);
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/calendar/', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            description: description,
            default_category: category,
            user: userId,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`, // Add the JWT token here
        }
    })
    .then(res => {
        if (!res.ok) {
            console.log(res.json());
            console.log(res.body);
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json()
    })
    .then(json => {
      console.log(json)
      getUserCalendars();
      createCalendarClose();
      setSnackbarMsg(name + "Calendar has successfully created");
      openSnackbar();
    })
  }

  const createEvent = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const calendar = formData.get('calendar');
    console.log(calendar);
  }

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
                  left: 'title',
                  right: 'prev,next timeGridDay,timeGridWeek,dayGridMonth'
                }}
                events={events}
              />
            </div>
          <div >

            
            <div className={styles.accordionWrapper}>
              <div>
                <Accordion className={styles.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                    
                  >
                    <h3>CREATE</h3>
                  </AccordionSummary>
                  <AccordionDetails className={styles.accordionDetails}>
                    <Button onClick={createCalendarOpen} className={styles.accordionButton}>Create Calendar</Button>
                    <Button onClick={createEventOpen} className={styles.accordionButton}>Create Event</Button>

                  </AccordionDetails>
                </Accordion>
              </div>
              <div>
                <Accordion defaultExpanded className={styles.accordion}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2-content"
                    id="panel2-header"
                  >
                  <h3>CALENDARS</h3>
                  </AccordionSummary>
                  <AccordionDetails className={styles.accordionDetails}>
                  <div>
                    {userCalendars.map((calendar, index) => (
                      <p key={index}>
                        {calendar.name}
                      </p>
                    ))}
                  </div>
                  </AccordionDetails>
                </Accordion>

              </div>
            </div>
          </div>
        </div>

        <Modal
          open={createCalendarModalOpen}
          onClose={createCalendarClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box className={styles.modal}>    
              <form onSubmit={createCalendar} className={styles.modalForm}>
                <h3 style={{textAlign: "center", marginBottom: "1em"}}>Create Calendar</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label>
                    Calendar Name: *
                    <input
                      type="text"
                      name="name"
                      required
                      style={{ border: "1px solid black", borderRadius:"5px", display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                  </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      style={{ border: "1px solid black", borderRadius:"5px", display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                  </label>
                </div>

                <div style={{marginBottom: "1em"}}>
                  <label>
                    Default Category:
                    <p style={{fontSize:"0.5em"}}>(OPTIONAL)</p>
                    <p style={{fontSize:"0.5em", fontStyle:"italic"}}>Events in this calendar will be automatically assign to this category</p>
                    <select name="category" className={styles.categorySelect}>
                      <option disabled selected value=""> -- Select an option -- </option>
                      {userCategories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <Button type="submit" className="primary-button">Create Calendar</Button>
            </form>
          </Box>
        </Modal>

        <Modal
          open={createEventModalOpen}
          onClose={createEventClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box className={styles.modal}>    
              <form onSubmit={createEvent} className={styles.modalForm}>
                <h3 style={{textAlign: "center", marginBottom: "1em"}}>Create Event</h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label>
                    Event Name: *
                    <input
                      type="text"
                      name="name"
                      required
                      style={{ border: "1px solid black", borderRadius:"5px", display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                  </label>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                  <label>
                    Description:
                    <textarea
                      name="description"
                      style={{ border: "1px solid black", borderRadius:"5px", display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                  </label>
                </div>

                <div style={{marginBottom: "1em"}}>
                  <label>
                    Calendars: *
                    <select name="calendar" className={styles.categorySelect} required>
                      <option disabled selected value=""> -- Select an option -- </option>
                      {userCalendars.map((calendar, index) => (
                        <option key={index} value={calendar.id}>
                          {calendar.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div style={{marginBottom: "1em"}}>
                  <label>
                    Category: (Optional)
                    <select name="category" className={styles.categorySelect}>
                      <option disabled selected value=""> None </option>
                      {userCategories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                
                <Button type="submit" className="primary-button">Create Event</Button>
            </form>
          </Box>
        </Modal>
        


        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={3000}
          open={snackBar}
          onClose={closeSnackbar}
          message={snackBarMsg}
          ContentProps={{
            sx:{
              color:"black",
              background: "white"
            }
           }}
        />
        </div>
      </div >
    </> 
  );
}


