// // src/middleware.ts
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // Get theme preference from cookies
//   const theme = request.cookies.get("darkMode")?.value;

//   // Modify response with theme-based header
//   const response = NextResponse.next();

//   if (theme) {
//     response.headers.set("x-dark-mode", theme);
//   }

//   return response;
// }

// // Apply middleware to all routes
// export const config = {
//   matcher: "/:path*",
// };



// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const theme = request.cookies.get("theme")?.value || "light";
  const response = NextResponse.next();
  response.headers.set("x-theme", theme);
  return response;
}
