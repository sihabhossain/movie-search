"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";

type SearchFormData = {
  searchQuery: string;
};

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<SearchFormData>();
  const onSubmit: SubmitHandler<SearchFormData> = (data) => {
    console.log("Searching for:", data.searchQuery);
    reset(); // Optional: Reset search field after submitting
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Desktop Search Bar & Links */}
        <div className="hidden md:flex items-center flex-1 mx-4">
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
            <Input
              {...register("searchQuery")}
              type="text"
              placeholder="Search for movies..."
              className="lg:w-[30%] lg:focus:w-[60%] transition-all duration-500 ease-in-out p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
            />
          </form>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4">
          <a href="/wishlist" className="hover:underline">
            Wishlist
          </a>
          <button onClick={toggleDarkMode} className="flex items-center">
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex justify-center"
          >
            <Input
              {...register("searchQuery")}
              type="text"
              placeholder="Search for movies..."
              className="w-[90%] p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
            />
          </form>
          <a href="/wishlist" className="hover:underline">
            Wishlist
          </a>
          <button onClick={toggleDarkMode} className="flex items-center">
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
