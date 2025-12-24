/*
 * File: app/vendor-dashboard/products/page.jsx
 * UPDATED: Uses your friend's useEffect logic for secure fetching.
 */

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./products.module.css";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";

// --- FIX: Go back 2 levels (products -> vendor-dashboard -> app) ---
import { api } from "../../utils/api";

export default function VendorProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- YOUR FRIEND'S CODE LOGIC ---
  useEffect(() => {
    // 1. Check for Token
    const token = localStorage.getItem("vendorToken");
    console.log("🔥 Vendor token in browser:", token);

    // 2. Redirect if missing
    if (!token) {
      console.log("❌ No token → redirecting to login");
      router.push("/login");
      return;
    }

    // 3. Fetch Products
    const fetchProducts = async () => {
      try {
        console.log("🔥 Fetching products...");
        const res = await api.getVendorProducts();
        console.log("🔥 PRODUCT RESPONSE:", res);

        // Smart check: backend might return array directly OR { products: [] }
        // Your friend used res.products || [], we add a check for array too just in case
        const productList = Array.isArray(res) ? res : res.products || [];

        setProducts(productList);
      } catch (error) {
        console.error("❌ Failed to load products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [router]);

  // --- Helper Functions ---
  const getStatusClass = (status) => {
    // Check for boolean or string status
    if (status === true || status === "Active" || status === "Published")
      return styles.statusPublished;
    return styles.statusDraft;
  };

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await api.deleteVendorProduct(productId);
        // Remove from UI immediately
        setProducts((curr) =>
          curr.filter((p) => (p._id || p.id) !== productId)
        );
        alert("Product deleted!");
      } catch (error) {
        alert("Failed to delete product: " + error.message);
      }
    }
  };

  const handleEdit = (productId) => {
    router.push(`/vendor-dashboard/products/new?id=${productId}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>My Products</h1>
        <Link
          href="/vendor-dashboard/products/new"
          className={styles.addButton}
        >
          <Plus size={18} /> Add New Product
        </Link>
      </div>

      <div className={styles.tableContainer}>
        {isLoading ? (
          <p style={{ padding: "2rem", textAlign: "center" }}>
            Loading products...
          </p>
        ) : products.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", color: "#666" }}>
            <p>No products found.</p>
            <p style={{ fontSize: "0.9rem", marginTop: "10px" }}>
              Click &quot;Add New Product&quot; to start selling!
            </p>
          </div>
        ) : (
          <table className={styles.table}>
            <thead>
              <tr>
                <th style={{ width: "40%" }}>Product Name</th>
                <th style={{ width: "15%" }}>Price</th>
                <th style={{ width: "15%" }}>Stock</th>
                <th style={{ width: "15%" }}>Status</th>
                <th style={{ width: "15%", textAlign: "center" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id || product.id}>
                  <td>
                    <span className={styles.productName}>{product.name}</span>
                  </td>
                  <td>₹{product.price}</td>
                  <td
                    style={{ color: product.stock === 0 ? "red" : "inherit" }}
                  >
                    {product.stock > 0 ? product.stock : "Out of Stock"}
                  </td>
                  <td>
                    {/* Handle isActive (boolean) or status (string) */}
                    <span className={getStatusClass(product.isActive)}>
                      {product.isActive ? "Active" : "Draft"}
                    </span>
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <div className={styles.actions}>
                      <button
                        onClick={() => handleEdit(product._id || product.id)}
                        className={styles.editButton}
                        title="Edit Product"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id || product.id)}
                        className={styles.deleteButton}
                        title="Delete Product"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
