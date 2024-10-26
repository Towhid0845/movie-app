

// app/page.tsx
"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPopularMovies, fetchSearchedMovies } from "@/lib/tmdb";
import MovieCard from "@/components/MovieCard";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export default function HomePage() {
  const { ref, inView } = useInView();
  const [searchTerm, setSearchTerm] = useState("");
  const [query, setQuery] = useState("");

  // Fetch popular movies or searched movies
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [query ? "searched-movies" : "popular-movies", query],
      queryFn: ({ pageParam = 1 }) =>
        query ? fetchSearchedMovies(query, pageParam) : fetchPopularMovies(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined,
      // Always fetch popular movies initially
      // initialData: query ? undefined : { pages: [{ results: [], page: 1, total_pages: 0 }] },
    });

  // Trigger fetchNextPage when the last movie card is in view
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchTerm);
    // Reset the pages to start over on search
    fetchNextPage({ pageParam: 1 });
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 w-full"
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </form>
     
      <h1 className="text-3xl font-bold mb-4">Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data?.pages.map((page) =>
          page.results.map((movie: any) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <button
          ref={ref} // Attach ref for intersection observer
          className="mt-4 p-2 bg-blue-500 text-white"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}

      {/* Spinner for loading */}
      {isFetchingNextPage && <p>Loading more movies...</p>}
    </div>
  );
}
