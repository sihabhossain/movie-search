/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useDarkModeStore } from "@/stores/darkModeStore";

const WishList = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);
  const { darkMode } = useDarkModeStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedWishlist = JSON.parse(Cookies.get("wishlist") || "[]");
      setWishlist(storedWishlist);
    }
  }, []);

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
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
                className={`p-4 rounded-lg shadow-lg ${
                  darkMode ? "bg-gray-800" : "bg-purple-800"
                }`}
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
                  <p
                    className={`text-sm mt-1 ${
                      darkMode ? "text-gray-400" : "text-gray-700"
                    }`}
                  >
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

export default WishList;
