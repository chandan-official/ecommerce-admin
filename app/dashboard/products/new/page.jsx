/*
 * File: app/dashboard/products/new/page.jsx
 * FIXED: Super Admin product creation using createAdminProduct
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./add-product.module.css";
import { api } from "../../../utils/api";

export default function SuperAdminNewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    compareAtPrice: "",
    stock: "",
    sku: "",
    tags: "",
    isActive: true,
    attributes: "{}", // JSON string
  });

  const [productFiles, setProductFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) setProductFiles(Array.from(e.target.files));
  };

  const generateSKU = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData((prev) => ({ ...prev, sku: `SA-${random}` }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("category", formData.category);
      data.append("price", Number(formData.price));
      data.append(
        "compareAtPrice",
        formData.compareAtPrice ? Number(formData.compareAtPrice) : ""
      );
      data.append("stock", Number(formData.stock));
      data.append("sku", formData.sku);
      data.append("tags", formData.tags);
      data.append("isActive", formData.isActive);
      data.append("attributes", formData.attributes);

      productFiles.forEach((file) => {
        data.append("productImageurls", file);
      });

      console.log("Submitting product as Super Admin...");

      await api.addProductAdmin(data); // ✅ Call endpoint for createAdminProduct

      alert("Product created successfully!");
      router.push("dashboard/products");
    } catch (error) {
      console.error("Failed to create product:", error);
      alert("Failed to create product: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>Add New Product (Super Admin)</h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Product Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.input}
              required
              placeholder="Electronics / Fashion / etc."
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Compare At Price (MRP)</label>
            <input
              type="number"
              name="compareAtPrice"
              value={formData.compareAtPrice}
              onChange={handleChange}
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Stock</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>SKU</label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={styles.input}
                required
              />
              <button
                type="button"
                onClick={generateSKU}
                className={styles.buttonSecondary}
                style={{ marginTop: 0 }}
              >
                Auto
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={styles.input}
              placeholder="sale,new"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isActive: e.target.value === "true",
                })
              }
              className={styles.select}
            >
              <option value="true">Active</option>
              <option value="false">Draft</option>
            </select>
          </div>

          <div className={`${styles.formGroup} ${styles.fullSpan}`}>
            <label className={styles.label}>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textarea}
              rows={5}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Product Images / PDF</label>
            <input
              type="file"
              multiple
              accept="image/*,application/pdf"
              onChange={handleFileChange}
              className={styles.fileInput}
            />
            <p
              style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
            >
              {productFiles.length} file(s) selected
            </p>
          </div>
        </div>

        <div className={`${styles.buttonContainer} ${styles.fullSpan}`}>
          <Link href="/dashboard/products" className={styles.buttonSecondary}>
            Cancel
          </Link>
          <button
            type="submit"
            className={styles.buttonPrimary}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
