import { useState, useEffect } from "react";
import {
  FiHome,
  FiPlus,
  FiList,
  FiUsers,
  FiShoppingCart,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { generalApi } from "../utils/axiosInstance";
import Cookies from "js-cookie";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import logo from "../assets/bike.png";
import rawShadesLogo from "../assets/bike.png";

interface User {
  id: string;
  email: string;
  name?: string;
  role: string;
}

interface MenuItem {
  name: string;
  path: string;
  icon: JSX.Element;
}

const AdminDashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { name: "Dashboard", path: "/admin", icon: <FiHome /> },
    { name: "Add Product", path: "/admin/product/add", icon: <FiPlus /> },
    { name: "Add Category", path: "/admin/category/add", icon: <FiPlus /> },
    { name: "Add General Images", path: "/admin/images/add", icon: <FiPlus /> },
    { name: "View Products", path: "/admin/products", icon: <FiList /> },
    { name: "View Categories", path: "/admin/categories", icon: <FiList /> },
    { name: "View General Images", path: "/admin/images", icon: <FiList /> },
    { name: "View Orders", path: "/admin/orders", icon: <FiShoppingCart /> },
    { name: "View Users", path: "/admin/users", icon: <FiUsers /> },
  ];

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await generalApi.get<{ user: User }>("/profile");
        setUser(response.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUserDetails();
  }, []);

  // Auto-close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleHomeClick = () => {
    if (user?.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  const handleLogout = async () => {
    try {
      await generalApi.post("/auth/logout");
      Cookies.remove("token");
      window.location.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="text-white px-4 py-3 flex justify-between items-center fixed w-full top-0 bg-black z-50 shadow-md">
        {/* Left Logo */}
        <div onClick={handleHomeClick} className="cursor-pointer flex-shrink-0">
          <img src={rawShadesLogo} alt="F & S toys" className="h-8 sm:h-10" />
        </div>

        {/* Center Logo (desktop only) */}
        <div
          onClick={handleHomeClick}
          className="hidden md:block absolute left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-10 md:h-14 lg:h-16 object-contain max-w-[180px]"
          />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white xl:hidden focus:outline-none text-2xl"
        >
          {sidebarOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-xl z-50 xl:z-40 xl:static fixed top-0 left-0 h-full overflow-y-auto w-64 p-5 transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full xl:translate-x-0"
          }`}
        >
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                  location.pathname === item.path
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.name}</span>
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-50 text-red-600 mt-4"
            >
              <FiLogOut />
              Log out
            </button>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 xl:hidden z-40"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto min-h-screen bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
