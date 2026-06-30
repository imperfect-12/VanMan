import { Routes, Route } from "react-router-dom";
import QuoteForm from "../pages/QuoteForm";
import Home from "../pages/Home";
import CustomerDashboard from "../pages/CustomerDashboard";
import AdminDashboard from "../pages/AdminDashboard";
import BookingPage from "../pages/BookingPage";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/home"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route
          path="/quote"
          element={
            <ProtectedRoute>
              <QuoteForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <CustomerDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookingpage"
          element={
            <ProtectedRoute allowedRoles={["customer"]}>
              <BookingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default AppRoutes;
