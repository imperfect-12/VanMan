const formatDate = (isoString) => {
  if (!isoString) return "—";

  const date = new Date(isoString);

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default formatDate;
