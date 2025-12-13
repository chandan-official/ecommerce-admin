/*
 * File: app/vendor-dashboard/page.jsx
 * This is the main homepage for the Vendor.
 * It shows stat cards for the vendor.
 */

'use client'; 

// --- THIS IS THE FIX ---
// The page.jsx file should import its own page.module.css file.
import styles from './page.module.css'; 
import { DollarSign, ShoppingBag, Package, Clock } from 'lucide-react';

/* * This is a helper component for a single stat card.
 * It's defined here because only this page uses it.
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


export default function VendorDashboardPage() {
  return (
    <div>
      <h1 className={styles.title}>Vendor Dashboard</h1>
      
      {/* --- Stat Card Grid --- */}
      <div className={styles.statGrid}>
        
        {/* Card 1: Your Revenue */}
        <StatCard 
          title="Your Revenue"
          value="₹42,300"
          icon={DollarSign}
          iconBgColor="#22c55e" /* Green */
        />

        {/* Card 2: New Orders */}
        <StatCard 
          title="New Orders"
          value="12"
          icon={ShoppingBag}
          iconBgColor="#8b5cf6" /* Purple */
        />

        {/* Card 3: Active Products */}
        <StatCard 
          title="Active Products"
          value="58"
          icon={Package}
          iconBgColor="#3b82f6" /* Blue */
        />

        {/* Card 4: Pending Payout */}
        <StatCard 
          title="Pending Payout"
          value="₹15,000"
          icon={Clock}
          iconBgColor="#f97316" /* Orange */
        />
      </div>

    </div>
  );
}