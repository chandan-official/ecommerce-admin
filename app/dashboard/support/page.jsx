/*
 * File: app/dashboard/support/page.jsx
 * This is the Super Admin's "Support Ticket" management page.
 */

'use client'; 

import { useState } from 'react';
import styles from './support.module.css';
import { Eye } from 'lucide-react';

// --- Placeholder Data ---
// Your friend will replace this with data from the database.
const initialTickets = [
  {
    id: 'T-001',
    subject: "My order is delayed",
    user: "Rohan Sharma (Customer)",
    status: "Open",
    lastUpdate: "2 hours ago",
  },
  {
    id: 'T-002',
    name: "Vendor 'AudioPhile' (Vendor)",
    subject: "Payout issue",
    user: "AudioPhile (Vendor)",
    status: "Pending",
    lastUpdate: "1 day ago",
  },
  {
    id: 'T-003',
    name: "TechGlobal (Vendor)",
    subject: "Question about product approval",
    user: "TechGlobal (Vendor)",
    status: "Closed",
    lastUpdate: "3 days ago",
  },
];

export default function SupportPage() {
  const [tickets, setTickets] = useState(initialTickets);

  // --- Helper function to get the correct CSS class for status ---
  const getStatusClass = (status) => {
    if (status === 'Open') return styles.statusOpen;
    if (status === 'Pending') return styles.statusPending;
    if (status === 'Closed') return styles.statusClosed;
    return styles.statusPending; // Default
  };

  // --- Placeholder functions for actions ---
  const handleView = (ticketId) => {
    console.log("Viewing ticket:", ticketId);
    alert("View ticket page not built yet.");
  };

  // --- Calculate stats ---
  const openTickets = tickets.filter(t => t.status === 'Open').length;
  const pendingTickets = tickets.filter(t => t.status === 'Pending').length;
  const closedTickets = tickets.filter(t => t.status === 'Closed').length;

  return (
    <div>
      {/* --- 1. Page Header --- */}
      <h1 className={styles.title}>Support Ticket Center</h1>

      {/* --- 2. Stat Cards --- */}
      <div className={styles.statGrid}>
        <div className={styles.statCard}>
          <span className={styles.statValueOpen}>{openTickets}</span>
          <span className={styles.statLabel}>New / Open</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValuePending}>{pendingTickets}</span>
          <span className={styles.statLabel}>Pending Response</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValueClosed}>{closedTickets}</span>
          <span className={styles.statLabel}>Resolved / Closed</span>
        </div>
      </div>

      {/* --- 3. Tickets Table --- */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {/* Table Header */}
          <thead>
            <tr>
              <th style={{ width: '40%' }}>Subject</th>
              <th style={{ width: '20%' }}>From</th>
              <th style={{ width: '15%' }}>Status</th>
              <th style={{ width: '15%' }}>Last Update</th>
              <th style={{ width: '10%', textAlign: 'center' }}>Action</th>
            </tr>
          </thead>
          
          {/* Table Body */}
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                
                {/* Subject & ID */}
                <td>
                  <div className={styles.ticketSubject}>{ticket.subject}</div>
                  <div className={styles.ticketUser}>ID: {ticket.id}</div>
                </td>
                
                {/* User */}
                <td>{ticket.user}</td>
                
                {/* Status */}
                <td>
                  <span className={getStatusClass(ticket.status)}>
                    {ticket.status}
                  </span>
                </td>
                
                {/* Last Update */}
                <td>{ticket.lastUpdate}</td>

                {/* Action Button */}
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => handleView(ticket.id)}
                    className={styles.viewButton}
                    title="View Ticket"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}