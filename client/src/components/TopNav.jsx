import { Link } from "react-router-dom";
import logo from "../assets/Van-Man.svg";
import QuoteButton from "./QuoteButton";
import BookingButton from "./BookingButton";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const TopNav = () => {
  const { user } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="w-full px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src={logo} alt="VanMan" className="h-10 w-auto object-contain" />
          {/* <span className="text-xl font-bold text-slate-900">VanMan</span> */}
        </div>

        {user?.role === "customer" && (
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Dashboard
            </Link>

            <QuoteButton />
            <BookingButton />
            <LogoutButton />
          </nav>
        )}

        {user?.role === "admin" && (
          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Home
            </Link>

            <Link
              to="/admin"
              className="text-slate-700 hover:text-blue-600 font-medium transition-colors"
            >
              Admin Dashboard
            </Link>

            <LogoutButton />
          </nav>
        )}
      </div>
    </header>
  );
};

export default TopNav;
