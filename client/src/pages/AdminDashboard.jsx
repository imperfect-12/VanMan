import { useState } from "react";
import BookingManager from "../components/BookingManager";
import MemberManager from "../components/MemberManager";

const AdminDashboard = () => {
  const [activeSecton, setActiveSection] = useState("bookings");
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <section className="flex gap-3 border-b border-slate-200 pb-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("members");
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSecton === "members"
              ? "bg-blue-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Manage Members
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            setActiveSection("bookings");
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeSecton === "bookings"
              ? "bg-blue-600 text-white"
              : "text-slate-700 hover:bg-slate-100"
          }`}
        >
          Manage Bookings
        </button>
      </section>

      <section className="bg-white border border-slate-200 rounded-xl p-6">
        {activeSecton === "bookings" && <BookingManager />}
        {activeSecton === "members" && <MemberManager />}
      </section>
    </div>
  );
};

export default AdminDashboard;
