


// src/lib/watchlist.ts
export const addToWatchlist = (movieId: string) => {
  // Add movie to watchlist in localStorage
  const watchlist = getWatchlist(); // Get the current watchlist
  if (!watchlist.includes(movieId)) {
    watchlist.push(movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist)); // Save to local storage
  }
};

export const removeFromWatchlist = (movieId: string) => {
  // Remove movie from watchlist in localStorage
  const watchlist = getWatchlist(); // Get the current watchlist
  const updatedWatchlist = watchlist.filter(id => id !== movieId);
  localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist)); // Save to local storage
};

export const getWatchlist = () => {
  // Load the watchlist from local storage every time it's fetched
  // console.log(JSON.parse(localStorage.getItem("watchlist") || "[]"));
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
};
