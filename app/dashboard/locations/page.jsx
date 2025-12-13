/*
 * File: app/dashboard/locations/page.jsx
 * This is the Super Admin's "Location Management" page.
 */

'use client'; 

import { useState } from 'react';
import styles from './locations.module.css';
import { Plus, Trash2, MapPin } from 'lucide-react';

// --- Placeholder Data ---
// Your friend will replace this with data from the database.
const initialLocations = [
  { id: 1, name: 'Mumbai, Maharashtra', pincode: '400001', status: 'Active' },
  { id: 2, name: 'Delhi, NCR', pincode: '110001', status: 'Active' },
  { id: 3, name: 'Bangalore, Karnataka', pincode: '560001', status: 'Active' },
  { id: 4, name: 'Chennai, Tamil Nadu', pincode: '600001', status: 'Disabled' },
];

export default function LocationsPage() {
  
  // State for the list of locations
  const [locations, setLocations] = useState(initialLocations);
  
  // State for the new location form
  const [newName, setNewName] = useState('');
  const [newPincode, setNewPincode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // --- Handle Add Location ---
  const handleAddLocation = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Create a new location object
    const newLocation = {
      id: Math.max(...locations.map(l => l.id), 0) + 1, // Simple ID generation
      name: newName,
      pincode: newPincode,
      status: 'Active'
    };
    
    console.log("Adding new location:", newLocation);
    
    // Your friend will add backend logic here
    // For now, we'll just simulate it and add to our local list
    setTimeout(() => {
      setLocations(currentLocations => [newLocation, ...currentLocations]);
      setNewName('');
      setNewPincode('');
      setIsLoading(false);
    }, 1000);
  };

  // --- Handle Delete Location ---
  const handleDelete = (locationId) => {
    console.log("Deleting location:", locationId);
    if (confirm("Are you sure you want to delete this location?")) {
      // Your friend will add backend logic here
      setLocations(currentLocations => 
        currentLocations.filter(l => l.id !== locationId)
      );
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Location Management</h1>

      <div className={styles.layoutGrid}>
        
        {/* --- 1. "Add New Location" Form --- */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Add New Location</h2>
          </div>
          <div className={styles.cardBody}>
            <form onSubmit={handleAddLocation} className={styles.form}>
              
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>City, State</label>
                <input 
                  type="text" 
                  id="name" 
                  value={newName} 
                  onChange={(e) => setNewName(e.target.value)} 
                  className={styles.input}
                  placeholder="e.g., Bhopal, Madhya Pradesh"
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="pincode" className={styles.label}>Primary Pincode</label>
                <input 
                  type="text" 
                  id="pincode" 
                  value={newPincode} 
                  onChange={(e) => setNewPincode(e.target.value)} 
                  className={styles.input}
                  placeholder="e.g., 462001"
                  required 
                />
              </div>

              <button 
                type="submit" 
                className={styles.button}
                disabled={isLoading}
              >
                {isLoading ? 'Adding...' : 'Add Location'}
              </button>
            </form>
          </div>
        </div>

        {/* --- 2. "Current Locations" List --- */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Current Serviceable Locations ({locations.length})</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.locationList}>
              {locations.map(loc => (
                <div key={loc.id} className={styles.locationItem}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <MapPin size={20} className={loc.status === 'Active' ? styles.statusActive : styles.statusDisabled} />
                    <div className={styles.locationInfo}>
                      <span className={styles.locationName}>{loc.name}</span>
                      <span className={loc.status === 'Active' ? styles.statusActive : styles.statusDisabled}>
                        Pincode: {loc.pincode}
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(loc.id)} 
                    className={styles.deleteButton} 
                    title="Delete Location"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}