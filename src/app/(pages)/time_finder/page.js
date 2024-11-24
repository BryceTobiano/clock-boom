'use client';
import React, { useState } from 'react';
import styles from './time_finder.module.css';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
// import calendar from '../../img/calendar.png';
import '../../globals.css';
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';
import TimeFinder1 from '../../time_finder/component/timefinder1';
import TimeFinder2 from '../../time_finder/component/timefinder2';
import TimeFinder3 from '../../time_finder/component/timefinder3';
import TimeFinder4 from '../../time_finder/component/timefinder4';
// import TimeMatcher5 from '../../time_matcher/component/timematcher5';

const TimeFinderPage = () => {
  const [step, setStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState({});
  const [selectedTime, setSelectedTime] = useState(null);

  const handleNext = (data) => {
    if (step === 1) {
      setSelectedUser(data);
      setStep(2);
    } else if (step === 2) {
      setSelectedDate(data);
      setStep(3);
    } else if (step === 3) {
      setSelectedTime(data);
      setStep(4);
    } else if (step === 4) {
      console.log('Meeting request sent:', { selectedUser, selectedDate, selectedTime, ...data });
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
      {step === 1 && <TimeFinder1 onNext={handleNext} />}
      {step === 2 && <TimeFinder2 onNext={handleNext} onBack={handleBack} />}
      {step === 3 && (
        <TimeFinder3
          onNext={handleNext}
          onBack={handleBack}
          selectedCategory={selectedUser}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
        />
      )}
      {step === 4 && (
        <TimeFinder4
          onDashboard={handleDashboard}
          onScheduleAnother={handleScheduleAnother}
        />
      )}
    </div>
  );
};

export default TimeFinderPage;