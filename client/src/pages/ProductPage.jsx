import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { Heart } from "lucide-react";

export const ProductPage = () => {
  const { id } = useParams();
  const {
    fetchProductById,
    addToCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(StoreContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const numericId = parseInt(id, 10);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await fetchProductById(numericId);
      if (data) {
        setProduct(data);
        setSelectedSize(data.variants?.[0]?.size || null);
        setSelectedColor(data.variants?.[0]?.color || null);
      }
      setLoading(false);
    };
    fetch();
  }, [numericId, fetchProductById]);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!product) return <p className="text-center py-20">Product not found.</p>;

  const images = [product.mainPic, ...(product.pics || [])];
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  console.log(product.variants);

  const selectedVariant =
    product.variants?.find(
      (v) => v.size === selectedSize && v.color === selectedColor
    ) || product.variants?.[0] || null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      <nav className="text-base sm:text-lg flex flex-wrap gap-1 text-gray-500 tracking-wide">
        <Link to="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:underline">
          Shop
        </Link>
        <span>/</span>
        <span className="text-primary font-semibold">{product.name}</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8 px-8">
        <div className="w-full lg:w-1/2 flex flex-col items-center gap-4">
          <div className="w-full md:h-[500px] sm:h-[300px] flex justify-center">
            <img
              src={images[activeImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover lg:object-contain"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-3 h-3 border rounded-full ${
                    index === activeImageIndex
                      ? "border-primary bg-primary"
                      : "border-gray-300 bg-gray-300/40"
                  }`}
                ></button>
              ))}
            </div>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex flex-col gap-5">
          <div className="flex justify-between items-start">
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              {product.name}
            </h1>
            <button
              onClick={() =>
                isInWishlist
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product.id)
              }
              className="p-2 cursor-pointer"
            >
              {isInWishlist ? (
                <Heart fill="currentColor" className="text-red-500 w-6 h-6" />
              ) : (
                <Heart className="text-gray-600 hover:text-red-500 w-6 h-6" />
              )}
            </button>
          </div>

          <p className="text-gray-500 text-sm sm:text-base">
            {product.description}
          </p>

          <span className="text-lg sm:text-xl font-bold text-foreground">
            ${product.price}
          </span>

          {product.variants?.length > 0 && (
            <div className="flex flex-col gap-4">
              <div>
                <p className="font-semibold text-foreground mb-2">Sizes</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(product.variants.map((v) => v.size))).map(
                    (size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-8 h-8 flex items-center justify-center border cursor-pointer text-xs sm:text-sm ${
                          selectedSize === size
                            ? "border-primary bg-primary text-white"
                            : "border-gray-300 text-foreground"
                        }`}
                      >
                        {size}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="font-semibold text-foreground mb-2">Colors</p>
                <div className="flex flex-wrap gap-2">
                  {Array.from(new Set(product.variants.map((v) => v.color))).map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`rounded-full w-8 h-8 border cursor-pointer ${
                          selectedColor === color
                            ? "border-primary"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      ></button>
                    )
                  )}
                </div>
              </div>
            </div>
          )}

          {product.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs border border-gray-300 text-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {selectedVariant && (
            <button
              onClick={() =>
                addToCart({ product, variant: selectedVariant })
              }
              className="mt-4 bg-primary text-white px-6 py-3 font-semibold shadow-lg hover:bg-primary/80 transition text-sm sm:text-base"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
