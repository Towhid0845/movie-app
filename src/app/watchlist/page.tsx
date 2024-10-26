
"use client";
import { useEffect, useState } from "react";
import MovieCard from "@/components/MovieCard";
import { fetchMovieDetails } from "@/lib/tmdb";

export default function WatchlistPage() {
  const [watchlistMovies, setWatchlistMovies] = useState<any[]>([]);

  useEffect(() => {
    // Load watchlist from localStorage on initial mount
    const loadWatchlistMovies = async () => {
      const storedWatchlist = JSON.parse(
        localStorage.getItem("watchlist") || "[]"
      );
      console.log("Loaded watchlist from localStorage:", storedWatchlist); // Log current watchlist
      const movieDetails = await Promise.all(
        storedWatchlist.map((movieId: string) => fetchMovieDetails(movieId))
      );
      setWatchlistMovies(movieDetails);
    };

    loadWatchlistMovies();
  }, []);

  const removeFromWatchlist = (movieId: string) => {
    // Filter the movie to be removed and update the state
    const updatedList = watchlistMovies.filter((movie) => movie.id !== movieId);
    setWatchlistMovies(updatedList);

    // Update localStorage with the filtered list
    const updatedWatchlistIds = updatedList.map((movie) => movie.id);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlistIds));
    console.log("Updated localStorage watchlist:", updatedWatchlistIds); // Log updated watchlist
  };

  useEffect(() => {
    // Every time watchlistMovies changes, update local storage
    const updatedWatchlistIds = watchlistMovies.map((movie) => movie.id);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlistIds));
  }, [watchlistMovies]);

  return (
    <div>
      <h1>Your Watchlist</h1>
      <div className="movie-grid">
        {watchlistMovies.length > 0 ? (
          watchlistMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={removeFromWatchlist}
            />
          ))
        ) : (
          <p>Your watchlist is empty.</p>
        )}
      </div>
    </div>
  );
}
