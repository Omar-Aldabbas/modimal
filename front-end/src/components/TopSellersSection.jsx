import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronsRight, Heart } from "lucide-react";

export const TopSellersSection = () => {
  const {
    bestSelling,
    addToCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(StoreContext);

  if (!bestSelling || bestSelling.length === 0) return null;

  const topThree = bestSelling.slice(0, 3);

  return (
    <section className="py-12 bg-background">
      <div className="px-6 flex flex-col justify-center w-full">
        <div className="flex flex-col space-y-3 md:flex-row md:justify-between md:items-center px-4  mb-4">
          <h2 className="text-3xl text-center cursor-default">Best Sellers</h2>
          <div className="text-foreground hover:text-primary hover:underline transition-all duration-300 ">
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
                <div className="relative">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.mainPic}
                      alt={product.name}
                      className="w-full h-[60vh] object-cover"
                    />
                  </Link>

                  {/* Heart overlay */}
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

                <div className="p-4 flex flex flex-1 justify-between">
                  <div className="flex flex-col">
                    <h3 className="text-xl font-semibold mb-3">
                      {product.name}
                      <span
                        className="inline-block rounded-full w-4 h-4 ml-3 "
                        style={{ backgroundColor: product.variants[0].color }}
                      ></span>
                    </h3>
                    <p className="text-gray-500 text-sm mb-4 ">
                      {product.description.slice(0, 25)}...
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-col justify-between items-center mb-2">
                      <span className="font-bold text-lg">
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
                        className="relative inline-block text-foreground px-4 py-2 group overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-primary group-hover:translate-x-0 group-hover:translate-y-0 transform -translate-x-full -translate-y-full transition-transform duration-300"></span>
                        <span className="relative cursor-pointer ">
                          Add to Cart
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
