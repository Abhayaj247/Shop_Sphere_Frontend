import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Package, Home, RefreshCw } from "lucide-react";
import LoadingSpinner from "../components/LoadingSpinner";

interface OrderProduct {
  order_id: string;
  product_id: number;
  name: string;
  description: string;
  quantity: number;
  price_per_unit: number;
  total_price: number;
  image_url?: string | null;
}

interface OrderResponse {
  username: string;
  role: string;
  products: OrderProduct[];
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<OrderProduct[]>([]);
  const [userInfo, setUserInfo] = useState<{ username: string; role: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get<OrderResponse>("http://localhost:8080/api/orders", {
        withCredentials: true,
      });
      setOrders(response.data.products || []);
      setUserInfo({ username: response.data.username, role: response.data.role });
      setError(null);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Unable to load your orders. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Back</span>
            </button>
            <Link
              to="/"
              className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              <Home className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              <span className="font-semibold text-gray-700 dark:text-gray-300">Home</span>
            </Link>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400">Logged in as</p>
            <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
              {userInfo?.username || "Customer"}
            </p>
            <p className="text-sm text-indigo-600 dark:text-indigo-400">{userInfo?.role}</p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <section className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">Your Orders</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {orders.length > 0
                ? "Track your recent purchases and download receipts."
                : "No orders yet. Start shopping to see your purchases here."}
            </p>
          </div>
          <button
            onClick={fetchOrders}
            disabled={refreshing}
            className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            <span>{refreshing ? "Refreshing..." : "Refresh"}</span>
          </button>
        </section>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-3xl shadow-lg">
            <Package className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              No orders found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Once you place an order, it will show up here.
            </p>
            <Link
              to="/customer/dashboard"
              className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={`${order.order_id}-${order.product_id}`}
                className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="grid md:grid-cols-4 gap-6 p-6">
                  <div className="md:col-span-1">
                    {order.image_url ? (
                      <img
                        src={order.image_url}
                        alt={order.name}
                        className="w-full h-40 object-cover rounded-2xl"
                      />
                    ) : (
                      <div className="w-full h-40 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <Package className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-3 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Order ID</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {order.order_id}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Total Paid</p>
                        <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                          ₹{order.total_price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {order.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2">
                        {order.description || "No description available."}
                      </p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Quantity</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          {order.quantity}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Price / unit</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          ₹{order.price_per_unit.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-700/40 rounded-2xl p-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Subtotal</p>
                        <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                          ₹{(order.price_per_unit * order.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default OrderHistory;

