// src/context/UserContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({ baseURL: "http://localhost:3000/api/v1" });

  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  const fetchMe = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/me");
      setUser(res.data.data?.user || null);
    } catch (err) {
      console.error("Failed to fetch user:", err);
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchMe();
    else setLoading(false);
  }, [fetchMe]);

  const signup = async (data) => {
    try {
      const res = await api.post("/auth/signup", data);
      localStorage.setItem("token", res.data.token);
      await fetchMe(); 
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Signup failed" };
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post("/auth/login", credentials);
      localStorage.setItem("token", res.data.token);
      await fetchMe(); 
      return { success: true };
    } catch (err) {
      return { success: false, message: err.response?.data?.message || "Login failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  const isLoggedIn = () => !!user;
  const isAdmin = () => user?.role === "admin";

  const fetchAllUsers = async () => {
    if (!isAdmin()) return [];
    try {
      const res = await api.get("/users");
      return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (err) {
      console.error("Failed to fetch users:", err);
      return [];
    }
  };

  const fetchAllProducts = async () => {
    try {
      const res = await api.get("/products");
      return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (err) {
      console.error("Failed to fetch products:", err);
      return [];
    }
  };

  const fetchAllOrders = async () => {
    if (!isAdmin()) return [];
    try {
      const res = await api.get("/orders");
      return Array.isArray(res.data.data) ? res.data.data : [];
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      return [];
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        signup,
        login,
        logout,
        isLoggedIn,
        isAdmin,
        fetchMe,
        fetchAllUsers,
        fetchAllProducts,
        fetchAllOrders,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
