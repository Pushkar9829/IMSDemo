import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Sidebar from "./components/common/SideBar";
import Dashboard from "./components/dashboard/DashBoard";
import { useState, useEffect, Suspense } from "react";

const DetailsPage = React.lazy(() => import("./components/common/DetailsPage")); // Lazy load DetailsPage

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
              
              {/* Lazy Load DetailsPage */}
              <Route
                path="/detailsPage"
                element={
                  <Suspense fallback={<div className="text-center">Loading...</div>}>
                    <DetailsPage darkMode={darkMode} />
                  </Suspense>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
