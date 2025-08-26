import { useContext, useEffect, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { MobileTopSellers } from "./MobileTopSellers";
import axios from "axios";

export const TopSellersSection = () => {
  const { addToCart, wishlist, addToWishlist, removeFromWishlist } =
    useContext(StoreContext);

  const [bestSelling, setBestSelling] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopSellers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:3000/api/v1/products", {
          params: { sort: "sales", limit: 8 },
          withCredentials: true,
        });
        setBestSelling(res.data.data);
      } catch (err) {
        console.error("Error fetching top sellers:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTopSellers();
  }, []);

  if (loading)
    return (
      <p className="text-center py-10 text-foreground">
        Loading top sellers...
      </p>
    );
  if (!bestSelling || bestSelling.length === 0) return null;

  const topThree = bestSelling.slice(0, 3);

  return (
    <section className="relative max-w-7xl mx-auto py-6 px-6 mt-10">
      <div className="hidden md:flex flex-col justify-center w-full">
        <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center mb-6">
          <h2 className="text-3xl md:text-5xl text-bold cursor-default text-foreground">
            Best Sellers
          </h2>
          <div className="text-foreground hover:text-primary hover:underline transition-all duration-300">
            <Link
              to="/products?sort=best-selling"
              className="flex items-center justify-center space-x-3 hover:-translate-x-2 transition-all duration-300"
            >
              View All
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topThree.map((product) => {
            const isInWishlist = wishlist.includes(product.id);
            return (
              <div
                key={product.id}
                className="overflow-hidden flex flex-col relative"
              >
                {/* Product Image */}
                <div className="relative">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.mainPic}
                      alt={product.name}
                      className="w-full h-[40vh] lg:h-[60vh] object-cover"
                    />
                  </Link>

                  {/* Wishlist Button */}
                  <button
                    onClick={() =>
                      isInWishlist
                        ? removeFromWishlist(product.id)
                        : addToWishlist(product.id)
                    }
                    className="absolute top-3 right-3 rounded-full p-1 transition cursor-pointer"
                  >
                    {isInWishlist ? (
                      <Heart
                        fill="currentColor"
                        className="text-red-500 w-6 h-6"
                      />
                    ) : (
                      <Heart className="text-gray-600 hover:text-red-500 w-6 h-6" />
                    )}
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4 flex flex-1 justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold mb-3 flex items-center">
                      {product.name}
                      <span
                        className="inline-block rounded-full w-4 h-4 ml-3"
                        style={{ backgroundColor: product.variants[0].color }}
                      ></span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-4">
                      {product.description.slice(0, 25)}...
                    </p>
                  </div>
                  <div className="flex flex-col justify-between items-center">
                    <span className="font-bold text-lg">${product.price}</span>
                    <button
                      onClick={() =>
                        addToCart({
                          product,
                          variant: product.variants[0],
                          quantity: 1,
                        })
                      }
                      className="relative inline-block text-foreground px-4 py-2 group overflow-hidden"
                    >
                      <span className="absolute inset-0 bg-primary transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></span>
                      <span className="relative cursor-pointer">
                        Add to Cart
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <MobileTopSellers />
    </section>
  );
};
