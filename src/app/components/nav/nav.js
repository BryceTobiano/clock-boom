'use client'

import { FaSearch, FaCalendar, FaTh, FaChartBar, FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image'; 
import { usePathname } from 'next/navigation';
import styles from './nav.module.css';

export default function Navbar() {
  const pathname = usePathname();
  
  const getIconStyle = (path) => ({
    color: pathname === path ? '#45B681' : '#C0C0C0',
    transition: 'color 0.3s ease',
  });

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar_section}>
        <Link className={styles.navbar_item} href="/dashboard">
          <FaTh
            size={30}
            style={getIconStyle('/dashboard')}
            onMouseEnter={(e) => (e.target.style.color = '#45B681')}
            onMouseLeave={(e) => (e.target.style.color = pathname === '/dashboard' ? '#45B681' : '#C0C0C0')}
          />
        </Link>
        <Link className={styles.navbar_item} href="/calendar">
          <FaCalendar
            size={30}
            style={getIconStyle('/calendar')}
            onMouseEnter={(e) => (e.target.style.color = '#45B681')}
            onMouseLeave={(e) => (e.target.style.color = pathname === '/calendar' ? '#45B681' : '#C0C0C0')}
          />
        </Link>
        <Link className={styles.navbar_item} href="/activity_analysis">
          <FaChartBar
            size={30}
            style={getIconStyle('/activity_analysis')}
            onMouseEnter={(e) => (e.target.style.color = '#45B681')}
            onMouseLeave={(e) => (e.target.style.color = pathname === '/activity_analysis' ? '#45B681' : '#C0C0C0')}
          />
        </Link>
        <Link className={styles.navbar_item} href="/time_finder">
          <FaSearch
            size={30}
            style={getIconStyle('/time_finder')}
            onMouseEnter={(e) => (e.target.style.color = '#45B681')}
            onMouseLeave={(e) => (e.target.style.color = pathname === '/time_finder' ? '#45B681' : '#C0C0C0')}
          />
        </Link>
      </div>
      <div className={styles.navbar_section}>
        <Link className={styles.navbar_item} href="/">
          <Image src="/logo.png" alt="HomeIcon" width={42} height={48} />
        </Link>
      </div>
    </div>
  );
}