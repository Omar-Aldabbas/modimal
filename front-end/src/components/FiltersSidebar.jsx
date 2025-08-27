import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FiltersSidebar = ({ filters, onApply, onClear }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});
  const [mobileOpen, setMobileOpen] = useState(false);

  const seasons = ["Spring", "Summer", "Autumn", "Winter"];

  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);

  const handleChange = (key, value) => {
    if (key === "priceMin" || key === "priceMax") {
      setLocalFilters((prev) => ({
        ...prev,
        [key]: value !== "" && !isNaN(value) ? Number(value) : null,
      }));
    } else {
      setLocalFilters((prev) => ({ ...prev, [key]: value }));
    }
  };

  const toggleSeason = (season) => {
    handleChange("season", localFilters.season === season ? null : season);
  };

  const setSort = (sortType) => {
    handleChange("sort", sortType);
  };

  const handleClear = () => {
    const cleared = {
      season: null,
      priceMin: null,
      priceMax: null,
      sort: null,
    };
    setLocalFilters(cleared);
    onClear();
  };

  return (
    <div className="w-full lg:max-w-xs border border-gray-200 p-4 space-y-4">
      {/* Mobile / iPad toggle */}
      <div
        className="lg:hidden flex justify-between items-center cursor-pointer"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <h3 className="text-xl font-bold text-foreground">Filters</h3>
        {mobileOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>

      {/* Filters Content */}
      <div
        className={`${
          mobileOpen ? "block" : "hidden"
        } lg:block space-y-6 transition-all duration-300`}
      >
        {/* Season Tags */}
        <div>
          <p className="text-sm text-foreground mb-2 font-semibold">Season</p>
          <div className="flex flex-wrap gap-2">
            {seasons.map((season) => (
              <button
                key={season}
                onClick={() => toggleSeason(season)}
                className={`px-3 py-1 text-sm border rounded ${
                  localFilters.season === season
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {season}
              </button>
            ))}
          </div>
        </div>

        {/* Price Inputs */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-foreground">Price Min</label>
          <input
            type="number"
            min={0}
            value={localFilters.priceMin ?? ""}
            onChange={(e) => handleChange("priceMin", e.target.value)}
            className="w-full border border-gray-300 px-3 py-1 text-sm rounded"
            placeholder="Min"
          />
          <label className="text-sm font-semibold text-foreground">Price Max</label>
          <input
            type="number"
            min={0}
            value={localFilters.priceMax ?? ""}
            onChange={(e) => handleChange("priceMax", e.target.value)}
            className="w-full border border-gray-300 px-3 py-1 text-sm rounded"
            placeholder="Max"
          />
        </div>

        {/* Sort Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-foreground">Sort By</p>
          <button
            onClick={() => setSort("newest")}
            className={`px-3 py-1 text-sm border rounded ${
              localFilters.sort === "newest"
                ? "bg-primary text-white border-primary"
                : "border-gray-300 text-gray-700"
            }`}
          >
            Newest
          </button>
          <button
            onClick={() => setSort("oldest")}
            className={`px-3 py-1 text-sm border rounded ${
              localFilters.sort === "oldest"
                ? "bg-primary text-white border-primary"
                : "border-gray-300 text-gray-700"
            }`}
          >
            Oldest
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onApply(localFilters)}
            className="flex-1 bg-primary text-white px-4 py-2 hover:bg-primary/80 transition rounded"
          >
            Apply
          </button>
          <button
            onClick={handleClear}
            className="flex-1 bg-gray-500 text-white px-4 py-2 hover:bg-gray-600 transition rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};
