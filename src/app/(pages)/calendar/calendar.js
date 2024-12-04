'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // for selectable
import timeGridPlugin from '@fullcalendar/timegrid' // a plugin!
import { format } from 'date-fns';
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

export default function Calendar({ calendars, categories, events }) {
  const [userCalendars, setUserCalendars] = useState(calendars);
  const [userCategories, setUserCategories] = useState(categories);
  const [userEvents, setUserEvents] = useState(events);
  const [selectedCalendars, setSelectedCalendars] = useState(
    userCalendars.map((calendar) => calendar.id) // Initially, all calendars are selected
  );


  const [createCalendarModalOpen, setcreateCalendarOpen] = useState(false);
  const createCalendarOpen = () => setcreateCalendarOpen(true);
  const createCalendarClose = () => setcreateCalendarOpen(false);
  const [createEventModalOpen, setcreateEventOpen] = useState(false);
  const createEventOpen = () => setcreateEventOpen(true);
  const createEventClose = () => setcreateEventOpen(false);
  const [isAllDay, setIsAllDay] = useState(false);
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const [deleteEventModalOpen, setDeleteEventOpen] = useState(false);
  const [deleteEventName, setDeleteEventName] = useState(false);
  const [deleteEventId, setDeleteEventId] = useState(false);

  const [snackBar, setSnackbar] = useState(false);
  const [snackBarMsg, setSnackbarMsg] = useState("");
  const openSnackbar = () => setSnackbar(true);
  const closeSnackbar = () => setSnackbar(false);


  let token = getCookie("timesparkAccessToken");

  // Handle change for the "All Day" checkbox
  const handleAllDayChange = (event) => {
    setIsAllDay(event.target.checked);
    if(event.target.checked) {
        setStartDateTime(startDateTime.split('T')[0]);
        setEndDateTime(endDateTime.split('T')[0]);
    } else {
        setStartDateTime(startDateTime + 'T11:00');
        setEndDateTime(endDateTime + 'T12:00');
    }
  };

  // Handle datetime change
  const handleDateTimeChange = (event, isStartDate) => {
    if (isStartDate) {
      setStartDateTime(event.target.value);
    } else {
      setEndDateTime(event.target.value);
    }
  };

  const handleDateClick = (info) => {
    const formattedStartDate = format(info.dateStr, "yyyy-MM-dd'T'HH:mm");
    const endDate = new Date(info.dateStr);
    endDate.setMinutes(endDate.getMinutes() + 30); // Add 30 minutes to the start time
    const formattedEndDate = format(endDate, "yyyy-MM-dd'T'HH:mm");

    setStartDateTime(formattedStartDate);
    setEndDateTime(formattedEndDate);
    createEventOpen()
  }

  const handleRemoveEvent = (info) => {
    setDeleteEventName(info.event.title);
    setDeleteEventId(info.event.id);
    setDeleteEventOpen(true); 
  }

  const handleSelect = (info) => {
    const formattedStartDate = format(info.startStr, "yyyy-MM-dd'T'HH:mm");
    const formattedEndDate = format(info.endStr, "yyyy-MM-dd'T'HH:mm");

    setStartDateTime(formattedStartDate);
    setEndDateTime(formattedEndDate);
    createEventOpen()
  }

  useEffect(() => {
    refresh();
    token = getCookie("timesparkAccessToken");
  }, []);

  const filterEvents = (selectedCalendars) => {
    const filteredEvents = events.filter((event) => selectedCalendars.includes(event.calendar));
    setUserEvents(filteredEvents);
  };

  const handleCheckboxChange = (calendarId) => {
    setSelectedCalendars((prevSelectedCalendars) => {
        if (prevSelectedCalendars.includes(calendarId)) {
            // Remove the calendar ID from the selected list
            const updatedCalendars = prevSelectedCalendars.filter(
                (id) => id !== calendarId
            );
            filterEvents(updatedCalendars); // Update events
            return updatedCalendars;
        } else {
            // Add the calendar ID to the selected list
            const updatedCalendars = [...prevSelectedCalendars, calendarId];
            filterEvents(updatedCalendars); // Update events
            return updatedCalendars;
        }
    });
  };

  let userId = getUserIdFromToken(token);
  
  const getUserCalendars = async () => {
    refresh();
    token = getCookie("timesparkAccessToken");

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
            } else {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
        }
        return res.json()
    })
    .then(json => {
      setUserCalendars(json)
    })
  }

  const getUserEvents = async () => {
    refresh();
    token = getCookie("timesparkAccessToken");

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/?user=' + userId, {
      method: 'GET',
      headers: {
          "Content-type": "application/json; charset=UTF-8",
          'Authorization': `Bearer ${token}`, // Add the JWT token here
      }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
    })
    .then(json => {
      setUserEvents(json);
    })
  }

  const getUserCategories = async () => {
    refresh();
    token = getCookie("timesparkAccessToken");

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/category/?user=' + userId, {
      method: 'GET',
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
      setUserCategories(json)
    })
  }

  const createCalendar = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name');
    const description = formData.get('description');
    const category = formData.get('category');
    const color = formData.get('calendarColor');

    refresh();
    token = getCookie("timesparkAccessToken");

    let userId = getUserIdFromToken(token);
    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/calendar/', {
        method: 'POST',
        body: JSON.stringify({
            name: name,
            description: description,
            default_category: category,
            color: color,
            user: userId,
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
        return res.json();
    })
    .then(json => {
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
    const startDate = formData.get('startDate');
    const endDate = formData.get('endDate');
    const color = formData.get('calendarColor');
    let allDay = true;
    if(!formData.get('allDay')) {
         allDay = false;
    }

    let userId = getUserIdFromToken(token);

    refresh();
    token = getCookie("timesparkAccessToken");

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/', {
        method: 'POST',
        body: JSON.stringify({
            "title":  name,
            "description": description,
            "start": startDate,
            "end": endDate,
            "is_all_day": allDay,  
            "calendar": calendar,
            "categories": [category],
            "color": color,
            "user": userId
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
        return res.json();
    })
    .then(json => {
      createEventClose();
      userEvents.push({
        "id": json.id,
        "title":  name,
        "description": description,
        "start": startDate,
        "end": endDate,
        "is_all_day": allDay,  
        "calendar": calendar,
        "categories": []
        
      });

      getUserEvents();
      setSnackbarMsg("Event: " + name + " has successfully created");
      openSnackbar();
    })
  }


  const deleteEvent = async () => {
    const newUserEvents = userEvents.filter(event => event.id != deleteEventId);
    setDeleteEventOpen(false);
    setUserEvents(newUserEvents);

    refresh();
    token = getCookie("timesparkAccessToken");

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/' + deleteEventId + '/', {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            'Authorization': `Bearer ${token}`, // Add the JWT token here
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        setDeleteEventId("");
        getUserEvents();
        setSnackbarMsg("Event successfully deleted");
        openSnackbar();

        return res
    })
  }

  let testEvents =   [
    {
      "title": "Event 1",
      "start": "2024-11-24T09:00:00",
      "end": "2024-11-24T18:00:00",
      "color": "red"
    },
    {
      "title": "Event 2",
      "start": "2024-11-24",
      "end": "2024-11-24",
      "color": "red"
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
                plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'title',
                  right: 'prev,next timeGridDay,timeGridWeek,dayGridMonth'
                }}
                events={userEvents}
                // events={testEvents}
                nowIndicator={true}

                editable={true}
                droppable={true}
                selectable={true}
                selectMirror={true}
                select={handleSelect}
                dateClick={handleDateClick}
                eventClick={(data) => handleRemoveEvent(data)}
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
                    {userCalendars.map((calendar, index) => (
                        <Button key={index} className={styles.accordionButton}>
                            <div style={{display: "flex", gap: "0.5em"}}>
                                <input 
                                    type="checkbox" 
                                    style={{accentColor: calendar.color, transform: "scale(1.25)"}} 
                                    checked={selectedCalendars.includes(calendar.id)}
                                    onChange={() => handleCheckboxChange(calendar.id)}
                                />
                                <p> {calendar.name} </p>
                            </div>
                        </Button>
                    ))}
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
                  <h3>CATEGORIES</h3>
                  </AccordionSummary>
                  <AccordionDetails className={styles.accordionDetails}>
                  <div>
                    {userCategories.map((calendar, index) => (
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
                    <select defaultValue={"DEFAULT"} name="category" className={styles.categorySelect}>
                      <option disabled value="DEFAULT"> -- Select an option -- </option>
                      {userCategories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label style={{display: "flex", marginBottom: "1em"}}>
                    <p style={{marginRight: "0.5em"}}> Calendar Color: </p>
                    <input className={styles.color} type="color" name="calendarColor"/>
                </label>
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
                <h3 style={{textAlign: "center", marginBottom: "1em"}}>
                    Create Event
                </h3>
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
                    Calendar: *
                    <select name="calendar" defaultValue={"DEFAULT"} className={styles.categorySelect} required>
                      <option disabled value="DEFAULT"> -- Select an option -- </option>
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
                    <select name="category" defaultValue={"DEFAULT"} className={styles.categorySelect}>
                      <option disabled value="DEFAULT"> None </option>
                      {userCategories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className={styles.allDay}>
                    <label>
                        <input 
                        name="allDay"          
                        type="checkbox"
                        checked={isAllDay}
                        value="true"
                        onChange={handleAllDayChange}
                        className={styles.checkbox}
                    />
                        All Day
                    </label>
                </div>

                <div style={{marginBottom: "1em"}} className={styles.inputGroup}>
                    <label style={{marginBottom: "1em"}}>
                        Start
                        <input
                            type={isAllDay ? 'date' : 'datetime-local'}
                            value={startDateTime}
                            onChange={(e) => handleDateTimeChange(e, true)}
                            max={endDateTime}
                            name="startDate"
                            id="startDate"
                            required
                        />
                    </label>
                    <label style={{marginBottom: "1em"}}>
                        End
                        <input
                            type={isAllDay ? 'date' : 'datetime-local'}
                            value={endDateTime}
                            onChange={(e) => handleDateTimeChange(e, false)}
                            min={startDateTime}
                            name="endDate"
                            id="endDate"
                            required
                        />
                    </label>
                </div>

                <label style={{display: "flex", marginBottom: "1em"}}>
                    <p style={{marginRight: "0.5em"}}> Event Color: </p>
                    <input className={styles.color} type="color" name="calendarColor" />
                </label>

                <Button type="submit" className="primary-button">Create Event</Button>
            </form>
          </Box>
        </Modal>
        
        <Modal
          open={deleteEventModalOpen}
          onClose={() => {setDeleteEventOpen(false)}}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            <Box className={styles.modal}>    
                <div className={styles.modalForm}>
                    <div style={{display:"flex", flexDirection:"column", alignItems:"center", marginBottom: "0.5em"}}>
                        <h3>Delete Event: {deleteEventName}</h3>
                        <p style={{fontSize:"0.75em", fontStyle:"italic"}}>Are you sure you want to delete this event?</p>
                    </div>
                    <Button type="submit" onClick={deleteEvent} className="danger-button">Delete Event</Button>
                </div>
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


