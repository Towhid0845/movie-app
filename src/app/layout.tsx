


"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import { ReactNode, useState, useEffect } from "react";
import { setCookie, parseCookies } from "nookies";
import { ThemeProvider } from "../context/ThemeContext"; // Adjust the path as necessary

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  const cookies = parseCookies();
  const initialTheme = cookies.theme || "light"; // Default to "light" theme if not set
  const [theme, setTheme] = useState(initialTheme);
  const [isMounted, setIsMounted] = useState(false); // Track if the component is mounted

  useEffect(() => {
    setIsMounted(true); // Set to true after the component mounts
    document.documentElement.classList.add(theme); // Add theme class on mount
    return () => {
      document.documentElement.classList.remove(theme); // Clean up on unmount
    };
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setCookie(null, "theme", newTheme, { path: "/" }); // Persist theme with cookies
  };

  // Return null while loading to prevent hydration errors
  if (!isMounted) return null;

  return (
    <html lang="en" className={theme}>
      <ThemeProvider>
        <body className={`${theme} min-h-screen overflow-y-auto`}>
          {/* Ensure min-height is set for scrolling */}
          <QueryClientProvider client={queryClient}>
            <button
              onClick={toggleTheme}
              className="toggle-button fixed top-4 right-4 p-2 bg-gray-200 dark:bg-gray-800 rounded z-50"
            >
              {theme === "light"
                ? "Switch to Dark Mode"
                : "Switch to Light Mode"}
            </button>
            {children}
          </QueryClientProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}


// src/app/layout.tsx
// "use client";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import "./globals.css";
// import { ReactNode } from "react";
// import { ThemeProvider } from "../context/ThemeContext"; // Adjust the path as necessary

// const queryClient = new QueryClient();

// export default function RootLayout({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <ThemeProvider>
//         <body className="min-h-screen overflow-y-auto">
//           <QueryClientProvider client={queryClient}>
//             {children}
//           </QueryClientProvider>
//         </body>
//       </ThemeProvider>
//     </html>
//   );
// }
