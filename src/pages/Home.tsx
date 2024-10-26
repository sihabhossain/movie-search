/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */

"use client";

import React, { useState } from "react";
import MovieCard from "@/components/MovieCard";
import { useGetPopularMovies, useSearchMovies } from "@/hooks";
import { useDarkModeStore } from "@/stores/darkModeStore";
import { useSearchStore } from "@/stores/searchStore";

export const HomePage: React.FC = () => {
  const { darkMode } = useDarkModeStore();
  const { searchQuery } = useSearchStore();

  // Pagination state
  const [page, setPage] = useState(1);

  // Fetch data
  const { data: popularMovies } = useGetPopularMovies(page);
  const { data: searchResults } = useSearchMovies(searchQuery, page);

  // Total pages for popular movies or search results
  const totalPages = searchQuery
    ? searchResults?.total_pages
    : popularMovies?.total_pages;

  // Pagination controls
  const handleNextPage = () => {
    console.log("first");
    if (page < (totalPages || 1)) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"} text-${
        darkMode ? "white" : "black"
      } py-10`}
    >
      <div className="container mx-auto px-4">
        <h1
          className={`text-4xl sm:text-5xl lg:text-6xl font-bold ${
            darkMode ? "text-purple-400" : "text-purple-600"
          } mb-6 text-center`}
        >
          Popular Movies
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 mb-10">
          {(searchResults!?.results.length > 0
            ? searchResults!.results
            : popularMovies?.results || []
          ).map((movie) => (
            <div className="flex justify-center" key={movie.id}>
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            onClick={handlePreviousPage}
            className={`px-4 py-2 rounded-lg text-white ${
              page === 1
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="text-lg font-semibold">
            Page {page} of {totalPages || 1}
          </span>
          <button
            onClick={handleNextPage}
            className={`px-4 py-2 rounded-lg text-white ${
              page === (totalPages || 1)
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
            disabled={page === (totalPages || 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
