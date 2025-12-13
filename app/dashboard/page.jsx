/*
 * File: app/dashboard/page.jsx
 * This is the main homepage for the Super Admin.
 * It shows the stat cards.
 */

'use client'; // This page doesn't *need* 'use client', but it's good practice
              // if you plan to add interactive charts later.

import styles from './page.module.css';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

/* This is a helper component defined inside the page.
  It's a clean way to build a reusable part for this page only.
*/
function StatCard({ title, value, icon: Icon, iconBgColor }) {
  return (
    <div className={styles.statCard}>
      {/* Icon */}
      <div 
        className={styles.statIcon} 
        style={{ backgroundColor: iconBgColor }}
      >
        <Icon size={28} />
      </div>

      {/* Text Info */}
      <div className={styles.statInfo}>
        <span className={styles.statLabel}>{title}</span>
        <span className={styles.statValue}>{value}</span>
      </div>
    </div>
  );
}


export default function DashboardPage() {
  return (
    <div>
      <h1 className={styles.title}>Super Admin Dashboard</h1>
      
      {/* --- Stat Card Grid --- */}
      <div className={styles.statGrid}>
        
        {/* Card 1: Total Revenue */}
        <StatCard 
          title="Total Revenue"
          value="₹1,20,500"
          icon={DollarSign}
          iconBgColor="#22c55e" /* Green */
        />

        {/* Card 2: Total Orders */}
        <StatCard 
          title="Total Orders"
          value="845"
          icon={ShoppingBag}
          iconBgColor="#8b5cf6" /* Purple */
        />

        {/* Card 3: Total Vendors */}
        <StatCard 
          title="Total Vendors"
          value="32"
          icon={Users}
          iconBgColor="#3b82f6" /* Blue */
        />

        {/* Card 4: Total Products */}
        <StatCard 
          title="Total Products"
          value="1,280"
          icon={Package}
          iconBgColor="#f97316" /* Orange */
        />

      </div>

    </div>
  );
}