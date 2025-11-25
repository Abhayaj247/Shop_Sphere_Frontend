import React from "react";
import { Search } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  product_id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
}

interface ProductGridProps {
  products: Product[];
  wishlist: number[];
  onWishlistToggle: (productId: number) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onClearFilters: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlist,
  onWishlistToggle,
  onQuickView,
  onAddToCart,
  onClearFilters,
}) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-16 h-16 text-gray-400 dark:text-gray-600" />
        </div>
        <p className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">No products found</p>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your search or filters</p>
        <button
          onClick={onClearFilters}
          className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product.product_id}
          product={product}
          isWishlisted={wishlist.includes(product.product_id)}
          onWishlistToggle={onWishlistToggle}
          onQuickView={onQuickView}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductGrid;

