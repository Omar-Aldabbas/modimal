import { useState, useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { SearchBar } from "../components/SearchBar";
import { FiltersSidebar } from "../components/FiltersSidebar";
import { ProductsGrid } from "../components/ProductsGrid";

export const ProductsPage = () => {
  const { products, addToCart, wishlist, addToWishlist, removeFromWishlist } =
    useContext(StoreContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    priceMin: null,
    priceMax: null,
    newest: false,
  });

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    let result = [...products];

    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.priceMin != null) {
      result = result.filter((p) => p.price >= filters.priceMin);
    }
    if (filters.priceMax != null) {
      result = result.filter((p) => p.price <= filters.priceMax);
    }

    if (filters.newest) {
      result = result.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredProducts(result);
  }, [products, searchTerm, filters]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({ priceMin: null, priceMax: null, newest: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <FiltersSidebar
            filters={filters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        <div className="flex-1">
          <ProductsGrid
            products={filteredProducts}
            addToCart={addToCart}
            wishlist={wishlist}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
          />
        </div>
      </div>
    </div>
  );
};
