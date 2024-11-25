// components/TimeMatcher1.js
import { useState } from 'react';
import './TimeMatcher1.css';

const TimeMatcher1 = ({ onNext }) => {
    const [user, setUser] = useState('');

    const handleNext = () => {
        if (typeof onNext === 'function') {
            onNext(user);  // Pass the selected user to the next screen
        } else {
            console.error('onNext is not a function');
        }
    };

    return (
        <div className="time-matcher-container">
            <h1 className="time-matcher-title" style={{ marginLeft: '435px' }}>TIME MATCHER</h1>
            <div className="time-matcher-content">
                <div className="avatar-placeholder"></div>
                <h2>Who do you want to meet with?</h2>
                <input
                    type="text"
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Search friend or coworker..."
                />
                <a href="#" className="invite-link">Can't find them? Invite via email or phone...</a>
                <button
                    onClick={handleNext}
                    disabled={!user.trim()}  // Disable button if input is empty
                >
                    NEXT →
                </button>
            </div>
        </div>
    );
};

export default TimeMatcher1;
