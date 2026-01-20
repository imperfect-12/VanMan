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
    <div>
      <p>
        <strong>Customer Name:</strong> {contactDetails.name}
      </p>

      <p>
        <strong>Phone:</strong> {contactDetails.phone}
      </p>

      <p>
        <strong>Email:</strong> {contactDetails.email}
      </p>

      <p>
        <strong>Service Type:</strong> {serviceType}
      </p>

      <p>
        <strong>Service Date:</strong>{" "}
        {new Date(serviceDate).toLocaleDateString()}
      </p>

      <p>
        <strong>Status:</strong> {status}
      </p>

      <p>
        <strong>Load Size:</strong> {loadSize}
      </p>

      <p>
        <strong>Pickup:</strong> {pickupLocation.city}, {pickupLocation.area}
      </p>

      <p>
        <strong>Drop:</strong> {dropLocation.city}, {dropLocation.area}
      </p>

      {description && (
        <p>
          <strong>Description:</strong> {description}
        </p>
      )}

      <p>
        <strong>Assigned Member:</strong>{" "}
        {memberAssigned ? assignedMember?.name || "Assigned" : "Not assigned"}
      </p>

      <p>
        <strong>Booking Price:</strong> ₹{bookingPrice}
      </p>

      <p>
        <strong>Created At:</strong> {new Date(createdAt).toLocaleString()}
      </p>
      <hr />
    </div>
  );
};

export default BookingCard;
