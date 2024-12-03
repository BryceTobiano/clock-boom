import { useState } from 'react';
import styles from './timefinder1.module.css';
import Image from 'next/image';
import global from '../../global.module.css';
import Navbar from '../nav/nav.js';

const TimeFinder1 = ({ onNext }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [duration, setDuration] = useState('');

    const handleNext = () => {
        let startDateTimeString = `${startDate}T${startTime}`;
        let endDateTimeString = `${endDate}T${endTime}`;
        let startDateTime = new Date(startDateTimeString);
        let endDateTime = new Date(endDateTimeString);

        if (typeof onNext === 'function') {
            onNext({ startDateTimeString, endDateTimeString, duration });  // Pass the form data to the next screen
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
                                <span className={styles.calendarIcon}>
                                    <Image src="/icons/calendar.png" alt="calendar icon" width={50} height={50} />
                                </span>
                                <p className={styles.question}>What dates do you want to schedule?</p>
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="startDate">START DATE</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        value={startDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        placeholder="mm/dd/yyyy"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="endDate">END DATE</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        placeholder="mm/dd/yyyy"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="duration">DURATION</label>
                                    <select
                                        id="duration"
                                        value={duration}
                                        onChange={(e) => setDuration(e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="30">30 minutes</option>
                                        <option value="60">1 hour</option>
                                        <option value="90">1.5 hours</option>
                                        <option value="120">2 hours</option>
                                    </select>
                                </div>
                            </div>
                            <div className={styles.inputRow}>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="endDate">START TIME</label>
                                    <input
                                        type="time"
                                        id="endDate"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        placeholder="mm/dd/yyyy"
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="endDate">END TIME</label>
                                    <input
                                        type="time"
                                        id="endDate"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        placeholder="mm/dd/yyyy"
                                    />
                                </div>
                            </div>
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

export default TimeFinder1;
