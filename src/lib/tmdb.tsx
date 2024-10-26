// src/lib/tmdb.ts
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
// console.log(API_KEY);
const BASE_URL = "https://api.themoviedb.org/3";

// export async function fetchPopularMovies(page: number) {
//   const res = await fetch(
//     `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
//   );
//   return res.json();
// }
export const fetchPopularMovies = async (page: number) => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

// export async function fetchMovieDetails(id: string) {
//   const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
//   return res.json();
// }

// src/lib/tmdb.js
export const fetchMovieDetails = async (movieId: string) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movie details');
  }
  return response.json();
};


// export async function searchMovies(query: string) {
//   const res = await fetch(
//     `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
//   );
//   return res.json();
// }

// // lib/tmdb.ts
export const fetchSearchedMovies = async (query: string, page: number) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  return response.json();
};

