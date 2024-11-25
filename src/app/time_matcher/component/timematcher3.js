import { useState } from 'react';
import './TimeMatcher3.css';

const TimeMatcher3 = ({ onBack, onNext }) => {
    const [selectedTime, setSelectedTime] = useState(null);

    const handleNext = () => {
        if (typeof onNext === 'function' && selectedTime) {
            onNext(selectedTime);
        } else if (!selectedTime) {
            console.error('Please select a time');
        } else {
            console.error('onNext is not a function');
        }
    };

    const timeSlots = [
        { day: 'MONDAY', date: '10/16', time: '2:00 - 2:30 PM' },
        { day: 'MONDAY', date: '10/16', time: '4:30 - 5:00 PM' },
        { day: 'WEDNESDAY', date: '10/18', time: '10:00 - 10:30 AM' },
    ];

    return (
        <div className="time-matcher-container">
            <h1 className="time-matcher-title">TIME MATCHER</h1>
            <div className="time-matcher-content">
                <div className="header-container">
                    <div className="star-icon">⭐</div>
                    <h2>Matches found! You're both available at these times:</h2>
                </div>
                <div className="time-slots">
                    {timeSlots.map((slot, index) => (
                        <div 
                            key={index} 
                            className={`time-slot ${selectedTime === index ? 'selected' : ''}`}
                            onClick={() => setSelectedTime(index)}
                        >
                            <input 
                                type="radio" 
                                checked={selectedTime === index} 
                                onChange={() => setSelectedTime(index)} 
                            />
                            <div className="slot-details">
                                <div className="day">{slot.day}</div>
                                <div className="date">{slot.date}</div>
                                <div className="time">{slot.time}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="button-container">
                    <button onClick={onBack} className="back-button">← BACK</button>
                    <button 
                        onClick={handleNext} 
                        className="next-button"
                        disabled={selectedTime === null}
                    >
                        NEXT →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeMatcher3;
