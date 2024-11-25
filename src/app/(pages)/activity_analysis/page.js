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
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.min.js"></script>

export default function ActivityAnalysis() {
  const efficiencyData = [{ value: 87 }, { value: 13 }];
  const colors = ['#4CAF50', '#E0E0E0'];

  const workLogData = [
    { day: 'TH', value: 60 },
    { day: 'F', value: 100 },
    { day: 'S', value: 40 },
    { day: 'SUN', value: 80 },
  ];

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
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>EFFICIENCY SCORE</h2>
            {/* <div><canvas id="efficiency_chart" width="200px" height="300px"></canvas></div> */}
            <div><DonutChart/></div>
            <p className={styles.efficiencyScore}>
              <span className={styles.scoreValue}>87%</span><br />
              Daily Tasks Completed<br />
              October 7, 2024
            </p>
          </div>

          {/* Today's Tasks */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>TODAY</h2>
            <p className={styles.date}>TUESDAY, SEPTEMBER 17</p>
            <div className={styles.taskList}>
              <div className={`${styles.task} ${styles.completed}`}>
                <span>Completed: 2</span>
              </div>
              <div className={`${styles.task} ${styles.inProgress}`}>
                <span>In-Progress: 2</span>
              </div>
              <div className={`${styles.task} ${styles.notStarted}`}>
                <span>Not Started: 2</span>
              </div>
            </div>
          </div>
          {/* Efficiency Score */}
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>EFFICIENCY SCORE</h2>
            <Image src="/img/efficiency-score.png" width={200} height={200}></Image>
            {/* <ActivityAnalysisCharts 
              efficiencyData={efficiencyData}
              colors={colors}
              workLogData={workLogData}
              timeSheetData={timeSheetData}
            /> */}
            <p className={styles.efficiencyScore}>
              <span className={styles.scoreValue}>87%</span><br />
              Daily Tasks Completed<br />
              October 7, 2024
            </p>
          </div>
        </div>
      

        <div className={styles.row}>
          {/* Work Logs */}
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>WORK LOG</h2>
          <div><BarChart/></div>
          <p className={styles.workLogLabel}>Work Logged in Last 4 Days</p>
        </div>

        {/* Time Sheet */}
        <div className={`${styles.card} ${styles.timeSheet}`}>
          <h2 className={styles.cardTitle}>TIME SHEET</h2>
          <div className={styles.timeSheetContent}>
            {/* <h3 className={styles.totalHours}>3.6H</h3> */}
            <div><PieChart/></div>
            <ul className={styles.timeSheetList}>
              {timeSheetData.map((item, index) => (
                <li key={index} className={styles.timeSheetItem}>
                  <span className={styles.colorDot} style={{ backgroundColor: item.color }}></span>
                  <span className={styles.itemName}>{item.name}</span>
                  <span className={styles.itemHours}>{item.value}:00</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        </div>
      </div>
    </div>
  );

  
  // const efficiency_chart = new Chart("efficiency_chart", {
  //   type: "doughnut",
  //   data: data,
  // });

  // const data = {
  //   labels: [
  //     'Red',
  //     'Blue',
  //     'Yellow'
  //   ],
  //   datasets: [{
  //     label: 'Effiency of Work',
  //     data: [300, 50, 100],
  //     backgroundColor: [
  //       'rgb(255, 99, 132)',
  //       'rgb(54, 162, 235)',
  //       'rgb(255, 205, 86)'
  //     ],
  //     hoverOffset: 4
  //   }]
  // };

}