import { useState } from 'react';
import './TimeMatcher4.css';

const TimeMatcher4 = ({ onBack, onNext, selectedUser, meetingDetails, selectedTime }) => {
    const [eventName, setEventName] = useState('');
    const [comments, setComments] = useState('');

    const handleSendRequest = () => {
        if (typeof onNext === 'function') {
            onNext({ eventName, comments });
        } else {
            console.error('onNext is not a function');
        }
    };

    return (
        <div className="time-matcher-container">
            <h1 className="time-matcher-title">TIME MATCHER</h1>
            <div className="time-matcher-content">
                <div className="header-container">
                    <div className="email-icon">✉️</div>
                    <h2>Ready to send this request?</h2>
                </div>
                <div className="request-details">
                    <div className="detail-row">
                        <div className="detail-label">INVITE TO:</div>
                        <div className="detail-value">{selectedUser}</div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">DATE</div>
                        <div className="detail-value">{meetingDetails.date}</div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">TIME</div>
                        <div className="detail-value">{selectedTime}</div>
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">NAME OF EVENT</div>
                        <input
                            type="text"
                            value={eventName}
                            onChange={(e) => setEventName(e.target.value)}
                            placeholder="Optional"
                        />
                    </div>
                    <div className="detail-row">
                        <div className="detail-label">COMMENTS</div>
                        <textarea
                            value={comments}
                            onChange={(e) => setComments(e.target.value)}
                            placeholder="Optional"
                        />
                    </div>
                </div>
                <div className="button-container">
                    <button onClick={onBack} className="back-button">← BACK</button>
                    <button onClick={handleSendRequest} className="send-request-button">
                        SEND REQUEST →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimeMatcher4;
