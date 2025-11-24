import React, { useEffect, useState } from "react";
import axios from "axios";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products");

        setUser(response.data.user);
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error loading dashboard:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="w-full bg-blue-600 px-6 py-4 shadow-md flex justify-between items-center text-white">
        <h1 className="text-2xl font-bold">ShopSphere</h1>

        <div className="flex gap-6 text-lg">
          <button>Shirts</button>
          <button>Pants</button>
          <button>Accessories</button>
          <button>Mobiles</button>
          <button>Mobile Accessories</button>
        </div>

        <div className="flex gap-4 items-center">
          <span className="text-xl">🛒</span>
          <span className="font-semibold">{user?.name}</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="text-center py-10">
        <h2 className="text-3xl font-bold">
          Welcome, <span className="text-blue-600">{user?.name}</span>
        </h2>
        <p className="text-gray-600">{user?.role}</p>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10">

        {products.length > 0 ? (
          products.map((p) => (
            <div
              key={p.product_id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              {/* Product Image */}
              <div className="w-full h-56 bg-gray-50 rounded-lg flex justify-center items-center overflow-hidden">
                {p.images.length > 0 ? (
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <p className="text-gray-400">No Image Available</p>
                )}
              </div>

              <h3 className="text-xl font-semibold mt-4">{p.name}</h3>
              <p className="text-gray-600 text-sm">{p.description}</p>

              <p className="text-blue-600 font-bold text-lg mt-2">₹{p.price}</p>

              <button
                className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available.
          </p>
        )}

      </div>
    </div>
  );
};

export default CustomerDashboard;