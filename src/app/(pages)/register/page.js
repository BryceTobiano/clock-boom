'use client'

import React from 'react';
import styles from './login.module.css';
import Image from 'next/image';
import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import { signup } from '@/app/actions/auth'
import { useFormState, useFormStatus } from 'react-dom'

export default function Register() {
  const [state, action] = useFormState(signup, undefined)

  return (
    <div className={`${styles.container} container-fluid d-flex align-items-center justify-content-center min-vh-100`}>
      <div className={styles.loginBox} card p-4 shadow-sm>
        <div className="text-center mb-4">
          <Image src="/logo.png" alt="Time Spark Logo" width={74} height={82} />
          <h1 className="h4 mt-2">TIME SPARK</h1>
          <h2 className="h4 mt-2">Register</h2>
        </div>
        <form action={action}>
          <div className="mb-3">
            <input type="name" name="name" className="form-control" placeholder="Name" />
          </div>
          {state?.errors?.name && <p>{state.errors.name}</p>}

          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" />
          </div>
          {state?.errors?.email && <p>{state.errors.email}</p>}

          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" />
          </div>
          {state?.errors?.password && (
            <div>
              <p>Password must:</p>
              <ul>
                {state.errors.password.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {/* <div className="text-end mb-3">
            <a href="#" className="text-primary text-decoration-none small">Forgot Password?</a>
          </div> */}
          <SubmitButton />
          
        </form>
        <div className="text-center text-muted my-3">OR</div>
        <Link style={{textDecoration: "none"}} href="http://127.0.0.1:8000/api/google/auth">
          <button className="btn btn-light border-1 border-black border-solid w-100 mb-2 d-flex align-items-center justify-content-center">
            <Image src="/icons/google-icon.png" alt="Google Icon" width={20} height={20} className="me-2" />
            Sign in with Google
          </button>
        </Link>
        {/* <button className="btn btn-dark w-100 d-flex align-items-center justify-content-center">
          <Image src="/apple-icon.png" alt="Apple Icon" width={20} height={20} className="me-2" />
          Sign in with Apple
        </button> */}
      </div>
    </div>
  );
};

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button disabled={pending} type="submit" value="Submit" className="btn btn-primary w-100 mb-3">
      Sign Up
    </button>
  )
}