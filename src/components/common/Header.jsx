import { useState } from "react";
import { Search, Bell, Sun, Moon, LogOut } from "lucide-react";

const Header = ({ darkMode, setDarkMode }) => {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-orange-600/10 dark:bg-gray-900 text-gray-900 dark:text-white relative">
      
      {/* Left Section: Dashboard Title */}
      <h1 className="text-xl font-semibold">FI Monitoring Dashboard</h1>

      {/* Right Section: Icons & Profile */}
      <div className="flex items-center space-x-4">
        
        {/* Notification Bell */}
        <button className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
            3
          </span>
        </button>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">
          {darkMode ? <Sun className="w-6 h-6 text-yellow-500" /> : <Moon className="w-6 h-6 text-gray-400" />}
        </button>

        {/* User Profile with Avatar & Dropdown */}
        <div className="relative">
          <div 
            onClick={() => setShowProfile(!showProfile)} 
            className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {/* Avatar with Initials */}
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
              JD
            </div>
            <span className="hidden md:block">Admin</span>
          </div>

          {/* Dropdown Menu */}
          {showProfile && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 z-10">
              <p className="text-sm font-medium">👤 John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">johndoe@example.com</p>
              <hr className="my-2 border-gray-300 dark:border-gray-600" />
              <button className="w-full text-left p-2 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center space-x-2">
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
