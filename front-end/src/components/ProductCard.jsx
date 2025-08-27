import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const ProductCard = ({
  product,
  wishlist = [],
  addToWishlist,
  removeFromWishlist,
  addToCart,
}) => {
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  return (
    <div className="flex flex-col overflow-hidden hover:shadow-md transition-all duration-300 shadow-primary gap-5  lg:gap-0">
      <div className="relative h-[70%]">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.mainPic}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </Link>

        <button
          onClick={() =>
            isInWishlist
              ? removeFromWishlist(product.id)
              : addToWishlist(product.id)
          }
          className="absolute top-2 right-2 p-1 hover:text-white transition cursor-pointer"
        >
          {isInWishlist ? (
            <Heart fill="currentColor" className="text-red-500 w-5 h-5" />
          ) : (
            <Heart className="text-gray-600 hover:text-red-500 w-5 h-5" />
          )}
        </button>
      </div>

      {/* INFO - 30% */}
      <div className="flex flex-row lg:h-[30%] p-1">
        {/* Left - 75% */}
        <div className="w-3/4 flex flex-col justify-center">
          <h3 className="text-sm font-semibold mb-1 flex items-center">
            {product.name.length > 20
              ? product.name.slice(0, 20) + "..."
              : product.name}
            <span className="inline-block w-3 h-3 ml-2"></span>
          </h3>
          <p className="text-gray-500 text-xs">
            {product.description.length > 40
              ? product.description.slice(0, 40) + "..."
              : product.description}
          </p>
        </div>

        {/* Right - 25% */}
        <div className="w-1/4 flex flex-col justify-center items-center">
          <span className="font-bold text-sm mb-2">${product.price}</span>
          <button
            onClick={() =>
              addToCart({ product, variant: product.variants[0], quantity: 1 })
            }
            className="text-xs px-3 py-1 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold shadow-lg relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:outline-1 -foreground"
          >
            <span className="relative z-10">Add</span>
            <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-40 transition-opacity duration-300"></span>
          </button>
        </div>
      </div>
    </div>
  );
};
