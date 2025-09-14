import {
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineDollar,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import { api, generalApi } from "../utils/axiosInstance";

const AdminDashboardPage: React.FC = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [productCount, setProductCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [orderCount, setOrderCount] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const getProductsCount = async (): Promise<void> => {
    try {
      const response = await api.get("/products");
      if (Array.isArray(response.data)) {
        setProductCount(response.data.length);
      } else {
        setProductCount(0);
      }
    } catch (err) {
      setError("Error fetching product count");
      console.error("Error fetching product count:", err);
    }
  };

  const getOrdersCount = async (): Promise<void> => {
    try {
      const response = await api.get("/orders/all");
      if (Array.isArray(response.data)) {
        setOrderCount(response.data.length);
      } else {
        setOrderCount(0);
      }
    } catch (err) {
      setError("Error fetching order count");
      console.error("Error fetching order count:", err);
    }
  };

  const getUsersCount = async (): Promise<void> => {
    try {
      const response = await generalApi.get("/profile/all");
      if (Array.isArray(response.data)) {
        setUserCount(response.data.length);
      } else {
        setUserCount(0);
      }
    } catch (err) {
      setError("Error fetching user count");
      console.error("Error fetching user count:", err);
    }
  };

  const getCategoriesCount = async (): Promise<void> => {
    try {
      const response = await api.get("/categories");
      if (Array.isArray(response.data)) {
        setCategoryCount(response.data.length);
      } else {
        setCategoryCount(0);
      }
    } catch (err) {
      setError("Error fetching category count");
      console.error("Error fetching category count:", err);
    }
  };

  useEffect(() => {
    getProductsCount();
    getOrdersCount();
    getUsersCount();
    getCategoriesCount();
  }, []);

  return (
    <section id="dashboard" className="section">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Total Products Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-red-400 transform hover:scale-105 transition duration-300">
          <div className="flex items-center mb-4">
            <i className="text-red-500 text-2xl">
              <AiOutlineShopping />
            </i>
            <span className="text-sm text-gray-500 ml-2">Total Products</span>
          </div>
          <p className="text-4xl font-extrabold text-red-600">
            {productCount}
          </p>
        </div>

        {/* Total Categories Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-green-500 transform hover:scale-105 transition duration-300">
          <div className="flex items-center mb-4">
            <i className="text-green-500 text-2xl">
              <AiOutlineShopping />
            </i>
            <span className="text-sm text-gray-500 ml-2">Total Categories</span>
          </div>
          <p className="text-4xl font-extrabold text-green-600">
            {categoryCount}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Stats</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Total Users Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-red-500 transform hover:scale-105 transition duration-300">
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-4xl font-extrabold text-red-600">{userCount}</p>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-8 border-green-500 transform hover:scale-105 transition duration-300">
            <div className="flex items-center mb-4">
              <i className="text-green-500 text-2xl">
                <AiOutlineShoppingCart />
              </i>
              <span className="text-sm text-gray-500 ml-2">Total Orders</span>
            </div>
            <p className="text-4xl font-extrabold text-green-600">
              {orderCount}
            </p>
          </div>
        </div>
      </div>

      {/* Show error if any */}
      {error && (
        <div className="mt-6 text-red-600 font-semibold text-center">
          {error}
        </div>
      )}
    </section>
  );
};

export default AdminDashboardPage;
