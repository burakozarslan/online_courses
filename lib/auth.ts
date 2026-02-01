import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./prisma";
import { env } from "@/lib/env";
import bcrypt from "bcrypt";

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
        // 2. Validate input
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            studentProfile: true,
            instructorProfile: true,
          },
        });
        if (!user) return null;

        // 3. Verify credentials (dummy check)
        // 3. Verify credentials
        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password || ""
        );

        if (passwordMatch) {
          // Any object returned will be saved in `user` property of the JWT
          return {
            ...user,
            role: user.studentProfile ? "STUDENT" : "ADMIN",
            isPro: user.studentProfile?.membership === "PRO",
          };
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
    async jwt({ token, user, trigger }) {
      // Pass user properties to token on initial login
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.isPro = user.isPro;
      }
      
      // Handle session updates (when update() is called)
      if (trigger === "update") {
        // Re-fetch user data from database to get latest membership status
        const freshUser = await db.user.findUnique({
          where: { id: token.id as string },
          include: { 
            studentProfile: true,
            instructorProfile: true 
          }
        });
        
        if (freshUser) {
          token.role = freshUser.studentProfile ? "STUDENT" : "ADMIN";
          token.isPro = freshUser.studentProfile?.membership === "PRO";
        }
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
      return `${baseUrl}/overview`;
    },
  },
  secret: env.NEXTAUTH_SECRET,
};