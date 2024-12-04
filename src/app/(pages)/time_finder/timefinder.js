'use client';
import React, { useEffect, useState } from 'react';
import styles from './time_finder.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../globals.css';
import TimeFinder1 from '../../components/time_finder/timefinder1';
import TimeFinder2 from '../../components/time_finder/timefinder2';
import TimeFinder3 from '../../components/time_finder/timefinder3';
import TimeFinder4 from '../../components/time_finder/timefinder4';
import { getCookie, refresh } from '@/app/actions/auth'
import { getUserIdFromToken } from "@/app/actions/jwt";

const TimeFinder = ({ calendars, categories, events }) => {
  const [step, setStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState({
    startDateTimeString: '',
    endDateTimeString: '',
    duration: ''
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState('');
  const [slots, setSlots] = useState([]);

  function findFreeSlots(events, rangeStart, rangeEnd, requiredDuration) {
    // Convert everything to Date objects for easy comparison
    const rangeStartTime = new Date(rangeStart);
    const rangeEndTime = new Date(rangeEnd);
    const requiredDurationMs = requiredDuration * 60 * 1000; // Convert to milliseconds

    const filteredEvents = events.filter((event) => {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        return !event.allDay && eventEnd > rangeStartTime && eventStart < rangeEndTime;
    });

    // Sort events by start time
    const sortedEvents = [...filteredEvents].sort((a, b) => new Date(a.start) - new Date(b.start));

    const freeSlots = [];
    let lastEnd = new Date(rangeStart);

    for (let event of sortedEvents) {
        const eventStart = new Date(event.start);
        const eventEnd = new Date(event.end);
        if (eventStart > lastEnd) {
          let gapStart = new Date(lastEnd.getTime()  + requiredDurationMs);
          while (gapStart <= eventStart) {
            gapStart = new Date(gapStart.getTime() + requiredDurationMs);
          }
        }

        // If there's a gap between the last end time and the current event start
        if (eventStart > lastEnd) {
            let gapStart = new Date(lastEnd.getTime()  + requiredDurationMs);
            while (gapStart <= eventStart) {
                freeSlots.push({
                    start: gapStart,
                    end: new Date(gapStart.getTime() + requiredDurationMs),
                });
                gapStart = new Date(gapStart.getTime() + requiredDurationMs);
            }
        }

        // Update the last end time
        lastEnd = new Date(Math.max(lastEnd, eventEnd));
    }

    // Check for free time after the last event until the range end
    if (rangeEndTime > lastEnd) {
        let gapStart = new Date(lastEnd.getTime() + requiredDurationMs);
        while (gapStart <= rangeEndTime) {
            freeSlots.push({
                start: gapStart,
                end: new Date(gapStart.getTime() + requiredDurationMs),
            });
            gapStart = new Date(gapStart.getTime() + requiredDurationMs);
        }
    }

    return freeSlots;
  }

  const createEvent = async (data) => {
    refresh();
    let token = getCookie("timesparkAccessToken");
    let userId = getUserIdFromToken(token);

    await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/events/', {
        method: 'POST',
        body: JSON.stringify({
            "title":  data.name,
            "description": data.description,
            "start": data.start,
            "end": data.end,
            "is_all_day": false,  
            "calendar": data.calendar,
            "categories": data.category,
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
  }

  const handleNext = (data) => {
    if (step === 1) {
      const { startDateTimeString, endDateTimeString, duration } = data;

      // Check if all required fields are filled
      if (!startDateTimeString || !endDateTimeString || !duration) {
        setError('Please fill in all date and duration fields');
        return;
      }

      const start = new Date(startDateTimeString);
      const end = new Date(endDateTimeString);

      // Validate dates

      if (isNaN(start) || isNaN(end)) {
        setError('Please enter valid dates');
        return;
      }

      if (end < start) {
        setError('End date must be after start date');
        return;
      }

      // RUN FINDFREE SLOTS HERE
      setSlots(findFreeSlots(events, start, end, duration));

      setError('');
      setSelectedDate(data);
      setStep(2);
    } else if (step === 2) {
      setSelectedUser(data);
      setStep(3);
    } else if (step === 3) {
      setSelectedTime(data);
      console.log('SetSelectedTime:', { data });
      createEvent(data)
    
      setStep(4);
    } else if (step === 4) {
      setStep(5);
    }
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
  };

  const handleDashboard = () => {
    console.log('Navigating to dashboard');
  };

  const handleScheduleAnother = () => {
    // Reset state to Step 1
    setStep(1);
    setSelectedUser('');
    setSelectedDate({
      startDate: '',
      endDate: '',
      duration: ''
    });
    setSelectedTime(null);
    setError('');
  };

useEffect(() => {

}, []);


  return (
    <div>
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      <button></button>
      {step === 1 && (
        <TimeFinder1 
          onNext={handleNext} 
          initialData={selectedDate}
        />
      )}
      
      {step === 2 && (
        <TimeFinder2 
          onNext={handleNext} 
          onBack={handleBack}
          slots={slots}
        />
      )}
      
      {step === 3 && (
        <TimeFinder3 
          onNext={handleNext} 
          onBack={handleBack}
          slots={slots}
          calendars={calendars}
          categories={categories}
          selectedTimeSlot={selectedUser}
        />
      )}
      
      {step === 4 && (
        <TimeFinder4 
          onDashboard={handleDashboard} 
          onScheduleAnother={handleScheduleAnother} 
        />
      )}
    </div>
  );
};

export default TimeFinder;

