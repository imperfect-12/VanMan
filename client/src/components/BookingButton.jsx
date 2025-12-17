import { Link } from "react-router-dom";

const BookingButton = () => {
  return (
    <div>
      <button>
        <Link to="/bookingpage">Book Now</Link>
      </button>
    </div>
  );
};

export default BookingButton;
