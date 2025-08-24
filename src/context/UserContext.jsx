import { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create the context
export const UserContext = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // user info (not token)
  const [loading, setLoading] = useState(true); // for initial check

  // Check if user is already logged in (via cookie) on app start
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        // Backend endpoint returns user info if cookie is valid
        const res = await axios.get("/api/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        setUser(null); // not logged in
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const signup = async (userData) => {
    try {
      // Sends data to backend
      const res = await axios.post("/api/signup", userData, {
        withCredentials: true,
      });

      // Stores user info locally (context) after successful signup
      setUser(res.data.user);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // Login function
  const login = async (credentials) => {
    try {
      const res = await axios.post("/api/login", credentials, {
        withCredentials: true,
      });
      setUser(res.data.user); // store only user info
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  // Logout function
  const logout = async () => {
    try {
      await axios.post("/api/logout", {}, { withCredentials: true });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Check if user is logged in
  const isLoggedIn = () => !!user;

  // Optional: check role (admin, customer, etc.)
  const hasRole = (role) => user?.role === role;

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isLoggedIn,
        hasRole,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
