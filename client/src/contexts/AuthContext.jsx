import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [logged, setLogged] = useState(true);

  const value = {
    logged,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
