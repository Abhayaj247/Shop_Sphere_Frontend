import React from "react";
import { Loader2, X } from "lucide-react";
import { type AdminCard, type AdminModalType } from "../../data/adminCards";

export interface FormDataState {
  name: string;
  description: string;
  price: string;
  stock: string;
  categoryId: string;
  imageUrl: string;
  productId: string;
  userId: string;
  username: string;
  email: string;
  role: string;
  month: string;
  year: string;
  date: string;
}

interface AdminModalProps {
  modalType: AdminModalType | null;
  cards: AdminCard[];
  formData: FormDataState;
  fetchedUser: Record<string, unknown> | null;
  error: string | null;
  loading: boolean;
  responseContent: React.ReactNode;
  onClose: () => void;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFetchUser: () => void;
}

const AdminModal = ({
  modalType,
  cards,
  formData,
  fetchedUser,
  error,
  loading,
  responseContent,
  onClose,
  onSubmit,
  onInputChange,
  onFetchUser,
}: AdminModalProps) => {
  if (!modalType) return null;

  const cardTitle = cards.find((card) => card.type === modalType)?.title;

  const commonInputClass =
    "w-full px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm";

  const renderModalContent = () => {
    switch (modalType) {
      case "addProduct":
        return (
          <div className="space-y-4">
            <input name="name" placeholder="Product Name" className={commonInputClass} value={formData.name} onChange={onInputChange} />
            <input name="description" placeholder="Description" className={commonInputClass} value={formData.description} onChange={onInputChange} />
            <input name="price" type="number" step="0.01" placeholder="Price (₹)" className={commonInputClass} value={formData.price} onChange={onInputChange} />
            <input name="stock" type="number" placeholder="Stock" className={commonInputClass} value={formData.stock} onChange={onInputChange} />
            <input name="categoryId" type="number" placeholder="Category ID" className={commonInputClass} value={formData.categoryId} onChange={onInputChange} />
            <input name="imageUrl" placeholder="Image URL" className={commonInputClass} value={formData.imageUrl} onChange={onInputChange} />
          </div>
        );
      case "deleteProduct":
        return (
          <div className="space-y-4">
            <input
              name="productId"
              type="number"
              placeholder="Product ID"
              className={commonInputClass}
              value={formData.productId}
              onChange={onInputChange}
            />
          </div>
        );
      case "modifyUser":
        return (
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                name="userId"
                type="number"
                placeholder="User ID"
                className={`${commonInputClass} flex-1`}
                value={formData.userId}
                onChange={onInputChange}
              />
              <button
                type="button"
                onClick={onFetchUser}
                className="px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Fetch
              </button>
            </div>
            {fetchedUser && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                <input name="username" placeholder="Username" className={commonInputClass} value={formData.username} onChange={onInputChange} />
                <input name="email" placeholder="Email" className={commonInputClass} value={formData.email} onChange={onInputChange} />
                <select name="role" className={commonInputClass} value={formData.role} onChange={onInputChange}>
                  <option value="CUSTOMER">Customer</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
            )}
          </div>
        );
      case "viewUser":
        return (
          <div className="space-y-4">
            <input
              name="userId"
              type="number"
              placeholder="User ID"
              className={commonInputClass}
              value={formData.userId}
              onChange={onInputChange}
            />
          </div>
        );
      case "monthlyBusiness":
        return (
          <div className="space-y-4">
            <input
              name="month"
              type="number"
              placeholder="Month (1-12)"
              className={commonInputClass}
              value={formData.month}
              onChange={onInputChange}
            />
            <input
              name="year"
              type="number"
              placeholder="Year"
              className={commonInputClass}
              value={formData.year}
              onChange={onInputChange}
            />
          </div>
        );
      case "dailyBusiness":
        return (
          <div className="space-y-4">
            <input name="date" type="date" className={commonInputClass} value={formData.date} onChange={onInputChange} />
          </div>
        );
      case "yearlyBusiness":
        return (
          <div className="space-y-4">
            <input
              name="year"
              type="number"
              placeholder="Year"
              className={commonInputClass}
              value={formData.year}
              onChange={onInputChange}
            />
          </div>
        );
      case "overallBusiness":
        return (
          <div className="text-center text-gray-700 dark:text-gray-300 text-sm">
            Fetch total revenue and category mix since launch.
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{cardTitle}</h2>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {renderModalContent()}

        {error && (
          <div className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200 text-sm rounded-2xl p-3">
            {typeof error === "string" ? error : JSON.stringify(error)}
          </div>
        )}

        {responseContent}

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 font-semibold cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="inline-flex items-center px-5 py-2 rounded-xl bg-linear-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl disabled:opacity-60 cursor-pointer"
          >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {modalType === "modifyUser" && !fetchedUser ? "Fetch Details" : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminModal;

