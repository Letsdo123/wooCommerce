import React from "react";

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    "All",
    "Milks & Dairies",
    "Coffes & Teas",
    "Pet Foods",
    "Meats",
    "Vegetables",
    "Fruits",
  ];

  return (
    <div className="flex justify-end flex-wrap gap-4 mt-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`text-sm ${
            activeCategory === category
              ? "text-green-600"
              : "text-gray-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;