import clsx from 'clsx';
import React from 'react';
import dynamic from 'next/dynamic';
import styles from './activity_analysis.module.css';
import '../../globals.css';
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';
import Image from 'next/image';
import Chart from 'chart.js/auto';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import DonutChart from './components/DonutChart';
import CompletedDropdown from './components/CompletedDropdown';
import InProgressDropdown from './components/InProgressDropdown';
import NotStartedDropdown from './components/NotStartedDropdown';
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js"></script>

export default function ActivityAnalysis() {

  const timeSheetData = [
    { name: 'Work', value: 102, color: '#2196F3' },
    { name: 'Personal', value: 54, color: '#FFC107' },
    { name: 'Self Development', value: 60, color: '#FF5722' },
  ];


  return (
    <div className={clsx(styles.container, global.page)}>
      <div><Navbar /></div>
      <h1>ACTIVITY ANALYSIS</h1>
  
      <div className={styles.grid}>
      
        <div className={styles.row}>

          {/* Efficiency Score */}
          <div className={styles.cardLeft}>
            <h2 className={styles.cardTitle}>EFFICIENCY SCORE</h2>
            <div><DonutChart/></div>
            <p className={styles.efficiencyScore}>
              <span className={styles.scoreValue}>87%</span><br />
              Daily Tasks Completed<br />
              October 7, 2024
            </p>
          </div>

          {/* Today's Tasks */}
          <div className={styles.todaysTasks}>
            <div className={styles.taskListHeader}>
              <div className={styles.inline}>
                <h2 className={styles.cardTitle}>TODAY</h2>
                <h2 className={styles.date}>TUESDAY, SEPTEMBER 17</h2>
              </div>
            </div>
            {/* <div className={styles.taskList}> */}
              <div className={`${styles.task} ${styles.completed}`}>
                  <span><CompletedDropdown/></span>
                </div>
                <div className={`${styles.task} ${styles.inProgress}`}>
                  <span><InProgressDropdown/></span>
                </div>
                <div className={`${styles.task} ${styles.notStarted}`}>
                  <span><NotStartedDropdown/></span>
                </div>
              </div>
          {/* </div> */}

        </div>
      

        <div className={styles.row}>
          {/* Work Log */}
          <div className={styles.cardLeft}>
            <h2 className={styles.cardTitle}>WORK LOG</h2>
            <div><BarChart/></div>
            <p className={styles.workLogLabel}>Work Logged in Last 4 Days</p>
          </div>

          {/* Time Sheet */}
          <div className={`${styles.card} ${styles.timeSheet}`}>
            <h2 className={styles.cardTitle}>TIME SHEET</h2>
            <div className={styles.timeSheetContent}>
              <div><PieChart/></div>
            </div>
          </div>
      </div>

    </div>
    </div>
  );
}