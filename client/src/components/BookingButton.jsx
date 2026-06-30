import { Link } from "react-router-dom";

const BookingButton = () => {
  return (
    <div className="flex justify-center">
      <Link
        to="/bookingpage"
        className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm shadow-blue-600/20
               hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/25
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Book Now
      </Link>
    </div>
  );
};

export default BookingButton;
