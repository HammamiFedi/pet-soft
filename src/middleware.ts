import { auth } from "./lib/auth";

export default auth;

// It will run on every request except for the ones that match the following pattern
// In this case, it will be only the API routes and the static files
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
