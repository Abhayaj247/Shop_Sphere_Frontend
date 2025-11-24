import React from "react";
import { SlidersHorizontal, X } from "lucide-react";

interface Category {
  name: string;
  icon: string;
}

interface CategoryNavigationProps {
  categories: Category[];
  selectedCategory: string | null;
  onCategorySelect: (category: string | null) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  showFilters: boolean;
  onFiltersToggle: () => void;
}

const CategoryNavigation: React.FC<CategoryNavigationProps> = ({
  categories,
  selectedCategory,
  onCategorySelect,
  sortBy,
  onSortChange,
  showFilters,
  onFiltersToggle,
}) => {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 lg:top-20 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide pb-2 lg:pb-0">
            <button
              onClick={() => onCategorySelect(null)}
              className={`px-4 lg:px-6 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center space-x-2 ${
                selectedCategory === null
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span>🏠</span>
              <span>All</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                onClick={() => onCategorySelect(category.name)}
                className={`px-4 lg:px-6 py-2 rounded-xl font-semibold transition-all whitespace-nowrap flex items-center space-x-2 ${
                  selectedCategory === category.name
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onFiltersToggle}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-all text-gray-700 dark:text-gray-300"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span className="font-semibold">Filters</span>
            </button>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 font-semibold text-gray-700 dark:text-gray-300"
            >
              <option value="default">Sort: Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default CategoryNavigation;

