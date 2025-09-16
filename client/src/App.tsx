import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { generalApi } from "@/utils/axiosInstance";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";

// Pages
import Index from "./pages/Index";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

// Admin pages
import AdminDashboard from "./components/AdminDashboard";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AddProduct from "./pages/AddProduct";
import AddCategory from "./pages/AddCategory";
import AdminCategoriesList from "./pages/AdminCategoriesList";
import AdminProductsList from "./pages/AdminProductsList";
import AddGeneralImage from "./pages/AddGeneralImage";
import AdminGeneralImagesList from "./pages/AdminGeneralImagesList";
import AdminOrders from "./pages/AdminOrders";
import AllUsers from "./pages/AllUsers";
import AdminAccount from "./pages/AdminAccount";

const queryClient = new QueryClient();

/** ✅ Protected Route Component */
const ProtectedRoute = ({ allowedRoles, element }) => {
  const location = useLocation();
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    role: null,
    loading: true,
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await generalApi.get("/protected/verify", {
          withCredentials: true,
        });
        setAuth({
          isAuthenticated: true,
          role: response.data.role,
          loading: false,
        });
      } catch (error) {
        console.error("❌ Auth Check Failed:", error.response?.data || error);
        setAuth({ isAuthenticated: false, role: null, loading: false });
      }
    };
    verifyAuth();
  }, []);

  if (auth.loading) return <div>Loading...</div>;

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <CartProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/category/:categoryId"
                  element={<CategoryPage />}
                />
                <Route
                  path="/product/:productId"
                  element={<ProductDetails />}
                />

                {/* Customer Protected Routes */}
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute
                      element={<Cart />}
                      allowedRoles={["customer"]}
                    />
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute
                      element={<Checkout />}
                      allowedRoles={["customer"]}
                    />
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute
                      element={<Profile />}
                      allowedRoles={["customer"]}
                    />
                  }
                />

                {/* Admin Protected Routes */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute
                      element={<AdminDashboard />}
                      allowedRoles={["admin"]}
                    />
                  }
                >
                  <Route index element={<AdminDashboardPage />} />
                  <Route path="product/add" element={<AddProduct />} />
                  <Route path="category/add" element={<AddCategory />} />
                  <Route path="images/add" element={<AddGeneralImage />} />
                  <Route path="products" element={<AdminProductsList />} />
                  <Route path="categories" element={<AdminCategoriesList />} />
                  <Route path="orders" element={<AdminOrders />} />
                  <Route path="images" element={<AdminGeneralImagesList />} />

                  <Route path="users" element={<AllUsers />} />
                  <Route path="account" element={<AdminAccount />} />
                </Route>

                {/* Catch-all */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </CartProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
