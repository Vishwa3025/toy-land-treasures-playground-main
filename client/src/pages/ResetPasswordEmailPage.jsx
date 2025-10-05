import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { generalApi, api } from "../utils/axiosInstance";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPasswordEmailPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [garamImage, setGaramImage] = useState(null);
  const navigate = useNavigate();

  const glassmorphism =
    "bg-white/10 backdrop-blur-md border border-white/30 shadow-lg rounded-2xl p-6 hover:shadow-xl transition duration-300";

  useEffect(() => {
    const fetchImageByTitle = async () => {
      try {
        const title = "loginBg"; // The title you want to fetch
        const response = await api.get(
          `/images/title/${encodeURIComponent(title)}`
        );

        if (response.data && response.data.imageUrl) {
          setGaramImage(response.data.imageUrl);
        }
      } catch (err) {
        console.error("Error fetching image:", err);
      }
    };

    fetchImageByTitle();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await generalApi.post("/auth/forgot-password", {
        email,
      });

      if (response.status === 200) {
        toast.success("Check your email for the password reset link!", {
          autoClose: 5000,
          onClose: () => {
            navigate("/login");
          },
        });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex justify-center items-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: garamImage ? `url(${garamImage})` : "none" }}>
      <ToastContainer position="top-center" />

      <div
        className={`${glassmorphism} w-full max-w-md mx-4 border relative`}>
        <h1 className="text-3xl font-bold text-black text-center mb-4">
          Reset Password
        </h1>
        <p className="text-black text-center mb-6">
          Enter your email to receive a password reset link.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-black mb-1"
              htmlFor="email">
              Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none bg-white/80"
              required
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center items-center text-white py-3 px-4 rounded-lg bg-black transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}>
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordEmailPage;
