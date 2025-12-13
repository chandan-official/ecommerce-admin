/*
 * File: app/dashboard/banners/new/page.jsx
 * This is the "Add New Banner" form page for the Super Admin.
 */

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './add-banner.module.css';

export default function NewBannerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  // State for form fields
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [status, setStatus] = useState('Draft'); // Default to Draft
  const [image, setImage] = useState(null);

  // --- Helper function for file changes ---
  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  // --- Handle Final Submission ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Log all the data (your friend will send this to the backend)
    console.log("Submitting New Banner:", {
      title,
      link,
      status,
      image: image ? image.name : null,
    });

    // Simulate a 2-second API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsLoading(false);
    alert("Banner created successfully!");
    // Go back to the main banners list
    router.push('/dashboard/banners');
  };

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>Add New Banner</h1>
      
      <form onSubmit={handleSubmit} className={styles.form}>
        
        {/* Banner Title */}
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Banner Title</label>
          <input 
            type="text" 
            name="title" 
            id="title" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            className={styles.input} 
            placeholder="e.g., Winter Sale 50% Off"
            required 
          />
        </div>

        {/* Banner Link */}
        <div className={styles.formGroup}>
          <label htmlFor="link" className={styles.label}>Link (On-click URL)</label>
          <input 
            type="text" 
            name="link" 
            id="link" 
            value={link} 
            onChange={(e) => setLink(e.target.value)} 
            className={styles.input} 
            placeholder="e.g., /products/sale"
            required 
          />
        </div>
        
        {/* Banner Image */}
        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Banner Image</label>
          <input 
            type="file" 
            name="image" 
            id="image" 
            onChange={handleFileChange} 
            className={styles.fileInput} 
            required 
            accept="image/png, image/jpeg, image/webp"
          />
        </div>

        {/* Status */}
        <div className={styles.formGroup}>
          <label htmlFor="status" className={styles.label}>Status</label>
          <select 
            name="status" 
            id="status" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            className={styles.select}
            required
          >
            <option value="Draft">Draft</option>
            <option value="Active">Active</option>
          </select>
        </div>

        {/* --- Form Actions (Cancel/Save) --- */}
        <div className={styles.buttonContainer}>
          <Link href="/dashboard/banners" className={styles.buttonSecondary}>
            Cancel
          </Link>
          <button 
            type="submit" 
            className={styles.buttonPrimary} 
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : 'Save Banner'}
          </button>
        </div>
        
      </form>
    </div>
  );
}