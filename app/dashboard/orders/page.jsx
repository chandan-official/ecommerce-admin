"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./orders.module.css";
import { api } from "@/app/utils/api";

const allStatuses = [
  "pending",
  "confirmed",
  "ready_to_dispatch",
  "shipped",
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
      const data = await api.getAllOrders();
      setOrders(data);
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
      await api.updateOrderStatus(orderId, newStatus);
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      alert(err.message || "Failed to update order");
    }
  };

  // ---------------- STATUS CSS ----------------
  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return styles.statusPending;
      case "confirmed":
        return styles.statusConfirmed;
      case "ready_to_dispatch":
        return styles.statusReady;
      case "shipped":
        return styles.statusShipped;
      case "delivered":
        return styles.statusDelivered;
      case "cancelled":
        return styles.statusCancelled;
      default:
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
                    href={`/dashboard/orders/${order._id}`}
                    className={styles.orderLink}
                  >
                    #{order._id.slice(-6)}
                  </Link>
                </td>

                <td>{new Date(order.createdAt).toLocaleDateString()}</td>

                <td>{order.user?.name || "User"}</td>

                <td>₹{order.totalAmount}</td>

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
