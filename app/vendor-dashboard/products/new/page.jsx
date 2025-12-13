/*
 * File: app/vendor-dashboard/products/new/page.jsx
 * FIXED: Uses 'productImageurls' key and correct import path.
 */

'use client'; 

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './add-product.module.css';
// --- FIX: Go back 3 levels (new -> products -> vendor-dashboard -> app) ---
import { api } from '../../../utils/api'; 

// Placeholder valid IDs (Ask friend for real ones later)
const categories = [
  { id: '60d5ec49f1b2c8329867c4b1', name: 'Electronics' },
  { id: '60d5ec49f1b2c8329867c4b2', name: 'Fashion' },
  { id: '60d5ec49f1b2c8329867c4b3', name: 'Home & Kitchen' },
];

export default function NewProductPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '60d5ec49f1b2c8329867c4b1', // Default valid ID
    price: '',          
    compareAtPrice: '', 
    currency: 'INR', 
    stock: '',
    sku: '',
    tags: '',
    isActive: true,
    attributes: '', 
  });

  const [productImages, setProductImages] = useState([]);

  const generateSKU = () => {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData(prev => ({ ...prev, sku: `SKU-${random}` }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
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
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('category', formData.category);
    data.append('price', Number(formData.price));
    data.append('compareAtPrice', Number(formData.compareAtPrice));
    data.append('currency', formData.currency); 
    data.append('stock', Number(formData.stock));
    data.append('sku', formData.sku);
    data.append('tags', formData.tags);
    data.append('isActive', formData.isActive);
    data.append('attributes', JSON.stringify({})); 

    // --- CRITICAL FIX: Use 'productImageurls' key ---
    productImages.forEach((file) => {
      data.append('productImageurls', file);
    });

    console.log("Sending Vendor Product Data...");

    try {
      await api.addVendorProduct(data); 
      alert("Product created successfully!");
      router.push('/vendor-dashboard/products');
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.formCard}>
      <h1 className={styles.title}>Add New Product</h1>
      
      <form onSubmit={handleSubmit}>
        <div className={styles.formGrid}>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Product Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className={styles.select}>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Price (Selling)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Compare At Price (MRP)</label>
            <input type="number" name="compareAtPrice" value={formData.compareAtPrice} onChange={handleChange} className={styles.input} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Currency</label>
            <input type="text" name="currency" value={formData.currency} readOnly className={styles.input} style={{backgroundColor: '#f3f4f6'}} />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Stock Quantity</label>
            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className={styles.input} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>SKU</label>
            <div style={{display:'flex', gap:'10px'}}>
              <input type="text" name="sku" value={formData.sku} onChange={handleChange} className={styles.input} required />
              <button type="button" onClick={generateSKU} className={styles.buttonSecondary} style={{marginTop:0}}>Auto</button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Tags</label>
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className={styles.input} placeholder="sale, new" />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select name="isActive" value={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.value === 'true'})} className={styles.select}>
              <option value="true">Active (Published)</option>
              <option value="false">Draft (Hidden)</option>
            </select>
          </div>

          <div className={`${styles.formGroup} ${styles.fullSpan}`}>
            <label className={styles.label}>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className={styles.textarea} rows={5} required />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Product Images (Select Multiple)</label>
            <input 
              type="file" 
              onChange={handleFileChange} 
              className={styles.fileInput} 
              multiple 
              accept="image/png, image/jpeg, image/jpg, application/pdf"
            />
            <p style={{fontSize: '0.8rem', color: '#666', marginTop: '0.5rem'}}>
                {productImages.length} files selected
            </p>
          </div>

        </div>

        <div className={`${styles.buttonContainer} ${styles.fullSpan}`}>
          <Link href="/vendor-dashboard/products" className={styles.buttonSecondary}>
            Cancel
          </Link>
          <button type="submit" className={styles.buttonPrimary} disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  );
}