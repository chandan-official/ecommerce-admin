/*
 * File: app/vendor-dashboard/page.jsx
 * Vendor dashboard – real data only
 */

"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { ShoppingBag, Package } from "lucide-react";
import { api } from "../utils/api";

/* Helper component (UNCHANGED) */
function StatCard({ title, value, icon: Icon, iconBgColor }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statIcon} style={{ backgroundColor: iconBgColor }}>
        <Icon size={28} />
      </div>

      <div className={styles.statInfo}>
        <span className={styles.statLabel}>{title}</span>
        <span className={styles.statValue}>{value}</span>
      </div>
    </div>
  );
}

export default function VendorDashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Fetch products
        const productsRes = await api.getVendorProducts();
        const products = Array.isArray(productsRes)
          ? productsRes
          : productsRes.products || [];

        setProductCount(products.length);

        // Fetch order count ✅
        const orderCountRes = await api.getVendorOrderCount();
        setOrderCount(orderCountRes.counts.total);
      } catch (error) {
        console.error("Failed to load dashboard stats:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Vendor Dashboard</h1>

      <div className={styles.statGrid}>
        {/* Orders */}
        <StatCard
          title="Total Orders"
          value={orderCount}
          icon={ShoppingBag}
          iconBgColor="#8b5cf6"
        />

        {/* Products */}
        <StatCard
          title="Total Products"
          value={productCount}
          icon={Package}
          iconBgColor="#3b82f6"
        />
      </div>
    </div>
  );
}
