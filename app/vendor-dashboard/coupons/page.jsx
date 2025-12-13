/*
 * File: app/vendor-dashboard/coupons/page.jsx
 * This is the Vendor's "My Coupons" list page.
 */

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import styles from './coupons.module.css';
import { Plus, Pencil, Trash2, Tag } from 'lucide-react';

// --- Placeholder Data ---
// Your friend will replace this with *only* this vendor's coupons.
const vendorCoupons = [
  {
    id: 'v-001',
    code: 'MYSTORE20',
    type: 'Percentage',
    amount: 20,
    category: 'My Products',
    status: 'Active',
    expiry: '2025-12-31',
  },
  {
    id: 'v-002',
    code: 'OLDDEAL',
    type: 'Fixed Amount',
    amount: 100,
    category: 'My Products',
    status: 'Expired',
    expiry: '2024-01-01',
  },
];

export default function VendorCouponsPage() {
  const [coupons, setCoupons] = useState(vendorCoupons);

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
    if (confirm("Are you sure you want to delete this coupon?")) {
      console.log("Deleting coupon:", couponId);
      // Remove from the local list
      setCoupons(currentCoupons => 
        currentCoupons.filter(c => c.id !== couponId)
      );
    }
  };

  return (
    <div>
      {/* --- 1. Page Header --- */}
      <div className={styles.header}>
        <h1 className={styles.title}>My Coupons</h1>
        
        {/* --- 2. "Add New Coupon" Button (links to form) --- */}
        <Link href="/vendor-dashboard/coupons/new" className={styles.addButton}>
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
            {coupons.map((coupon) => (
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