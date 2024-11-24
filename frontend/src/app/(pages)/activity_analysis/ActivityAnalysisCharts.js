'use client'

import React from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import styles from './activity_analysis.module.css';

const ActivityAnalysisCharts = ({ efficiencyData, colors, workLogData, timeSheetData }) => {
  return (
    <>
      <div className={styles.chartContainer}>
         <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index]} 
                strokeWidth={0}
              />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className={styles.chartContainer}>
        <BarChart width={300} height={200} data={workLogData}>
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </div>

      <div className={styles.chartContainer}>
        <PieChart width={200} height={200}>
          <Pie
            data={timeSheetData}
            cx={100}
            cy={100}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {/* {timeSheetData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))} */}
          </Pie>
        </PieChart>
      </div>
    </>
  );
};

export default ActivityAnalysisCharts;