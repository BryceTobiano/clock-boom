// import Image from "next/image";
// import styles from "./time_matcher.module.css";

// export default function Home() {
//   return (
//     <div>
//       <main className={styles.main}>
//         <h1>Time Matcher page</h1>
//       </main>

//     </div>
//   );
// }

// src/app/time_matcher/page.js

"use client";  // This line tells Next.js that this is a client-side component

import { useState } from 'react';
import Navbar from '../../components/nav/nav';
import TimeMatcher1 from '../../time_matcher/component/timematcher1';
import TimeMatcher2 from '../../time_matcher/component/timematcher2';
import TimeMatcher3 from '../../time_matcher/component/timematcher3';
import TimeMatcher4 from '../../time_matcher/component/timematcher4';
import TimeMatcher5 from '../../time_matcher/component/timematcher5';

const TimeMatcherPage = () => {
  const [step, setStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState('');
  const [meetingDetails, setMeetingDetails] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = (data) => {
    if (step === 1) {
      setSelectedUser(data);
      setStep(2);
    } else if (step === 2) {
      setMeetingDetails(data);
      setStep(3);
    } else if (step === 3) {
      setSelectedTime(data);
      setStep(4);
    } else if (step === 4) {
      console.log('Meeting request sent:', { selectedUser, meetingDetails, selectedTime, ...data });
      setStep(5);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleDashboard = () => {
    // Implement navigation to dashboard
    console.log('Navigating to dashboard');
  };

  const handleScheduleAnother = () => {
    setStep(1);
  };

  return (
    <div>
      <Navbar />
      {step === 1 && <TimeMatcher1 onNext={handleNext} />}
      {step === 2 && <TimeMatcher2 onNext={handleNext} onBack={handleBack} />}
      {step === 3 && <TimeMatcher3 onNext={handleNext} onBack={handleBack} />}
      {step === 4 && (
        <TimeMatcher4
          onNext={handleNext}
          onBack={handleBack}
          selectedUser={selectedUser}
          meetingDetails={meetingDetails}
          selectedTime={selectedTime}
        />
      )}
      {step === 5 && (
        <TimeMatcher5
          onDashboard={handleDashboard}
          onScheduleAnother={handleScheduleAnother}
        />
      )}
    </div>
  );
};

export default TimeMatcherPage;
