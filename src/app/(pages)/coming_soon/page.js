import React from 'react';
import styles from './coming_soon.module.css';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { David_Libre } from 'next/font/google';


export default function LoginPage() {
  return (
    <div className={`${styles.container} container-fluid d-flex align-items-center justify-content-center min-vh-100`}>
      <div className={styles.loginBox} card p-4 shadow-sm>
        <div className="text-center mb-4">
          <Image src="/logo.png" alt="Time Spark Logo" width={74} height={82} />
          <h1 className="h4 mt-2">TIME SPARK</h1>
        </div>
          <h2>Coming Soon!</h2>
      </div>
    </div>
  );
};
