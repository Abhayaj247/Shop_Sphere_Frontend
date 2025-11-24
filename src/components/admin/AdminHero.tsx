import axios from "axios";
import { LogOut, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AdminHero = () => {
  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {},
        { withCredentials: true }
      );

      console.log(response.data);
      console.log("User successfully logged out");

      navigate("/admin/login");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
      <div>
        <p className="text-sm uppercase tracking-widest text-indigo-500 font-semibold mb-2">
          Admin Control Center
        </p>
        <h1 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white leading-tight">
          Shape the{" "}
          <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ShopSphere
          </span>{" "}
          experience
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-3xl">
          Manage catalog, user privileges, and mission-critical financial
          insights from a single, powerful dashboard.
        </p>
      </div>
      <Link
        to="/"
        className="inline-flex items-center space-x-2 px-5 py-3 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all font-semibold text-gray-700 dark:text-gray-200"
      >
        <Shield className="w-4 h-4 text-indigo-600 cursor-pointer" />
        <span>Return to Home</span>
      </Link>
      {/* Logout */}
      <button
        onClick={onLogout}
        className="p-2 lg:p-3 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-xl transition-all group cursor-pointer"
        title="Logout"
      >
        <LogOut className="w-5 h-5 lg:w-6 lg:h-6 text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300" />
      </button>
    </header>
  );
};

export default AdminHero;
