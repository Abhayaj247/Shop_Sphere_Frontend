import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User, Search, LogOut, Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";

interface HeaderProps {
  user: { name: string; role: string } | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onLogout: () => void;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
  cartItemCount: number;
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({
  user,
  searchQuery,
  onSearchChange,
  onLogout,
  mobileMenuOpen,
  onMobileMenuToggle,
  cartItemCount,
  onCartClick,
}) => {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
              )}
            </button>
            <Link to="/" className="flex items-center space-x-3 cursor-pointer group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShopSphere
              </h1>
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="flex-1 max-w-2xl mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for products, brands, and more..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:bg-white dark:focus:bg-gray-700 focus:outline-none transition-all shadow-sm hover:shadow-md text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative p-2 lg:p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all group cursor-pointer"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-linear-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-5 h-5 lg:w-6 lg:h-6 flex items-center justify-center shadow-lg animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <DarkModeToggle />

            {/* User Profile */}
            <div className="hidden sm:flex items-center space-x-3 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 px-3 py-2 rounded-xl border border-indigo-100 dark:border-indigo-800">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-md">
                <User className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div>
                <p className="text-xs lg:text-sm font-semibold text-gray-800 dark:text-gray-200">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.role}</p>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="p-2 lg:p-3 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-all group cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-5 h-5 lg:w-6 lg:h-6 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="lg:hidden px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:focus:border-indigo-400 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

