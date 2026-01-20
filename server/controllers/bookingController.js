import Booking from "../models/booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      serviceType,
      loadSize,
      pickupLocation,
      dropLocation,
      serviceDate,
      contactDetails,
      description,
    } = req.body;

    if (
      !serviceType ||
      !loadSize ||
      !pickupLocation ||
      !dropLocation ||
      !serviceDate ||
      !contactDetails
    ) {
      return res.status(400).json({
        message: "all fields reqired",
      });
    }
    const booking = await Booking.create({
      user: req.user.id,
      serviceType,
      loadSize,
      pickupLocation,
      dropLocation,
      serviceDate,
      contactDetails,
      description,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create booking" });
  }
};
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.json({ message: "Error fetching bookings" });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.json({ message: "Error fetching bookings" });
  }
};
