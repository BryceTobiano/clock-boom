'use client';

import React from 'react';
import styles from './landing.module.css';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import global from '../../global.module.css';
import { redirect } from 'next/navigation'

export default function LandingPage() {
  return (
    <div className={global.page}>
      <div className={global.content}>
        <header className={styles.header}>
          <div className={styles.logoContainer}>
            <Image src="/logo.png" alt="Timespark Logo" width={60} height={60} />
            <h2 className={styles.title}>TIMESPARK</h2>
            <button className={`${styles.startButton} ${styles.startButtonHover}`}>GET STARTED</button>
          </div>
        </header>
        <div className={styles.mainContent}>
          <div className={styles.textContainer}>
            <h1 className={styles.mainTitle}>TIME MANAGEMENT REDEFINED.</h1>
            <p className={styles.mainDescription}>Analyze your efficiency, manage your tasks, and schedule events all in one click.</p>
            <button onClick={()=>{
                redirect(`/register`) 
            }}className={`${styles.createButton} ${styles.createButtonHover}`}>CREATE AN ACCOUNT</button>
          </div>
          <div className={styles.imageContainer}>
            <Image className={styles.workerImage} src="/icons/worker.png" alt="Busy Worker" width={400} height={266} />
          </div>
        </div>
      </div>
    </div>
  );
}