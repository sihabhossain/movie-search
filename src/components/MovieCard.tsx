"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MovieCardProps } from "@/types";
import Link from "next/link";
import { Heart } from "lucide-react"; // Ensure you have this icon library installed
import { toast } from "sonner";

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(false);
  const maxDescriptionLength = 100;

  const truncatedOverview =
    movie.overview.length > maxDescriptionLength
      ? `${movie.overview.substring(0, maxDescriptionLength)}...`
      : movie.overview;

  // Check local storage for existing wishlist state on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isMovieInWishlist = wishlist.some(
      (item: any) => item.id === movie.id
    );
    setIsInWishlist(isMovieInWishlist);
  }, [movie.id]);

  // Function to handle adding/removing movie to wishlist
  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the Link
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isMovieInWishlist = wishlist.some(
      (item: any) => item.id === movie.id
    );

    if (!isMovieInWishlist) {
      // Add movie to wishlist
      wishlist.push(movie);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setIsInWishlist(true);
      toast.success("Movie added on wishlist");
    } else {
      // Remove movie from wishlist
      const updatedWishlist = wishlist.filter(
        (item: any) => item.id !== movie.id
      );
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      setIsInWishlist(false);
      toast.error("Movie removed from wishlist");
    }
  };

  return (
    <Card
      key={movie.id}
      className="bg-purple-800 text-white shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 overflow-hidden h-[400px] w-[300px] sm:h-[450px] sm:w-[350px] mx-auto relative"
    >
      {/* Heart Icon */}
      <button
        onClick={handleWishlistToggle}
        className={`absolute top-2 right-2 p-1 rounded-full transition-colors duration-300 ${
          isInWishlist ? "bg-red-600" : "bg-gray-600"
        }`}
        title={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
      >
        <Heart color="white" />
      </button>
      <Link href={`/movies/${movie?.id}`}>
        <CardHeader>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`Poster for ${movie.title}`}
            width={500}
            height={750}
            className="w-full h-40 sm:h-52 object-cover rounded-t-md"
          />
        </CardHeader>

        <CardContent className="flex flex-col h-full">
          <CardTitle className="text-xl font-semibold">{movie.title}</CardTitle>
          <CardDescription className="text-sm text-gray-300 mt-2">
            Release Date: {movie.release_date}
          </CardDescription>
          <p className="mt-3 text-sm text-gray-400 flex-1">
            {truncatedOverview}
          </p>
        </CardContent>
      </Link>
    </Card>
  );
};

export default MovieCard;
