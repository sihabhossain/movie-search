// src/components/Navbar.tsx
"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "./ui/input";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useSearch } from "@/contexts/SearchProvider";
import Link from "next/link";

type SearchFormData = {
  searchQuery: string;
};

const Navbar: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { setSearchQuery } = useSearch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { register } = useForm<SearchFormData>();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav
      className={`p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      } shadow-md`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="text-2xl font-bold">
          MovieSearch
        </Link>
        <button onClick={toggleMenu} className="md:hidden">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
        <div className="hidden md:flex items-center flex-1 mx-4">
          <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
            <Input
              {...register("searchQuery")}
              type="text"
              placeholder="Search for movies..."
              onChange={handleInputChange} // Call this function on change
              className="lg:w-[30%] lg:focus:w-[60%] transition-all duration-500 ease-in-out p-2 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white"
            />
          </form>
        </div>
        <div className="hidden md:flex items-center gap-4">
          <a href="/wishlist" className="hover:underline">
            Wishlist
          </a>
          <button onClick={toggleDarkMode} className="flex items-center">
            {darkMode ? <Sun /> : <Moon />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-4">
          <form
            className="w-full flex justify-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              {...register("searchQuery")}
              type="text"
              placeholder="Search for movies..."
              onChange={handleInputChange} // Call this function on change
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
