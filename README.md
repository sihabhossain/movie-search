# 🎬 Movie App

![Next.js](https://img.shields.io/badge/Next.js-15-blue.svg)
![React](https://img.shields.io/badge/React-v17.0.2-blue.svg)
![TMDB](https://img.shields.io/badge/TMDB-API-orange.svg)

## Overview

This **Movie App** is a responsive movie search and details application built using **Next.js 15** and the **TMDB API**. The application allows users to search for movies, view detailed information, and manage their favorites/watchlist, all while leveraging advanced Next.js features.

## Features

- **Homepage with Pagination**:
  - Displays a list of popular movies fetched from the TMDB API.
  - "Load More" button to load more movies.
- **Search Bar**:
  - Search for movies by title, displaying results with the same infinite scroll/load more functionality.
- **Movie Details Page**:
  - Detailed information about each movie, including:
    - Poster
    - Description
    - Genres
    - Release Date
    - Cast
    - Recommendations
- **Favorites/Watchlist**:
  - Add or remove movies from favorites/watchlist.
  - Manage saved movies on a dedicated watchlist page.
- **Dark Mode Toggle**:
  - Optional dark mode toggle for the app, with user preferences stored persistently using cookies or localStorage.
- **Global State Management**:

  - Utilizes React Context for managing global states, such as dark mode preference.

- **Authentication Middleware**:
  - Implemented middleware to simulate authentication for the watchlist functionality, providing a seamless user experience.

## Technologies Used

- **Next.js 15**: For building the server-rendered application and utilizing advanced features like Server Actions and ISR.
- **TMDB API**: For fetching movie data, including popular movies, movie details, cast information, and recommendations.
- **TanStack Query (React Query)**: For fetching and caching API data, streamlining asynchronous data fetching and state management.
- **React Context**: For global state management, enabling dark mode and watchlist status across the application.
- **Zod**: For validating API responses to ensure data integrity.
- **React Hook Form**: For managing the search form with validation and debouncing to optimize API calls.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sihabhossain/movie-search.git
   ```
