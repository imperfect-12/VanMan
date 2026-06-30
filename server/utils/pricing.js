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

const badRequest = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  return error;
};

export const calculateMovingEstimate = ({ serviceType, loadSize, distance }) => {
  if (!serviceType || !loadSize || distance === undefined || distance === "") {
    throw badRequest("all fields are required");
  }

  const service = SERVICE_CONFIG[serviceType];
  if (!service) {
    throw badRequest("Invalid service type");
  }

  const loadMultiplier = LOAD_MULTIPLIER[loadSize];
  if (!loadMultiplier) {
    throw badRequest("Invalid load size");
  }

  const numericDistance = Number(distance);
  if (!Number.isFinite(numericDistance) || numericDistance <= 0) {
    throw badRequest("Distance must be greater than 0");
  }

  const items = Math.round(service.baseItems * loadMultiplier);
  const distanceCost = numericDistance * PRICE_PER_KM;
  const itemsCost = items * PRICE_PER_ITEM;
  const estimatedPrice = Math.round(BASE_PRICE + distanceCost + itemsCost);

  return {
    estimatedPrice,
    meta: {
      serviceType,
      loadSize,
      vehicleType: service.vehicle,
      items,
      distance: numericDistance,
    },
  };
};
