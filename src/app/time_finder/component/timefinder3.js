import React, { useState } from 'react';
import styles from './timefinder3.module.css';
import Image from 'next/image';
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';

const TimeFinder3 = ({ onBack, onNext, selectedTimeSlot }) => {
  // Category options
  const categoryOptions = [
    'Work',
    'Personal',
    'Self-Development'
  ];

  // Prepopulated data from TimeFinder2
  const timeSlots = [
    { day: 'MONDAY', date: '10/16', time: '2:00 - 2:30 PM' },
    { day: 'MONDAY', date: '10/16', time: '4:30 - 5:00 PM' },
    { day: 'WEDNESDAY', date: '10/18', time: '10:00 - 10:30 AM' },
  ];

  // State for form inputs
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const [selectedDate, setSelectedDate] = useState(
    selectedTimeSlot !== null && selectedTimeSlot !== undefined
      ? timeSlots[selectedTimeSlot]?.date || ''
      : ''
  );
  const [selectedTime, setSelectedTime] = useState(
    selectedTimeSlot !== null && selectedTimeSlot !== undefined
      ? timeSlots[selectedTimeSlot]?.time || ''
      : ''
  );
  const [eventName, setEventName] = useState('');
  const [comments, setComments] = useState('');

  const handleSendRequest = () => {
    if (typeof onNext === 'function') {
      onNext({
        category: selectedCategory,
        date: selectedDate,
        time: selectedTime,
        eventName,
        comments
      });
    } else {
      console.error('onNext is not a function');
    }
  };

  return (
    <div className={global.page}>
      <Navbar />
      <div className={global.content}>
        <main className={styles.mainContent}>
          <h1 className={styles.title}>TIME FINDER 3</h1>
          <div className={styles.card}>
            <div className={styles.questionRow}>
              <span className={styles.emailIcon}>
                <Image src="/icons/email.png" width={50} height={50} alt="Email icon" />
              </span>
              <p className={styles.question}>Ready to schedule this task?</p>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>ADD TO CATEGORY:</div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.formInput}
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>DATE:</div>
                <input
                  type="text"
                  value={selectedDate}
                  readOnly
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>TIME:</div>
                <input
                  type="text"
                  value={selectedTime}
                  readOnly
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>NAME OF EVENT:</div>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Optional"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>COMMENTS:</div>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Optional"
                  className={styles.formTextarea}
                />
              </div>
            </div>
            <div className={styles.buttonGroup}>
              <button
                className={styles.backButton}
                onClick={onBack}
              >
                ← BACK
              </button>
              <button
                className={styles.nextButton}
                onClick={handleSendRequest}
              >
                ADD TASK →
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TimeFinder3;