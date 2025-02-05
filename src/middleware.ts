import { auth as middleware } from "@/auth"
 
export default middleware;
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/calendars/:path*'],
};