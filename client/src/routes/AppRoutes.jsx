import { Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import QuoteForm from "../pages/QuoteForm";
import BookingDetail from "../pages/BookingDetail";
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
        <Route path="/booking/:id" element={<BookingDetail />} />
        <Route path="/customer" element={<CustomerDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/bookingpage" element={<BookingPage />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;
