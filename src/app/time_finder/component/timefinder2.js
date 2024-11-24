import { useState } from 'react';
import styles from './timefinder2.module.css';
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';

const TimeFinder2 = ({ onBack, onNext }) => {
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

  const timeSlots = [
    { day: 'MONDAY', date: '10/16', time: '2:00 - 2:30 PM' },
    { day: 'MONDAY', date: '10/16', time: '4:30 - 5:00 PM' },
    { day: 'WEDNESDAY', date: '10/18', time: '10:00 - 10:30 AM' },
  ];

  return (
    <div>
      <div className={global.page}>
        <Navbar />
        <div className={global.content}>
          <main className={styles.mainContent}>
            <h1 className={styles.title}>TIME FINDER 2</h1>
            <div className={styles.card}>
              <div className={styles.questionRow}>
                <p className={styles.question}>⭐ Matches found! You're available at these times:</p>
              </div>
              <div className={styles.timeSlots}>
                {timeSlots.map((slot, index) => (
                  <div
                    key={index}
                    className={`${styles.timeSlot} ${selectedTime === index ? styles.selected : ''}`}
                    onClick={() => setSelectedTime(index)}
                  >
                    <div className={styles.slotDetails}>
                      <div className={styles.day}>{slot.day}</div>
                      <div className={styles.date}>{slot.date}</div>
                      <div className={styles.time}>{slot.time}</div>
                    </div>
                  </div>
                ))}
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