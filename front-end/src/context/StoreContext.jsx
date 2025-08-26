import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
  });

  const fetchProducts = async ({
    season,
    tag,
    sort = "newest",
    page = 1,
    limit = 20,
  } = {}) => {
    try {
      setLoading(true);

      const params = {
        ...(season && { season }),
        ...(tag && { tag }),
        sort,
        page,
        limit,
      };

      const res = await api.get("/products", { params });
      const allProducts = res.data.data || [];

      setProducts(allProducts);

      const best = [...allProducts]
        .sort((a, b) => (b.sales || 0) - (a.sales || 0))
        .slice(0, 8);
      setBestSelling(best);

      const newest = [...allProducts]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 5);
      setNewProducts(newest);
    } catch (err) {
      console.error("fetchProducts error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(); // always fetch products on mount
  }, []);

  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist");
        setWishlist(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchWishlist();
  }, [user]);

  const addToCart = ({ product, variant, quantity = 1 }) => {
    if (!variant) variant = product.variants[0];

    setCart((prev) => {
      const index = prev.findIndex(
        (item) =>
          item.id === product.id &&
          item.size === variant.size &&
          item.color === variant.color
      );

      if (index !== -1) {
        const newCart = [...prev];
        newCart[index].quantity = Math.min(
          newCart[index].quantity + quantity,
          variant.quantity
        );
        return newCart;
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.name,
          price: product.price,
          size: variant.size,
          color: variant.color,
          quantity: Math.min(quantity, variant.quantity),
          mainPic: product.mainPic,
        },
      ];
    });
  };

  const removeFromCart = (product, options = { size: null, color: null }) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === product.id &&
            item.size === options.size &&
            item.color === options.color
          )
      )
    );
  };

  const updateQuantity = (
    id,
    options = { size: null, color: null },
    newQty
  ) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id &&
        item.size === options.size &&
        item.color === options.color
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const addToWishlist = async (productId) => {
    if (!user) return alert("Login to add to wishlist");

    try {
      const res = await api.post("/wishlist", { productId });
      setWishlist((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;

    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error(err);
    }
  };

  const placeOrder = async () => {
    if (!user) {
      alert("You must be logged in to place an order!");
      return;
    }

    try {
      const res = await api.post("/orders", { items: cart });
      setCart([]);
      return { success: true, order: res.data };
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.response?.data?.message || err.message,
      };
    }
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        bestSelling,
        newProducts,
        cart,
        wishlist,
        loading,
        fetchProducts,
        addToCart,
        removeFromCart,
        updateQuantity,
        addToWishlist,
        removeFromWishlist,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
