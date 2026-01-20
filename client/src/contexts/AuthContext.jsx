import { useContext, createContext, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import * as authService from "../services/authService";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

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
      const userData = authService.getMe();
      setUser(userData);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
    // await authService.login(email, password);
    // const userData = await authService.getMe();
    // setUser(userData);
  };
  const signup = async (name, email, password) => {
    try {
      await authService.signup(name, email, password);
      await authService.login(email, password);
      const userData = authService.getMe();
      setUser(userData);
    } catch (err) {
      console.log(err.response?.data?.message);
    }
    // await authService.signup(name, email, password);
    // await authService.login(email, password);
    // const userData = await authService.getMe();
    // setUser(userData);
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (err) {
      console.log(err.response?.data?.message);
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
