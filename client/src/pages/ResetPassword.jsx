import { useState } from "react";
import { generalApi } from "../utils/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import rawShadesLogo from "../../assets/images/rawshades.png";
import { Eye, EyeOff } from "lucide-react"; // or use from react-icons

const ResetPassword = () => {
  const { email, token } = useParams();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleReset = async () => {
    try {
      const response = await generalApi.post(
        "/auth/reset-password",
        { email, token, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        toast.success("Password Reset Successful! Go back and login.");
        setTimeout(() => navigate("/login"), 3000);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="bg-black py-3 px-4">
        {/* <img src={rawShadesLogo} alt="LittledreamersToys" className="h-12" /> */}
      </div>
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <ToastContainer position="top-center" />
        <h1 className="text-3xl font-bold text-center mb-4">Reset Password</h1>
        <div className="relative mt-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter new Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white/80 pr-10"
            value={password}
            onChange={(e) => {
              const value = e.target.value;
              setPassword(value);
              if (validatePassword(value)) {
                setPasswordError("");
              }
            }}
          />
          <div
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </div>
        </div>

        <button
          onClick={handleReset}
          className="w-full flex justify-center items-center text-white py-3 px-4 my-4 rounded-lg bg-black transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Reset Password
        </button>
      </div>
    </>
  );
};

export default ResetPassword;
