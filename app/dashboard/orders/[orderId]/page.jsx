// "use client";

// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { useParams, useRouter } from "next/navigation";
// import { ArrowLeft, XCircle } from "lucide-react";
// import styles from "../[orderId]/orderdetail.module.css";
// import { api } from "../../../utils/api";

// export default function OrderDetailsPage() {
//   const params = useParams();
//   const router = useRouter();

//   // 🔒 Safely extract orderId
//   const orderId =
//     typeof params.orderId === "string" ? params.orderId : params.orderId?.[0];

//   const [order, setOrder] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ---------------- FETCH ORDER ----------------
//   const fetchOrder = async () => {
//     try {
//       setLoading(true);
//       const data = await api.getVendorOrderDetails(orderId);
//       setOrder(data);
//     } catch (err: any) {
//       setError(err.message || "Failed to fetch order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (orderId) fetchOrder();
//   }, [orderId]);

//   // ---------------- CANCEL ORDER ----------------
//   const handleCancel = async () => {
//     if (!confirm("Cancel this order?")) return;

//     try {
//       await api.updateVendorOrderStatus(orderId, "cancelled");
//       router.push("/dashboard/orders");
//     } catch (err: any) {
//       alert(err.message);
//     }
//   };

//   // ---------------- STATES ----------------
//   if (loading) return <p>Loading order...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;
//   if (!order) return null;

//   // ✅ SAFE ARRAY NORMALIZATION (FIX)
//   const orderItems = Array.isArray(order.orderItems) ? order.orderItems : [];

//   const address = order.shippingAddress || {};

//   // ---------------- RENDER ----------------
//   return (
//     <div>
//       {/* HEADER */}
//       <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
//         <Link href="/dashboard/orders" className={styles.buttonSecondary}>
//           <ArrowLeft size={18} />
//         </Link>
//         <h1>Order #{order._id}</h1>
//       </div>

//       <div className={styles.pageContainer}>
//         {/* LEFT */}
//         <div className={styles.mainContent}>
//           <div className={styles.card}>
//             <h2>Order Items ({orderItems.length})</h2>

//             <table className={styles.productTable}>
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Qty</th>
//                   <th>Rate</th>
//                   <th>Total</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {orderItems.map((item: any, i: number) => (
//                   <tr key={i}>
//                     <td>{item.name}</td>
//                     <td>x {item.qty}</td>
//                     <td>₹{item.price}</td>
//                     <td>₹{item.price * item.qty}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className={styles.sidebar}>
//           {/* ORDER INFO */}
//           <div className={styles.card}>
//             <h2>Order Info</h2>

//             <div className={styles.address}>
//               <p>
//                 <strong>{address.fullName}</strong>
//               </p>
//               <p>{address.address}</p>
//               <p>
//                 {address.city}, {address.state} – {address.pincode}
//               </p>
//               <p>📞 {address.phone}</p>
//             </div>

//             <p>
//               <strong>Status:</strong> {order.status}
//             </p>
//             <p>
//               <strong>Payment:</strong> {order.paymentMethod}
//             </p>
//             <p>
//               <strong>Total Amount:</strong> ₹{order.totalPrice}
//             </p>
//             <p>
//               <strong>Placed On:</strong>{" "}
//               {new Date(order.createdAt).toLocaleDateString()}
//             </p>
//           </div>

//           {/* ACTION */}
//           {order.status !== "cancelled" && (
//             <button className={styles.buttonDanger} onClick={handleCancel}>
//               <XCircle size={18} /> Cancel Order
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
