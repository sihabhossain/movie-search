"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useGetMovieCasts,
  useGetMovieDetails,
  useGetMovieRecommendations,
} from "@/hooks";
import { Actor, Genre, Recommendation } from "@/types";
import { useDarkMode } from "@/contexts/DarkModeContext";
import LoadingSpinner from "@/components/LoadingSpinner";

const MovieDetailsPage: React.FC = () => {
  const { darkMode } = useDarkMode();
  const params = useParams();
  const movieId = params?.id as string;

  const {
    data: movieDetails,
    isPending: loadingMovie,
    error: movieError,
  } = useGetMovieDetails(movieId);

  const {
    data: castResponse,
    isPending: loadingCast,
    error: castError,
  } = useGetMovieCasts(movieId);

  const {
    data: recommendationResponse,
    isPending: loadingRecommendation,
    error: recommendationError,
  } = useGetMovieRecommendations(movieId);

  const cast = castResponse?.cast;
  const recommendations = recommendationResponse?.results;

  // Loading and error states
  if (loadingMovie || loadingCast || loadingRecommendation)
    return <LoadingSpinner />;
  if (movieError)
    return <div>Error fetching movie details: {movieError.message}</div>;
  if (castError) return <div>Error fetching cast: {castError.message}</div>;
  if (recommendationError)
    return (
      <div>Error fetching recommendations: {recommendationError.message}</div>
    );
  if (!movieDetails) return <div>No movie details found.</div>;

  const { title, overview, genres, release_date, poster_path } = movieDetails;

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900" : "bg-white"
      } text-white py-10 px-4`}
    >
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row">
        {/* Movie Poster */}
        <div className="md:w-1/3 mb-6 md:mb-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            alt={title}
            width={500}
            height={750}
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Movie Info */}
        <div className="md:w-2/3 md:pl-6">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <p className="text-lg mb-4">
            Release Date: {new Date(release_date).toLocaleDateString()}
          </p>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Genres:</h2>
            <ul className="flex flex-wrap">
              {genres?.map((genre: Genre) => (
                <li
                  key={genre.id}
                  className={`rounded-full px-3 py-1 mr-2 mb-2 ${
                    darkMode ? "bg-purple-600" : "bg-purple-300"
                  } text-white`}
                >
                  {genre.name}
                </li>
              ))}
            </ul>
          </div>
          <h2 className="text-xl font-semibold mb-2">Overview:</h2>
          <p className={`mb-4 ${darkMode ? "text-gray-300" : "text-gray-800"}`}>
            {overview}
          </p>
          <div>
            <h2 className="text-xl font-semibold mb-2">Cast:</h2>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {cast?.slice(0, 6).map((actor: Actor) => (
                <li key={actor.id} className="flex items-center mb-4">
                  {actor.profile_path && (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                      alt={actor.name}
                      width={50}
                      height={75}
                      className="rounded-full mr-2"
                    />
                  )}
                  <span
                    className={`text-gray-300 ${
                      darkMode ? "text-gray-300" : "text-gray-800"
                    }`}
                  >
                    {actor.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Movie Recommendations */}
      <div className="mt-10 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold mb-4">Recommended Movies</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendations?.slice(0, 8).map((recommendation : Recommendation) => (
            <div
              key={recommendation.id}
              className="bg-gray-800 rounded-lg shadow-lg p-4"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                alt={recommendation.title}
                width={200}
                height={300}
                className="rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">{recommendation.title}</h3>
              <p className="text-sm text-gray-400">
                Release Date:{" "}
                {new Date(recommendation.release_date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
