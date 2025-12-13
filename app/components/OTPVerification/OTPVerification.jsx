/*
 * File: app/components/OTPVerification/OTPVerification.jsx
 * A reusable OTP Input component.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './otp.module.css';

export default function OTPVerification({ 
  email = "user@example.com", // The email we sent the code to
  length = 4,                 // How many digits? (4 or 6)
  onVerify,                   // Function to run when user clicks "Verify"
  onResend,                   // Function to run when user clicks "Resend"
  isLoading = false           // Is the API loading?
}) {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  // Focus the first input on load
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Handle typing in a box
  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return; // Only allow numbers

    const newOtp = [...otp];
    // Take the last character entered (in case they type fast)
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle Backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0 && inputRefs.current[index - 1]) {
      // If empty and backspace pressed, move to previous
      inputRefs.current[index - 1].focus();
    }
  };

  // Combine array into string and call parent function
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length === length) {
      onVerify(otpCode);
    } else {
      alert(`Please enter all ${length} digits.`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Verify Your Account</h2>
      <p className={styles.subtitle}>
        We sent a code to <strong>{email}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          {otp.map((value, index) => (
            <input
              key={index}
              ref={(input) => (inputRefs.current[index] = input)}
              type="text"
              value={value}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className={styles.otpBox}
              maxLength={1} // Only 1 digit per box
            />
          ))}
        </div>

        <button 
          type="submit" 
          className={styles.button}
          disabled={isLoading || otp.join("").length !== length}
        >
          {isLoading ? "Verifying..." : "Verify Code"}
        </button>
      </form>

      {onResend && (
        <p className={styles.resendText}>
          Didn't receive the code?{' '}
          <button 
            type="button" 
            onClick={onResend} 
            className={styles.resendLink}
          >
            Resend
          </button>
        </p>
      )}
    </div>
  );
}