/* File: app/utils/api.js */
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: false,
});

// Request interceptor for attaching token (skip login)
apiClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    // Skip Authorization for login
    if (!config.headers._skipAuth) {
      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("vendorToken");
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    // Remove internal flag
    delete config.headers._skipAuth;
  }

  // Let Axios handle FormData
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
  getVendorOrders: async () => {
    const res = await sendRequest("GET", "/api/vendor/orders");
    return res.orders || [];
  },
  getVendorOrderDetails: async (id) => {
    const res = await sendRequest("GET", `/api/vendor/orders/${id}`);
    return res.order || res;
  },
  updateVendorOrderStatus: (id, status) =>
    sendRequest("PUT", `/api/vendor/orders/${id}/status`, { status }),

  // Admin
  getAllProductsAdmin: () => sendRequest("GET", "/api/admin/products"),
  updateProductStatus: (id, status) =>
    sendRequest("PUT", `/api/admin/products/${id}/status`, { status }),
  addProductAdmin: (data) => sendRequest("POST", "/api/admin/products", data),
};
