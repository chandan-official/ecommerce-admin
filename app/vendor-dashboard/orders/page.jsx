"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./orders.module.css";
import { api } from "../../utils/api.js";

const allStatuses = [
  "pending",
  "confirmed",
  "packed",
  "in_transit",
  "delivered",
  "cancelled",
];

export default function SuperAdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- FETCH ALL ORDERS ----------------
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await api.getVendorOrders();

      // ✅ FIX HERE
      setOrders(Array.isArray(data) ? data : data.orders || []);
    } catch (err) {
      setError(err.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ---------------- UPDATE STATUS ----------------
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const res = await api.updateVendorOrderStatus(orderId, newStatus);

      setOrders((prev) => prev.map((o) => (o._id === orderId ? res.order : o)));
    } catch (err) {
      alert(err.message || "Failed to update order");
    }
  };

  // ---------------- STATUS CSS ----------------
  const getStatusClass = (status) => {
    switch (status) {
      case "confirmed":
        return styles.statusConfirmed;
      case "packed":
        return styles.statusPacked;
      case "in_transit":
        return styles.statusInTransit;
      case "delivered":
        return styles.statusDelivered;
      case "cancelled":
        return styles.statusCancelled;
      default:
        "pending";
        return styles.statusPending;
    }
  };

  // ---------------- STATES ----------------
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // ---------------- RENDER ----------------
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Order Management (All)</h1>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <Link
                    href={`/vendor-dashboard/orders/${order._id}`}
                    className={styles.orderLink}
                  >
                    #{order._id.slice(-6)}
                  </Link>
                </td>

                <td>
                  {order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "-"}
                </td>

                <td>{order.user?.name || "User"}</td>

                {/* ✅ FIXED FIELD */}
                <td>₹{order.totalPrice ?? 0}</td>

                <td>
                  <span className={getStatusClass(order.status)}>
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className={styles.statusSelect}
                    disabled={
                      order.status === "delivered" ||
                      order.status === "cancelled"
                    }
                  >
                    {allStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status.replaceAll("_", " ")}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
