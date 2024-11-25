// components/TimeMatcher2.js
import { useState } from 'react';
import './TimeMatcher2.css';

const TimeMatcher2 = ({ onBack, onNext }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState('');

    const handleNext = () => {
        if (typeof onNext === 'function' && startDate && endDate && duration) {
            onNext({ startDate, endDate, duration });
        } else if (!startDate || !endDate || !duration) {
            console.error('Please fill in all fields');
        } else {
            console.error('onNext is not a function');
        }
    };

    return (
        <div className="time-matcher-container">
            <h1 className="time-matcher-title">TIME MATCHER</h1>
            <div className="time-matcher-content">
                <div className="header-container">
                    <div className="calendar-icon">31</div>
                    <h2>What dates do you want to meet?</h2>
                </div>
                <div className="date-inputs">
                    <div className="date-input">
                        <label>START DATE</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </div>
                    <div className="date-input">
                        <label>END DATE</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                    <div className="date-input">
                        <label>DURATION</label>
                        <select
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="30">30 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="90">1.5 hours</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={onBack} className="back-button">← BACK</button>
                    <button 
                        onClick={handleNext} 
                        className="next-button"
                        disabled={!startDate || !endDate || !duration}
                    >
                        NEXT →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeMatcher2;
