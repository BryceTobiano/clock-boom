'use client'
import styles from "./nav.module.css"
import Link from 'next/link'
import Image from 'next/image'


export default function Navbar() {
    return (
        <>
            <div className={styles.navbar}>
                <div className={styles.navbar_section}>
                    <Link className={styles.navbar_item} href="/dashboard"><Image src={`/icons/dashboard-icon.png`} alt={"Home"} width="30" height="30" /></Link>
                    <Link className={styles.navbar_item} href="/calendar"><Image src={`/icons/calendar-icon.png`} alt={"Calednar"} width="30" height="30" /></Link>
                    <Link className={styles.navbar_item} href="/activity_analysis"><Image src={`/icons/analytics-icon.png`} alt={"Analytics"} width="30" height="30" /></Link>
                    <Link className={styles.navbar_item} href="/time_matcher"><Image src={`/icons/matcher-icon.png`} alt={"Matcher"} width="30" height="30" /></Link>
                    <Link className={styles.navbar_item} href="/time_finder"><Image src={`/icons/finder-icon.png`} alt={"finder"} width="30" height="30" /></Link>
                </div>
                <div className={styles.navbar_section}>   
                    <Link className={styles.navbar_item} href="/"><Image src={`/logo.png`} alt={"HomeIcon"} width="42" height="48" /></Link>
                </div>
            </div>
        </>
    );
}

// <div className={styles.navbar}>
//                 <div>
//                     <div>
//                         <Link href="/dashboard"><Image src={`/icons/dashboard-icon.png`} alt={"Home"} width="32" height="32" /></Link>
//                     </div>
//                     <div>
//                         <Link href="/calendar"><Image src={`/icons/calendar-icon.png`} alt={"Calednar"} width="32" height="32" /></Link>
//                     </div>
//                     <div>
//                         <Link href="/activity_analysis"><Image src={`/icons/analytics-icon.png`} alt={"Analytics"} width="32" height="32" /></Link>
//                     </div>
//                     <div>
//                         <Link href="/time_matcher"><Image src={`/icons/matcher-icon.png`} alt={"Matcher"} width="32" height="32" /></Link>
//                     </div>
//                     <div>
//                         <Link href="/time_finder"><Image src={`/icons/finder-icon.png`} alt={"finder"} width="32" height="32" /></Link>
//                     </div>
//                 </div>
//                 <div>
//                     <div>
//                         <Link href="/">
//                             <Image src={`/icons/logo.png`} alt={"HomeIcon"} style={{marginBottom: -30430, paddingLeft: 5}}width="32" height="32" />
//                         </Link>
//                     </div>
//                 </div>
//             </div>