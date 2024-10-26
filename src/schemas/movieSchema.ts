import { z } from "zod";

// Movie Schema
export const TMovieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  poster_path: z.string(),
  vote_average: z.number(),
});

// Movies Response Schema
export const TMoviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(TMovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

// Movie Card Props Schema
export const MovieCardPropsSchema = z.object({
  movie: TMovieSchema,
});

// Genre Schema
export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

// Actor Schema
export const ActorSchema = z.object({
  id: z.number(),
  name: z.string(),
  profile_path: z.string().nullable(),
});

// Recommendation Schema
export const RecommendationSchema = z.object({
  id: z.number(),
  title: z.string(),
  poster_path: z.string().nullable(),
  release_date: z.string(),
});

// Movie Details Schema
export const TMovieDetailsSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  release_date: z.string(),
  poster_path: z.string(),
  vote_average: z.number(),
  // Add other fields as per your API response
});

// Movie Casts Schema
export const TMovieCastsSchema = z.object({
  id: z.number(),
  cast: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      profile_path: z.string().nullable(),
      // Add other fields as per your API response
    })
  ),
});

// Movie Recommendations Schema
export const TMovieRecommendationsSchema = z.object({
  results: z.array(TMovieSchema),
  // Add other fields as per your API response
});
