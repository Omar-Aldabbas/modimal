import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Trash2, ShoppingCart } from "lucide-react";

export const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, placeOrder } = useContext(StoreContext);

  const handlePlaceOrder = async () => {
    const result = await placeOrder();
    if (result.success) {
      alert("Order placed successfully!");
    } else {
      alert("Failed to place order: " + result.message);
    }
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!cart.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center gap-6 text-center">
        <ShoppingCart size={64} className="text-gray-400" />
        <h2 className="text-3xl font-bold">Your Cart is Empty</h2>
        <Link to="/products" className="text-primary underline text-lg">
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

      <div className="flex flex-col gap-4">
        {cart.map((item) => (
          <div
            key={`${item.id}-${item.size}-${item.color}`}
            className="grid grid-cols-12 items-center gap-2 sm:gap-4 border-b border-gray-300 py-3"
          >
            {/* Image */}
            <Link to={`/products/${item.id}`} className="col-span-4 sm:col-span-3">
              <img
                src={item.mainPic}
                alt={item.title}
                className="w-full h-24 sm:h-32 object-cover border border-gray-300"
              />
            </Link>

            {/* Info */}
            <div className="col-span-8 sm:col-span-5 flex flex-col gap-1">
              <Link to={`/products/${item.id}`} className="hover:underline">
                <h3 className="font-bold text-base sm:text-lg">{item.title}</h3>
              </Link>
              <p className="text-gray-600 text-xs sm:text-sm">Size: {item.size}</p>
              <p className="text-gray-600 text-xs sm:text-sm">Color: {item.color}</p>
              <span className="font-bold text-primary text-sm sm:text-base">${item.price}</span>
            </div>

            {/* Quantity */}
            <div className="col-span-6 sm:col-span-2 flex items-center justify-start gap-1">
              <button
                onClick={() =>
                  updateQuantity(
                    item.id,
                    { size: item.size, color: item.color },
                    Math.max(item.quantity - 1, 1)
                  )
                }
                className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
              >
                -
              </button>
              <span className="text-center w-5 sm:w-6">{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.id, { size: item.size, color: item.color }, item.quantity + 1)
                }
                className="w-7 h-7 sm:w-8 sm:h-8 border border-gray-400 text-gray-700 hover:bg-gray-100 transition"
              >
                +
              </button>
            </div>

            {/* Remove */}
            <div className="col-span-6 sm:col-span-2 flex justify-start sm:justify-center mt-2 sm:mt-0">
              <button
                onClick={() => removeFromCart(item, { size: item.size, color: item.color })}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-red-600 hover:bg-red-50 border border-gray-300 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total & Checkout */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 border-t border-gray-300 pt-4">
        <span className="text-lg sm:text-xl font-bold">Total: ${totalPrice.toFixed(2)}</span>
        <button
          onClick={handlePlaceOrder}
          className="mt-4 sm:mt-0 bg-primary text-white px-6 py-3 font-semibold shadow-md hover:bg-primary/90 transition text-base"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};
