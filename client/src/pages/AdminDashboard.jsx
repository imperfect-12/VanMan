import { useState } from "react";
import BookingManager from "../components/BookingManager";
import MemberManager from "../components/MemberManager";

const AdminDashboard = () => {
  const [activeSecton, setActiveSection] = useState("bookings");
  return (
    <div>
      <section>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("members");
          }}
        >
          Manage Members
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("bookings");
          }}
        >
          Manage Bookings
        </button>
      </section>
      <section>
        {activeSecton === "bookings" && <BookingManager />}
        {activeSecton === "members" && <MemberManager />}
      </section>
    </div>
  );
};

export default AdminDashboard;
