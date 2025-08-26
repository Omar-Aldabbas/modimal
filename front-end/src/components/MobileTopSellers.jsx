import { useContext, useEffect, useRef, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const MobileTopSellers = () => {
  const {
    bestSelling,
    addToCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(StoreContext);

  if (!bestSelling || bestSelling.length === 0) return null;

  const mobileTopSellers = bestSelling.slice(0, 8); // max 8 products
  const slidesCount = Math.ceil(mobileTopSellers.length / 2); // 2 cards per slide

  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayRef = useRef();

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev === slidesCount - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev === 0 ? slidesCount - 1 : prev - 1));

  // Auto-play
  useEffect(() => {
    autoPlayRef.current = nextSlide;
  }, [slidesCount]);

  useEffect(() => {
    if (slidesCount > 1) {
      const interval = setInterval(() => autoPlayRef.current(), 7000);
      return () => clearInterval(interval);
    }
  }, [slidesCount]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
  };

  return (
    <div className="md:hidden max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl md:text-5xl text-bold cursor-default text-foreground mb-6">Best Sellers</h2>
        <Link
          to="/products?sort=best-selling"
          className="text-foreground hover:text-primary hover:underline transition-all duration-300 flex items-center justify-center space-x-2"
        >
          View All
        </Link>
      </div>

      <div
        className="relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out mb-2"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {Array.from({ length: slidesCount }).map((_, slideIndex) => {
            const start = slideIndex * 2;
            const pair = mobileTopSellers.slice(start, start + 2);

            return (
              <div key={slideIndex} className="flex-shrink-0 w-full flex gap-2">
                {pair.map((product) => {
                  const isInWishlist = wishlist.includes(product.id);
                  return (
                    <div
                      key={product.id}
                      className="flex flex-col w-1/2 overflow-hidden"
                    >
                      <div className="relative">
                        <Link to={`/products/${product.id}`}>
                          <img
                            src={product.mainPic}
                            alt={product.name}
                            className="w-full h-48 lg:h-56 object-cover"
                          />
                        </Link>

                        <button
                          onClick={() =>
                            isInWishlist
                              ? removeFromWishlist(product.id)
                              : addToWishlist(product.id)
                          }
                          className="absolute top-2 right-2 p-1 transition cursor-pointer"
                        >
                          {isInWishlist ? (
                            <Heart
                              fill="currentColor"
                              className="text-red-500 w-5 h-5"
                            />
                          ) : (
                            <Heart className="text-gray-600 hover:text-red-500 w-5 h-5" />
                          )}
                        </button>
                      </div>

                      <div className="p-3 flex flex-1 justify-between">
                        <div className="flex flex-col gap-2">
                          <h3 className="text-sm font-semibold mb-2 ">
                            {product.name.slice(0, 20).length >= 20 ? product.name.slice(0, 20) + '...' : product.name}
                          </h3>
                          {/* <p className="text-gray-500 text-[12px] mb-2">
                            {product.description.slice(0, 15)}...
                          </p> */}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold mb-2">
                            ${product.price}
                          </span>
                          <button
                            onClick={() =>
                              addToCart({
                                product,
                                variant: product.variants[0],
                                quantity: 1,
                              })
                            }
                            className="relative inline-block text-foreground px-3 py-1 text-xs group overflow-hidden"
                          >
                            <span className="absolute inset-0 bg-primary/90 transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></span>
                            <span className="relative cursor-pointer">Add</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-2">
          {Array.from({ length: slidesCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-primary" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
