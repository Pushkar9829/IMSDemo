import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, CategoryScale);

const realTimeData = {
  labels: ["1s", "2s", "3s", "4s", "5s", "6s"],
  datasets: [
    { label: "CPU Usage", data: [20, 35, 40, 30, 45, 50], borderColor: "#3B82F6", fill: false },
    { label: "Memory Usage", data: [30, 40, 50, 45, 55, 60], borderColor: "#F59E0B", fill: false },
  ],
};

const historicalData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    { label: "Power Consumption", data: [100, 150, 130, 160, 170, 180], borderColor: "#10B981", fill: false },
    { label: "Network Usage", data: [200, 180, 190, 210, 220, 230], borderColor: "#EF4444", fill: false },
  ],
};

const DetailsPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-all`}>
      
      {/* Header with Dark Mode Toggle */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Site Details</h1>
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-lg bg-gray-700/10 hover:bg-gray-700/20 transition-colors">
          {darkMode ? <FiSun className="w-6 h-6" /> : <FiMoon className="w-6 h-6" />}
        </button>
      </div>

      {/* Alarm Notification Bar */}
      <motion.div className="mb-6 p-4 rounded-xl bg-red-700/20 text-red font-semibold shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        ⚠️ Alert: High CPU usage detected!
      </motion.div>

      {/* Site Information */}
      <motion.div className={`p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h2 className="text-lg font-semibold mb-2">Site Name: Delhi</h2>
        <p className="text-sm text-gray-400">Location: Delhi</p>
        <p className="text-sm text-gray-400">Status: Active</p>
      </motion.div>

      {/* Real-Time Graph */}
      <motion.div className={`mt-6 p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-semibold mb-4">Real-Time Performance</h2>
        <Line data={realTimeData} />

        {/* Download Buttons */}
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Download CSV</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Download Excel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Download PDF</button>
        </div>
      </motion.div>

      {/* Historical Graph */}
      <motion.div className={`mt-6 p-6 rounded-xl shadow-lg ${darkMode ? "bg-gray-800" : "bg-white"}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-lg font-semibold mb-4">Historical Performance</h2>
        <Line data={historicalData} />

        {/* Download Buttons */}
        <div className="mt-4 flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Download CSV</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Download Excel</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-lg">Download PDF</button>
        </div>
      </motion.div>
    </div>
  );
};

export default DetailsPage;
