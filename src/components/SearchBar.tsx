"use client";

import { useState } from "react";
import { searchMovies } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";

export default function SearchBar() {
  const [query, setQuery] = useState("");

const { data } = useQuery({
  queryKey: ["search-movies", query],
  queryFn: () => searchMovies(query),
  enabled: query.length > 2,
});


  return (
    <div className="my-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className="border p-2 w-full"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {data?.results.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
 