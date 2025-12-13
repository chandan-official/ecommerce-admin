/*
 * File: app/dashboard/products/page.jsx
 * FIXED: Admin can view all products and update status.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./products.module.css";
import { Plus, Check, X } from "lucide-react";
import { api } from "../../utils/api";

export default function SuperAdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- Fetch All Products ---
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await api.getAllProductsAdmin(); // Ensure this exists in api.js
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const getStatusClass = (status) => {
    if (status === "Active") return styles.statusPublished;
    if (status === "Blocked") return styles.statusBlocked;
    return styles.statusPending;
  };

  // --- Handle Status Update ---
  const handleStatusUpdate = async (productId, newStatus) => {
    try {
      // Optimistic UI update
      setProducts((current) =>
        current.map((p) =>
          p._id === productId || p.id === productId
            ? { ...p, status: newStatus }
            : p
        )
      );

      // Call backend API
      await api.updateProductStatus(productId, newStatus); // ✅ add this in api.js
    } catch (error) {
      console.error("Failed to update status:", error);
      alert("Failed to update product status");
    }
  };

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Product Management</h1>
        <Link href="/dashboard/products/new" className={styles.addButton}>
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className={styles.tableContainer}>
        {isLoading ? (
          <p style={{ padding: "2rem", textAlign: "center" }}>Loading...</p>
        ) : products.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center" }}>
            No products found.
          </p>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "35%" }}>Product</th>
                <th style={{ width: "20%" }}>Vendor</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "15%" }}>Status</th>
                <th style={{ width: "15%", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const id = product._id || product.id;
                const vendorName =
                  typeof product.vendor === "object"
                    ? product.vendor.name
                    : product.vendor || product.vendorId || "Unknown";

                const status =
                  product.status || (product.isActive ? "Active" : "Pending");

                return (
                  <tr key={id}>
                    <td>
                      <div className={styles.productName}>{product.name}</div>
                      <div className={styles.vendorName}>ID: {id}</div>
                    </td>
                    <td>
                      <span className={styles.vendorName}>{vendorName}</span>
                    </td>
                    <td>₹{product.price?.toLocaleString() || "-"}</td>
                    <td>
                      <span className={getStatusClass(status)}>{status}</span>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <div className={styles.actions}>
                        {status !== "Active" && (
                          <button
                            className={styles.approveButton}
                            onClick={() => handleStatusUpdate(id, "Active")}
                            title="Approve"
                          >
                            <Check size={16} />
                          </button>
                        )}
                        {status !== "Blocked" && (
                          <button
                            className={styles.blockButton}
                            onClick={() => handleStatusUpdate(id, "Blocked")}
                            title="Block"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
