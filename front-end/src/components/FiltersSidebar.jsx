import { useState } from "react";

export const FiltersSidebar = ({ filters, onApply, onClear }) => {
  const [localFilters, setLocalFilters] = useState(filters || {});

  const handleChange = (key, value) => {
    setLocalFilters({ ...localFilters, [key]: value });
  };

  return (
    <div className="w-full md:w-[30%] bg-card p-4 rounded-lg space-y-6">
      <h3 className="text-xl font-bold text-foreground mb-4">Filters</h3>

      <div className="flex flex-col">
        <label className="text-sm text-foreground mb-1">Price</label>
        <input
          type="range"
          min={0}
          max={1000}
          value={localFilters.price || 0}
          onChange={(e) => handleChange("price", e.target.value)}
          className="w-full"
        />
        <span className="text-sm text-gray-300 mt-1">${localFilters.price || 0}</span>
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onApply(localFilters)}
          className="flex-1 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
        >
          Apply
        </button>
        <button
          onClick={() => {
            setLocalFilters({});
            onClear();
          }}
          className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
};
