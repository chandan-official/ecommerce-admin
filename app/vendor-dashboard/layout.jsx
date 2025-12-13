/*
 * File: app/vendor-dashboard/layout.jsx
 * This is the Vendor Layout, containing their specific sidebar and header.
 * It wraps all pages inside the /vendor-dashboard folder.
 */

'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './vendor-layout.module.css'; // Use the CSS file

// Import the icons we need for the vendor
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  LogOut,
  Tag,
  BarChart3,
  MessageSquare // --- 1. ADDED THIS ICON ---
} from 'lucide-react';

// --- This object defines the VENDOR sidebar links ---
const navItems = [
  { name: 'Dashboard', href: '/vendor-dashboard', icon: LayoutDashboard },
  { name: 'My Products', href: '/vendor-dashboard/products', icon: Package },
  { name: 'My Orders', href: '/vendor-dashboard/orders', icon: ShoppingBag },
  { name: 'My Coupons', href: '/vendor-dashboard/coupons', icon: Tag },
  { name: 'Analytics', href: '/vendor-dashboard/analytics', icon: BarChart3 },
  { name: 'Support', href: '/vendor-dashboard/support', icon: MessageSquare }, // --- 2. ADDED THIS LINK ---
];

export default function VendorDashboardLayout({ children }) {
  // Get the current URL path
  const pathname = usePathname();

  return (
    <div className={styles.layoutContainer}>
      
      {/* --- Sidebar --- */}
      <aside className={styles.sidebar}>
        
        {/* Logo/Header */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>V</div>
          <span className={styles.logoText}>Vendor Panel</span>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <ul>
            {navItems.map((item) => {
              
              // --- Logic to highlight the active link ---
              const isActive = (item.href === '/vendor-dashboard')
                ? pathname === item.href // Exact match for Dashboard
                : pathname.startsWith(item.href); // startsWith for all others

              const Icon = item.icon; // Get the icon component
              
              return (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    // Apply 'activeLink' style if it's the active page
                    className={isActive ? styles.activeLink : styles.navLink}
                  >
                    <Icon className={styles.navIcon} />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer (Logout) */}
        <div className={styles.sidebarFooter}>
          <Link href="/" className={styles.navLink}>
            <LogOut className={styles.navIcon} />
            Logout
          </Link>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <div className={styles.mainsection}>
        
        {/* Top Header */}
        <header className={styles.header}>
          <p style={{ fontWeight: 600 }}>Welcome Back, Vendor!</p>
        </header>

        {/* This is where the page content will go */}
        <main className={styles.pageWrapper}>
          {children}
        </main>
      </div>
    </div>
  );
}