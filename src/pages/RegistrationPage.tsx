import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";

function RegistrationPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        {
          username,
          email,
          password,
          role,
        }
      );
      console.log("Registration successful:", response.data);
      setSuccess(true);

      // Show success message for 2 seconds, then navigate to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

      // Clear form after successful registration
      setUsername("");
      setEmail("");
      setPassword("");
      setRole("");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Registration failed:", error);

        if (error.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError(error.message || "Registration failed. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
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

      <div className="min-h-screen flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-lg shadow-lg text-shadow-xs border border-gray-200 dark:border-gray-700 bg-linear-to-br from-orange-100 via-white to-red-200 dark:from-gray-800 dark:via-gray-800 dark:to-gray-800">
        {/* Header */}
        <div className="px-6 py-6 border-b border-gray-300 dark:border-gray-700">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <ShoppingCart className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            Create Account
          </h1>
          <p className="text-center mt-2 text-gray-900 dark:text-gray-300">
            Join ShopSphere and start your shopping journey
          </p>
        </div>
        {/* Form content */}
        <div className="px-6 py-6">
          {success && (
            <div className="mb-4 p-2 bg-green-50 text-green-700 text-center rounded">
              ✅ User registered successfully! Redirecting to login page...
            </div>
          )}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded text-center">
              ❌ {error}
            </div>
          )}
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* username field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outine-none focus:outline-none"
              />
            </div>
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outine-none focus:outline-none"
              />
            </div>
            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outine-none focus:outline-none"
              />
            </div>
            {/* Role Dropdown field*/}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                defaultValue=""
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 outine-none focus:outline-none"
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="CUSTOMER">Customer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 outine-none focus:outline-none cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          {/* Login link */}
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already registered ?{" "}
            <Link
              to="/login"
              className="font-medium text-orange-600 dark:text-orange-400 hover:text-orange-500 dark:hover:text-orange-300 hover:underline"
            >
              Login here
            </Link>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
