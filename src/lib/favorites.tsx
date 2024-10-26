// import { useState, useEffect } from "react";

// // Inside the MovieDetails component, add this state and logic
// const [isFavorite, setIsFavorite] = useState(false);

// // Check if the movie is already a favorite when the component loads
// useEffect(() => {
//   const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
//   setIsFavorite(favorites.includes(movie.id));
// }, [movie.id]);

// const toggleFavorite = () => {
//   const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
//   if (isFavorite) {
//     // Remove from favorites
//     const updatedFavorites = favorites.filter(
//       (favId: string) => favId !== movie.id
//     );
//     localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//   } else {
//     // Add to favorites
//     favorites.push(movie.id);
//     localStorage.setItem("favorites", JSON.stringify(favorites));
//   }
//   setIsFavorite(!isFavorite);
// };

// // In your component return, add a button to toggle favorites
// <button
//   onClick={toggleFavorite}
//   className="mt-4 p-2 bg-blue-500 text-white rounded"
// >
//   {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
// </button>;
