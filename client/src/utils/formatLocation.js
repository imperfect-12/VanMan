const formatLocation = (location) => {
  if (!location) return "—";

  const { area, city } = location;

  if (!area && !city) return "—";

  if (area && city) return `${area}, ${city}`;

  return area || city;
};
export default formatLocation;
