import React from "react";
import { Moon, Sun } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 lg:p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all group"
      title={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
      ) : (
        <Moon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 transition-colors" />
      )}
    </button>
  );
};

export default DarkModeToggle;

