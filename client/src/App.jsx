import TopNav from "./components/TopNav";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";
import Login from "./pages/Login.jsx";
import { useAuthContext } from "./contexts/AuthContext.jsx";

function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      {isAuthenticated ? (
        <>
          <TopNav />
          <main className="flex-1">
            <AppRoutes />
          </main>
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
