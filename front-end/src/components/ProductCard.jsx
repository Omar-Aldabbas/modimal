import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

export const ProductCard = ({
  product,
  addToCart,
  wishlist = [],
  addToWishlist,
  removeFromWishlist,
}) => {
  const isInWishlist = wishlist.includes(product.id);

  return (
    <div className="overflow-hidden flex flex-col relative rounded-lg border border-gray-200 bg-card shadow-sm">
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.mainPic}
            alt={product.name}
            className="w-full h-[40vh] lg:h-[60vh] object-cover"
          />
        </Link>

        <button
          onClick={() =>
            isInWishlist
              ? removeFromWishlist(product.id)
              : addToWishlist(product.id)
          }
          className="absolute top-3 right-3 rounded-full p-1 transition cursor-pointer bg-white/70 hover:bg-white"
        >
          {isInWishlist ? (
            <Heart fill="currentColor" className="text-red-500 w-6 h-6" />
          ) : (
            <Heart className="text-gray-600 hover:text-red-500 w-6 h-6" />
          )}
        </button>
      </div>

      <div className="p-4 flex flex-1 justify-between flex-col">
        <div className="flex flex-col">
          <h3 className="text-xl font-semibold mb-2 flex items-center">
            {product.name}
            <span
              className="inline-block rounded-full w-4 h-4 ml-3"
              style={{ backgroundColor: product.variants[0]?.color }}
            ></span>
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            {product.description.slice(0, 50)}...
          </p>
        </div>
        <div className="flex flex-col justify-between items-start">
          <span className="font-bold text-lg">${product.price}</span>
          <button
            onClick={() =>
              addToCart({
                product,
                variant: product.variants[0],
                quantity: 1,
              })
            }
            className="relative inline-block text-foreground px-4 py-2 group overflow-hidden mt-2"
          >
            <span className="absolute inset-0 bg-primary transform -translate-x-full -translate-y-full group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300 rounded-md"></span>
            <span className="relative cursor-pointer">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};
