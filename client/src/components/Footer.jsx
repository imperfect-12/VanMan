import { Link } from "react-router-dom";
import logo from "../assets/Van-Man.svg";

const Footer = () => {
  return (
    <footer>
      <section>
        <h2>VanMan - young and fast</h2>
        <p>Help Us by Helping You</p>
        <img src={logo} alt="VanMan Logo" />
      </section>
      <section>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/customer">Dashboard</Link>
          </li>
          <li>
            <Link to="/booking/:id">My Bookings</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/quote">Get a Quote</Link>
          </li>
          <li>
            <Link to="/bookingpage">Book Now</Link>
          </li>
        </ul>
      </section>
    </footer>
  );
};

export default Footer;
