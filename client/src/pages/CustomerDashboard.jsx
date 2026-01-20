import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/AuthContext";
import { myBookings } from "../services/bookingService";
import BookingCard from "../components/BookingCard";

const CustomerDashboard = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await myBookings();
        setBookings(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>Hello! {user.name}</h2>
      <section>
        <h3>My Bookings</h3>
        <div>
          {bookings.map((booking) => (
            <BookingCard booking={booking} key={booking._id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CustomerDashboard;
