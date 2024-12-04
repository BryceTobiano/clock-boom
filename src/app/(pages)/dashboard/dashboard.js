"use client"
import clsx from 'clsx';
import styles from "./dashboard.module.css";
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';
import FullCalendar from '@fullcalendar/react'
import listPlugin from '@fullcalendar/list';
import PieChart from "../activity_analysis/components/PieChart";
import DonutChart from '../activity_analysis/components/DonutChart';
import CheckboxList from './components/CheckboxList';

export default function Home({ calendars, categories, events }) {
  return (
    <div className={clsx(styles.container, global.page)} style={{height: "100vh"}}>
      <Navbar />

      <h1>DASHBOARD</h1>
  
      <div className={styles.grid}>
      
        <div className={styles.row}>

          {/* Work Log */}
          <div className={`${styles.cardLeft} list`}>
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
          <div className={styles.rightcard}>
            <h3>TO-DO LIST</h3>
            <span><CheckboxList/></span>
          </div>
          {/* Time Sheet */}
          <div className={styles.card} style={{marginTop: "10px", width: "100%"}}>
            <h2 className={styles.cardTitle}>TIME SPENT BY CATEGORY</h2>
            <PieChart  categories={categories} events={events} />
          </div>

        </div>

        <div className={styles.row}>

          {/* to do list */}
          
          
          {/* Notes */}
          <div className={styles.rightcard}>
            <h3>NOTES</h3>
            <textarea style={{width:"400px", height:"57vh"}}></textarea>
          </div>

      </div>

    </div>
  </div>

  );
}

// 
