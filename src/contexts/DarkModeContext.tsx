"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import Cookies from "js-cookie"; // Import js-cookie

interface DarkModeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Initialize state based on cookies or default to false
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return Cookies.get("darkMode") === "true"; // Get initial state from cookies
  });

  // Update cookies and apply the dark class to <html> element
  useEffect(() => {
    Cookies.set("darkMode", darkMode.toString(), { expires: 7 }); // Save to cookies for 7 days
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom hook for accessing the DarkModeContext
export const useDarkMode = (): DarkModeContextProps => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("useDarkMode must be used within a DarkModeProvider");
  }
  return context;
};
