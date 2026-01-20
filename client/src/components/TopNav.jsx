import { Link } from "react-router-dom";
import logo from "../assets/Van-Man.svg";
import QuoteButton from "./QuoteButton";
import BookingButton from "./BookingButton";
import LogoutButton from "./LogoutButton";
import { getMe } from "../services/authService";
import { useEffect, useState } from "react";

const TopNav = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await getMe();
      setUser(userData);
    };
    getUser();
  }, []);
  return (
    <header>
      <div>
        <img src={logo} alt="VanMan" />
      </div>
      {user?.role === "customer" && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <QuoteButton />
          <BookingButton />
          <LogoutButton />
        </nav>
      )}
      {user?.role === "admin" && (
        <nav>
          <Link to="/">Home</Link>
          <Link to="/admin">Admin Dashboard</Link>
          <LogoutButton />
        </nav>
      )}
    </header>
  );
};

export default TopNav;
