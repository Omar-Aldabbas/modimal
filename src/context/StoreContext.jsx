import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { FakeProducts } from "../data/FakeProducts";

export const StoreContext = createContext();

const avgSales =
  FakeProducts.reduce((acc, curr) => acc + curr.sales, 0) / FakeProducts.length;
const bestSellers = FakeProducts.filter((el) => el.sales > avgSales)
  .sort((a, b) => a.sales - b.sales)
  .slice(0, 4);
const newest = FakeProducts.sort(
  (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
).slice(0, 5);
const fakePromo = "Discount 20% For New Member, ONLY FOR TODAY!!"

export const StoreProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [products, setProducts] = useState([]);
  const [bestSelling, setBestSelling] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [promo, setPromo] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [allRes, bestRes, newRes, promoApi] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/products?sort=sales"),
          axios.get("/api/products?sort=new"),
          axios.get("api/promo")
        ]);
        setProducts(allRes.data);
        setBestSelling(bestRes.data);
        setNewProducts(newRes.data);
        setPromo(promoApi.data)
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setProducts(FakeProducts);
        setBestSelling(bestSellers);
        setNewProducts(newest);
        setPromo(fakePromo)

      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

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
        const newQty = newCart[index].quantity + quantity;
        newCart[index] = {
          ...newCart[index],
          quantity: Math.min(newQty, variant.quantity),
        };
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

  // Remove item from cart
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
      const res = await axios.post(
        "/api/orders",
        { items: cart },
        { withCredentials: true }
      );
      setCart([]); // clear cart after successful order
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
        addToCart,
        removeFromCart,
        updateQuantity,
        placeOrder,
        promo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
