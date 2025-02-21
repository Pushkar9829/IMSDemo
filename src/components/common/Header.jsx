import { Search, Bell, User, Sun, Moon } from "lucide-react";

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      
      {/* Left Section: Dashboard Title */}
      <h1 className="text-xl font-semibold">FI Monitoring Dashboard</h1>

      {/* Middle Section: Search Bar */}
      {/* <div className="relative w-1/3">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 pl-10 rounded-lg bg-gray-100 dark:bg-gray-800 focus:outline-none"
        />
        <Search className="absolute left-3 top-2 text-gray-500 dark:text-gray-400 w-5 h-5" />
      </div> */}

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

        {/* User Profile */}
        <div className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
          <User className="w-6 h-6" />
          <span className="hidden md:block">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
