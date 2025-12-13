/*
 * File: app/dashboard/analytics/page.jsx
 * This is the Super Admin's "Analytics" page.
 * It shows placeholders for future charts.
 */

'use client'; 

import styles from './analytics.module.css';
import { BarChart3, PieChart } from 'lucide-react'; // Icons for placeholders

export default function AnalyticsPage() {
  return (
    <div>
      {/* --- 1. Page Header --- */}
      <h1 className={styles.title}>Platform Analytics</h1>

      {/* --- 2. Full-Width Chart (e.g., Sales Over Time) --- */}
      <div className={styles.gridFull}>
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Sales Over Time (Last 30 Days)</h2>
          <div className={styles.chartPlaceholder}>
            <BarChart3 size={32} />
            <span style={{ marginLeft: '1rem' }}>Bar Chart Component Will Go Here</span>
          </div>
        </div>
      </div>
      
      {/* --- 3. Two-Column Charts --- */}
      <div className={styles.grid}>
        
        {/* Chart 1: Revenue by Vendor */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Top 5 Vendors (Revenue)</h2>
          <div className={styles.chartPlaceholder}>
            <PieChart size={32} />
            <span style={{ marginLeft: '1rem' }}>Pie Chart Component Will Go Here</span>
          </div>
        </div>

        {/* Chart 2: Top Products */}
        <div className={styles.chartCard}>
          <h2 className={styles.chartTitle}>Top 5 Products (Units Sold)</h2>
          <div className={styles.chartPlaceholder}>
            <BarChart3 size={32} />
            <span style={{ marginLeft: '1rem' }}>Horizontal Bar Chart Will Go Here</span>
          </div>
        </div>

      </div>
    </div>
  );
}