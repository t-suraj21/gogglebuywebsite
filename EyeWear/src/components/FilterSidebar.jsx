import { useState } from "react";

export default function FilterSidebar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    priceRange: [0, 10000],
    rating: 0,
    inStock: false
  });

  const [expandedSections, setExpandedSections] = useState({
    category: true,
    brand: true,
    price: true,
    rating: true,
    stock: true
  });

  const categories = ["Men", "Women", "Kids", "Accessories"];
  const brands = ["Nike", "Adidas", "Puma", "Reebok", "New Balance", "Converse"];
  const ratings = [5, 4, 3, 2, 1];

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    const newFilters = {
      ...filters,
      category: filters.category === category ? "" : category
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleBrandChange = (brand) => {
    const newFilters = { ...filters, brand };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handlePriceChange = (e, index) => {
    const newPrice = [...filters.priceRange];
    newPrice[index] = Number(e.target.value);
    if (newPrice[0] <= newPrice[1]) {
      const newFilters = { ...filters, priceRange: newPrice };
      setFilters(newFilters);
      onFilterChange(newFilters);
    }
  };

  const handleRatingChange = (rating) => {
    const newFilters = {
      ...filters,
      rating: filters.rating === rating ? 0 : rating
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleStockChange = (e) => {
    const newFilters = { ...filters, inStock: e.target.checked };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const resetFilters = () => {
    const defaultFilters = {
      category: "",
      brand: "",
      priceRange: [0, 10000],
      rating: 0,
      inStock: false
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="w-full sm:w-64 bg-white rounded-lg shadow-md p-4 sm:p-6 h-fit sticky top-20 overflow-x-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={resetFilters}
          className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
        >
          Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection("category")}
          className="flex justify-between items-center w-full mb-3 hover:text-blue-600"
        >
          <h3 className="font-semibold text-gray-800">Category</h3>
          <span className="text-lg">{expandedSections.category ? "−" : "+"}</span>
        </button>
        {expandedSections.category && (
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.category === cat}
                  onChange={() => handleCategoryChange(cat)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="ml-3 text-gray-700 group-hover:text-blue-600">{cat}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Brand Filter */}
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection("brand")}
          className="flex justify-between items-center w-full mb-3 hover:text-blue-600"
        >
          <h3 className="font-semibold text-gray-800">Brand</h3>
          <span className="text-lg">{expandedSections.brand ? "−" : "+"}</span>
        </button>
        {expandedSections.brand && (
          <div className="space-y-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer group">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 accent-blue-600"
                />
                <span className="ml-3 text-gray-700 group-hover:text-blue-600">{brand}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Filter */}
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex justify-between items-center w-full mb-3 hover:text-blue-600"
        >
          <h3 className="font-semibold text-gray-800">Price</h3>
          <span className="text-lg">{expandedSections.price ? "−" : "+"}</span>
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">Min: ${filters.priceRange[0]}</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceChange(e, 0)}
                className="w-full accent-blue-600"
              />
            </div>
            <div>
              <label className="text-sm text-gray-600">Max: ${filters.priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="10000"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceChange(e, 1)}
                className="w-full accent-blue-600"
              />
            </div>
            <div className="bg-blue-50 p-3 rounded text-center">
              <p className="font-semibold text-blue-700">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6 border-b pb-4">
        <button
          onClick={() => toggleSection("rating")}
          className="flex justify-between items-center w-full mb-3 hover:text-blue-600"
        >
          <h3 className="font-semibold text-gray-800">Rating</h3>
          <span className="text-lg">{expandedSections.rating ? "−" : "+"}</span>
        </button>
        {expandedSections.rating && (
          <div className="space-y-2">
            {ratings.map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="w-4 h-4 rounded accent-blue-600"
                />
                <span className="ml-3 flex items-center text-gray-700 group-hover:text-blue-600">
                  {"⭐".repeat(rating)}
                  <span className="ml-1 text-sm">({rating}+)</span>
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stock Filter */}
      <div className="mb-4">
        <button
          onClick={() => toggleSection("stock")}
          className="flex justify-between items-center w-full mb-3 hover:text-blue-600"
        >
          <h3 className="font-semibold text-gray-800">Availability</h3>
          <span className="text-lg">{expandedSections.stock ? "−" : "+"}</span>
        </button>
        {expandedSections.stock && (
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              checked={filters.inStock}
              onChange={handleStockChange}
              className="w-4 h-4 rounded accent-blue-600"
            />
            <span className="ml-3 text-gray-700 group-hover:text-blue-600">
              In Stock Only
            </span>
          </label>
        )}
      </div>
    </div>
  );
}
