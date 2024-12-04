'use client'
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { getCookie, refresh } from '@/app/actions/auth'

import styles from './activity_analysis.module.css';
import '../../globals.css';
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';
import BarChart from './components/BarChart';
import PieChart from './components/PieChart';
import DonutChart from './components/DonutChart';
import CompletedDropdown from './components/CompletedDropdown';
import InProgressDropdown from './components/InProgressDropdown';
import NotStartedDropdown from './components/NotStartedDropdown';
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

import Check from '@mui/icons-material/Check';

<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js"></script>

export default function ActivityAnalysis({ calendars, categories, events }) {
  const [selectedCalendar, setSelectedCalendar] = useState(
    calendars.length > 0 ? calendars[0].id : -1
  )

  const timeSheetData = [
    { name: 'Work', value: 10, color: '#2196F3' },
    { name: 'Personal', value: 54, color: '#FFC107' },
    { name: 'Self Development', value: 60, color: '#FF5722' },
  ];

  
  useEffect(() => {
  }, []);

  return (
    <div className={clsx(styles.container, global.page)}>
      <Navbar />


      <h1>ACTIVITY ANALYSIS</h1>
  
      <div className={styles.grid}>
      
        <div className={styles.row}>

          {/* Work Log */}
          <div className={styles.cardLeft} style={{width: "75%"}}>
            <h2 className={styles.cardTitle}>WEEK BREAKDOWN BY CATEGORY</h2>
            <BarChart categories={categories} events={events} />
          </div>

      </div>
      

        <div className={styles.row}>
          {/* Efficiency Score */}
          <div className={styles.card} style={{width: "50%"}}>
            <h2 className={styles.cardTitle}>TIME SPENT BY CALENDAR</h2>
            <DonutChart calendar={selectedCalendar} categories={categories} events={events} />
            <select 
              name="calendar" 
              defaultValue={calendars.length > 0 ? calendars[0].id : "DEFAULT"} 
              className={styles.categorySelect}
              onChange={(e) => {
                setSelectedCalendar(e.target.value);
              }}
              style={{marginTop: "5px"}}
            required>
              <option disabled value="DEFAULT"> -- Select an option -- </option>
              {calendars.map((calendar, index) => (
                <option key={index} value={calendar.id}>
                  {calendar.name}
                </option>
              ))}
            </select>
          </div>

          {/* Time Sheet */}
          <div className={styles.card} style={{width: "50%"}}>
            <h2 className={styles.cardTitle}>TIME SPENT BY CATEGORY</h2>
            <PieChart  categories={categories} events={events} />
          </div>
      </div>

    </div>
    </div>
  );
}