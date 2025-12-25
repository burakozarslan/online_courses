import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 1. HARDCODED DUMMY USER FOR TESTING
        const user = {
          id: "1",
          name: "John Doe",
          email: "user@example.com",
          password: "password123",
          role: "user",
          isPro: true,
        };

        // 2. Validate input
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // 3. Verify credentials (dummy check)
        if (
          credentials.email === user.email &&
          credentials.password === user.password
        ) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // Redirect to our custom login page
    error: "/error", // Error code passed in query string as ?error=
  },
  callbacks: {
    async jwt({ token, user }) {
      // Pass user properties to token on initial login
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isPro = user.isPro;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass token properties to the client session
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.isPro = token.isPro;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs (e.g., /dashboard)
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      // Default to dashboard if the URL is invalid or external
      return `${baseUrl}/dashboard`;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-dont-use-in-prod",
};
