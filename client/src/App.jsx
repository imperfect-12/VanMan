import TopNav from "./components/Topnav";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Login from "./pages/Login.jsx";
import { useAuthContext } from "./contexts/AuthContext.jsx";

function App() {
  const { logged } = useAuthContext();
  return (
    <div>
      {logged ? (
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
