// Authentication Module for SAMVAD Dashboard
// File: /components/auth/AuthProvider.tsx

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define Types
interface User {
  id: string;
  token: string;
  roles: string[];
  twoFactorEnabled?: boolean;
  preferences?: Record<string, any>;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (
    username: string,
    password: string,
    twoFactorCode?: string
  ) => Promise<any>;
  logout: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<any>;
  resetPassword: (token: string, newPassword: string) => Promise<any>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<any>;
  setupTwoFactor: () => Promise<any>;
  verifyTwoFactorSetup: (code: string) => Promise<any>;
  disableTwoFactor: (password: string) => Promise<any>;
  updatePreferences: (preferences: Record<string, any>) => Promise<any>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);
        validateToken(parsedUser.token);
      } catch (e) {
        console.error("Failed to parse stored user:", e);
        localStorage.removeItem("auth_user");
      }
    } else {
      setLoading(false);
    }
  }, []);

  const validateToken = async (token: string) => {
    try {
      const response = await axios.post("/api/auth/validate", { token });
      if (!response.data.valid) logout();
      setLoading(false);
    } catch (e) {
      console.error("Token validation failed:", e);
      logout();
      setLoading(false);
    }
  };

  const login = async (
    username: string,
    password: string,
    twoFactorCode?: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
        twoFactorCode,
      });
      const userData: User = response.data;
      if (userData.requiresTwoFactor) {
        setLoading(false);
        return { requiresTwoFactor: true };
      }
      setUser(userData);
      localStorage.setItem("auth_user", JSON.stringify(userData));
      setLoading(false);
      return { success: true };
    } catch (e: any) {
      const errorMsg =
        e.response?.data?.message || "Login failed. Please try again.";
      setError(errorMsg);
      setLoading(false);
      return { error: errorMsg };
    }
  };

  const logout = async () => {
    if (user) {
      try {
        await axios.post("/api/auth/logout", { token: user.token });
      } catch (e) {
        console.error("Logout API call failed:", e);
      }
    }
    setUser(null);
    localStorage.removeItem("auth_user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        requestPasswordReset: async (email) =>
          axios.post("/api/auth/request-password-reset", { email }),
        resetPassword: async (token, newPassword) =>
          axios.post("/api/auth/reset-password", { token, newPassword }),
        changePassword: async (currentPassword, newPassword) =>
          axios.post("/api/auth/change-password", {
            userId: user?.id,
            token: user?.token,
            currentPassword,
            newPassword,
          }),
        setupTwoFactor: async () =>
          axios.post("/api/auth/setup-two-factor", {
            userId: user?.id,
            token: user?.token,
          }),
        verifyTwoFactorSetup: async (code) =>
          axios.post("/api/auth/verify-two-factor", {
            userId: user?.id,
            token: user?.token,
            code,
          }),
        disableTwoFactor: async (password) =>
          axios.post("/api/auth/disable-two-factor", {
            userId: user?.id,
            token: user?.token,
            password,
          }),
        updatePreferences: async (preferences) =>
          axios.post("/api/user/preferences", {
            userId: user?.id,
            token: user?.token,
            preferences,
          }),
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const ProtectedRoute: React.FC<{
  children: ReactNode;
  requiredRole?: string;
}> = ({ children, requiredRole }) => {
  const { user, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/login");
    } else if (
      !loading &&
      isAuthenticated &&
      requiredRole &&
      !user?.roles.includes(requiredRole)
    ) {
      navigate("/unauthorized");
    }
  }, [loading, isAuthenticated, navigate, requiredRole, user]);

  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated || (requiredRole && !user?.roles.includes(requiredRole)))
    return null;
  return <>{children}</>;
};
