import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./ProductSkelton";

export const ProductsGrid = ({
  products,
  addToCart,
  wishlist,
  addToWishlist,
  removeFromWishlist,
  loading,
}) => {
  if (loading) {
    // Render 6 skeletons while loading
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <p className="text-center py-10 text-foreground">
        No products found.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          addToCart={addToCart}
          wishlist={wishlist}
          addToWishlist={addToWishlist}
          removeFromWishlist={removeFromWishlist}
        />
      ))}
    </div>
  );
};
