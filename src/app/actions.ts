

"use server";

import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
} from "@/lib/watchlist";

export async function handleWatchlist(
  movieId: string,
  action: "add" | "remove"
) {
  if (action === "add") {
    await addToWatchlist(movieId); // Add `await` if these are async functions
  } else {
    await removeFromWatchlist(movieId); // Add `await` if these are async functions
  }
}

// export async function fetchWatchlist() {
//   return await getWatchlist(); // Ensure you're returning a promise
// }

export async function fetchWatchlist() {
  // Ensure that the latest watchlist from local storage is returned
  return JSON.parse(localStorage.getItem("watchlist") || "[]");
}

