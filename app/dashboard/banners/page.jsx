/*
 * File: app/dashboard/banners/page.jsx
 * This is the Super Admin's "Banner Management" page.
 */

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import styles from './banners.module.css';
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';

// --- Placeholder Data ---
// Your friend will replace this with data from the database.
const initialBanners = [
  {
    id: 'b-001',
    title: 'Winter Sale 50% Off',
    status: 'Active',
    // We'll use a placeholder icon for now
  },
  {
    id: 'b-002',
    title: 'New Electronics Arrivals',
    status: 'Active',
  },
  {
    id: 'b-003',
    title: 'Holiday Gift Guide (Draft)',
    status: 'Draft',
  },
];

export default function BannersPage() {
  const [banners, setBanners] = useState(initialBanners);

  // --- Helper function to get the correct CSS class for status ---
  const getStatusClass = (status) => {
    if (status === 'Active') return styles.statusActive;
    if (status === 'Draft') return styles.statusDraft;
    return styles.statusDraft; // Default
  };

  // --- Placeholder functions for actions ---
  const handleEdit = (bannerId) => {
    console.log("Editing banner:", bannerId);
    alert("Edit page not built yet.");
  };

  const handleDelete = (bannerId) => {
    console.log("Deleting banner:", bannerId);
    if (confirm("Are you sure you want to delete this banner?")) {
      // Your friend will add the backend logic here
      // For now, we'll just remove it from the list
      setBanners(currentBanners => 
        currentBanners.filter(b => b.id !== bannerId)
      );
    }
  };

  return (
    <div>
      {/* --- 1. Page Header --- */}
      <div className={styles.header}>
        <h1 className={styles.title}>Banner Management</h1>
        
        {/* --- 2. "Add New Banner" Button (links to form) --- */}
        <Link href="/dashboard/banners/new" className={styles.addButton}>
          <Plus size={18} />
          Add New Banner
        </Link>
      </div>

      {/* --- 3. Banner Grid --- */}
      <div className={styles.bannerGrid}>
        {banners.map((banner) => (
          <div key={banner.id} className={styles.bannerCard}>
            
            {/* Image Preview Placeholder */}
            <div className={styles.bannerImage}>
              <ImageIcon size={48} />
            </div>

            {/* Banner Info */}
            <div className={styles.bannerInfo}>
              <h2 className={styles.bannerTitle}>{banner.title}</h2>
              
              {/* Status */}
              <div className={styles.bannerStatus}>
                <span className={getStatusClass(banner.status)}>
                  {banner.status}
                </span>
              </div>

              {/* Action Buttons */}
              <div className={styles.actions}>
                <button 
                  onClick={() => handleEdit(banner.id)}
                  className={styles.editButton}
                  title="Edit Banner"
                >
                  <Pencil size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(banner.id)}
                  className={styles.deleteButton}
                  title="Delete Banner"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}