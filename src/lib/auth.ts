import bcrypt from "bcryptjs";
import NextAuth, { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

import { getUserByEmail } from "./server-utils";
import { authFormSchema } from "./schemas";

// config object is required to initialize NextAuth
const config = {
  // overwrite the default pages
  pages: {
    signIn: "/login",
    // Sign up is not specified in Next Auth, Because it's considered as adding a new resource to DB
    // It does not touch the core of the authentication process
  },

  session: {
    // The user doesn't have to log in every time he tries to access something
    // These are the default values, so you don't have to specify them
    // We will keep them here for the sake of clarity
    maxAge: 30 * 24 * 60 * 60, // 30 days by default
    strategy: "jwt", // JWT or Database Session
  },

  // Set Providers to enable or disable signin methods (Email and Password, Google, Github, etc)
  providers: [
    // (Email, username, etc) and Password provider
    credentials({
      // run on Login
      async authorize(credentials) {
        const validatedAuthData = authFormSchema.safeParse(credentials);

        // Return null if the form data is invalid
        if (!validatedAuthData.success) {
          return null;
        }

        // Destructure the email and password from the credentials object
        const { email, password } = validatedAuthData.data;

        // Find the user with the email
        const user = await getUserByEmail(email);

        // Check if the user exists
        if (!user) {
          return null;
        }

        // Check if the password matches
        const passwordDoesMatch = await bcrypt.compare(
          password,
          user.hashedPassword,
        );

        if (!passwordDoesMatch) {
          return null;
        }

        // return the user if everything is correct
        return user;
      },
    }),
  ],

  // Runs on every request with middleware
  callbacks: {
    // Function to determine if the user is allowed through or not
    // We need to return true or false
    authorized: ({ auth, request }) => {
      // Check if the user want to access a private page that needs authentication
      const isLoggedIn = !!auth?.user;
      const isTryingToAccessPrivatePage =
        request.nextUrl.pathname.includes("/private");

      // If the user is not authenticated and trying to access a private page, block him
      if (!isLoggedIn && isTryingToAccessPrivatePage) {
        // Redirect the user to the login page
        return false;
      }

      // If the user is authenticated and Trying to access a private page, let him through
      if (isLoggedIn && isTryingToAccessPrivatePage) return true;

      // If the user not trying to access a private page, redirect him to the dashboard
      if (isLoggedIn && !isTryingToAccessPrivatePage) {
        return Response.redirect(
          new URL("/private/dashboard", request.nextUrl),
        );
      }

      // If the user is not authenticated and not trying to access a private page
      if (!isLoggedIn && !isTryingToAccessPrivatePage) return true;
    },

    // This function is fired whenever a token has been created
    // The token then will be passed to the session
    jwt: ({ token, user }) => {
      if (user) {
        token.userId = user.id;
      }

      return token;
    },

    // This function is fired whenever a session is checked
    // Here we are destructing the token passed from the jwt function
    // To extract the userId
    session: ({ session, token }) => {
      if (session.user) {
        return {
          ...session,
          user: {
            ...session.user,
            id: token.userId,
          },
        };
      }

      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(config);
