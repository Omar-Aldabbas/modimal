import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://localhost:5000/api", // <-- your backend URL
    withCredentials: true,
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await api.get("/me"); 
        setUser(res.data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signup = async (userData) => {
    try {
      const res = await api.post("/signup", userData);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const login = async (credentials) => {
    try {
      const res = await api.post("/login", credentials);
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  const logout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isLoggedIn = () => !!user;
  const hasRole = (role) => user?.role === role;

  return (
    <UserContext.Provider
      value={{ user, loading, login, logout, signup, isLoggedIn, hasRole }}
    >
      {children}
    </UserContext.Provider>
  );
};
