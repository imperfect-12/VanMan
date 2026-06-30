import TopNav from "./components/TopNav";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="app-shell min-h-screen flex flex-col">
      <TopNav />
      <main className="flex-1">
        <AppRoutes />
      </main>
      <Footer />
    </div>
  );
}

export default App;
