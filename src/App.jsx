import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Lazy load components
const Header = lazy(() => import("./components/common/Header"));
const Sidebar = lazy(() => import("./components/common/SideBar"));
const Dashboard = lazy(() => import("./components/dashboard/DashBoard"));
const DetailsPage = lazy(() => import("./components/common/DetailsPage"));

const App = () => {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <div className={`min-h-screen flex ${darkMode ? "dark bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
          
          {/* Sidebar */}
          <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />

          {/* Main Content with Scrollable Area */}
          <div className="flex flex-col flex-grow h-screen overflow-hidden">
            
            {/* Header */}
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />

            {/* Page Routes */}
            <div className="flex-grow overflow-y-auto p-10">
              <Routes>
                <Route path="/" element={<Dashboard darkMode={darkMode} />} />
                <Route path="/detailsPage" element={<DetailsPage darkMode={darkMode} />} />
              </Routes>
            </div>
          </div>
        </div>
      </Suspense>
    </Router>
  );
};

export default App;
