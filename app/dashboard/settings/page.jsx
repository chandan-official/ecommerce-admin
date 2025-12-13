/*
 * File: app/dashboard/settings/page.jsx
 * This is the Super Admin's "Settings" page.
 */

'use client'; 

import { useState } from 'react';
import styles from './settings.module.css';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);
  
  // State for form fields
  const [commission, setCommission] = useState('15'); // Default 15%
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // --- Handle Save Settings ---
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    console.log("Saving settings:", { commission });
    // Your friend will add backend logic here

    // Simulate a 2-second API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    alert("Settings saved successfully!");
  };

  // --- Handle Change Password ---
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    setIsLoading(true);
    console.log("Changing password...");
    
    // Your friend will add backend logic here
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsLoading(false);
    alert("Password changed successfully!");
    setPassword('');
    setConfirmPassword('');
  };


  return (
    <div>
      {/* --- 1. Page Header --- */}
      <h1 className={styles.title}>Platform Settings</h1>

      {/* --- 2. Main Settings Card --- */}
      <div className={styles.formCard}>
        
        {/* --- Financial Settings Section --- */}
        <form onSubmit={handleSaveSettings} className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Financials</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="commission" className={styles.label}>
              Default Vendor Commission (%)
            </label>
            <input 
              type="number"
              id="commission"
              className={styles.input}
              value={commission}
              onChange={(e) => setCommission(e.target.value)}
              required
              placeholder="e.g., 15"
            />
            <span className={styles.labelHelp}>
              The percentage you take from every vendor sale.
            </span>
          </div>

          <button 
            type="submit" 
            className={styles.button} 
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Financial Settings'}
          </button>
        </form>

        {/* --- Security Settings Section --- */}
        <form onSubmit={handleChangePassword} className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Security</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>New Password</label>
            <input 
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>Confirm New Password</label>
            <input 
              type="password"
              id="confirmPassword"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            className={styles.button} 
            disabled={isLoading}
          >
            {isLoading ? 'Updating...' : 'Change Password'}
          </button>
        </form>

      </div>
    </div>
  );
}