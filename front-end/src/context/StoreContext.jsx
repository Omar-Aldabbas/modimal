import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useContext(UserContext);

  // ======================
  // STATE
  // ======================
  const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newItems, setNewItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  // Filters
  const [filters, setFilters] = useState({
    season: null,
    priceMin: null,
    priceMax: null,
    sort: null,
    search: "",
    tags: [],
  });

  // Axios instance
  const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    withCredentials: true,
  });

  // ======================
  // PRODUCTS
  // ======================
  const fetchProducts = async (pageNumber = 1, filterObj = filters) => {
    try {
      setLoading(true);

      const params = {
        page: pageNumber,
        limit,
        season: filterObj.season || undefined,
        sort: filterObj.sort || undefined,
        search: filterObj.search || undefined,
        priceMin: filterObj.priceMin != null ? Number(filterObj.priceMin) : undefined,
        priceMax: filterObj.priceMax != null ? Number(filterObj.priceMax) : undefined,
        tags: filterObj.tags?.length ? filterObj.tags.join(",") : undefined,
      };

      const res = await api.get("/products", { params });
      const data = res.data.data || [];

      setProducts(data);
      setPage(res.data.page || 1);
      setPages(res.data.pages || 1);
      setTotal(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
      setPage(1);
      setPages(1);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  const fetchBestSelling = async () => {
    try {
      const res = await api.get("/products/filters/top-sellers");
      setBestSelling(res.data.data || []);
    } catch (err) {
      console.error("Error fetching best sellers:", err);
      setBestSelling([]);
    }
  };

  const fetchNewItems = async () => {
    try {
      const res = await api.get("/products/filters/new-items");
      setNewItems(res.data.data || []);
    } catch (err) {
      console.error("Error fetching new items:", err);
      setNewItems([]);
    }
  };

  const fetchProductById = async (id) => {
    try {
      const res = await api.get(`/products/${id}`);
      return res.data.data || null;
    } catch (err) {
      console.error("Error fetching product by id:", err);
      return null;
    }
  };

  // Fetch products whenever filters change
  useEffect(() => {
    fetchProducts(1, filters);
  }, [filters]);

  // Fetch best-selling and new items once
  useEffect(() => {
    fetchBestSelling();
    fetchNewItems();
  }, []);

  // ======================
  // WISHLIST
  // ======================
  useEffect(() => {
    if (!user) return;

    const fetchWishlist = async () => {
      try {
        const res = await api.get("/wishlist");
        setWishlist(res.data.data || []);
      } catch (err) {
        console.error("Error fetching wishlist:", err);
      }
    };
    fetchWishlist();
  }, [user]);

  const addToWishlist = async (productId) => {
    if (!user) return alert("Login to add to wishlist");
    try {
      const res = await api.post("/wishlist", { productId });
      setWishlist((prev) => [...prev, res.data.data]);
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!user) return;
    try {
      await api.delete(`/wishlist/${productId}`);
      setWishlist((prev) => prev.filter((p) => p.id !== productId));
    } catch (err) {
      console.error("Error removing from wishlist:", err);
    }
  };

  // ======================
  // CART
  // ======================
  const addToCart = ({ product, variant, quantity = 1 }) => {
    if (!variant && product.variants?.length) variant = product.variants[0];
    if (!variant) return; // no variant to add

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

  const updateQuantity = (id, options = { size: null, color: null }, newQty) => {
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

  // ======================
  // ORDERS
  // ======================
  const placeOrder = async () => {
    if (!user) return alert("Login required to place an order");
    try {
      const res = await api.post("/orders", { items: cart });
      setCart([]);
      return { success: true, order: res.data };
    } catch (err) {
      console.error("Error placing order:", err);
      return { success: false, message: err.response?.data?.message || err.message };
    }
  };

  // ======================
  // CONTEXT VALUE
  // ======================
  return (
    <StoreContext.Provider
      value={{
        products,
        bestSelling,
        newItems,
        cart,
        wishlist,
        loading,
        fetchProducts,
        fetchBestSelling,
        fetchNewItems,
        fetchProductById,
        page,
        pages,
        total,
        limit,
        filters,
        setFilters,
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
