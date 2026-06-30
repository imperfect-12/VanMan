import { useState, useEffect } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
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
    return <p className="py-12 text-center text-slate-500">Loading...</p>;
  }
  return (
    <div className="min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div className="surface-panel rounded-lg p-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-950">
            Hello, {user.name}
          </h2>

          <p className="mt-2 text-slate-600">
            Manage and track all your bookings from one place.
          </p>
        </div>

        {/* Bookings Section */}
        <section className="surface-panel rounded-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-slate-900">
              My Bookings
            </h3>

            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {bookings.length} Booking{bookings.length !== 1 ? "s" : ""}
            </span>
          </div>

          {bookings.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50/70 py-12 text-center">
              <p className="text-slate-500">You don't have any bookings yet.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {bookings.map((booking) => (
                <BookingCard booking={booking} key={booking._id} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default CustomerDashboard;
