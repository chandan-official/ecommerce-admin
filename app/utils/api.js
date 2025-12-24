/* File: app/utils/api.js */
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// Attach token
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    if (!config.headers._skipAuth) {
      const role = localStorage.getItem("role");

      let token = null;
      if (role === "admin") token = localStorage.getItem("adminToken");
      if (role === "vendor") token = localStorage.getItem("vendorToken");

      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    delete config.headers._skipAuth;
  }

  // Let Axios handle FormData headers
  if (config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }

  return config;
});

// Generic request handler
const sendRequest = async (method, url, data = null, skipAuth = false) => {
  try {
    const headers = skipAuth ? { _skipAuth: true } : {};

    const response = await apiClient({
      method,
      url,
      headers,
      ...(data !== null && { data }),
    });

    return response.data;
  } catch (err) {
    console.error("❌ API ERROR:", err);
    throw new Error(
      err.response?.data?.message || err.message || "Something went wrong"
    );
  }
};

// API methods
export const api = {
  // Admin
  adminLogin: (data) => sendRequest("POST", "/api/admin/login", data, true),
  getAllProductsAdmin: () => sendRequest("GET", "/api/admin/products"),
  updateProductStatus: (id, status) =>
    sendRequest("PUT", `/api/admin/products/${id}/status`, { status }),
  addProductAdmin: (data) => sendRequest("POST", "/api/admin/products", data),

  // Vendor
  vendorLogin: (data) => sendRequest("POST", "/api/vendor/login", data, true),
  vendorRegister: (data) =>
    sendRequest("POST", "/api/vendor/register", data, true),
  getVendorProfile: () => sendRequest("GET", "/api/vendor/profile"),
  getVendorProducts: () => sendRequest("GET", "/api/vendor/products"),
  getVendorProductById: (id) =>
    sendRequest("GET", `/api/vendor/products/${id}`),

  addVendorProduct: (data) => sendRequest("POST", "/api/vendor/products", data),
  updateVendorProduct: (id, data) =>
    sendRequest("PUT", `/api/vendor/products/${id}`, data),
  deleteVendorProduct: (id) =>
    sendRequest("DELETE", `/api/vendor/products/${id}`),

  // Orders
  getVendorOrders: () => sendRequest("GET", "/api/vendor/orders"),
  getVendorOrderDetails: (id) => sendRequest("GET", `/api/vendor/orders/${id}`),
  updateVendorOrderStatus: (id, status) =>
    sendRequest("PUT", `/api/vendor/orders/${id}/status`, { status }),
  getVendorOrderCount: () => sendRequest("GET", "/api/vendor/orders/count"),

  // Coupons
  getVendorCoupons: () => sendRequest("GET", "/api/coupons/"),
  getVendorCouponById: (id) => sendRequest("GET", `/api/coupons/${id}`),
  addVendorCoupon: (data) => sendRequest("POST", "/api/coupons/", data),
  updateVendorCoupon: (id, data) =>
    sendRequest("PUT", `/api/coupons/${id}`, data),
  deleteVendorCoupon: (id) => sendRequest("DELETE", `/api/coupons/${id}`),
};
