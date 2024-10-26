



// src/components/MovieCard.tsx
import Image from "next/image";
import Link from "next/link";

interface MovieCardProps {
  movie: any;
  onRemove?: (movieId: string) => void; // Optional prop for removing the movie
}

export default function MovieCard({ movie, onRemove }: MovieCardProps) {
  const handleRemove = () => {
    if (onRemove) {
      onRemove(movie.id); // Call the onRemove function passed as a prop
    }
  };

  return (
    <div className="border p-2 hover:shadow-lg">
      <Link href={`/movies/${movie.id}`}>
        {/* <p>{movie}</p> */}
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={500}
          height={750}
          className="rounded-md"
        />
        <h3 className="text-lg font-bold mt-2">{movie.title}</h3>
      </Link>
      {onRemove && ( // Render the button only if onRemove is provided
        <button
          onClick={handleRemove}
          className="mt-2 p-1 bg-red-500 text-white rounded"
        >
          Remove from Watchlist
        </button>
      )}
    </div>
  );
}
