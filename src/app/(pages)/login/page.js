import React from 'react';
import styles from './login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from '../../img/logo.png';

const LoginPage = () => {
  return (
    <div className={`${styles.container} container-fluid d-flex align-items-center justify-content-center min-vh-100`}>
      <div className={styles.loginBox} card p-4 shadow-sm>
        <div className="text-center mb-4">
          <Image src="/logo.png" alt="Time Spark Logo" width={74} height={82} />
          <h1 className="h4 mt-2">TIME SPARK</h1>
        </div>
        <form>
          <div className="mb-3">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="mb-3">
            <input type="password" className="form-control" placeholder="Password" />
          </div>
          <div className="text-end mb-3">
            <a href="#" className="text-primary text-decoration-none small">Forgot Password?</a>
          </div>
          <Link href="/dashboard">
            <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
          </Link>
        </form>
        {/* <div className="text-center text-muted my-3">OR</div>
        <button className="btn btn-light w-100 mb-2 d-flex align-items-center justify-content-center">
          <Image src="/google-icon.png" alt="Google Icon" width={20} height={20} className="me-2" />
          Sign in with Google
        </button>
        <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center">
          <Image src="/apple-icon.png" alt="Apple Icon" width={20} height={20} className="me-2" />
          Sign in with Apple
        </button> */}
      </div>
    </div>
  );
};

export default LoginPage;