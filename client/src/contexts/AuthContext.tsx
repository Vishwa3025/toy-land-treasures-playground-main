import React, { createContext, useContext, useState, useEffect } from "react";
import { generalApi } from "../utils/axiosInstance";

interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

interface LoginResult {
  success: boolean;
  user?: User;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<LoginResult>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUser: () => Promise<void>; // ✅ Added for Profile page
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user from backend session on mount
  useEffect(() => {
    refreshUser();
  }, []);

  // ✅ Fetch user profile from backend
  const refreshUser = async () => {
    try {
      const response = await generalApi.get("/profile", { withCredentials: true });
      if (response.data) {
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      await generalApi.post(
        "/auth/login",
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // fetch full profile after login
      const res = await generalApi.get("/profile", { withCredentials: true });
      if (res.data) {
        setUser(res.data);
        return { success: true, user: res.data };
      }
      return { success: false };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false };
    }
  };

  // ✅ Signup
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      await generalApi.post(
        "/auth/register",
        { name, email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // fetch full profile after signup
      const res = await generalApi.get("/profile", { withCredentials: true });
      if (res.data) {
        setUser(res.data);
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
  };

  // ✅ Logout
  const logout = async () => {
    try {
      await generalApi.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    refreshUser, // expose so Profile page can call it manually
    isAuthenticated: !!user,
  };

  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
