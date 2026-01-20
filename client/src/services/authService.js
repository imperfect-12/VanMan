import api from "../api/axios";

export const signup = async (name, email, password) => {
  const res = api.post("/auth/register", {
    name,
    email,
    password,
  });
  return res.data;
};

export const login = async (email, password) => {
  const res = await api.post("/auth/login", {
    email,
    password,
  });
  return res.data;
};

export const getMe = async () => {
  const res = await api.get("/auth/me");
  return res.data;
};
export const logout = async () => {
  const res = await api.post("/auth/logout");
};
