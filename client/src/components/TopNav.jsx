import { Link } from "react-router-dom";
import logo from "../assets/Van-Man.svg";
import QuoteButton from "./QuoteButton";
import BookingButton from "./BookingButton";

const TopNav = () => {
  return (
    <header>
      <div>
        <img src={logo} alt="VanMan" />
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/customer">Dashboard</Link>
        <Link to="/booking/:id">My Bookings</Link>
        <Link to="/admin">Admin</Link>
        <QuoteButton />
        <BookingButton />
      </nav>
    </header>
  );
};

export default TopNav;
