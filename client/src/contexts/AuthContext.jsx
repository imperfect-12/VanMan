import { useEffect, useState } from "react";
import { AuthContext } from "./authContextValue";
import * as authService from "../services/authService";

export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await authService.getMe();
        setUser(userData);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      const userData = await authService.getMe();
      setUser(userData);
      return userData;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Unable to log in.");
    }
  };
  const signup = async (name, email, password) => {
    try {
      await authService.signup(name, email, password);
      await authService.login(email, password);
      const userData = await authService.getMe();
      setUser(userData);
      return userData;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Unable to sign up.");
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      throw new Error(err.response?.data?.message || "Unable to log out.");
    }
  };

  const value = {
    login,
    signup,
    logout,
    user,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
