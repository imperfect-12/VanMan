import { Routes, Route } from "react-router-dom";
import QuoteForm from "../pages/QuoteForm";
import Home from "../pages/Home";
import CustomerDashboard from "../pages/CustomerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import BookingPage from "../pages/BookingPage";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path="/quote" element={<QuoteForm />} />
        <Route path="/dashboard" element={<CustomerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/bookingpage" element={<BookingPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
