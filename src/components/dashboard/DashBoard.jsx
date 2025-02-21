import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import { FiSearch, FiX } from "react-icons/fi";

const stats = [
  { id: 1, title: "Total Sites", value: "294", icon: "", bgColor: "from-blue-500 to-blue-600" },
  { id: 2, title: "Active Sites", value: "345", icon: "", bgColor: "from-green-500 to-green-600" },
  { id: 3, title: "Disconnected", value: "303", icon: "", bgColor: "from-red-500 to-red-600" },
  { id: 4, title: "Incidents", value: "576", icon: "", bgColor: "from-amber-500 to-amber-600" },
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
  const [date, setDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  
  const themeClass = darkMode 
    ? "bg-gray-900 text-gray-100" 
    : "bg-gray-50 text-gray-900";
  const cardClass = darkMode 
    ? "bg-gray-800 border-gray-700" 
    : "bg-white border-gray-200";

  const handleSearch = () => {
    const result = locations.find(loc => 
      loc.siteId.toLowerCase() === searchQuery.toLowerCase() || 
      loc.name.toLowerCase() === searchQuery.toLowerCase()
    );
    setSelectedState(result || null);
  };

  return (
    <div className={`p-6 min-h-screen ${themeClass}`}>
      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Site ID or Location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className={`w-full pl-12 pr-4 py-3 rounded-xl border ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 focus:border-blue-500' 
                  : 'bg-white border-gray-200 focus:border-blue-500'
              } focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all`}
            />
          </div>
        </motion.div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-br ${stat.bgColor} text-white p-5 rounded-2xl shadow-lg`}
          >
            <div className="flex-col items-center justify-between">
              <div className="space-y-2">
                <span className="text-2xl">{stat.icon}</span>
                <h3 className="text-lg font-medium">{stat.title}</h3>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
            
          </motion.div>
        ))}
      </div>

      {/* Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`mb-8 p-5 rounded-2xl border ${cardClass} shadow-sm transition-colors`}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold">Site Locations</h2>
          <span className="text-sm text-gray-500">Real-time monitoring</span>
        </div>
        <div className="h-96 rounded-xl overflow-hidden border">
          <MapContainer center={[22.5726, 88.3639]} zoom={5} className="h-full w-full">
            <TileLayer
              url={`https://{s}.basemaps.cartocdn.com/${
                darkMode ? 'dark_all' : 'rastertiles/voyager'
              }/{z}/{x}/{y}{r}.png`}
            />
            {locations.map((loc) => (
              <CircleMarker
                key={loc.id}
                center={[loc.lat, loc.lng]}
                radius={12}
                fillOpacity={0.8}
                color={getStatusColor(loc.status)}
                eventHandlers={{ click: () => setSelectedState(loc) }}
              >
                <Popup className="text-sm font-medium">
                  {loc.name} <span className="text-blue-500">{loc.siteId}</span>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </motion.div>

      {/* Selected Location Details */}
      {selectedState && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mb-8 p-5 rounded-2xl border ${cardClass} shadow-sm`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {selectedState.name} <span className="text-blue-500">({selectedState.siteId})</span>
            </h2>
            <button
              onClick={() => setSelectedState(null)}
              className="p-2 hover:bg-gray-700/10 rounded-lg transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-blue-500/10 text-blue-500">
              <p className="text-sm text-gray-500">Status</p>
              <p className="font-medium">{selectedState.status}</p>
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
        </motion.div>
      )}

      {/* Calendar Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-5 rounded-2xl border ${cardClass} shadow-sm`}
      >
        <h2 className="text-xl font-semibold mb-5">Maintenance Schedule</h2>
        <Calendar
          onChange={setDate}
          value={date}
          className={`react-calendar rounded-lg !w-full !border-0 ${
            darkMode ? '!bg-gray-800 !text-white' : '!bg-white'
          }`}
          tileClassName={({ date: tileDate }) =>
            tileDate.toDateString() === date.toDateString()
              ? '!bg-blue-500 !text-white'
              : ''
          }
        />
      </motion.div>
    </div>
  );
};

export default Dashboard;