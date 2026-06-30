import { calculateMovingEstimate } from "../utils/pricing.js";

export const createQuote = async (req, res) => {
  try {
    const { serviceType, loadSize, distance } = req.body;

    const { estimatedPrice, meta } = calculateMovingEstimate({
      serviceType,
      loadSize,
      distance,
    });

    res.json({
      estimatedPrice,
      meta,
    });
  } catch (err) {
    console.error(err);
    res.status(err.statusCode || 500).json({
      message: err.statusCode ? err.message : "failed getting the quote",
    });
  }
};
