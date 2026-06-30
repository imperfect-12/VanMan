import { useContext } from "react";
import { AuthContext } from "./authContextValue";

export const useAuthContext = () => useContext(AuthContext);
