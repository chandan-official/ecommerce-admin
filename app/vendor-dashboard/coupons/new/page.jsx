/*
 * File: app/vendor-dashboard/coupons/new/page.jsx
 * This is the "Add New Coupon" form page for the VENDOR.
 */

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './add-coupon.module.css';

// --- Placeholder Data ---
// Your friend will replace this with a list of *this vendor's* product categories.
const categories = [
  'All My Products',
  'My Electronics',
  'My Apparel',
  'My Home Goods',
];

export default function NewCouponPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State for all form fields
  const [formData, setFormData] = useState({
    couponCode: '',
    category: 'All My Products',
    couponType: 'Percentage', // Default to Percentage
    amount: '',
    expiryDate: '',
  });

  // --- Helper function to update form data ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // --- Handle Final Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Log all the data (your friend will send this to the backend)
    console.log("Submitting New Vendor Coupon:", formData);

    // Simulate a 2-second API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    alert("Coupon created successfully!");
    // Go back to the main coupons list
    router.push('/vendor-dashboard/coupons');
  };

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>Add New Coupon</h1>
      
      <form onSubmit={handleSubmit}>
        
        {/* --- Main Form Grid --- */}
        <div className={styles.formGrid}>
          
          {/* Coupon Code */}
          <div className={styles.formGroup}>
            <label htmlFor="couponCode" className={styles.label}>Coupon Code</label>
            <input 
              type="text" 
              name="couponCode" 
              id="couponCode" 
              value={formData.couponCode} 
              onChange={handleChange} 
              className={styles.input} 
              placeholder="e.g., MYSTORE20"
              required 
            />
          </div>

          {/* Product Category */}
          <div className={styles.formGroup}>
            <label htmlFor="category" className={styles.label}>Product Category</label>
            <select 
              name="category" 
              id="category" 
              value={formData.category} 
              onChange={handleChange} 
              className={styles.select}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Coupon Type (Radio Buttons) */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Coupon Type</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input 
                  type="radio"
                  name="couponType"
                  value="Percentage"
                  checked={formData.couponType === 'Percentage'}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                Percentage (%)
              </label>
              <label className={styles.radioLabel}>
                <input 
                  type="radio"
                  name="couponType"
                  value="Fixed Amount"
                  checked={formData.couponType === 'Fixed Amount'}
                  onChange={handleChange}
                  className={styles.radioInput}
                />
                Fixed Amount (₹)
              </label>
            </div>
          </div>

          {/* Coupon Amount */}
          <div className={styles.formGroup}>
            <label htmlFor="amount" className={styles.label}>
              {formData.couponType === 'Percentage' ? 'Percentage Value' : 'Amount in ₹'}
            </label>
            <input 
              type="number" 
              name="amount" 
              id="amount" 
              value={formData.amount} 
              onChange={handleChange} 
              className={styles.input} 
              placeholder={formData.couponType === 'Percentage' ? "e.g., 20" : "e.g., 100"}
              required 
            />
          </div>

          {/* Expiry Date */}
          <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="expiryDate" className={styles.label}>Expiry Date</label>
            <input 
              type="date" 
              name="expiryDate" 
              id="expiryDate" 
              value={formData.expiryDate} 
              onChange={handleChange} 
              className={styles.input} 
              required 
            />
          </div>

        </div>

        {/* --- Form Actions (Cancel/Save) --- */}
        <div className={`${styles.buttonContainer} ${styles.fullSpan}`}>
          <Link href="/vendor-dashboard/coupons" className={styles.buttonSecondary}>
            Cancel
          </Link>
          <button 
            type="submit" 
            className={styles.buttonPrimary} 
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Coupon'}
          </button>
        </div>
        
      </form>
    </div>
  );
}