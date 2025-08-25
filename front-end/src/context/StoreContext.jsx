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
  const [loading, setLoading] = useState(true);
  const [promo, setPromo] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:5000/api", // your backend URL
    withCredentials: true,
  });

  // Fetch products and promo on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        // Get all products
        const res = await api.get("/products");
        const allProducts = res.data.data;

        // Sort best selling and newest products
        const best = [...allProducts]
          .sort((a, b) => {
            const aTotal =
              a.variants?.reduce((acc, v) => acc + (v.quantity || 0), 0) || 0;
            const bTotal =
              b.variants?.reduce((acc, v) => acc + (v.quantity || 0), 0) || 0;
            return bTotal - aTotal;
          })
          .slice(0, 4);

        const newest = [...allProducts]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setProducts(allProducts);
        setBestSelling(best);
        setNewProducts(newest);

        // Optional: get promo from backend
        const promoRes = await api.get("/promo");
        setPromo(promoRes.data.promo);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // CART FUNCTIONS
  const addToCart = ({ product, variant, quantity = 1 }) => {
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

  const removeFromCart = ({
    product,
    options = { size: null, color: null },
  }) => {
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

  const placeOrder = async () => {
    if (!user) {
      alert("You must be logged in to place an order!");
      return;
    }

    try {
      const res = await api.post("/orders", { items: cart });
      setCart([]); // clear cart
      return { success: true, order: res.data };
    } catch (err) {
      console.error("Order failed:", err);
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
        loading,
        promo,
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
