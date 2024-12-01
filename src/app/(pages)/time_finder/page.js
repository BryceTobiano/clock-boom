'use client';
import React, { useState } from 'react';
import styles from './time_finder.module.css';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../globals.css';
import Navbar from '../../components/nav/nav';
import TimeFinder1 from '../../time_finder/component/timefinder1';
import TimeFinder2 from '../../time_finder/component/timefinder2';
import TimeFinder3 from '../../time_finder/component/timefinder3';
import TimeFinder4 from '../../time_finder/component/timefinder4';

const TimeFinderPage = () => {
  const [step, setStep] = useState(1);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedDate, setSelectedDate] = useState({
    startDate: '',
    endDate: '',
    duration: ''
  });
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState('');

  const handleNext = (data) => {
    if (step === 1) {
      const { startDate, endDate, duration } = data;

      // Check if all required fields are filled
      if (!startDate || !endDate || !duration) {
        setError('Please fill in all date and duration fields');
        return;
      }

      const start = new Date(startDate);
      const end = new Date(endDate);

      // Validate dates
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        setError('Please enter valid dates');
        return;
      }

      if (end <= start) {
        setError('End date must be after start date');
        return;
      }

      setError('');
      setSelectedDate(data);
      setStep(2);
    } else if (step === 2) {
      setSelectedUser(data);
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
    setError('');
    setStep(step - 1);
  };

  const handleDashboard = () => {
    console.log('Navigating to dashboard');
  };

  const handleScheduleAnother = () => {
    // Reset state to Step 1
    setStep(1);
    setSelectedUser('');
    setSelectedDate({
      startDate: '',
      endDate: '',
      duration: ''
    });
    setSelectedTime(null);
    setError('');
  };

  return (
    <div>
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}

      {step === 1 && (
        <TimeFinder1 
          onNext={handleNext} 
          initialData={selectedDate}
        />
      )}
      
      {step === 2 && (
        <TimeFinder2 
          onNext={handleNext} 
          onBack={handleBack}
        />
      )}
      
      {step === 3 && (
        <TimeFinder3 
          onNext={handleNext} 
          onBack={handleBack}
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

