"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./add-product.module.css";
import { api } from "../../../utils/api";

// Placeholder valid IDs
const categories = [
  { id: "60d5ec49f1b2c8329867c4b1", name: "Electronics" },
  { id: "60d5ec49f1b2c8329867c4b2", name: "Fashion" },
  { id: "60d5ec49f1b2c8329867c4b3", name: "Home & Kitchen" },
];

export default function NewProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: categories[0].id,
    price: "",
    compareAtPrice: "",
    currency: "INR",
    stock: "",
    sku: "",
    tags: "",
    isActive: true,
    attributes: "",
  });

  const [productImages, setProductImages] = useState([]);

  // Prefill form if editing
  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const res = await api.getVendorProductById(productId);
        const product = res.product || res;

        setFormData({
          name: product.name,
          description: product.description,
          category:
            product.category?._id || product.category || categories[0].id,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          currency: product.currency || "INR",
          stock: product.stock,
          sku: product.sku,
          tags: product.tags,
          isActive: product.isActive,
          attributes: product.attributes || "",
        });

        setProductImages(product.productImageurls || []);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        alert("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const generateSKU = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData((prev) => ({ ...prev, sku: `SKU-${random}` }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    if (e.target.files) {
      setProductImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key === "attributes") {
        try {
          const attr =
            typeof value === "string" && value.trim() !== ""
              ? JSON.parse(value)
              : {};
          data.append(key, JSON.stringify(attr));
        } catch {
          data.append(key, "{}");
        }
      } else if (key === "tags") {
        // send as CSV string
        data.append(key, value);
      } else {
        data.append(key, value);
      }
    });

    productImages.forEach((file) => {
      if (file instanceof File) data.append("images", file);
    });

    try {
      if (productId) {
        await api.updateVendorProduct(productId, data);
        alert("Product updated successfully!");
      } else {
        await api.addVendorProduct(data);
        alert("Product created successfully!");
      }
      router.push("/vendor-dashboard/products");
    } catch (error) {
      console.error("Failed to save product:", error);
      alert("Failed to save product: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>
        {productId ? "Edit Product" : "Add New Product"}
      </h1>

      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          {/* Product Name */}
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

          {/* Category */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.select}
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Price (Selling)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          {/* Compare At Price */}
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

          {/* Currency */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Currency</label>
            <input
              type="text"
              name="currency"
              value={formData.currency}
              readOnly
              className={styles.input}
              style={{ backgroundColor: "#f3f4f6" }}
            />
          </div>

          {/* Stock */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Stock Quantity</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          {/* SKU */}
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

          {/* Tags */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className={styles.input}
              placeholder="sale, new"
            />
          </div>

          {/* Status */}
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
              <option value="true">Active (Published)</option>
              <option value="false">Draft (Hidden)</option>
            </select>
          </div>

          {/* Description */}
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

          {/* Images */}
          <div className={styles.formGroup}>
            <label className={styles.label}>
              Product Images (Select Multiple)
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className={styles.fileInput}
              multiple
              accept="image/png, image/jpeg, image/jpg, application/pdf"
            />
            <p
              style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
            >
              {productImages.length} files selected
            </p>
          </div>
        </div>

        <div className={`${styles.buttonContainer} ${styles.fullSpan}`}>
          <Link
            href="/vendor-dashboard/products"
            className={styles.buttonSecondary}
          >
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
