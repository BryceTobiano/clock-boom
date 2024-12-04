"use client"
import clsx from 'clsx';
import styles from "./dashboard.module.css";
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';
import PieChart from "../activity_analysis/components/PieChart";
import DonutChart from '../activity_analysis/components/DonutChart';
import CheckboxList from './components/CheckBoxList';

export default function Home({ calendars, categories, events }) {
  return (
    <div className={clsx(styles.container, global.page)}>
      <Navbar />

      <h1>DASHBOARD</h1>
  
      <div className={styles.grid}>
      
        <div className={styles.row}>

          {/* Work Log */}
          <div className={`${styles.cardLeft} list`} style={{width: "100%"}}>
            <FullCalendar
                  plugins={[ listPlugin ]}
                  initialView="listWeek"
                  headerToolbar={{
                    left: 'title',
                    right: 'prev,next'
                  }}
                  events={events}
                  nowIndicator={true}
                />
          </div>
          
        </div>
      

        <div className={styles.row}>
          {/* Efficiency Score */}
          <div className={styles.card} style={{width: "100%"}}>
            <h2 className={styles.cardTitle}>TIME SPENT BY CALENDAR</h2>
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
          <div className={styles.card} style={{marginTop: "10px", width: "100%"}}>
            <h2 className={styles.cardTitle}>TIME SPENT BY CATEGORY</h2>
            <PieChart  categories={categories} events={events} />
          </div>

        </div>

        <div className={styles.row}>

          {/* to do list */}
          <div className={styles.rightcard}>
            <h3>TO-DO LIST</h3>
            <span><CheckboxList/></span>
          </div>
          
          {/* Notes */}
          <div className={styles.rightcard}>
            <h3>NOTES</h3>
            <textarea style={{width:"400px", height:"300px"}}></textarea>
          </div>

      </div>

    </div>
  </div>

  );
}

// 
