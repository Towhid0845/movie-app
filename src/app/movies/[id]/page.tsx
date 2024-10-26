

"use client";
import { useEffect, useState } from "react";
import { fetchMovieDetails } from "@/lib/tmdb";
import Image from "next/image";

interface Movie {
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  genres: { name: string }[];
  vote_average: number;
  runtime: number;
  original_language: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

interface Recommendation {
  id: number;
  title: string;
  poster_path: string | null;
}

export default function MovieDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [movieId, setMovieId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      // Wait for params to resolve
      const resolvedParams = await params;
      const id = resolvedParams.id;
      setMovieId(id); // Store the movie ID

      const movieData = await fetchMovieDetails(id);
      if (!movieData) {
        throw new Error("Movie not found");
      }

      // Fetch cast
      const castResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const castData = await castResponse.json();

      // Fetch recommendations
      const recommendationsResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
      );
      const recommendationsData = await recommendationsResponse.json();

      setMovie(movieData);
      setCast(castData.cast.slice(0, 10));
      setRecommendations(recommendationsData.results.slice(0, 6));

      // Check if the movie is already a favorite
      const favorites = JSON.parse(localStorage.getItem("watchlist") || "[]");
      setIsFavorite(favorites.includes(id));
    };

    fetchMovieData();
  }, [params]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("watchlist") || "[]");
    if (isFavorite) {
      const updatedFavorites = favorites.filter(
        (favId: string) => favId !== movieId
      );
      localStorage.setItem("watchlist", JSON.stringify(updatedFavorites));
    } else {
      favorites.push(movieId);
      localStorage.setItem("watchlist", JSON.stringify(favorites));
    }
    setIsFavorite(!isFavorite);
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto">
      {/* Movie Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={500}
            height={750}
            priority
          />
        ) : (
          <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
            <p>No image available</p>
          </div>
        )}
        <div>
          <h1 className="text-4xl font-bold">{movie.title}</h1>
          <p className="mt-4">{movie.overview}</p>
          <div className="mt-4">
            <p>
              <strong>Release Date:</strong> {movie.release_date}
            </p>
            <p>
              <strong>Genres:</strong>{" "}
              {movie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p>
              <strong>Rating:</strong> {movie.vote_average} / 10
            </p>
            <p>
              <strong>Runtime:</strong> {movie.runtime} minutes
            </p>
            <p>
              <strong>Language:</strong> {movie.original_language.toUpperCase()}
            </p>
          </div>
          <button
            onClick={toggleFavorite}
            className="mt-4 p-2 bg-blue-500 text-white rounded"
          >
            {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Cast</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
          {cast.map((member) => (
            <div
              key={member.id}
              className="flex flex-col items-center text-center"
            >
              {member.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${member.profile_path}`}
                  alt={member.name}
                  width={100}
                  height={150}
                  className="rounded"
                />
              ) : (
                <div className="w-24 h-36 bg-gray-300 flex items-center justify-center text-sm text-gray-500">
                  No image
                </div>
              )}
              <p className="mt-2 font-semibold">{member.name}</p>
              <p className="text-sm text-gray-500">as {member.character}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold">Recommended Movies</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-4">
          {recommendations.map((rec) => (
            <div
              key={rec.id}
              className="flex flex-col items-center text-center"
            >
              {rec.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w200${rec.poster_path}`}
                  alt={rec.title}
                  width={100}
                  height={150}
                  className="rounded"
                />
              ) : (
                <div className="w-24 h-36 bg-gray-300 flex items-center justify-center text-sm text-gray-500">
                  No image
                </div>
              )}
              <p className="mt-2 font-semibold">{rec.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
