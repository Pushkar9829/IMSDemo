import { useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { FiSearch, FiInfo, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const locations = [
  { id: 1, siteId: "DEL-001", lat: 28.7041, lng: 77.1025, name: "Delhi", status: "Active" },
  { id: 2, siteId: "MUM-002", lat: 19.076, lng: 72.8777, name: "Mumbai", status: "Partially Active" },
  { id: 3, siteId: "BAN-003", lat: 12.9716, lng: 77.5946, name: "Bangalore", status: "Pending" },
  { id: 4, siteId: "CHE-004", lat: 13.0827, lng: 80.2707, name: "Chennai", status: "Not Active" },
  { id: 5, siteId: "KOL-005", lat: 22.5726, lng: 88.3639, name: "Kolkata", status: "Active" },
];

const stats = [
  { id: 1, title: "Total Sites", value: "294", bgColor: "bg-blue-500/10 text-blue-500" },
  { id: 2, title: "Active Sites", value: "345", bgColor: "bg-green-500/10 text-green-500" },
  { id: 3, title: "Disconnected", value: "303", bgColor: "bg-red-500/10 text-red-500" },
  { id: 4, title: "Incidents", value: "576", bgColor: "bg-amber-500/10 text-amber-500" },
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
  const [selectedSiteId, setSelectedSiteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const cardClass = darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200";

  const handleSearch = () => {
    const result = locations.find(
      (loc) => loc.siteId.toLowerCase() === searchQuery.toLowerCase() || loc.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setSelectedSiteId(result ? result.siteId : null);
  };

  const handleMarkerClick = (siteId) => {
    setSelectedSiteId(siteId);
  };

  const handleInfoClick = () => {
    navigate("/detailsPage");
  };

  // Find the selected site object
  const selectedSite = locations.find((loc) => loc.siteId === selectedSiteId);

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
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className={`w-full pl-12 pr-4 py-3 rounded-2xl border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all`}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
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
            <TileLayer url={`https://{s}.basemaps.cartocdn.com/${darkMode ? "dark_all" : "rastertiles/voyager"}/{z}/{x}/{y}{r}.png`} />
            {locations.map((loc) => (
              <CircleMarker
                key={loc.id}
                center={[loc.lat, loc.lng]}
                radius={12}
                fillOpacity={0.8}
                color={getStatusColor(loc.status)}
                eventHandlers={{ click: () => handleMarkerClick(loc.siteId) }}
              >
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

      {/* Selected Location Details (Only shows if a site is selected) */}
      {selectedSite && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-5 rounded-2xl border ${cardClass} shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col">
            <h2 className="text-xl font-semibold">
              {selectedSite.name} <span className="text-blue-500">({selectedSite.siteId})</span>
              
            </h2>
            <button onClick={handleInfoClick} className="p-2 flex flex-row items-center  hover:bg-gray-700/10 rounded-lg transition-colors">
                    <FiInfo className="w-5 h-5" />
                    <p>Detailed View</p>
                  </button>
            </div>
            <button
              onClick={() => setSelectedSiteId(null)}
              className="p-2 hover:bg-gray-700/10 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{selectedSite.status}</p>
            </div>
            <div className="p-4 rounded-xl bg-green-500/10 text-green-500">
              <p className="text-sm text-gray-500">Active Sites</p>
              <p className="font-medium">200</p>
            </div>
            <div className="p-4 rounded-xl bg-red-500/10 text-red-500">
              <p className="text-sm text-gray-500">Disconnected</p>
              <p className="font-medium">150</p>
            </div>
            <div className="p-4 rounded-xl bg-amber-500/10 text-amber-500">
              <p className="text-sm text-gray-500">Incidents</p>
              <p className="font-medium">50</p>
            </div>
          </div>
          <div className="grid mt-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 bg-gray-800/10 p-6 rounded-xl">
  <div className="p-4 rounded-xl bg-blue-500/10 text-blue-400">
    <p className="text-sm text-black">Temperature</p>
    <p className="font-medium">33°C</p>
  </div>
  <div className="p-4 rounded-xl bg-green-500/10 text-green-400">
    <p className="text-sm text-black">Voltage</p>
    <p className="font-medium">240V</p>
  </div>
  <div className="p-4 rounded-xl bg-red-500/10 text-red-400">
    <p className="text-sm text-black">Humidity</p>
    <p className="font-medium">20%</p>
  </div>
  <div className="p-4 rounded-xl bg-amber-500/10 text-amber-400">
    <p className="text-sm text-black">Time</p>
    <p className="font-medium">50h</p>
  </div>
  <div className="p-4 rounded-xl bg-purple-500/10 text-purple-400">
    <p className="text-sm text-black">Current</p>
    <p className="font-medium">15A</p>
  </div>
  <div className="p-4 rounded-xl bg-cyan-500/10 text-cyan-400">
    <p className="text-sm text-black">Power</p>
    <p className="font-medium">3.6kW</p>
  </div>
  <div className="p-4 rounded-xl bg-indigo-500/10 text-indigo-400">
    <p className="text-sm text-black">Resistance</p>
    <p className="font-medium">5Ω</p>
  </div>
  <div className="p-4 rounded-xl bg-teal-500/10 text-teal-400">
    <p className="text-sm text-black">Energy</p>
    <p className="font-medium">12kWh</p>
  </div>
  <div className="p-4 rounded-xl bg-yellow-500/10 text-yellow-400">
    <p className="text-sm text-black">Frequency</p>
    <p className="font-medium">50Hz</p>
  </div>
  <div className="p-4 rounded-xl bg-rose-500/10 text-rose-400">
    <p className="text-sm text-black">Load</p>
    <p className="font-medium">75%</p>
  </div>
</div>

        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
