import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Sidebar from "./components/layout/sidebar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transaction";
import Insights from "./pages/insights";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAbout = location.pathname === "/about";
  const showSidebar = !isHome && !isAbout;

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {showSidebar && <Sidebar />}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1 overflow-auto">
          <div className={isHome || isAbout ? "" : "max-w-7xl mx-auto p-4 lg:p-6"}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
