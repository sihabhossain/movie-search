import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

const AuthRoutes = ["/wishlist"];

// Middleware function to handle routing logic
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the cookies from the request
  const userCookie = request.cookies.get("user");

  // If the route is protected and the user is not authenticated, redirect to login
  if (AuthRoutes.includes(pathname) && !userCookie) {
    return NextResponse.redirect(
      new URL(`/login?redirect=${pathname}`, request.url)
    );
  }

  // If the user is authenticated and accessing wishlist, allow access
  if (AuthRoutes.includes(pathname) && userCookie) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

// Apply middleware to the necessary routes (apply to all routes except static files)
export const config = {
  matcher: ["/((?!_next/static|favicon.ico).*)"],
};
