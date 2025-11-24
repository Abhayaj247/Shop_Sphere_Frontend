import axios from "axios";
import { useState } from "react";
import adminCards from "../data/adminCards";
import type { AdminModalType } from "../data/adminCards";
import AdminHero from "../components/admin/AdminHero";
import AdminCardGrid from "../components/admin/AdminCardGrid";
import AdminModal, { type FormDataState } from "../components/admin/AdminModal";

const API_BASE = "http://localhost:8080";

const AdminDashboard = () => {
  const [modalType, setModalType] = useState<AdminModalType | null>(null);
  const [formData, setFormData] = useState<FormDataState>({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    imageUrl: "",
    productId: "",
    userId: "",
    username: "",
    email: "",
    role: "CUSTOMER",
    month: "",
    year: "",
    date: "",
  });
  const [responseData, setResponseData] = useState<unknown>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchedUser, setFetchedUser] = useState<{
    username?: string;
    email?: string;
    role?: string;
  } | null>(null);


  const resetModalState = (type: AdminModalType | null) => {
    setModalType(type);
    setFormData((prev) => ({
      ...prev,
      name: "",
      description: "",
      price: "",
      stock: "",
      categoryId: "",
      imageUrl: "",
      productId: "",
      userId: "",
      username: "",
      email: "",
      role: "CUSTOMER",
      month: "",
      year: "",
      date: "",
    }));
    setResponseData(null);
    setError(null);
    setFetchedUser(null);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddProduct = async () => {
    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      categoryId: Number(formData.categoryId),
      imageUrl: formData.imageUrl,
    };
    const response = await axios.post(
      `${API_BASE}/admin/products/add`,
      payload,
      {
        withCredentials: true,
      }
    );
    setResponseData(response.data);
  };

  const handleDeleteProduct = async () => {
    const payload = { productId: Number(formData.productId) };
    const response = await axios.delete(`${API_BASE}/admin/products/delete`, {
      data: payload,
      withCredentials: true,
    });
    setResponseData(response.data);
  };

  const handleFetchUser = async () => {
    if (!formData.userId) {
      setError("Enter a user ID first.");
      return;
    }
    const response = await axios.get(`${API_BASE}/admin/user/getbyid`, {
      params: { userId: formData.userId },
      withCredentials: true,
    });
    setFetchedUser(response.data);
    setFormData((prev) => ({
      ...prev,
      username: response.data.username,
      email: response.data.email,
      role: response.data.role,
    }));
    setResponseData(response.data);
  };

  const handleModifyUser = async () => {
    const payload = {
      userId: Number(formData.userId),
      username: formData.username,
      email: formData.email,
      role: formData.role,
    };
    const response = await axios.put(`${API_BASE}/admin/user/modify`, payload, {
      withCredentials: true,
    });
    setResponseData(response.data);
  };

  const handleViewUser = async () => {
    const response = await axios.get(`${API_BASE}/admin/user/getbyid`, {
      params: { userId: formData.userId },
      withCredentials: true,
    });
    setResponseData(response.data);
  };

  const handleMonthlyBusiness = async () => {
    const response = await axios.get(`${API_BASE}/admin/business/monthly`, {
      params: { month: formData.month, year: formData.year },
      withCredentials: true,
    });
    setResponseData(response.data);
  };

  const handleDailyBusiness = async () => {
    const response = await axios.get(`${API_BASE}/admin/business/daily`, {
      params: { date: formData.date },
      withCredentials: true,
    });
    setResponseData(response.data);
  };

  const handleYearlyBusiness = async () => {
    const response = await axios.get(`${API_BASE}/admin/business/yearly`, {
      params: { year: formData.year },
      withCredentials: true,
    });
    setResponseData(response.data);
  };

  const handleOverallBusiness = async () => {
    const response = await axios.get(`${API_BASE}/admin/business/overall`, {
      withCredentials: true,
    });
    setResponseData(response.data);
  };

  const handleSubmit = async () => {
    if (!modalType) return;
    try {
      setLoading(true);
      setError(null);
      setResponseData(null);

      switch (modalType) {
        case "addProduct":
          await handleAddProduct();
          break;
        case "deleteProduct":
          await handleDeleteProduct();
          break;
        case "modifyUser":
          if (!fetchedUser) {
            await handleFetchUser();
          } else {
            await handleModifyUser();
          }
          break;
        case "viewUser":
          await handleViewUser();
          break;
        case "monthlyBusiness":
          await handleMonthlyBusiness();
          break;
        case "dailyBusiness":
          await handleDailyBusiness();
          break;
        case "yearlyBusiness":
          await handleYearlyBusiness();
          break;
        case "overallBusiness":
          await handleOverallBusiness();
          break;
        default:
          break;
      }
    } catch (err: unknown) {
      console.error(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data || err.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    if (Array.isArray(responseData)) {
      return (
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
          {responseData.map((item, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl"
            >
              <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {JSON.stringify(item, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      );
    }

    if (typeof responseData === "object") {
      return (
        <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl max-h-60 overflow-y-auto">
          <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {JSON.stringify(responseData, null, 2)}
          </pre>
        </div>
      );
    }

    return (
      <div className="mt-4 bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-gray-700 dark:text-gray-300">
        {String(responseData)}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <AdminHero />

        <AdminCardGrid
          cards={adminCards}
          onSelect={(type) => resetModalState(type)}
        />

        <footer className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-wrap items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="space-x-4">
            <a href="#" className="hover:text-indigo-500 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-500 transition-colors">
              Support
            </a>
          </div>
          <p>© {new Date().getFullYear()} ShopSphere Admin Desk</p>
        </footer>
      </div>

      <AdminModal
        modalType={modalType}
        cards={adminCards}
        formData={formData}
        fetchedUser={fetchedUser}
        error={error}
        loading={loading}
        responseContent={renderResponse()}
        onClose={() => resetModalState(null)}
        onSubmit={handleSubmit}
        onInputChange={handleInputChange}
        onFetchUser={handleFetchUser}
      />
    </div>
  );
};

export default AdminDashboard;
