import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { FiSearch, FiX, FiInfo } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const stats = [
  { id: 1, title: "Total Sites", value: "294", bgColor: "bg-blue-500/10 text-blue-500" },
  { id: 2, title: "Active Sites", value: "345", bgColor: "bg-green-500/10 text-green-500" },
  { id: 3, title: "Disconnected", value: "303", bgColor: "bg-red-500/10 text-red-500" },
  { id: 4, title: "Incidents", value: "576", bgColor: "bg-amber-500/10 text-amber-500" },
];

const locations = [
  { id: 1, siteId: "DEL-001", lat: 28.7041, lng: 77.1025, name: "Delhi", status: "Active" },
  { id: 2, siteId: "MUM-002", lat: 19.076, lng: 72.8777, name: "Mumbai", status: "Partially Active" },
  { id: 3, siteId: "BAN-003", lat: 12.9716, lng: 77.5946, name: "Bangalore", status: "Pending" },
  { id: 4, siteId: "CHE-004", lat: 13.0827, lng: 80.2707, name: "Chennai", status: "Not Active" },
  { id: 5, siteId: "KOL-005", lat: 22.5726, lng: 88.3639, name: "Kolkata", status: "Active" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Active": return "#3B82F6";
    case "Partially Active": return "#F59E0B";
    case "Pending": return "#10B981";
    case "Not Active": return "#EF4444";
    default: return "#6B7280";
  }
};

const Dashboard = ({ darkMode }) => {
  const [selectedState, setSelectedState] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const result = locations.find(loc => 
      loc.siteId.toLowerCase() === searchQuery.toLowerCase() || 
      loc.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setSelectedState(result || null);
  };

  const handleInfoClick = () => {
    navigate("/detailsPage");
  };

  return (
    <div className={`p-6 min-h-screen ${darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto relative">
        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by Site ID or Location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all`}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map(stat => (
          <motion.div key={stat.id} className={`p-5 rounded-2xl shadow-lg ${stat.bgColor}`}>
            <h3 className="text-lg font-medium">{stat.title}</h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Map Section */}
      <motion.div className="mb-8 p-5 rounded-2xl border shadow-sm">
        <h2 className="text-xl font-semibold mb-5">Site Locations</h2>
        <div className="h-96 rounded-xl overflow-hidden border">
          <MapContainer center={[22.5726, 88.3639]} zoom={5} className="h-full w-full">
            <TileLayer url={`https://{s}.basemaps.cartocdn.com/${darkMode ? 'dark_all' : 'rastertiles/voyager'}/{z}/{x}/{y}{r}.png`} />
            {locations.map(loc => (
              <CircleMarker key={loc.id} center={[loc.lat, loc.lng]} radius={12} fillOpacity={0.8} color={getStatusColor(loc.status)}>
                <Popup>
                  {loc.name} <span className="text-blue-500">{loc.siteId}</span>
                  <button onClick={handleInfoClick} className="p-2 hover:bg-gray-700/10 rounded-lg transition-colors">
                    <FiInfo className="w-5 h-5" />
                  </button>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;