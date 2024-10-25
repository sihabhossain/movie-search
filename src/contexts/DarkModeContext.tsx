"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";

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
  // Initialize state based on localStorage or default to false
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });

  // Update localStorage and apply the dark class to <html> element
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
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
