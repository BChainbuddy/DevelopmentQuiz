import { createProfile } from "@/actions/actions";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Guest",
      credentials: {},
      async authorize(credentials, req) {
        // For testing purposes, simply return a guest user object.
        return { id: "guest", name: "Guest User", email: "guest@example.com" };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn(message: any) {
      try {
        await createProfile(message.user.email);
      } catch (error) {
        console.error("Error creating profile:", error);
      }
    },
  },
};
