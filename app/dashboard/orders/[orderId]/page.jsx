"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import styles from "./order-details.module.css";
import { ArrowLeft, XCircle } from "lucide-react";
import { api } from "@/app/utils/api";

export default function OrderDetailsPage() {
  const { orderId } = useParams();
  const router = useRouter();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ---------------- FETCH ORDER ----------------
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await api.getVendorOrderDetails(orderId);
      setOrder(data);
    } catch (err) {
      setError(err.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) fetchOrder();
  }, [orderId]);

  // ---------------- CANCEL ORDER ----------------
  const handleCancel = async () => {
    if (!confirm("Cancel this order?")) return;

    try {
      await api.updateVendorOrderStatus(orderId, "cancelled");
      await fetchOrder();
      router.push("/dashboard/orders");
    } catch (err) {
      alert(err.message);
    }
  };

  // ---------------- STATES ----------------
  if (loading) return <p>Loading order...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!order) return null;

  // ---------------- RENDER ----------------
  return (
    <div>
      {/* HEADER */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
        <Link href="/dashboard/orders" className={styles.buttonSecondary}>
          <ArrowLeft size={18} />
        </Link>
        <h1>Order #{order._id}</h1>
      </div>

      <div className={styles.pageContainer}>
        {/* LEFT */}
        <div className={styles.mainContent}>
          <div className={styles.card}>
            <h2>Order Items ({order.items.length})</h2>

            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, i) => (
                  <tr key={i}>
                    <td>{item.name}</td>
                    <td>x {item.quantity}</td>
                    <td>₹{item.price}</td>
                    <td>₹{item.price * item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.sidebar}>
          {/* ORDER INFO */}
          <div className={styles.card}>
            <h2>Order Info</h2>

            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Payment:</strong> {order.paymentInfo?.method}
            </p>
            <p>
              <strong>Total Amount:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Placed On:</strong>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* ADDRESS */}
          <div className={styles.card}>
            <h2>Shipping Address</h2>
            <pre style={{ whiteSpace: "pre-wrap" }}>
              {JSON.stringify(order.address, null, 2)}
            </pre>
          </div>

          {/* ACTION */}
          {order.status !== "cancelled" && (
            <button className={styles.buttonDanger} onClick={handleCancel}>
              <XCircle size={18} /> Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
