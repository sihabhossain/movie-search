"use client";

import React from "react";
import { useDarkMode } from "@/contexts/DarkModeContext";
import Image from "next/image";
import Link from "next/link";

const WishlistPage: React.FC = () => {
  const { darkMode } = useDarkMode();

  // Get the wishlist from local storage
  const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-white"
      } text-white py-10 px-4`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Wishlist</h1>
        {wishlist.length === 0 ? (
          <p className="text-lg">Your wishlist is empty.</p>
        ) : (
          <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {wishlist.map((movie: any) => (
              <li
                key={movie.id}
                className="bg-purple-800 p-4 rounded-lg shadow-lg"
              >
                <Link href={`/movies/${movie.id}`}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={`Poster for ${movie.title}`}
                    width={200}
                    height={300}
                    className="rounded-md mb-2 object-cover"
                  />
                  <h2 className="text-xl font-semibold">{movie.title}</h2>
                  <p className="text-sm text-gray-300 mt-1">
                    Release Date: {movie.release_date}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
