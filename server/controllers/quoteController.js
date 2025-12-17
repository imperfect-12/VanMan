import Quote from "../models/quote.js";
import priceEstimation from "../utilities/priceEstimation.js";

export const createQuote = async (req, res) => {
  const { serviceType, loadSize, distance } = req.body;

  if (!serviceType || !loadSize || !distance) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  const estimatedPrice = priceEstimation(serviceType, loadSize, distance);

  res.json({
    estimatedPrice,
    meta: {
      serviceType,
      loadSize,
      vehicleType: service.vehicle,
      items,
      distance,
    },
  });
};

export const getQuotes = (req, res) => {
  res.json({
    message: "List of Quotes",
  });
};
