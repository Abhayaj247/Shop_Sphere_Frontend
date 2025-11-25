import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Filter, Home } from "lucide-react";

// Components
import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import CategoryNavigation from "../components/CategoryNavigation";
import ProductGrid from "../components/ProductGrid";
import QuickViewModal from "../components/QuickViewModal";
import FiltersSidebar from "../components/FiltersSidebar";
import LoadingSpinner from "../components/LoadingSpinner";
import CartSidebar from "../components/CartSidebar";

interface User {
  name: string;
  role: string;
}

interface Product {
  product_id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  images: string[];
}

const CustomerDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showQuickView, setShowQuickView] = useState<Product | null>(null);
  const [sortBy, setSortBy] = useState<string>("default");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const navigate = useNavigate();

  const categories = [
    { name: "Shirts", icon: "👔" },
    { name: "Pants", icon: "👖" },
    { name: "Accessories", icon: "👜" },
    { name: "Mobiles", icon: "📱" },
    { name: "Mobile Accessories", icon: "🎧" },
  ];

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const hasAuthCookie = () => {
    if (typeof document === "undefined") return false;
    return document.cookie.split("; ").some((c) => c.trim().startsWith("authToken="));
  };

  // initial cookie check
  useEffect(() => {
    setIsAuthenticated(hasAuthCookie());
  }, []);

  // poll cookie while unauthenticated so UI updates when login happens in-place
  useEffect(() => {
    if (isAuthenticated) return;
    const id = setInterval(() => {
      if (hasAuthCookie()) {
        setIsAuthenticated(true);
        clearInterval(id);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [isAuthenticated]);

  // Fetch products and user data
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products${selectedCategory ? `?category=${selectedCategory}` : ""}`,
          { withCredentials: true }
        );

        // backend may include user when session exists
        setUser(response.data.user || null);
        if (response.data.user?.name) {
          localStorage.setItem("username", response.data.user.name);
        }

        // if backend returned user, mark authenticated
        if (response.data.user) {
          setIsAuthenticated(true);
        } else {
          // fallback: check cookie presence
          setIsAuthenticated(hasAuthCookie());
        }

        setProducts(response.data.products || []);
        setFilteredProducts(response.data.products || []);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [selectedCategory]);

  // Fetch cart item count
  useEffect(() => {
    const fetchCartCount = async () => {
      const username = localStorage.getItem("username");
      if (!username) return;

      try {
        const response = await axios.get(
          `http://localhost:8080/api/cart/items/count?username=${username}`,
          { withCredentials: true }
        );
        setCartItemCount(response.data || 0);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartItemCount(0);
      }
    };

    if (user) {
      fetchCartCount();
    }
  }, [user]);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Search filter
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort
    if (sortBy === "price-low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredProducts(filtered);
  }, [searchQuery, products, priceRange, sortBy]);

  // Handlers
  const handleAddToCart = async (product: Product) => {
    if (product.stock === 0) {
      alert("This product is out of stock!");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8080/api/cart/add",
        {
          productId: product.product_id,
          quantity: 1,
        },
        { withCredentials: true }
      );

      // Update cart count
      const username = localStorage.getItem("username");
      if (username) {
        const countResponse = await axios.get(
          `http://localhost:8080/api/cart/items/count?username=${username}`,
          { withCredentials: true }
        );
        setCartItemCount(countResponse.data || 0);
      }

      // Show cart briefly
      setShowCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (axios.isAxiosError(error) && error.response) {
        alert(`Failed to add to cart: ${error.response.data?.error || error.message}`);
      } else {
        alert("Failed to add product to cart. Please try again.");
      }
    }
  };

  const handleCartUpdate = () => {
    // Refresh cart count when cart is updated
    const username = localStorage.getItem("username");
    if (username) {
      axios
        .get(`http://localhost:8080/api/cart/items/count?username=${username}`, {
          withCredentials: true,
        })
        .then((response) => {
          setCartItemCount(response.data || 0);
        })
        .catch((error) => {
          console.error("Error fetching cart count:", error);
        });
    }
  };

  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const onLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log(response.data);
      console.log("User successfully logged out");

      // clear local state
      localStorage.removeItem("username");
      setUser(null);
      setIsAuthenticated(false);

      navigate("/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setPriceRange([0, 100000]);
    setSortBy("default");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // show login/signup prompt when not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
        {/* Home Button */}
        <div className="absolute top-4 left-4 z-10">
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all group"
          >
            <Home className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
              Home
            </span>
          </Link>
        </div>
        <div className="w-full max-w-5xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-1">
                <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold mb-2">
                  Dashboard
                </p>
                <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-4">
                  Welcome back to
                  <span className="ml-2 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    ShopSphere
                  </span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl">
                  Sign in or create an account to view your orders, manage
                  addresses, save favorites, and enjoy a personalized shopping
                  experience.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Link
                    to="/login"
                    className="px-6 py-2 bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-6 py-2 bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Sign up
                  </Link>
                </div>
              </div>

              <div className="w-full lg:w-80 shrink-0">
                <div className="bg-linear-to-br from-indigo-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 h-full flex flex-col justify-center items-center border border-gray-100 dark:border-gray-800">
                  {/* simple benefits list to resemble dashboard content */}
                  <svg className="w-16 h-16 mb-4 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v4a4 4 0 004 4h10" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 7v10a2 2 0 01-2 2H7" />
                  </svg>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    <li className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
                      View orders & tracking
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
                      Manage addresses & payments
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="inline-block w-2 h-2 rounded-full bg-indigo-500" />
                      Save favorites & recommendations
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <Header
        user={user}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onLogout={onLogout}
        mobileMenuOpen={mobileMenuOpen}
        onMobileMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        cartItemCount={cartItemCount}
        onCartClick={() => setShowCart(true)}
      />

      <HeroBanner userName={user?.name} />

      <CategoryNavigation
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showFilters={showFilters}
        onFiltersToggle={() => setShowFilters(!showFilters)}
      />

      <FiltersSidebar
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
              {filteredProducts.length} {filteredProducts.length === 1 ? "Product" : "Products"} Found
            </h3>
            {searchQuery && (
              <p className="text-gray-600 dark:text-gray-400 mt-1">Search results for "{searchQuery}"</p>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigate("/orders")}
              className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Orders
            </button>
            <button
              onClick={() => navigate("/orders")}
              className="sm:hidden flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
            >
              Orders
            </button>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300"
            >
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <ProductGrid
          products={filteredProducts}
          wishlist={wishlist}
          // searchQuery={searchQuery}
          onWishlistToggle={toggleWishlist}
          onQuickView={setShowQuickView}
          onAddToCart={handleAddToCart}
          onClearFilters={handleClearFilters}
        />
      </main>

      <QuickViewModal
        product={showQuickView}
        isWishlisted={showQuickView ? wishlist.includes(showQuickView.product_id) : false}
        onClose={() => setShowQuickView(null)}
        onWishlistToggle={toggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <CartSidebar
        isOpen={showCart}
        onClose={() => setShowCart(false)}
        onCartUpdate={handleCartUpdate}
        userName={user?.name}
      />
    </div>
  );
};

export default CustomerDashboard;