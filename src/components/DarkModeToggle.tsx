// src/components/DarkModeToggle.tsx
"use client";

import { useTheme } from "@/context/ThemeContext";

export default function DarkModeToggle() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button
      onClick={() => {
        toggleDarkMode();
        document.cookie = `darkMode=${darkMode ? "light" : "dark"}; path=/`;
      }}
      className="p-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
    >
      {darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
}
