import React, { createContext, useContext, useState, useEffect } from 'react';
import { generalApi, api } from "../utils/axiosInstance";

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
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Restore user from backend session on mount
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await generalApi.get("/protected/profile", {
          withCredentials: true,
        });
        if (response.data?.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // ✅ Login with backend
  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const res = await generalApi.post(
        "/auth/login",
        { email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      console.log(res);
      
      if (res.data?.user) {
        setUser(res.data.user);
      return { success: true, user: res.data.user };
      }
      return { success: false };
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    }
  };

  // ✅ Signup with backend
  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await generalApi.post(
        "/auth/register",
        { name, email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      if (res.data?.user) {
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  // ✅ Logout with backend
  const logout = async () => {
    try {
      await generalApi.post("/auth/logout", {}, { withCredentials: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  // ⚡ Prevent flicker: wait until `loading` finishes before rendering children
  if (loading) return <div>Loading...</div>;

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
