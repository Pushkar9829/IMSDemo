import { useState, useEffect } from "react";
import { Sun, Moon, Grid, PlusCircle, ShoppingCart, Users, FileText, MessageCircle, Mail, List, ChevronDown, ChevronUp } from "lucide-react";
const Sidebar = ({ darkMode, setDarkMode }) => {
  const [expanded, setExpanded] = useState(true);
  const [openSections, setOpenSections] = useState({});

  const toggleExpand = () => setExpanded(!expanded);
  const toggleSection = (section) => {
    console.log("qqqqqqqqq")
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
    <div className={`h-screen transition-all ${darkMode ? "dark" : ""}`}>
      <div className="flex relative">
        {/* Sidebar */}
        <div className={`h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4 shadow-md transition-all relative ${expanded ? "w-64" : "w-20"}`}>
          <div className="flex justify-between items-center mb-6">
            <span className={`${expanded ? "block" : "hidden"} text-lg font-semibold`}>
              Demo
            </span>
            <button onClick={toggleExpand} className="p-2">
              <Grid className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Items */}
          <nav className="space-y-2">
            <button className="flex items-center p-2 rounded-lg bg-gray-200 dark:bg-gray-800 w-full">
              <Grid className="w-5 h-5 mr-2" />
              <span className={`${expanded ? "block" : "hidden"}`}>Dashboard</span>
            </button>

            {[
               { label: "Overview", icon: Grid },
               { label: "Sensors", icon: PlusCircle },
               { label: "Voltage Monitor", icon: ShoppingCart },
               { label: "Temperature Sensors", icon: Users },
               { label: "Current Sensors", icon: FileText },
               { label: "Logs & Alerts", icon: MessageCircle },
            ].map(({ label, icon: Icon }) => (
              <div key={label}>
                <button onClick={() => toggleSection(label)} className="flex justify-between items-center p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-2" />
                    <span className={`${expanded ? "block" : "hidden"}`}>{label}</span>
                  </div>
                  {expanded && <span>{openSections[label] ? <ChevronDown /> : <ChevronUp />}</span>}
                </button>
              </div>
            ))}

            {/* Support Apps */}
            <div className="mt-4">
              <span className={`text-sm font-semibold ${expanded ? "block" : "hidden"}`}>Support Apps</span>
              {[
                { label: "Chats", icon: MessageCircle },
                { label: "Email", icon: Mail },
                { label: "Todo App", icon: List },
              ].map(({ label, icon: Icon }) => (
                <button key={label} className="flex items-center p-2 w-full hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                  <Icon className="w-5 h-5 mr-2" />
                  <span className={`${expanded ? "block" : "hidden"}`}>{label}</span>
                </button>
              ))}
            </div>
          </nav>

          {/* Floating Dark Mode Toggle */}
          <div className="absolute top-1/2 -translate-y-1/2 right-[-25px] bg-white dark:bg-gray-800 p-1.5 rounded-full shadow-lg border border-gray-300 dark:border-gray-600">
            <button onClick={() => setDarkMode(!darkMode)} className="flex flex-col items-center justify-center space-y-1 p-2">
              <Sun className={`w-5 h-5 ${darkMode ? "text-gray-400" : "text-yellow-500"}`} />
              <Moon className={`w-5 h-5 ${darkMode ? "text-blue-500" : "text-gray-400"}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
