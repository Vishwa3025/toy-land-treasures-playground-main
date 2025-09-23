import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api, generalApi } from "../utils/axiosInstance";
import UseUser from "../hooks/Useuser";
import { ClipLoader } from "react-spinners";
import useCartStore from "../store/CartStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OrderSuccess from "./OrderSuccess";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Add Razorpay type to the Window interface
declare global {
  interface Window {
    Razorpay?: any;
  }
}

const Checkout = () => {
  const { cart, fetchCart, clearCart } = useCartStore();
  const navigate = useNavigate();
  const { user } = UseUser();

  const [address, setAddress] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCOD, setIsCOD] = useState(false);

  const deliveryFee = isCOD ? 49.0 : 0;
  const constantPrice = 600.0;

  // Fetch cart if empty
  useEffect(() => {
    if (!cart.length) fetchCart();
  }, [cart.length]);

  // Fetch user addresses
  useEffect(() => {
    if (!user?.id) return;

    const fetchAddress = async () => {
      try {
        const res = await generalApi.get(`/address/${user.id}`);
        const fetched = res.data.address ? [res.data.address] : [];
        setAddress(fetched);
      } catch (err) {
        console.error("Error fetching address:", err);
      }
    };
    fetchAddress();
  }, [user?.id]);

  // Price calculation
  const getPriceBySize = (basePrice: number) => {
    const price = Number(basePrice) || 0;
    return price; // modify if you have size-based pricing
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + getPriceBySize(item.Product?.price) * item.quantity,
    0
  );
  const total = subtotal + deliveryFee;

  // Checkout handler
  const handleCheckout = async () => {
    if (!cart.length) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!address.length) {
      toast.error("Please add a delivery address.");
      return;
    }

    setIsLoading(true);

    try {
      const orderResponse = await api.post(
        "orders/add",
        {
          items: cart.map((item) => ({
            product_id: item.product_id,
            color: item.color,

            quantity: item.quantity,

            subtotal: getPriceBySize(item.Product?.price) * item.quantity,
          })),
          payment_method: isCOD ? "COD" : "Online",
        },
        { withCredentials: true }
      );

      const order = orderResponse.data.order;

      if (isCOD) {
        toast.success("Order placed with Cash on Delivery!");
        clearCart();
        navigate("/orderSuccess");
        return;
      }

      const paymentResponse = await api.post(
        "/payment/initiate",
        { order_id: order.id },
        { withCredentials: true }
      );

      const razorpayOrder = paymentResponse.data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: "INR",
        order_id: razorpayOrder.id,
        name: "Raw Shades",
        description: "Order Payment",
        handler: async (response: any) => {
          try {
            await api.post(
              "payment/verify",
              {
                order_id: order.id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            toast.success("Payment successful!");
            clearCart();
            navigate("/orderSuccess");
          } catch (err) {
            console.error(err);
            toast.error("Payment verification failed.");
          }
        },
        modal: {
          ondismiss: async () => {
            try {
              await api.delete(`orders/${order.id}`, { withCredentials: true });
              toast.info("Payment cancelled. Order deleted.");
            } catch (err) {
              console.error(err);
              toast.error("Order cancellation failed.");
            }
          },
        },
        theme: { color: "#ff69b4" }, // pink theme
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded.");
        return;
      }

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!cart.length)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
        <h2 className="text-3xl font-bold text-pink-700">Your cart is empty</h2>
        <Link
          to="/products"
          className="mt-4 px-6 py-2 bg-pink-600 text-white rounded"
        >
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100">
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-pink-200 rounded-full px-6 py-3 mb-6 animate-bounce">
            <span className="text-2xl mr-2">🎁</span>
            <span className="text-pink-700 font-bold text-lg">
              Secure Checkout
            </span>
          </div>
          <h1 className="text-4xl font-bold text-pink-800 mb-2">
            Almost There!
          </h1>
          <p className="text-lg text-pink-600">
            Complete your magical toy order
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section - Order & Address */}
          <div className="lg:w-2/3 space-y-6">
            {/* Order Items */}
            <Card className="bg-pink-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-pink-700">
                  Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between border-b pb-3"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.Product?.image1}
                        alt={item.Product?.name}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <div>
                        <h3 className="text-md font-semibold text-pink-700">
                          {item.Product?.name}
                        </h3>

                        <p className="text-xs text-pink-600">
                          Color: {item.color}
                        </p>
                        <p className="text-xs font-semibold">
                          Qty: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <span className="font-medium text-pink-700">
                      ₹ {getPriceBySize(item.Product?.price) * item.quantity}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Delivery Address */}
            <Card className="bg-pink-50 shadow-md">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-pink-700">
                  Delivery Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                {address.length > 0 ? (
                  address.map((addr) => (
                    <div key={addr.id} className="mb-4">
                      <p className="font-semibold text-pink-700">
                        {addr.full_name}
                      </p>
                      <p className="text-pink-600">{addr.address_line1}</p>
                      <p className="text-pink-600">
                        {addr.city}, {addr.state}, {addr.country}
                      </p>
                      <p className="text-pink-600">{addr.postal_code}</p>
                      <button
                        onClick={handleCheckout}
                        disabled={isLoading}
                        className="mt-4 w-full bg-pink-700 hover:bg-pink-800 text-white py-2 rounded-md font-semibold"
                      >
                        {isLoading ? (
                          <ClipLoader size={20} color="#fff" />
                        ) : (
                          "Place Order"
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-pink-500">
                    No addresses found.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Summary */}
          <div className="lg:w-1/3 space-y-4">
            <Card className="bg-pink-50 shadow-md p-4">
              <h3 className="text-lg font-bold text-pink-700 mb-4">
                Order Summary
              </h3>
              <div className="flex justify-between text-pink-700 mb-2">
                <span>Subtotal</span>
                <span>₹ {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-pink-700 mb-2">
                <span>Delivery Fee</span>
                <span>₹ {deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg text-pink-800 mb-4">
                <span>Total</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <input
                  type="checkbox"
                  id="cod"
                  checked={isCOD}
                  onChange={(e) => setIsCOD(e.target.checked)}
                  className="w-4 h-4 text-pink-600 border-gray-300 rounded focus:ring-pink-500"
                />
                <label htmlFor="cod" className="text-pink-700 text-sm">
                  Pay with Cash on Delivery
                </label>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
