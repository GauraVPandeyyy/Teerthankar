// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import * as api from "../services/api";

interface User {
  id: number | string;
  email?: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Helper: clean logout
  const localLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  // Axios auto logout only when user truly needs logout
  useEffect(() => {
    api.registerLogoutHandler(() => {
      // DO NOT force logout during refresh loading
      if (!isLoading) localLogout();
    });
  }, [isLoading]);

  // Restore session on refresh
  useEffect(() => {
    (async () => {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (!savedToken) {
        setIsLoading(false);
        return;
      }

      setToken(savedToken);

      // Load cached user immediately (prevents UI flicker/logout)
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      // Try to refresh user profile silently
      try {
        const profile = await api.getProfile();

        // If backend profile is wrapped inside {data}
        const finalUser = profile?.data || profile || null;

        if (finalUser) {
          setUser(finalUser);
          localStorage.setItem("user", JSON.stringify(finalUser));
        }
      } catch (e) {
        // Don't logout on profile error — keep user logged in
        console.warn("Profile fetch failed, using cached user instead.");
      }

      setIsLoading(false);
    })();
  }, []);

  // Normal login
  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      const res = await api.login(email, password);
      const token = res.token;
      const userId = res.user;

      localStorage.setItem("token", token);
      setToken(token);

      setUser({ id: userId });

      // try to fetch profile
      try {
        const profile = await api.getProfile();
        const finalUser = profile?.data || profile;
        setUser(finalUser);
        localStorage.setItem("user", JSON.stringify(finalUser));
      } catch {
        // fallback to basic user
        setUser({ id: userId });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Logout by user action
  const logout = async () => {
    try {
      await api.logout();
    } catch {}
    localLogout();
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem("user", JSON.stringify(updated));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
