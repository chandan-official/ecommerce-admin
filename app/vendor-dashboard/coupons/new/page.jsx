"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./add-coupon.module.css";
import { api } from "../../../utils/api.js";

// Temporary categories (replace later with vendor categories)
const categories = ["All My Products", "Electronics", "Fashion", "Grocery"];

export default function NewCouponPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    couponCode: "",
    category: "All My Products",
    couponType: "fixed", // fixed | percentage
    amount: "",
    expiryDate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const today = new Date().toISOString().split("T")[0];

      const payload = {
        code: formData.couponCode.trim(),
        category: formData.category,

        discountType: formData.couponType, // fixed | percentage
        discountValue: Number(formData.amount),

        startDate: today, // required by backend
        endDate: formData.expiryDate, // expiry = endDate

        createdBy: "vendor", // or vendorId if required
      };

      await api.addVendorCoupon(payload);

      alert("Coupon created successfully!");
      router.push("/vendor-dashboard/coupons");
    } catch (error) {
      alert(error.message || "Failed to create coupon");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>Add New Coupon</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          {/* Coupon Code */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Coupon Code</label>
            <input
              type="text"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              className={styles.input}
              placeholder="e.g., MYSTORE20"
              required
            />
          </div>

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Product Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Coupon Type */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Coupon Type</label>
            <div className={styles.radioGroup}>
              <label>
                <input
                  type="radio"
                  name="couponType"
                  value="percentage"
                  checked={formData.couponType === "percentage"}
                  onChange={handleChange}
                />
                Percentage (%)
              </label>

              <label>
                <input
                  type="radio"
                  name="couponType"
                  value="fixed"
                  checked={formData.couponType === "fixed"}
                  onChange={handleChange}
                />
                Fixed Amount (₹)
              </label>
            </div>
          </div>

          {/* Amount */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              {formData.couponType === "percentage"
                ? "Percentage Value"
                : "Amount in ₹"}
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={styles.input}
              placeholder={
                formData.couponType === "percentage" ? "e.g., 20" : "e.g., 100"
              }
              required
            />
          </div>

          {/* Expiry */}
          <div className={styles.formGroup} style={{ gridColumn: "1 / -1" }}>
            <label className={styles.label}>Expiry Date</label>
            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Buttons */}
        <div className={styles.buttonContainer}>
          <Link
            href="/vendor-dashboard/coupons"
            className={styles.buttonSecondary}
          >
            Cancel
          </Link>

          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Coupon"}
          </button>
        </div>
      </form>
    </div>
  );
}
