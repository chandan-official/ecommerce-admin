/*
 * File: app/register/admin/page.jsx
 * FIXED: Import paths changed from '../../../' to '../../'
 */

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './admin-register.module.css';

// --- FIXED IMPORTS (Only go back 2 levels) ---
import { api } from '../../utils/api'; 
import OTPVerification from '../../components/OTPVerification/OTPVerification';

export default function AdminRegisterPage() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 1: Personal & Login
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '', 
    
    // Address Fields
    street: '',
    colony: '',
    city: '',
    state: '',
    zip: '', 
    
    // Step 2: Shop Details
    shopName: '',
    panNo: '',
    gstNo: '',
    
    // Step 3: Documents
    aadhaarFront: null,
    aadhaarBack: null,
    shopImage: null,
    termsAccepted: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value),
    }));
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1. Construct Address Object
    const addressObject = {
      street: formData.street,
      colony: formData.colony,
      city: formData.city,
      state: formData.state,
      zip: formData.zip,
      isDefault: true
    };

    // 2. Create FormData
    const data = new FormData();

    // Append Fields
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('password', formData.password);
    data.append('shopName', formData.shopName);
    data.append('panNo', formData.panNo);
    data.append('gstNo', formData.gstNo || '');
    data.append('role', 'vendor');
    data.append('isActive', 'false');

    // Handle Address Array
    data.append('addresses', JSON.stringify([addressObject]));

    // Handle Files
    if (formData.aadhaarFront) data.append('aadhaarFront', formData.aadhaarFront);
    if (formData.aadhaarBack) data.append('aadhaarBack', formData.aadhaarBack);
    if (formData.shopImage) {
        data.append('shopImages', formData.shopImage); 
    }

    console.log("Sending FormData to Backend...");

    try {
      const response = await api.vendorRegister(data);
      console.log("Registration Successful:", response);
      
      setIsLoading(false);
      setStep(4); // Move to OTP

    } catch (error) {
      console.error("Registration Error:", error);
      alert("Registration Failed: " + error.message);
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (otpCode) => {
    setIsLoading(true);
    console.log(`Verifying OTP: ${otpCode} for ${formData.email}`);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert("Account Verified! Please Login.");
      router.push('/login'); 
    } catch (error) {
      alert("Invalid OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    alert("Resending OTP...");
  };
  
  const getStepStyle = (currentStep) => {
    if (step > currentStep) return styles.stepCompleted;
    if (step === currentStep) return styles.stepActive;
    return ''; 
  };

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        
        {step === 4 ? (
          <div style={{ padding: '1rem 0' }}>
            <OTPVerification 
              email={formData.email}
              length={4}
              onVerify={handleVerifyOTP}
              onResend={handleResendOTP}
              isLoading={isLoading}
            />
            <button 
                onClick={() => setStep(1)} 
                style={{
                    marginTop: '20px', 
                    background: 'none', 
                    border: 'none', 
                    color: '#6b7280', 
                    textDecoration: 'underline', 
                    cursor: 'pointer',
                    width: '100%'
                }}
            >
                Change Email / Back
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            
            <div className={styles.header}>
              <h1 className={styles.title}>Vendor Registration</h1>
              <p className={styles.subtitle}>
                {step === 1 && 'Step 1: Personal & Login'}
                {step === 2 && 'Step 2: Shop Details'}
                {step === 3 && 'Step 3: Documents'}
              </p>
            </div>

            <div className={styles.progressBar}>
              <div className={`${styles.progressStep} ${getStepStyle(1)}`}>
                <div className={styles.stepCircle}>1</div>
                Personal
              </div>
              <div className={`${styles.progressStep} ${getStepStyle(2)}`}>
                <div className={styles.stepCircle}>2</div>
                Shop
              </div>
              <div className={`${styles.progressStep} ${getStepStyle(3)}`}>
                <div className={styles.stepCircle}>3</div>
                Documents
              </div>
            </div>

            {/* --- Step 1 --- */}
            {step === 1 && (
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.label}>First Name</label>
                  <input type="text" name="firstName" id="firstName" value={formData.firstName} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.label}>Last Name</label>
                  <input type="text" name="lastName" id="lastName" value={formData.lastName} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Email Address</label>
                  <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <input type="tel" name="phone" id="phone" value={formData.phone} onChange={handleChange} className={styles.input} required />
                </div>

                <div className={`${styles.formGroup} ${styles.fullSpan}`}>
                  <label htmlFor="password" className={styles.label}>Password</label>
                  <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className={styles.input} required />
                </div>
                
                <div className={`${styles.formGroup} ${styles.fullSpan}`}>
                  <label htmlFor="street" className={styles.label}>Street Address</label>
                  <input type="text" name="street" id="street" value={formData.street} onChange={handleChange} className={styles.input} placeholder="12, Main Road" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="colony" className={styles.label}>Colony</label>
                  <input type="text" name="colony" id="colony" value={formData.colony} onChange={handleChange} className={styles.input} placeholder="Shiv Colony" required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="city" className={styles.label}>City</label>
                  <input type="text" name="city" id="city" value={formData.city} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="state" className={styles.label}>State</label>
                  <input type="text" name="state" id="state" value={formData.state} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="zip" className={styles.label}>Zip Code</label>
                  <input type="text" name="zip" id="zip" value={formData.zip} onChange={handleChange} className={styles.input} required />
                </div>
              </div>
            )}

            {/* --- Step 2 --- */}
            {step === 2 && (
              <div className={styles.formGrid}>
                <div className={`${styles.formGroup} ${styles.fullSpan}`}>
                  <label htmlFor="shopName" className={styles.label}>Shop Name</label>
                  <input type="text" name="shopName" id="shopName" value={formData.shopName} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="panNo" className={styles.label}>PAN No</label>
                  <input type="text" name="panNo" id="panNo" value={formData.panNo} onChange={handleChange} className={styles.input} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="gstNo" className={styles.label}>GST No</label>
                  <input type="text" name="gstNo" id="gstNo" value={formData.gstNo} onChange={handleChange} className={styles.input} required />
                </div>
              </div>
            )}

            {/* --- Step 3 --- */}
            {step === 3 && (
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="aadhaarFront" className={styles.label}>Aadhaar Front</label>
                  <input type="file" name="aadhaarFront" id="aadhaarFront" onChange={handleChange} className={styles.fileInput} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="aadhaarBack" className={styles.label}>Aadhaar Back</label>
                  <input type="file" name="aadhaarBack" id="aadhaarBack" onChange={handleChange} className={styles.fileInput} required />
                </div>
                <div className={`${styles.formGroup} ${styles.fullSpan}`}>
                  <label htmlFor="shopImage" className={styles.label}>Shop Image</label>
                  <input type="file" name="shopImage" id="shopImage" onChange={handleChange} className={styles.fileInput} required />
                </div>
                <div className={`${styles.formGroup} ${styles.fullSpan} ${styles.checkboxContainer}`}>
                  <label htmlFor="termsAccepted" className={styles.checkboxLabel}>
                    I agree to the <a href="#" target="_blank" style={{color: 'var(--primary-purple)', textDecoration: 'underline'}}>Terms and Conditions</a>.
                  </label>
                  <input 
                    type="checkbox" 
                    name="termsAccepted" 
                    id="termsAccepted" 
                    checked={formData.termsAccepted} 
                    onChange={handleChange} 
                    className={styles.checkbox} 
                    required 
                  />
                </div>
              </div>
            )}

            <div className={styles.buttonContainer}>
              {step > 1 ? (
                <button type="button" className={styles.buttonSecondary} onClick={prevStep}>Back</button>
              ) : (
                <Link href="/login" className={styles.buttonSecondary}>Cancel</Link>
              )}

              {step < 3 ? (
                <button type="button" className={styles.buttonPrimary} onClick={nextStep}>Next</button>
              ) : (
                <button 
                  type="submit" 
                  className={styles.buttonPrimary} 
                  disabled={isLoading || !formData.termsAccepted}
                >
                  {isLoading ? 'Registering...' : 'Register'}
                </button>
              )}
            </div>

          </form>
        )}

      </div>
    </main>
  );
}