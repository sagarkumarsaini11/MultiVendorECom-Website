import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Something went wrong";
    return Promise.reject(new Error(message));
  }
);

export default API;

// Auth
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const getMe = () => API.get("/auth/me");

// Products
export const getProducts = (params) => API.get("/products", { params });
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (formData) =>
  API.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const updateProduct = (id, formData) =>
  API.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const getVendorProducts = () => API.get("/products/vendor/my-products");

// Cart
export const getCart = () => API.get("/cart");
export const addToCart = (data) => API.post("/cart/add", data);
export const updateCartItem = (itemId, data) => API.put(`/cart/${itemId}`, data);
export const removeFromCart = (itemId) => API.delete(`/cart/${itemId}`);

// Orders
export const placeOrder = (data) => API.post("/orders", data);
export const getMyOrders = () => API.get("/orders/my-orders");

// Vendor
export const getVendorOrders = () => API.get("/vendor/orders");
export const getVendorStats = () => API.get("/vendor/stats");

// Admin
export const getAdminStats = () => API.get("/admin/stats");
export const getAllUsers = () => API.get("/admin/users");
export const getAllVendors = () => API.get("/admin/vendors");
export const approveVendor = (id) => API.put(`/admin/vendor/approve/${id}`);
export const blockVendor = (id) => API.put(`/admin/vendor/block/${id}`);
export const getAllProducts = () => API.get("/admin/products");
export const getAllOrders = () => API.get("/admin/orders");
