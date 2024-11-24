import { useState } from 'react';
import styles from './timefinder4.module.css';
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';

const TimeFinder4 = ({ onDashboard, onScheduleAnother }) => {

    
    return (
        <div>
        <div className={global.page}>
          <Navbar />
          <div className={global.content}>
            <main className={styles.mainContent}>
              <h1 className={styles.title}>TIME FINDER 4</h1>
              <div className={styles.card}>
                <div className={styles.questionRow}>
                  <p className={styles.question}>⭐ Task Scheduled! Your calendar has been updated.</p>
                </div>
                
                {/* <div className={styles.buttonGroup}>
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
            </div> */}

<div className={styles.buttonGroup}>
                    <button onClick={onDashboard} className={styles.backButton}>← DASHBOARD</button>
                    <button onClick={onScheduleAnother} className={styles.nextButton}>SCHEDULE ANOTHER →</button>
                </div>
            
              </div>
            </main>
          </div>
        </div>
      </div>
    );
};

export default TimeFinder4;
