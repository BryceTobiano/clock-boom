'use client';

import Link from 'next/link'
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
            <Image src="/logo.png" alt="Timespark Logo" width={50} height={60} />
            <h2 className={styles.title}>TIMESPARK</h2>
          </div>
          <div className={styles.action}>
            <Link href="/faq"><button className={`${styles.faq} ${styles.faqHover}`}>FAQ</button></Link>
            <Link href="/login"><button className={`${styles.startButton} ${styles.startButtonHover}`}>LOGIN</button></Link>
          </div>
        </header>

        <div className={styles.mainContent}>
          <div className={styles.textContainer}>
            <h1 className={styles.mainTitle}>TIME MANAGEMENT REDEFINED.</h1>
            <p className={styles.mainDescription}>Analyze your efficiency, manage your tasks, and schedule events all in one click.</p>
            <Link href="/register">
              <button onClick={()=>{
                  redirect(`/register`) 
              }}className={`${styles.createButton} ${styles.createButtonHover}`}>GET STARTED</button>
            </Link>
          </div>
          <div className={styles.imageContainer}>
            <Image className={styles.workerImage} src="/icons/worker.png" alt="Busy Worker" width={1000} height={1000} />
          </div>
        </div>
        <div className={styles.features}>
          UNIQUE FEATURES
          <div className={styles.divider}>
            <div className={styles.feature}>
              <Image src="/icons/pen.png" alt="Busy Worker" width={50} height={50} />
              TIME FINDER
              <span className={styles.body}>
                Easily search for availability and add events into your calendars in 3 clicks. 
              </span>
            </div>
            <div className={styles.feature}>
              <Image src="/icons/feet.png" alt="Busy Worker" width={50} height={50} />
              ACTIVITY ANALYSIS
              <span className={styles.body}>
                 Analyze time spent across categories to improve focus and efficiency.
              </span>
            </div><div className={styles.feature}>
              <Image src="/icons/eye.png" alt="Busy Worker" width={50} height={50} />
              SMART CALENDAR
              <span className={styles.body}>
              Toggle between calendar views to see all your commitments at once.
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}