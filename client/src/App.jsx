import TopNav from "./components/TopNav";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Login from "./pages/Login.jsx";
import { useAuthContext } from "./contexts/AuthContext.jsx";

// MONGODB_URI=mongodb+srv://bishtprashant:NgE4NXmrfZcb7imz@cluster0.hfaznri.mongodb.net/
// JWT_SECRET=c3deed6ccd1bee6f22ea401fbe13d99d34272516b44833bd147e36e5f330533ccd
// NODE_ENV=development
// PORT=3000

function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div>
      {isAuthenticated ? (
        <>
          <TopNav />
          <AppRoutes />
          <Footer />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
