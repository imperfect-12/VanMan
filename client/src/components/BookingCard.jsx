const BookingCard = ({ booking }) => {
  const {
    _id,
    serviceType,
    serviceDate,
    loadSize,
    pickupLocation,
    dropLocation,
    contactDetails,
    description,
    status,
    memberAssigned,
    assignedMember,
    bookingPrice,
    createdAt,
  } = booking;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">
          {contactDetails.name}
        </h3>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full
      ${
        status === "Completed"
          ? "bg-green-100 text-green-700"
          : status === "Pending"
            ? "bg-yellow-100 text-yellow-700"
            : "bg-blue-100 text-blue-700"
      }`}
        >
          {status}
        </span>
      </div>

      <div className="grid gap-2 text-sm text-slate-600">
        <p>
          <span className="font-medium text-slate-800">Phone:</span>{" "}
          {contactDetails.phone}
        </p>

        <p>
          <span className="font-medium text-slate-800">Email:</span>{" "}
          {contactDetails.email}
        </p>

        <p>
          <span className="font-medium text-slate-800">Service:</span>{" "}
          {serviceType}
        </p>

        <p>
          <span className="font-medium text-slate-800">Date:</span>{" "}
          {new Date(serviceDate).toLocaleDateString()}
        </p>

        <p>
          <span className="font-medium text-slate-800">Load Size:</span>{" "}
          {loadSize}
        </p>

        <p>
          <span className="font-medium text-slate-800">Pickup:</span>{" "}
          {pickupLocation.city}, {pickupLocation.area}
        </p>

        <p>
          <span className="font-medium text-slate-800">Drop:</span>{" "}
          {dropLocation.city}, {dropLocation.area}
        </p>

        {description && (
          <p>
            <span className="font-medium text-slate-800">Description:</span>{" "}
            {description}
          </p>
        )}

        <p>
          <span className="font-medium text-slate-800">Assigned Member:</span>{" "}
          {memberAssigned ? assignedMember?.name || "Assigned" : "Not assigned"}
        </p>

        <p>
          <span className="font-medium text-slate-800">Booking Price:</span>{" "}
          <span className="text-blue-600 font-semibold">₹{bookingPrice}</span>
        </p>
      </div>

      <div className="pt-3 border-t border-slate-200">
        <p className="text-xs text-slate-500">
          Created {new Date(createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default BookingCard;
