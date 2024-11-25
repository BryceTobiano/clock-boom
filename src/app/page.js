import styles from "./page.module.css";
import { redirect } from 'next/navigation'

export default function Home() {
  redirect(`/login`) 
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Home page</h1>
        
      </main>
    </div>
  );
}
