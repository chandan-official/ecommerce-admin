"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./coupons.module.css";
import { Plus, Trash2 } from "lucide-react";
import { api } from "../../utils/api.js";

export default function VendorCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch coupons on load
  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await api.getVendorCoupons();

      // If API returns { coupons: [] } or directly []
      const couponList = res.coupons || res || [];

      setCoupons(couponList);
    } catch (err) {
      alert(err.message || "Failed to load coupons");
    } finally {
      setLoading(false);
    }
  };

  // Status helper
  const getStatus = (endDate) => {
    return new Date(endDate) >= new Date() ? "Active" : "Expired";
  };

  const getStatusClass = (status) => {
    if (status === "Active") return styles.statusActive;
    return styles.statusExpired;
  };

  // Delete coupon
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;

    try {
      await api.deleteVendorCoupon(id);
      setCoupons((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete coupon");
    }
  };

  if (loading) {
    return <p>Loading coupons...</p>;
  }

  return (
    <div>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>My Coupons</h1>

        <Link href="/vendor-dashboard/coupons/new" className={styles.addButton}>
          <Plus size={18} />
          Add New Coupon
        </Link>
      </div>

      {/* Table */}
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Type</th>
              <th>Amount / Value</th>
              <th>Category</th>
              <th>Expiry Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {coupons.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No coupons found
                </td>
              </tr>
            ) : (
              coupons.map((coupon) => {
                const status = getStatus(coupon.endDate);

                return (
                  <tr key={coupon._id}>
                    <td>
                      <span className={styles.couponCode}>{coupon.code}</span>
                    </td>

                    <td>
                      {coupon.discountType === "percentage"
                        ? "Percentage"
                        : "Fixed Amount"}
                    </td>

                    <td>
                      {coupon.discountType === "percentage"
                        ? `${coupon.discountValue}%`
                        : `₹${coupon.discountValue}`}
                    </td>

                    <td>{coupon.category}</td>

                    <td>{new Date(coupon.endDate).toLocaleDateString()}</td>

                    <td>
                      <span className={getStatusClass(status)}>{status}</span>
                    </td>

                    <td>
                      <button
                        onClick={() => handleDelete(coupon._id)}
                        className={styles.deleteButton}
                        title="Delete Coupon"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
