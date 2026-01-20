import api from "../api/axios";

export const getQuote = async (serviceType, loadSize, distance) => {
  const res = await api.post("/quotes", {
    serviceType,
    loadSize,
    distance,
  });
  return res.data;
};
