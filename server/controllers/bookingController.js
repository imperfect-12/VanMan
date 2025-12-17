import Booking from "../models/booking.js";

export const createBooking = async (req, res) => {
  try {
    const { serviceType, loadType, pickupLocation, dropLocation } = req.body;
    const booking = await Booking.Create({
      user: req.user.id,
      serviceType,
      loadType,
      pickupLocation,
      dropLocation,
    });
    res.status(201).json(booking);
  } catch {
    res.status(500).json({ message: "Failed to create booking" });
  }
};
export const getBookings = (req, res) => {};
