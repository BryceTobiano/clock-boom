import { useState } from 'react';
import styles from './timefinder2.module.css';
import global from '../../global.module.css';
import Navbar from '../nav/nav.js';

const TimeFinder2 = ({ slots, onBack, onNext }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = () => {
    if (typeof onNext === 'function' && selectedTime !== null) {
      onNext(selectedTime);
    } else if (selectedTime === null) {
      console.error('Please select a time');
    } else {
      console.error('onNext is not a function');
    }
  };

  return (
    <div>
      <div className={global.page}>
        <Navbar />
        <div className={global.content}>
          <main className={styles.mainContent}>
            <h1 className={styles.title}>TIME FINDER</h1>
            <div className={styles.card}>
              <div className={styles.questionRow}>
                <p className={styles.question}>⭐ Matches found! You're available at these times:</p>
              </div>
              <div className={styles.timeSlots}>
              {slots.map((slot, index) => {
                  const startDate = new Date(slot.start);
                  const endDate = new Date(slot.end);

                  // Extract the day of the week
                  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                  const dayOfWeek = daysOfWeek[startDate.getDay()]; // Use getDay for local time or getUTCDay for UTC

                  // Extract the date
                  const date = startDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD

                  // Extract and format times
                  const formatTime = (date) => {
                      const hours = date.getHours().toString().padStart(2, "0"); // Use getUTCHours for UTC
                      const minutes = date.getMinutes().toString().padStart(2, "0"); // Use getUTCMinutes for UTC
                      return `${hours}:${minutes}`;
                  };

                  const startTime = formatTime(startDate);
                  const endTime = formatTime(endDate);

                  return (
                      <div 
                        key={index}
                        className={`${styles.timeSlot} ${selectedTime === index ? styles.selected : ''}`}
                        onClick={() => setSelectedTime(index)}
                      >
                          <div className={styles.slotDetails}>
                              <div className={styles.day}>{dayOfWeek}</div>
                              <div className={styles.date}>{date}</div>
                              <div className={styles.time}>
                                  {startTime} - {endTime}
                              </div>
                          </div>
                      </div>
                  );
              })}
              </div>
              <button className={styles.backButton} onClick={onBack}>
                ← BACK
              </button>
              <button className={styles.nextButton} onClick={handleNext}>
                NEXT →
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TimeFinder2;