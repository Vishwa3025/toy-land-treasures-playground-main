import { useEffect, useState, FormEvent } from "react";
import UseUser from "../hooks/UseUser";
import { generalApi } from "../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToyBackground from "../components/ToyBackground";

// Define user type from your hook (adjust fields if more exist)
interface User {
  name: string;
  email: string;
}

// Define password state type
interface Passwords {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const AdminAccount = () => {
  const { user }: { user: User | null } = UseUser();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [passwords, setPasswords] = useState<Passwords>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user?.name) {
      setUsername(user.name);
    }
  }, [user]);

  const handleSaveChanges = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!username && !passwords.currentPassword) {
        toast.error("No changes detected!");
        return;
      }

      if (
        passwords.newPassword &&
        passwords.newPassword !== passwords.confirmPassword
      ) {
        toast.error("New password and confirm password do not match!");
        return;
      }

      await generalApi.put("/account/update", {
        name: username !== user?.name ? username : null,
        currentPassword: passwords.currentPassword || null,
        newPassword: passwords.newPassword || null,
      });

      toast.success("Profile updated successfully!");
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error: any) {
      console.error(error);

      const errMsg =
        error?.response?.data?.message || "Failed to update account.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="account" className="section p-4 sm:p-6 relative">
      <ToyBackground />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="bg-white rounded-xl shadow-2xl p-3 sm:p-10 max-w-3xl mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Admin Account Settings
        </h2>

        <form onSubmit={handleSaveChanges} className="space-y-6">
          {user ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg font-medium text-gray-500">
                  {user.email}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-600">Loading user data...</p>
          )}

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminAccount;
