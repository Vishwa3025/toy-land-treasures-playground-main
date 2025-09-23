import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Package, MapPin, LogOut, ShoppingBag } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import {
  MdPerson,
  MdLocationOn,
  MdOutlineLocalPostOffice,
} from "react-icons/md";
import { FaRegAddressCard, FaCity, FaFlag, FaPhoneAlt } from "react-icons/fa";
import { generalApi, api } from "../utils/axiosInstance";
import OrderItem from "./OrderItem";
import AddEditAddress from "./AddEditAddress";

interface Address {
  id?: string;
  user_id?: string;
  full_name?: string;
  address_line1?: string;
  address_line2?: string;
  street?: string; // optional, in case you want to keep the old field
  city?: string;
  state?: string;
  postal_code?: string;
  zip?: string; // optional, legacy
  country?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}

const Profile = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<Record<string, any[]>>({});
  const [error, setError] = useState<string | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [searchParams] = useSearchParams();
  const { user, logout, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const defaultTab = searchParams.get("tab") || "profile";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        // Fetch orders
        const ordersRes = await api.get("/orders");
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);

        // Fetch address
        if (user?.id) {
          const addressRes = await generalApi.get(`/address/${user.id}`);
          setAddress(addressRes.data?.address || null);
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Error loading profile data");
        toast({
          title: "Error loading profile data",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, user?.id, toast]);

  const fetchOrderItems = async (orderId: string) => {
    if (orderItems[orderId]) {
      setExpandedOrder(expandedOrder === orderId ? null : orderId);
      return;
    }
    try {
      const response = await api.get(`/orders/${orderId}/items`);
      setOrderItems((prev) => ({ ...prev, [orderId]: response.data }));
      setExpandedOrder(orderId);
    } catch (err) {
      console.error("Error fetching order items:", err);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully! 👋",
      description: "Come back soon for more magical toys!",
    });
    navigate("/");
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-toy-cream/30">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-primary/10 rounded-full px-6 py-3 mb-6">
            <span className="text-2xl mr-2 animate-bounce-slow">👋</span>
            <span className="text-primary font-baloo font-semibold">
              Welcome back, {user.name}!
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-baloo font-bold text-foreground mb-4">
            Your Profile
          </h1>
        </div>

        {/* Profile Tabs */}
        <Card className="toy-shadow bg-card/80 backdrop-blur-sm">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="w-4 h-4" /> Profile
              </TabsTrigger>
              <TabsTrigger value="orders" className="flex items-center gap-2">
                <Package className="w-4 h-4" /> Orders ({orders.length})
              </TabsTrigger>
              <TabsTrigger value="address" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Address
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="p-6">
              <div className="space-y-6 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-toy-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👤</span>
                </div>
                <h2 className="text-2xl font-baloo font-bold text-foreground">
                  {user.name}
                </h2>
                <p className="text-muted-foreground font-poppins">
                  {user.email}
                </p>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="mt-6 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="p-4 sm:p-6">
              <div className="bg-white rounded-xl shadow-xl p-4 sm:p-8 max-w-5xl mx-auto">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 my-2 sm:mb-6">
                  My Orders
                </h2>
                <p className="text-sm text-gray-600 my-3">
                  To cancel an order, mail to{" "}
                  <span className="font-medium">xxx@gmail.com</span>
                </p>

                {error && <p className="text-red-500">{error}</p>}

                {/* Header Row for desktop */}
                <div className="hidden md:grid grid-cols-7 gap-4 p-4 bg-orange-200 rounded-lg font-semibold text-gray-700">
                  <div className="px-4">S.No</div>
                  <div className="px-4">Name</div>
                  <div className="px-4">Price</div>
                  <div className="px-4">Payment</div>
                  <div className="px-4">Status</div>
                  <div className="px-4">Order Date</div>
                  <div className="px-4"></div> {/* expand/collapse icon */}
                </div>

                <div className="space-y-4 mt-4">
                  {error ? (
                    <p className="text-red-500 text-center">{error}</p>
                  ) : orders === null ? (
                    <p className="text-gray-500 text-center">
                      Loading orders...
                    </p>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4 opacity-50">📦</div>
                      <h3 className="text-2xl font-baloo font-bold text-foreground mb-2">
                        No Orders Yet
                      </h3>
                      <Button
                        variant="hero"
                        onClick={() => navigate("/products")}
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" /> Start Shopping
                      </Button>
                    </div>
                  ) : (
                    orders.map((order, index) => (
                      <div
                        key={order.id}
                        className="rounded-lg overflow-hidden border border-gray-200"
                      >
                        {/* Order Summary */}
                        <div
                          className="p-4 bg-blue-50 hover:bg-orange-100 transition cursor-pointer grid grid-cols-1 md:grid-cols-7 gap-4 items-center"
                          onClick={() => fetchOrderItems(order.id)}
                        >
                          {/* Mobile view */}
                          <div className="md:hidden flex justify-between w-full">
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                Order #{orders.length - index}
                              </h3>
                              <p className="text-sm text-gray-600">
                                ₹ {order.total_price} |{" "}
                                {new Date(order.createdAt).toLocaleString(
                                  "en-IN",
                                  {
                                    timeZone: "Asia/Kolkata",
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    second: "2-digit",
                                    hour12: false,
                                  }
                                )}
                              </p>
                              <p className="flex items-center text-green-600 text-sm">
                                <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                                {order.status === "Delivered"
                                  ? (() => {
                                      const updatedDate = new Date(
                                        order.updatedAt
                                      );
                                      const now = new Date();
                                      const diffInDays =
                                        (now.getTime() -
                                          updatedDate.getTime()) /
                                        (1000 * 60 * 60 * 24);

                                      if (diffInDays <= 3) {
                                        return (
                                          <button
                                            className="ml-2 mt-1 px-3 py-1 text-xs bg-yellow-500 text-white rounded"
                                            onClick={() => navigate("/return")}
                                          >
                                            Return
                                          </button>
                                        );
                                      } else {
                                        return "Delivered";
                                      }
                                    })()
                                  : order.status}
                              </p>
                              <p className="flex text-green-600 text-sm">
                                {order.payment_method}
                              </p>
                            </div>
                            <div className="flex items-center">
                              {expandedOrder === order.id ? (
                                <FiChevronUp />
                              ) : (
                                <FiChevronDown />
                              )}
                            </div>
                          </div>

                          {/* Desktop View */}
                          <div className="hidden md:block px-4 font-semibold">
                            {orders.length - index}
                          </div>
                          <div className="hidden md:block px-4">
                            {order.User?.name || "N/A"}
                          </div>
                          <div className="hidden md:block px-4">
                            ₹ {order.total_price}
                          </div>
                          <div className="hidden md:block px-4">
                            {order.payment_method}
                          </div>
                          <div className="hidden md:flex px-4 items-center text-green-600">
                            <span className="w-3 h-3 bg-green-500 rounded-full mr-1"></span>
                            <span>
                              {order.status === "Delivered"
                                ? (() => {
                                    const updatedDate = new Date(
                                      order.updatedAt
                                    );
                                    const now = new Date();
                                    const diffInDays =
                                      (now.getTime() - updatedDate.getTime()) /
                                      (1000 * 60 * 60 * 24);

                                    if (diffInDays <= 3) {
                                      return (
                                        <button
                                          className="ml-2 py-1 px-2 text-sm bg-yellow-500 text-white rounded"
                                          onClick={() => navigate("/return")}
                                        >
                                          Return
                                        </button>
                                      );
                                    } else {
                                      return "Delivered";
                                    }
                                  })()
                                : order.status}
                            </span>
                          </div>
                          <div className="hidden md:flex px-2 flex-col">
                            <span>
                              {new Date(order.createdAt).toLocaleDateString(
                                "en-GB",
                                {
                                  timeZone: "Asia/Kolkata",
                                  year: "numeric",
                                  month: "2-digit",
                                  day: "2-digit",
                                }
                              )}
                            </span>
                            <span className="text-xs text-gray-500">
                              {new Date(order.createdAt).toLocaleTimeString(
                                "en-GB",
                                {
                                  timeZone: "Asia/Kolkata",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                  second: "2-digit",
                                  hour12: false,
                                }
                              )}
                            </span>
                          </div>
                          <div className="hidden md:flex px-2 justify-end">
                            {expandedOrder === order.id ? (
                              <FiChevronUp />
                            ) : (
                              <FiChevronDown />
                            )}
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
                                <p className="text-gray-500">
                                  No items in this order.
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Address Tab */}
            <TabsContent value="address" className="p-6">
              {showAddressForm ? (
                <AddEditAddress
                  setActiveSection={() => {
                    // Hide the form
                    setShowAddressForm(false);

                    // Fetch the updated address after edit/add
                    const fetchUpdatedAddress = async () => {
                      if (!user?.id) return;
                      try {
                        const res = await generalApi.get(`/address/${user.id}`);
                        setAddress(res.data?.address || null);
                      } catch (err) {
                        console.error(err);
                      }
                    };
                    fetchUpdatedAddress();
                  }}
                />
              ) : address ? (
                <Card className="p-6 bg-pink-50 rounded-2xl shadow-md max-w-3xl mx-auto">
                  <h2 className="text-xl font-bold mb-6 text-pink-700 text-center">
                    Your Address
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <MdPerson className="text-pink-600" />
                      <div>
                        <p className="text-sm font-semibold">Full Name</p>
                        <p>{address.full_name}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaRegAddressCard className="text-pink-600" />
                      <div>
                        <p className="text-sm font-semibold">Address Line 1</p>
                        <p>{address.address_line1}</p>
                      </div>
                    </div>

                    {address.address_line2 && (
                      <div className="flex items-center gap-2 sm:col-span-2">
                        <FaRegAddressCard className="text-pink-600" />
                        <div>
                          <p className="text-sm font-semibold">
                            Address Line 2
                          </p>
                          <p>{address.address_line2}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <FaCity className="text-pink-600" />
                      <div>
                        <p className="text-sm font-semibold">City</p>
                        <p>{address.city}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MdLocationOn className="text-pink-600" />
                      <div>
                        <p className="text-sm font-semibold">State</p>
                        <p>{address.state}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <MdOutlineLocalPostOffice className="text-pink-600" />
                      <div>
                        <p className="text-sm font-semibold">Postal Code</p>
                        <p>{address.postal_code}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaFlag className="text-pink-600" />
                      <div>
                        <p className="text-sm font-semibold">Country</p>
                        <p>{address.country}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <FaPhoneAlt className="text-pink-600" />
                      <div>
                        <p className="text-sm font-semibold">Phone</p>
                        <p>{address.phone}</p>
                      </div>
                    </div>

                    <div className="sm:col-span-2 flex justify-between text-xs text-gray-500 mt-4">
                      <span>
                        Created: {new Date(address.createdAt).toLocaleString()}
                      </span>
                      <span>
                        Updated: {new Date(address.updatedAt).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={() => setShowAddressForm(true)}
                    variant="outline"
                    className="mt-6 border-pink-400 text-pink-700 hover:bg-pink-100 w-full sm:w-auto"
                  >
                    Edit Address
                  </Button>
                </Card>
              ) : (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4 opacity-50">🏠</div>
                  <h3 className="text-2xl font-baloo font-bold text-pink-700 mb-4">
                    No Address Found
                  </h3>
                  <Button
                    onClick={() => setShowAddressForm(true)}
                    variant="hero"
                  >
                    Add Address
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
