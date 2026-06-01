import { Link } from "react-router-dom";
import logo from "../assets/Van-Man.svg";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-10 md:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            {/* <div className="p-3 rounded-full bg-slate-800">
              <img
                src={logo}
                alt="VanMan Logo"
                className="h-20 w-20 object-contain"
              />
            </div> */}

            <h2 className="text-xl font-bold text-white">VanMan</h2>
          </div>

          <p className="text-slate-400">- Young and fast.</p>

          <p className="text-slate-500 text-sm">Help Us by Helping You</p>
        </section>

        <section>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>

          <ul className="space-y-3">
            <li>
              <Link to="/" className="hover:text-blue-400 transition-colors">
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/customer"
                className="hover:text-blue-400 transition-colors"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/dashboard"
                className="hover:text-blue-400 transition-colors"
              >
                My Bookings
              </Link>
            </li>

            <li>
              <Link
                to="/admin"
                className="hover:text-blue-400 transition-colors"
              >
                Admin
              </Link>
            </li>

            <li>
              <Link
                to="/quote"
                className="hover:text-blue-400 transition-colors"
              >
                Get a Quote
              </Link>
            </li>

            <li>
              <Link
                to="/bookingpage"
                className="hover:text-blue-400 transition-colors"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} VanMan. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
