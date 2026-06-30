import { useState } from "react";
import BookingManager from "../components/BookingManager";
import MemberManager from "../components/MemberManager";

const AdminDashboard = () => {
  const [activeSecton, setActiveSection] = useState("bookings");
  return (
    <div className="mx-auto min-h-screen max-w-7xl space-y-6 p-5 md:p-6">
      <section className="flex flex-wrap gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("members");
          }}
          className={`rounded-lg px-4 py-2 font-semibold shadow-sm ${
            activeSecton === "members"
              ? "bg-blue-600 text-white"
              : "bg-white/70 text-slate-700 hover:bg-slate-100"
          }`}
        >
          Manage Members
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("bookings");
          }}
          className={`rounded-lg px-4 py-2 font-semibold shadow-sm ${
            activeSecton === "bookings"
              ? "bg-blue-600 text-white"
              : "bg-white/70 text-slate-700 hover:bg-slate-100"
          }`}
        >
          Manage Bookings
        </button>
      </section>

      <section className="surface-panel rounded-lg p-4 md:p-6">
        {activeSecton === "bookings" && <BookingManager />}
        {activeSecton === "members" && <MemberManager />}
      </section>
    </div>
  );
};

export default AdminDashboard;
