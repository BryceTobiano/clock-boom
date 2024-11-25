import styles from "./dashboard.module.css";
import '../../globals.css';
import global from '../../global.module.css';
import Navbar from '../../components/nav/nav';

export default function Home() {
  return (

    <div className={styles.dashboard}>
      <div><Navbar /></div>

      <div className={styles.header}>
        <h3>Hello, Bo</h3>
        <p className={styles.time}>6:07PM</p>
        <p>Today is Tuesday, September 17th.</p>
      </div>

      <div className={styles.body}>
        <div className={styles.leftColumn}>
          <div className={styles.activity}>
            <h3>ACTIVITY ANALYSIS</h3>
            <div className={styles.pieChart}>
              <img src="/img/pie_chart.jpg" alt="Pie Chart" className={styles.image1} />
            </div>
            <p>Daily Tasks Completed</p>
          </div>

          <div className={styles.activityAnalysis}>
            <h3>ACTIVITY ANALYSIS</h3>
            <div className={styles.barChart}>
              <img src="/img/bar_chart.jpg" alt="Bar Chart" className={styles.image2} />
            </div>
            <p>Work Logged in Last 4 Days</p>
          </div>
        </div>

        <div className={styles.centerColumn}>
          <div className={styles.timeFinder}>
            <h3>TIME FINDER</h3>
            <img src="/img/add_icon.jpg" alt="Add" className={styles.imageline} /><p className={styles.textline} >Find time in my schedule</p>
            <br></br>
            <img src="/img/add_icon.jpg" alt="Add" className={styles.imageline} /><p className={styles.textline} >Set up a meeting</p>
          </div>

          <div className={styles.notes}>
            <h3>NOTES</h3>
            <textarea></textarea>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.calendar}>
            <h3>CALENDAR WEEK VIEW</h3>
            <p className={styles.date}>9/15 - 9/21</p>
            <div className={styles.events}>
              <span>M</span><div className={`${styles.event} ${styles.red}`}>Gym</div>
              <div className={`${styles.event} ${styles.blue}`}>Intern Check In</div>
              <span>T</span><div className={`${styles.event} ${styles.blue}`}>Client Meeting</div>
              <span>W</span><div className={`${styles.event} ${styles.blue}`}>Team Meeting</div>
              <div className={`${styles.event} ${styles.yellow}`}>Walk Dog</div>
              <span>TH</span><div className={`${styles.event} ${styles.yellow}`}>Family Time</div>
              <span>F</span><div className={`${styles.event} ${styles.red}`}>Gym</div>
              <div className={`${styles.event} ${styles.yellow}`}>Walk Dog</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}