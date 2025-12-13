/*
 * File: app/dashboard/vendors/page.jsx
 * This is the Super Admin's "Vendor Management" page.
 * It shows all vendors, their status, their LIVE status, and actions.
 */

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './vendors.module.css';

// --- THIS IS THE FIX ---
// We must import 'X' and 'Check' here to use them
import { Users, CheckCircle, XCircle, Check, X } from 'lucide-react'; 
// (Note: We imported both XCircle and X, CheckCircle and Check.
// Your code uses 'Check' and 'X', so we'll keep those.)

// --- Placeholder Data ---
const initialVendors = [
  {
    id: 'v1',
    name: 'WatchWorld',
    email: 'contact@watchworld.com',
    products: 15,
    status: 'Active',
    liveStatus: 'Online', 
  },
  {
    id: 'v2',
    name: 'AudioPhile',
    email: 'support@audiophile.io',
    products: 8,
    status: 'Active',
    liveStatus: 'Offline', 
  },
  {
    id: 'v3',
    name: 'TechGlobal',
    email: 'admin@techglobal.net',
    products: 42,
    status: 'Blocked',
    liveStatus: 'Offline', 
  },
  {
    id: 'v4',
    name: 'New Seller Co.',
    email: 'new@seller.com',
    products: 0,
    status: 'Pending',
    liveStatus: 'Offline', 
  },
];

export default function SuperAdminVendorsPage() {
  const router = useRouter();
  // Use state to make the list interactive
  const [vendors, setVendors] = useState(initialVendors);

  // --- Helper function to get the correct CSS class for status ---
  const getStatusClass = (status) => {
    if (status === 'Active') return styles.statusActive;
    if (status === 'Pending') return styles.statusPending;
    if (status === 'Blocked') return styles.statusBlocked;
    return styles.statusPending; // Default
  };

  // --- NEW Helper for Live Status ---
  const getLiveStatus = (liveStatus) => {
    if (liveStatus === 'Online') {
      return (
        <div className={styles.liveStatus}>
          <div className={styles.online}></div>
          <span>Online</span>
        </div>
      );
    }
    return (
      <div className={styles.liveStatus}>
        <div className={styles.offline}></div>
        <span style={{ color: '#9ca3af' }}>Offline</span>
      </div>
    );
  };

  // --- Placeholder functions for actions ---
  const handleApprove = (vendorId) => {
    console.log("Approving vendor:", vendorId);
    setVendors(currentVendors => 
      currentVendors.map(v => 
        v.id === vendorId ? { ...v, status: 'Active' } : v
      )
    );
  };

  const handleBlock = (vendorId, currentStatus) => {
    const newStatus = currentStatus === 'Blocked' ? 'Active' : 'Blocked';
    console.log(`${newStatus} vendor:`, vendorId);
    setVendors(currentVendors => 
      currentVendors.map(v => 
        v.id === vendorId ? { ...v, status: newStatus } : v
      )
    );
  };

  return (
    <div>
      {/* --- 1. Page Header --- */}
      <div className={styles.header}>
        <h1 className={styles.title}>Vendor Management</h1>
        
        {/* --- 2. "Invite" Button --- */}
        <button 
          onClick={() => alert("Invite page not built yet.")}
          className={styles.inviteButton}
        >
          <Users size={18} />
          Invite New Vendor
        </button>
      </div>

      {/* --- 3. Vendor Table --- */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {/* Table Header */}
          <thead>
            <tr>
              <th>Vendor / Email</th>
              <th style={{ width: '10%' }}>Products</th>
              <th style={{ width: '15%' }}>Status</th>
              <th style={{ width: '15%' }}>Live Status</th>
              <th style={{ width: '15%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.id}>
                
                {/* Vendor Name & Email */}
                <td>
                  <div className={styles.vendorName}>{vendor.name}</div>
                  <div className={styles.vendorEmail}>{vendor.email}</div>
                </td>
                
                {/* Product Count */}
                <td>{vendor.products}</td>
                
                {/* Status */}
                <td>
                  <span className={getStatusClass(vendor.status)}>
                    {vendor.status}
                  </span>
                </td>
                
                {/* --- NEW Live Status Column --- */}
                <td>
                  {getLiveStatus(vendor.liveStatus)}
                </td>
                
                {/* Action Buttons */}
                <td style={{ textAlign: 'center' }}>
                  <div className={styles.actions}>
                    
                    {/* Show "Approve" button if status is "Pending" */}
                    {vendor.status === 'Pending' && (
                      <button 
                        onClick={() => handleApprove(vendor.id)}
                        className={styles.approveButton}
                        title="Approve Vendor"
                      >
                        <Check size={16} /> {/* Using Check icon */}
                        Approve
                      </button>
                    )}

                    {/* Show "Block" / "Unblock" button if not pending */}
                    {vendor.status !== 'Pending' && (
                      <button 
                        onClick={() => handleBlock(vendor.id, vendor.status)}
                        className={vendor.status === 'Blocked' ? styles.approveButton : styles.blockButton}
                        title={vendor.status === 'Blocked' ? "Unblock Vendor" : "Block Vendor"}
                      >
                        {/* Using Check and X icons as seen in your error */}
                        {vendor.status === 'Blocked' ? <Check size={16} /> : <X size={16} />}
                        {vendor.status === 'Blocked' ? 'Unblock' : 'Block'}
                      </button>
                    )}

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