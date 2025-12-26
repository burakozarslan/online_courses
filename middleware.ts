import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Return true if token exists, false if not (redirects to login)
      return !!token;
    },
  },
});

export const config = {
  // Protect only the dashboard and sub-routes
  // TODO: Add Private routes here
  matcher: ["/overview/:path*"],
};
