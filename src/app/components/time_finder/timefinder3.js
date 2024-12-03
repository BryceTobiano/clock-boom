'use client';
import React, { useState } from 'react';
import styles from './timefinder3.module.css';
import Image from 'next/image';
import global from '../../global.module.css';
import Navbar from '../nav/nav.js';
import { format } from 'date-fns';

const TimeFinder3 = ({ onBack, onNext, selectedTimeSlot, slots, calendars, categories }) => {
  // Category options
  const categoryOptions = [
    'Work',
    'Personal',
    'Self-Development'
  ];

  // Prepopulated data from TimeFinder2
  // State for form inputs
  const [selectedCategory, setSelectedCategory] = useState(calendars[0]);
  const [selectedCalendar, setSelectedCalendar] = useState(categories[0]);
  const [startDateTime, setStartDateTime] = useState(format(new Date(slots[selectedTimeSlot].start), "yyyy-MM-dd'T'HH:mm"));
  const [endDateTime, setEndDateTime] = useState(format(new Date(slots[selectedTimeSlot].end), "yyyy-MM-dd'T'HH:mm"));
  const [eventName, setEventName] = useState('');
  const [comments, setComments] = useState('');

  const handleSendRequest = () => {
    if (typeof onNext === 'function') {
      onNext({
        name: eventName,
        description: comments,
        start: startDateTime,
        end: endDateTime,
        calendar: selectedCalendar,
        category: [selectedCategory],
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
          <h1 className={styles.title}>TIME FINDER</h1>
          <div className={styles.card}>
            <div className={styles.questionRow}>
              <span className={styles.emailIcon}>
                <Image src="/icons/email.png" width={50} height={50} alt="Email icon" />
              </span>
              <p className={styles.question}>Ready to schedule this task?</p>
            </div>
            <div className={styles.formGroup}>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>NAME OF EVENT:</div>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="Required"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>Description:</div>
                <textarea
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Optional"
                  className={styles.formTextarea}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>CHOOSE A CALENDAR:</div>
                <select
                  value={selectedCalendar}
                  onChange={(e) => setSelectedCalendar(e.target.value)}
                  className={styles.formInput}
                >
                  {calendars.map((calendar, index) => (
                    <option key={index} value={calendar.id}>
                      {calendar.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>ADD TO CATEGORY:</div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className={styles.formInput}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>START DATE:</div>
                <input
                  type="datetime-local"
                  value={startDateTime}
                  onChange={(e) => setStartDateTime(e.target.value)}
                  placeholder="Enter date"
                  className={styles.formInput}
                />
              </div>
              <div className={styles.formRow}>
                <div className={styles.formLabel}>END DATE:</div>
                <input
                  type="datetime-local"
                  value={endDateTime}
                  onChange={(e) => setEndDateTime(e.target.value)}
                  placeholder="Enter date"
                  className={styles.formInput}
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