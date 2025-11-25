import React, { useEffect, useState } from "react";
import axios from "axios";
import { X, Minus, Plus, Trash2, ShoppingCart, Shield } from "lucide-react";

interface RazorpayPaymentResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount?: number;
  currency?: string;
  name?: string;
  description?: string;
  order_id?: string;
  handler?: (response: RazorpayPaymentResponse) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

interface RazorpayErrorResponse {
  error?: {
    code?: string;
    description?: string;
    source?: string;
    step?: string;
    reason?: string;
    metadata?: Record<string, unknown>;
  };
  [key: string]: unknown;
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: RazorpayErrorResponse) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: {
      new (options: RazorpayOptions): RazorpayInstance;
    };
  }
}

interface CartProduct {
  product_id: number;
  image_url: string;
  name: string;
  description: string;
  price_per_unit: number;
  quantity: number;
  total_price: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdate: () => void;
  userName?: string;
  userEmail?: string;
}

const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || "";

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  onCartUpdate,
  userName,
  userEmail,
}) => {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState<number | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/cart/items", {
        withCredentials: true,
      });

      if (response.data.cart && response.data.cart.products) {
        setCartItems(response.data.cart.products);
        setTotalPrice(response.data.cart.overall_total_price || 0);
      } else {
        setCartItems([]);
        setTotalPrice(0);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
      setTotalPrice(0);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      deleteItem(productId);
      return;
    }

    try {
      setUpdating(productId);
      
      await axios.put(
        "http://localhost:8080/api/cart/update",
        {
          productId,
          quantity: newQuantity,
        },
        { withCredentials: true }
      );

      await fetchCartItems();
      onCartUpdate();
    } catch (error) {
      console.error("Error updating cart item:", error);
      alert("Failed to update cart item. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const deleteItem = async (productId: number) => {
    try {
      setUpdating(productId);

      await axios.delete("http://localhost:8080/api/cart/delete", {
        data: {
          productId,
        },
        withCredentials: true,
      });

      await fetchCartItems();
      onCartUpdate();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      alert("Failed to remove item from cart. Please try again.");
    } finally {
      setUpdating(null);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise<boolean>((resolve) => {
      if (typeof window === "undefined") {
        resolve(false);
        return;
      }

      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const initiatePayment = async () => {
    if (!razorpayKeyId) {
      alert("Payment gateway key is missing. Please contact support.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setIsProcessingPayment(true);
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        alert("Failed to load payment gateway. Please try again.");
        return;
      }

      const payload = {
        totalAmount: totalPrice,
        cartItems: cartItems.map((item) => ({
          productId: item.product_id,
          quantity: item.quantity,
          price: item.price_per_unit,
        })),
      };

      const orderResponse = await axios.post(
        "http://localhost:8080/api/payment/create",
        payload,
        { withCredentials: true }
      );

      const options: RazorpayOptions = {
        key: razorpayKeyId,
        amount: Math.round(totalPrice * 100),
        currency: "INR",
        name: "ShopSphere",
        description: "Secure payment via Razorpay",
        order_id: orderResponse.data,
        handler: async function (response: RazorpayPaymentResponse) {
          try {
            await axios.post(
              "http://localhost:8080/api/payment/verify",
              {
                razorPayOrderId: response.razorpay_order_id,
                razorPayPaymentId: response.razorpay_payment_id,
                razorPaySignature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            alert("Payment successful! Thank you for shopping with us.");
            await fetchCartItems();
            onCartUpdate();
            onClose();
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: userName || "ShopSphere Customer",
          email: userEmail || "",
        },
        notes: {
          address: "ShopSphere HQ",
        },
        modal: {
          ondismiss: () => {
            setIsProcessingPayment(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.on("payment.failed", function (response: RazorpayErrorResponse) {
        alert(response.error?.description || "Payment failed. Please try again.");
        setIsProcessingPayment(false);
      });
      paymentObject.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("Unable to start payment. Please try again later.");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto">
        <div className="sticky top-0 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white p-6 shadow-lg z-10">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold">Shopping Cart</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-white/90">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in cart
          </p>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg mb-2">Your cart is empty</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">Add some products to get started!</p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.product_id}
                    className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={item.image_url && item.image_url !== "default-image-url" ? item.image_url : ""}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shrink-0 bg-gray-200 dark:bg-gray-600"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-indigo-600 dark:text-indigo-400 font-bold mb-3">
                        ₹{item.price_per_unit.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          disabled={updating === item.product_id}
                          className="w-8 h-8 bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 hover:border-gray-400 dark:hover:border-gray-400 transition-all flex items-center justify-center disabled:opacity-50"
                        >
                          <Minus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </button>
                        <span className="w-8 text-center font-semibold text-gray-700 dark:text-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={updating === item.product_id}
                          className="w-8 h-8 bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 hover:border-gray-400 dark:hover:border-gray-400 transition-all flex items-center justify-center disabled:opacity-50"
                        >
                          <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                        </button>
                        <button
                          onClick={() => deleteItem(item.product_id)}
                          disabled={updating === item.product_id}
                          className="ml-auto p-2 text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-all disabled:opacity-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-200 dark:border-gray-700 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">Subtotal:</span>
                  <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
                    ₹{totalPrice.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                  <span>Shipping:</span>
                  <span>Calculated at checkout</span>
                </div>
                <button
                  onClick={initiatePayment}
                  disabled={isProcessingPayment || cartItems.length === 0}
                  className="w-full py-4 bg-linear-to-r from-indigo-600 to-purple-600 dark:from-indigo-500 dark:to-purple-500 text-white rounded-xl font-bold hover:from-indigo-700 hover:to-purple-700 dark:hover:from-indigo-600 dark:hover:to-purple-600 transition-all shadow-lg transform hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <Shield className="w-5 h-5" />
                  <span>{isProcessingPayment ? "Processing..." : "Pay Securely"}</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all cursor-pointer"
                >
                  Continue Shopping
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;

