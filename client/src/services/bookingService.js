import api from "../api/axios";

export const newBooking = async (bookingData) => {
  const res = await api.post("/bookings", bookingData);
  return res.data;
};

export const myBookings = async () => {
  const res = await api.get("/bookings/my");
  return res.data;
};
