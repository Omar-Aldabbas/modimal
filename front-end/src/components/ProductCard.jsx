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
  const hasVariants = product.variants?.length > 0;

  return (
    <div className="flex flex-col overflow-hidden gap-2 shadow-primary">
      {/* IMAGE */}
      <Link to={`/products/${product.id}`} className="relative h-[200px] sm:h-[250px] md:h-[280px] lg:h-[300px]">
        <img
          src={product.mainPic}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            isInWishlist
              ? removeFromWishlist(product.id)
              : addToWishlist(product.id);
          }}
          className="absolute top-2 right-2 p-1 hover:text-white transition cursor-pointer"
        >
          {isInWishlist ? (
            <Heart fill="currentColor" className="text-red-500 w-5 h-5" />
          ) : (
            <Heart className="text-gray-600 hover:text-red-500 w-5 h-5" />
          )}
        </button>
      </Link>

      {/* INFO */}
      <div className="flex flex-col sm:flex-row p-2 gap-2">
        {/* Left - Title & Description */}
        <div className="flex-1 flex flex-col justify-center">
          <Link to={`/products/${product.id}`}>
            <h3 className="text-sm font-semibold mb-1">
              {product.name.length > 20
                ? product.name.slice(0, 20) + "..."
                : product.name}
            </h3>
          </Link>
          <p className="text-gray-500 text-xs">
            {product.description.length > 40
              ? product.description.slice(0, 40) + "..."
              : product.description}
          </p>
        </div>

        {/* Right - Price & Button */}
        <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center gap-2 w-full sm:w-auto">
          <span className="font-bold text-sm">{`$${product.price}`}</span>
          <button
            onClick={() =>
              hasVariants &&
              addToCart({ product, variant: product.variants[0], quantity: 1 })
            }
            disabled={!hasVariants}
            className={`text-xs px-3 py-1 font-semibold relative overflow-hidden transition-all duration-300 ${
              hasVariants
                ? "bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {hasVariants ? "Add" : "Out of Stock"}
          </button>
        </div>
      </div>
    </div>
  );
};
