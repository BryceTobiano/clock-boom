'use client';

import Link from 'next/link'
import React from 'react';
import styles from './faq.module.css';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import global from '../../global.module.css';
import { redirect } from 'next/navigation'

export default function LandingPage() {
  return (
    <div className={global.page}>
      <div className={global.content}>
        <header className={styles.header}>
            <Link className={styles.title} href="/landing_page">
                <div className={styles.logoContainer}>
                    <Image src="/logo.png" alt="Timespark Logo" width={50} height={60} />
                    <h2 className={styles.title}>TIMESPARK</h2>
                </div>
            </Link>
          <div className={styles.action}>
            <button className={`${styles.faq} ${styles.faqHover}`}>FAQ</button>
            <Link href="/login"><button className={`${styles.startButton} ${styles.startButtonHover}`}>LOGIN</button></Link>
          </div>
        </header>
        <div className={styles.mainContent}>
          <div className={styles.textContainer}>
            <span className={styles.inline}>
                <Image src="/question-mark.png" alt="Orange Question Mark" width={50} height={50} />
                <h1 className={styles.mainTitle}>FAQ</h1>
            </span>
            <p className={styles.question}>What is TimeSpark?</p>
            <p className={styles.answer}>TimeSpark is a comprehensive time management and productivity platform designed to help individuals and teams optimize their time, track activities, manage tasks, and streamline scheduling.</p>
            
            <p className={styles.question}>How does TimeSpark differ from other productivity tools?</p>
            <p className={styles.answer}>Unlike traditional time tracking apps, TimeSpark offers a holistic approach by combining activity analysis, calendar management, task tracking, and intelligent meeting scheduling in a single, intuitive platform.</p>

            <p className={styles.question}>How can I start using TimeSpark?</p>
            <p className={styles.answer}>TimeSpark is completely free platform to use. Just sign up using a valid email or via Google, and start boosting your productivity!</p>

            <p className={styles.question}>What is TimeSpark?</p>
            <p className={styles.answer}>TimeSpark is a comprehensive time management and productivity platform designed to help individuals and teams optimize their time, track activities, manage tasks, and streamline scheduling.</p>

          </div>
        </div>
      </div>
    </div>
  );
}