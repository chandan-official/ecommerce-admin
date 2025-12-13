/*
 * File: app/dashboard/coupons/page.jsx
 * This is the Super Admin's "Coupon Management" list page.
 */

'use client'; 

import Link from 'next/link';
import styles from './coupons.module.css';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';

// --- Placeholder Data ---
// Your friend will replace this with data from the database.
const couponData = [
  {
    id: 'c-001',
    code: 'WELCOME30',
    type: 'Percentage',
    amount: 30,
    category: 'All',
    status: 'Active',
    expiry: '2025-12-31',
  },
  {
    id: 'c-002',
    code: 'NEWVENDOR500',
    type: 'Fixed Amount',
    amount: 500,
    category: 'Electronics',
    status: 'Active',
    expiry: '2025-11-30',
  },
  {
    id: 'c-003',
    code: 'OLDCODE',
    type: 'Percentage',
    amount: 10,
    category: 'All',
    status: 'Expired',
    expiry: '2024-01-01',
  },
];

export default function CouponsPage() {

  // --- Helper function to get the correct CSS class for status ---
  const getStatusClass = (status) => {
    if (status === 'Active') return styles.statusActive;
    if (status === 'Expired') return styles.statusExpired;
    return styles.statusExpired; // Default
  };

  // --- Placeholder functions for actions ---
  const handleEdit = (couponId) => {
    console.log("Editing coupon:", couponId);
    alert("Edit page not built yet.");
  };

  const handleDelete = (couponId) => {
    console.log("Deleting coupon:", couponId);
    alert("Delete function not built yet.");
  };

  return (
    <div>
      {/* --- 1. Page Header --- */}
      <div className={styles.header}>
        <h1 className={styles.title}>Coupon Management</h1>
        
        {/* --- 2. "Add New Coupon" Button (links to form) --- */}
        <Link href="/dashboard/coupons/new" className={styles.addButton}>
          <Plus size={18} />
          Add New Coupon
        </Link>
      </div>

      {/* --- 3. Coupon Table --- */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {/* Table Header */}
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Type</th>
              <th>Amount/Value</th>
              <th>Category</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {couponData.map((coupon) => (
              <tr key={coupon.id}>
                
                {/* Coupon Code */}
                <td>
                  <span className={styles.couponCode}>{coupon.code}</span>
                </td>
                
                {/* Type */}
                <td>{coupon.type}</td>
                
                {/* Amount */}
                <td>
                  {coupon.type === 'Percentage' 
                    ? `${coupon.amount}%` 
                    : `₹${coupon.amount.toFixed(2)}`
                  }
                </td>
                
                {/* Category */}
                <td>{coupon.category}</td>
                
                {/* Expiry */}
                <td>{coupon.expiry}</td>

                {/* Status */}
                <td>
                  <span className={getStatusClass(coupon.status)}>
                    {coupon.status}
                  </span>
                </td>
                
                {/* Action Buttons */}
                <td>
                  <div className={styles.actions}>
                    <button 
                      onClick={() => handleEdit(coupon.id)}
                      className={styles.editButton}
                      title="Edit Coupon"
                    >
                      <Pencil size={18} />
                    </button>
                    <button 
                      onClick={() => handleDelete(coupon.id)}
                      className={styles.deleteButton}
                      title="Delete Coupon"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}