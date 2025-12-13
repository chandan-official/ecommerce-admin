/*
 * File: app/dashboard/layout.jsx
 * This is the Super Admin Layout, containing the sidebar and header.
 * It wraps all pages inside the /dashboard folder.
 */

// 'use client' is required because usePathname is a hook
'use client'; 

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './dashboard.module.css';

// Import the icons we installed
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  BarChart3,
  Settings,
  LogOut,
  MessageSquare, // For Support
  Tag,           // For Coupons
  Globe,         // For Locations
  Image,         // For Banners
  MessagesSquare // --- 1. ADDED THIS ICON ---
} from 'lucide-react';

// --- This object defines our sidebar links ---
const navItems = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Vendors', href: '/dashboard/vendors', icon: Users },
  { name: 'Coupons', href: '/dashboard/coupons', icon: Tag },
  { name: 'Banners', href: '/dashboard/banners', icon: Image },
  { name: 'Locations', href: '/dashboard/locations', icon: Globe },
  { name: 'Support Tickets', href: '/dashboard/support', icon: MessageSquare },
  { name: 'Live Chat', href: '/dashboard/chat', icon: MessagesSquare }, // --- 2. ADDED THIS LINK ---
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }) {
  // Get the current URL path (e.g., "/dashboard/products")
  const pathname = usePathname();

  return (
    <div className={styles.layoutContainer}>
      
      {/* --- Sidebar --- */}
      <aside className={styles.sidebar}>
        
        {/* Logo/Header */}
        <div className={styles.sidebarHeader}>
          <div className={styles.logoIcon}>A</div>
          <span className={styles.logoText}>Super Admin</span>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <ul>
            {navItems.map((item) => {
              // Check if this link is the active one
              const isActive = pathname === item.href;
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
      <div className={styles.mainContent}>
        
        {/* Top Header (we can add profile pic later) */}
        <header className={styles.header}>
          <p style={{ fontWeight: 600 }}>Welcome Back, Admin!</p>
        </header>

        {/* This is where the page content (e.g., Products) will go */}
        <main className={styles.pageWrapper}>
          {children}
        </main>
      </div>
    </div>
  );
}