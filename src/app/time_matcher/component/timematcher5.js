import './TimeMatcher5.css';

const TimeMatcher5 = ({ onDashboard, onScheduleAnother }) => {
    return (
        <div className="time-matcher-container">
            <h1 className="time-matcher-title">TIME MATCHER</h1>
            <div className="time-matcher-content">
                <div className="success-message">
                    <span className="star-icon">⭐</span>
                    <h2>Request sent! Your calendar has been updated.</h2>
                </div>
                <div className="button-container">
                    <button onClick={onDashboard} className="dashboard-button">← DASHBOARD</button>
                    <button onClick={onScheduleAnother} className="schedule-button">SCHEDULE ANOTHER →</button>
                </div>
            </div>
        </div>
    );
};

export default TimeMatcher5;
