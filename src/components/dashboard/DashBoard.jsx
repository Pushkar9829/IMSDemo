import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { AiOutlineUser, AiOutlineShoppingCart, AiOutlineDollarCircle } from "react-icons/ai";
import { FaNewspaper } from "react-icons/fa";

const stats = [
  { id: 1, title: "Partially Active Sites", value: "1,294", icon: "🟡", bgColor: "bg-yellow-400" },
  { id: 2, title: "Active Sites", value: "345", icon: "✅", bgColor: "bg-green-500" },
  { id: 3, title: "Not Active Sites", value: "1,303", icon: "❌", bgColor: "bg-red-400" },
  { id: 4, title: "Pending Sites", value: "576", icon: "⏳", bgColor: "bg-blue-500" },
];

const deviceReadings = [
  { id: 1, name: "Temperature Sensor", value: "24°C", status: "Normal" },
  { id: 2, name: "Voltage Monitor", value: "12V", status: "Stable" },
  { id: 3, name: "Current Sensor", value: "3A", status: "Warning" },
];

// Locations in India with status categories
const locations = [
  { id: 1, lat: 28.7041, lng: 77.1025, name: "Delhi", status: "Active" },
  { id: 2, lat: 19.076, lng: 72.8777, name: "Mumbai", status: "Partially Active" },
  { id: 3, lat: 12.9716, lng: 77.5946, name: "Bangalore", status: "Pending" },
  { id: 4, lat: 13.0827, lng: 80.2707, name: "Chennai", status: "Not Active" },
  { id: 5, lat: 22.5726, lng: 88.3639, name: "Kolkata", status: "Active" },
];

// Assigning colors based on site status
const getStatusColor = (status) => {
  switch (status) {
    case "Active":
      return "blue";
    case "Partially Active":
      return "yellow";
    case "Pending":
      return "green";
    case "Not Active":
      return "red";
    default:
      return "gray";
  }
};

const Dashboard = ({ darkMode }) => {
  const [date, setDate] = useState(new Date());
  const themeClass = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
  const cardClass = darkMode ? "bg-gray-800" : "bg-gray-100";

  return (
    <div className={`p-6 ${themeClass}`}>
      
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat) => (
          <motion.div 
            key={stat.id} 
            className={`p-6 rounded-lg shadow-lg flex items-center justify-between text-white ${stat.bgColor}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-4xl">{stat.icon}</div>
            <div className="text-right">
              <h3 className="text-lg">{stat.title}</h3>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Calendar */}
    

      {/* Full-width Animated Map */}
      <motion.div 
        className={`p-4 shadow-lg rounded-xl ${cardClass} mb-6`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <h2 className="text-lg font-semibold mb-4">Live Map</h2>
        <MapContainer center={[22.5726, 88.3639]} zoom={5} className="h-96 w-full rounded-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {locations.map((loc) => (
            <CircleMarker
              key={loc.id}
              center={[loc.lat, loc.lng]}
              radius={10}
              fillOpacity={0.8}
              color={getStatusColor(loc.status)}
            >
              <Popup>{`${loc.name} - ${loc.status}`}</Popup>
            </CircleMarker>
          ))}
        </MapContainer>
      </motion.div>

      {/* Full-width Device Readings */}
      <motion.div 
        className={`p-4 shadow-lg rounded-xl ${cardClass}`}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Device Readings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deviceReadings.map((device) => (
            <motion.div 
              key={device.id} 
              className={`p-3 rounded-lg shadow ${cardClass} flex flex-col items-center`}
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-sm font-medium">{device.name}</h3>
              <p className="text-lg font-bold">{device.value}</p>
              <p className={`text-sm ${device.status === "Warning" ? "text-red-500" : "text-green-500"}`}>
                {device.status}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <motion.div 
        className={`p-4 shadow-lg rounded-xl ${cardClass} mb-6`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-lg font-semibold mb-4">Calendar</h2>
        <Calendar 
          onChange={setDate} 
          value={date} 
          className={`rounded-lg ${cardClass} ${darkMode ? "!bg-gray-800 !text-white" : ""}`} 
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;
