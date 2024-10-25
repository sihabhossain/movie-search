import React from "react";
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

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const maxDescriptionLength = 100;

  const truncatedOverview =
    movie.overview.length > maxDescriptionLength
      ? `${movie.overview.substring(0, maxDescriptionLength)}...`
      : movie.overview;

  return (
    <Link href={`/movies/${movie?.id}`}>
      <Card
        key={movie.id}
        className="bg-purple-800 text-white shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105 overflow-hidden h-[400px] w-[300px] sm:h-[450px] sm:w-[350px] mx-auto"
      >
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
      </Card>
    </Link>
  );
};

export default MovieCard;
