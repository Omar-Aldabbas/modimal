import { useState } from "react";

export const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="w-full mb-6 flex items-center space-x-2"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="flex-1 px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none text-foreground"
      />
      <button
        type="submit"
        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
      >
        Search
      </button>
    </form>
  );
};
