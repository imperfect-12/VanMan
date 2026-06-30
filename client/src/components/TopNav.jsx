import { Link } from "react-router-dom";
import logo from "../assets/Van-Man.svg";
import QuoteButton from "./QuoteButton";
import BookingButton from "./BookingButton";
import LogoutButton from "./LogoutButton";
import { useAuthContext } from "../contexts/useAuthContext";

const TopNav = () => {
  const { user } = useAuthContext();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <div className="flex items-center gap-3">
          <img src={logo} alt="VanMan" className="h-10 w-auto object-contain" />
          {/* <span className="text-xl font-bold text-slate-900">VanMan</span> */}
        </div>

        {!user && (
          <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-5">
            <Link
              to="/"
              className="rounded-lg px-2 py-1 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            <Link
              to="/login"
              className="rounded-lg bg-blue-600 px-5 py-2.5 font-semibold text-white shadow-sm shadow-blue-600/20 hover:bg-blue-700"
            >
              Login
            </Link>
          </nav>
        )}

        {user?.role === "customer" && (
          <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-5">
            <Link
              to="/"
              className="rounded-lg px-2 py-1 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            <Link
              to="/dashboard"
              className="rounded-lg px-2 py-1 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              Dashboard
            </Link>

            <QuoteButton />
            <BookingButton />
            <LogoutButton />
          </nav>
        )}

        {user?.role === "admin" && (
          <nav className="flex flex-wrap items-center justify-end gap-3 md:gap-5">
            <Link
              to="/"
              className="rounded-lg px-2 py-1 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            >
              Home
            </Link>

            <Link
              to="/admin"
              className="rounded-lg px-2 py-1 font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-700"
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
