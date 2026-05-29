import { Link } from "react-router-dom";

const BookingButton = () => {
  return (
    <div className="flex justify-center">
      <button
        className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg
               hover:bg-blue-700 transition-colors duration-200
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <Link to="/bookingpage">Book Now</Link>
      </button>
    </div>
  );
};

export default BookingButton;
