"use client";

import React, { useState } from "react";
import { Input } from "./ui/input";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold">MovieSearch</h1>

        {/* Toggle Button for Mobile */}
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? "✖️" : "☰"}
        </button>

        {/* Desktop Search Bar & Links */}
        <div className="hidden md:flex items-center flex-1 mx-4">
          <Input
            type="text"
            placeholder="Search for movies..."
            className="lg:w-[30%] lg:focus:w-[60%] transition-all duration-500 ease-in-out p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/wishlist" className="hover:underline">
            Wishlist
          </a>
          <button onClick={toggleDarkMode} className="flex items-center">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4">
          <Input
            type="text"
            placeholder="Search for movies..."
            className="w-full p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
          />
          <a href="/wishlist" className="hover:underline">
            Wishlist
          </a>
          <button onClick={toggleDarkMode} className="flex items-center">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
