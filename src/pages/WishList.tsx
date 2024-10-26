/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie

const WishList = () => {
  const [wishlist, setWishlist] = useState<any[]>([]);

  useEffect(() => {
    // Check if window is defined (i.e., we are in the client-side)
    if (typeof window !== "undefined") {
      const storedWishlist = JSON.parse(Cookies.get("wishlist") || "[]"); // Get wishlist from cookies
      setWishlist(storedWishlist);
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4">
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
                  <p className="text-sm text-gray-700 mt-1">
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
