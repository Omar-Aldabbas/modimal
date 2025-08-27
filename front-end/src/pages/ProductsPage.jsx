import { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { SearchBar } from "../components/SearchBar";
import { FiltersSidebar } from "../components/FiltersSidebar";
import { ProductsGrid } from "../components/ProductsGrid";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const ProductsPage = () => {
  const {
    products,
    loading,
    fetchProducts,
    filters,
    setFilters,
    page,
    pages,
    addToCart,
    wishlist,
    addToWishlist,
    removeFromWishlist,
  } = useContext(StoreContext);

  const location = useLocation();
  const [localSearch, setLocalSearch] = useState(filters.search || "");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const search = params.get("search") || "";
    const tag = params.get("tag") || "";
    const season = params.get("season") || "";
    const sort = params.get("sort") || "";
    const priceMin = params.get("priceMin") || null;
    const priceMax = params.get("priceMax") || null;
    const pageParam = parseInt(params.get("page")) || 1;

    const newFilters = { search, tag, season, sort, priceMin, priceMax };
    setFilters(newFilters);
    setLocalSearch(search);
    fetchProducts(pageParam, newFilters);
  }, [location.search]);

  const handleApplyFilters = (newFilters) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    fetchProducts(1, updated);
  };

  const handleClearFilters = () => {
    const cleared = { season: null, priceMin: null, priceMax: null, search: "" };
    setFilters(cleared);
    setLocalSearch("");
    fetchProducts(1, cleared);
  };

  const handleSearchSubmit = (searchQuery) => {
    const updated = { ...filters, search: searchQuery };
    setFilters(updated);
    setLocalSearch(searchQuery);
    fetchProducts(1, updated);
  };

  const handleNextPage = () => {
    if (page < pages) {
      fetchProducts(page + 1, filters);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      fetchProducts(page - 1, filters);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <SearchBar value={localSearch} onSearch={handleSearchSubmit} />

      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/4">
          <FiltersSidebar
            filters={filters}
            onApply={handleApplyFilters}
            onClear={handleClearFilters}
          />
        </div>

        <div className="flex-1 flex flex-col">
          {loading ? (
            <p className="text-center text-gray-500 py-10">Loading...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No products found.</p>
          ) : (
            <>
              <ProductsGrid
                products={products}
                addToCart={addToCart}
                wishlist={wishlist}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
              />

              {pages > 1 && (
                <div className="flex justify-center items-center mt-8 gap-6">
                  <button
                    onClick={handlePrevPage}
                    disabled={page === 1}
                    className="flex items-center gap-2 px-4 py-2 border bg-primary hover:bg-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                    <span className="hidden sm:inline text-foreground">Prev</span>
                  </button>

                  <span className="text-sm font-medium">
                    Page <span className="font-semibold">{page}</span> of {pages}
                  </span>

                  <button
                    onClick={handleNextPage}
                    disabled={page === pages}
                    className="flex items-center gap-2 px-4 py-2 border bg-primary hover:bg-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                  >
                    <span className="hidden sm:inline text-foreground">Next</span>
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
