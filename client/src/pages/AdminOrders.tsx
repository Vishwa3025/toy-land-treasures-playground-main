import React, { useEffect, useState } from "react";
import { api, generalApi } from "../utils/axiosInstance";
import OrderItem from "./OrderItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// Types
interface User {
  id: number;
  name: string;
}

interface Order {
  id: number;
  total_price: number;
  status: string;
  payment_method: string;
  createdAt: string;
  User?: User;
}

interface OrderItemType {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
}

interface Address {
  full_name?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  postal_code?: string;
  country?: string;
  phone?: string;
}

const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<Record<number, OrderItemType[]>>(
    {}
  );
  const [address, setAddress] = useState<Record<number, Address>>({});
  const [loadingOrders, setLoadingOrders] = useState<Record<number, boolean>>(
    {}
  );

  const navigate = useNavigate();

  // Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get<Order[]>("/orders/all");
        setOrders(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        setError("Failed to fetch orders.");
        setOrders([]);
        console.error("Error fetching orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Accept order
  const handleAcceptOrder = async (orderId: number) => {
    try {
      setLoadingOrders((prev) => ({ ...prev, [orderId]: true }));

      await api.put(`/orders/accept/${orderId}`, null, {
        withCredentials: true,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Accepted" } : order
        )
      );

      toast.success("Order accepted!");
    } catch (error) {
      console.error("Error accepting order:", error);
      toast.error("Failed to accept order.");
    } finally {
      setLoadingOrders((prev) => ({ ...prev, [orderId]: false }));
    }
  };

  // Deliver order
  const handleMarkAsDelivered = async (orderId: number) => {
    try {
      await api.put(`/orders/deliver/${orderId}`, null, {
        withCredentials: true,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Delivered" } : order
        )
      );

      toast.success("Order marked as delivered!");
    } catch (error) {
      console.error("Error marking as delivered:", error);
      toast.error("Failed to update order.");
    }
  };

  // Cancel order
  const handleCancelOrder = async (orderId: number) => {
    try {
      await api.put(`/orders/cancel/${orderId}`, null, {
        withCredentials: true,
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );

      toast.success("Order cancelled!");
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to update order.");
    }
  };

  // Fetch address
  const fetchAddress = async (userId?: number) => {
    if (!userId) return;
    try {
      const response = await generalApi.get<{
        exists: boolean;
        address: Address;
      }>(`/address/${userId}`);
      const { exists, address } = response.data;

      if (exists) {
        setAddress((prev) => ({ ...prev, [userId]: address }));
      }
    } catch (error) {
      console.error("Failed to fetch address:", error);
    }
  };

  // Fetch order items
  const fetchOrderItems = async (orderId: number) => {
    if (orderItems[orderId]) {
      setExpandedOrder(expandedOrder === orderId ? null : orderId);
      return;
    }

    try {
      const response = await api.get<OrderItemType[]>(
        `/orders/${orderId}/items`
      );
      setOrderItems((prev) => ({ ...prev, [orderId]: response.data }));
      setExpandedOrder(orderId);
    } catch (err) {
      console.error("Error fetching order items:", err);
    }
  };

  if (loading) return <p className="text-center text-lg">Loading orders...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <section id="orders" className="p-4 sm:p-6">
      <ToastContainer position="top-center" />
      <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 sm:mb-6">
          All Orders
        </h2>

        {/* Desktop Header Row */}
        <div className="hidden md:grid grid-cols-9 gap-3 p-4 bg-orange-200 rounded-lg font-semibold text-gray-700">
          <div className="px-4">S.No</div>
          <div className="px-4">Name</div>
          <div className="px-4">Price</div>
          <div className="px-4">Status</div>
          <div className="px-4">Payment</div>
          <div className="px-4">Order Date</div>
          <div className="px-4">Update</div>
          <div className="px-4">Cancel</div>
          <div className="px-4 text-center"></div>
        </div>

        {/* Orders List */}
        <div className="space-y-4 mt-4">
          {orders.map((order, index) => (
            <div
              key={order.id}
              className="rounded-lg overflow-hidden border border-gray-200"
            >
              <div
                className="grid grid-cols-1 md:grid-cols-9 gap-4 items-center p-4 bg-blue-50 hover:bg-orange-100 transition"
                onClick={() => {
                  fetchOrderItems(order.id);
                  fetchAddress(order.User?.id);
                }}
              >
                {/* Mobile View */}
                <div className="md:hidden flex justify-between w-full border-b pb-3">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-semibold text-gray-800">
                      Order #{orders.length - index}
                    </h3>

                    <p className="text-sm text-gray-600">
                      ₹ {order.total_price} |{" "}
                      {new Date(order.createdAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false,
                      })}
                    </p>

                    <p className="text-sm">{order.payment_method}</p>

                    <p className="flex items-center text-green-600 text-sm">
                      <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                      {order.status}
                    </p>

                     {/* Buttons Row */}
                    <div className="flex gap-2 pt-2">
                      <button
                        onClick={() => {
                          if (
                            order.status === "Pending" ||
                            order.status === "Success"
                          ) {
                            handleAcceptOrder(order.id);
                          } else if (order.status === "Accepted") {
                            handleMarkAsDelivered(order.id);
                          }
                        }}
                        disabled={
                          loadingOrders[order.id] ||
                          order.status === "Delivered" ||
                          order.status === "Cancelled"
                        }
                        className={`flex items-center justify-center gap-2 text-white py-1 px-3 text-xs rounded transition ${
                          loadingOrders[order.id] ||
                          order.status === "Delivered" ||
                          order.status === "Cancelled"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                      >
                        {loadingOrders[order.id] && (
                          <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        )}
                        {order.status === "Cancelled"
                          ? "Cancelled"
                          : order.status === "Success" ||
                            order.status === "Pending"
                          ? "Accept Order"
                          : order.status === "Accepted"
                          ? "Mark as Delivered"
                          : "Delivered"}
                      </button>

                      <button
                        className={`bg-red-600 text-white py-1 px-3 text-xs rounded ${
                          order.status === "Delivered" ||
                          order.status === "Cancelled"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "hover:bg-red-700"
                        }`}
                        onClick={() => {
                          if (
                            order.status !== "Delivered" &&
                            order.status !== "Cancelled"
                          ) {
                            handleCancelOrder(order.id);
                          }
                        }}
                        disabled={
                          order.status === "Delivered" ||
                          order.status === "Cancelled"
                        }
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Expand/Collapse */}
                  <div className="flex items-center">
                    {expandedOrder === order.id ? (
                      <FiChevronUp />
                    ) : (
                      <FiChevronDown />
                    )}
                  </div>
                </div>

                {/* Desktop View */}
                <div className="hidden md:flex px-2">
                  {orders.length - index}
                </div>
                <div className="hidden md:flex px-2">
                  {order.User?.name || "N/A"}
                </div>
                <div className="hidden md:flex px-2">₹ {order.total_price}</div>
                <div className="hidden md:flex items-center px-2 text-green-600">
                  <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                  {order.status}
                </div>
                <div className="hidden md:flex items-center px-2">
                  {order.payment_method}
                </div>
                <div className="hidden md:flex px-2 flex-col">
                  <span>
                    {new Date(order.createdAt).toLocaleDateString("en-GB", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleTimeString("en-GB", {
                      timeZone: "Asia/Kolkata",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                      hour12: false,
                    })}
                  </span>
                </div>

                                <div className="hidden md:flex px-2">
                  <button
                    onClick={() => {
                      if (
                        order.status === "Success" ||
                        order.status === "Pending"
                      ) {
                        handleAcceptOrder(order.id);
                      } else if (order.status === "Accepted") {
                        handleMarkAsDelivered(order.id);
                      }
                    }}
                    disabled={
                      loadingOrders[order.id] ||
                      order.status === "Delivered" ||
                      order.status === "Cancelled"
                    }
                    className={`flex items-center justify-center gap-2 text-white py-1 px-3 text-xs rounded transition ${
                      loadingOrders[order.id] ||
                      order.status === "Delivered" ||
                      order.status === "Cancelled"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {loadingOrders[order.id] && (
                      <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    )}
                    {order.status === "Cancelled"
                      ? "Cancelled"
                      : order.status === "Success" || order.status === "Pending"
                      ? "Accept Order"
                      : order.status === "Accepted"
                      ? "Mark as Delivered"
                      : "Delivered"}
                  </button>
                </div>

                <div className="hidden md:flex px-2 justify-center">
                  <button
                    className={`bg-red-600 text-white py-1 px-3 text-xs rounded ${
                      order.status === "Delivered" ||
                      order.status === "Cancelled"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "hover:bg-red-700"
                    }`}
                    onClick={() => {
                      if (
                        order.status !== "Delivered" &&
                        order.status !== "Cancelled"
                      ) {
                        handleCancelOrder(order.id);
                      }
                    }}
                    disabled={
                      order.status === "Delivered" ||
                      order.status === "Cancelled"
                    }
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Expanded Order Details */}
              {expandedOrder === order.id && (
                <div className="p-4 bg-gray-100 rounded-lg">
                  <h4 className="font-medium text-sm mb-2">
                    Products in Order:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {orderItems[order.id]?.map((item) => (
                      <OrderItem key={item.id} item={item} />
                    )) || (
                      <p className="text-gray-500">No items in this order.</p>
                    )}

                    {address[order.User?.id || -1] && (
                      <div className="sm:col-span-2 bg-white p-3 rounded shadow">
                        <p className="text-sm font-semibold mb-1">
                          Delivery Address:
                        </p>
                        <p className="text-sm text-gray-700">
                          {Object.values(address[order.User?.id || -1]).join(
                            ", "
                          )}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminOrders;
