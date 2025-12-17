const priceEstimation = (serviceType, loadSize, distance) => {
  const SERVICE_CONFIG = {
    "small-parcel": { vehicle: "bike", baseItems: 1 },
    furniture: { vehicle: "van", baseItems: 5 },
    "house-move": { vehicle: "truck", baseItems: 15 },
    "helper-only": { vehicle: "van", baseItems: 0 },
  };

  const LOAD_MULTIPLIER = {
    small: 0.5,
    medium: 1,
    large: 1.5,
  };

  const BASE_PRICE = 300;
  const PRICE_PER_KM = 20;
  const PRICE_PER_ITEM = 50;

  const service = SERVICE_CONFIG[serviceType];
  if (!service) {
    return res.status(400).json({ message: "Invalid service type" });
  }

  const loadMultiplier = LOAD_MULTIPLIER[loadSize];
  if (!loadMultiplier) {
    return res.status(400).json({ message: "Invalid load size" });
  }

  const items = Math.round(service.baseItems * loadMultiplier);
  const distanceCost = distance * PRICE_PER_KM;
  const itemsCost = items * PRICE_PER_ITEM;

  const estimatedPrice = Math.round(BASE_PRICE + distanceCost + itemsCost);
  return estimatedPrice;
};
