import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Sparkles,
  Zap,
  Shield,
  Truck,
  Headphones,
  Star,
  ArrowRight,
  TrendingUp,
  Users,
  Award,
} from "lucide-react";
import DarkModeToggle from "../components/DarkModeToggle";

const HomePage: React.FC = () => {
  const categories = [
    { name: "Shirts", icon: "👔", color: "from-blue-500 to-cyan-500" },
    { name: "Pants", icon: "👖", color: "from-purple-500 to-pink-500" },
    { name: "Accessories", icon: "👜", color: "from-orange-500 to-red-500" },
    { name: "Mobiles", icon: "📱", color: "from-green-500 to-emerald-500" },
    { name: "Mobile Accessories", icon: "🎧", color: "from-indigo-500 to-purple-500" },
  ];

  const features = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "Free shipping on orders over ₹999",
      color: "text-blue-500",
    },
    {
      icon: Shield,
      title: "Secure Payment",
      description: "100% secure payment gateway",
      color: "text-green-500",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round the clock customer support",
      color: "text-purple-500",
    },
    {
      icon: Award,
      title: "Quality Products",
      description: "Premium quality guaranteed",
      color: "text-orange-500",
    },
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: Users },
    { number: "5K+", label: "Products", icon: ShoppingCart },
    { number: "4.8", label: "Average Rating", icon: Star },
    { number: "99%", label: "Satisfaction", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ShopSphere
              </h1>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors">
                Features
              </a>
              <a href="#categories" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors">
                Categories
              </a>
              <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors">
                About
              </a>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              <DarkModeToggle />
              <Link
                to="/login"
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Sign Up
              </Link>
              <Link
                to="/admin"
                className="px-6 py-2 bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-indigo-600/10 via-purple-600/10 to-pink-600/10 dark:from-indigo-500/5 dark:via-purple-500/5 dark:to-pink-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 bg-linear-to-br from-indigo-500/20 to-purple-500/20 dark:from-indigo-500/10 dark:to-purple-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 dark:border-indigo-800">
                <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
                  Welcome to ShopSphere
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Shop Smart,
                </span>
                <br />
                <span className="text-gray-800 dark:text-gray-200">Live Better</span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed">
                Discover amazing products at unbeatable prices. Your one-stop destination for fashion, electronics, and more!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/register"
                  className="group px-8 py-4 bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all shadow-lg border-2 border-indigo-200 dark:border-indigo-800"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative w-full h-96 bg-linear-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 dark:from-indigo-500/10 dark:via-purple-500/10 dark:to-pink-500/10 rounded-3xl backdrop-blur-sm border-2 border-indigo-200/50 dark:border-indigo-800/50 flex items-center justify-center">
                <div className="text-9xl animate-pulse">🛍️</div>
              </div>
              {/* Floating elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-linear-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-3xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`w-8 h-8 text-indigo-600 dark:text-indigo-400`} />
                </div>
                <div className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Why Choose <span className="bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">ShopSphere?</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Experience shopping like never before
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700"
              >
                <div className={`w-16 h-16 bg-linear-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Shop by <span className="bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent">Category</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore our wide range of products
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to="/login"
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                <div className="relative text-center">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                    {category.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-linear-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-12 lg:p-16 text-white overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
            <div className="relative text-center space-y-6">
              <Zap className="w-16 h-16 mx-auto text-yellow-300" />
              <h2 className="text-4xl lg:text-5xl font-bold">Ready to Start Shopping?</h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Join thousands of happy customers and discover amazing deals today!
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <Link
                  to="/register"
                  className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center space-x-2"
                >
                  <span>Create Account</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/login"
                  className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg hover:bg-white/30 transition-all border-2 border-white/30"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold">ShopSphere</h3>
              </div>
              <p className="text-gray-400">
                Your trusted partner for all your shopping needs. Quality products at unbeatable prices.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">Home</Link>
                </li>
                <li>
                  <a href="#features" className="hover:text-white transition-colors">Features</a>
                </li>
                <li>
                  <a href="#categories" className="hover:text-white transition-colors">Categories</a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">About</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Account</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/login" className="hover:text-white transition-colors">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="hover:text-white transition-colors">Register</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email: support@shopsphere.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>24/7 Customer Support</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ShopSphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

