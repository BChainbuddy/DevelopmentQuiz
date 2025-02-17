import { createProfile } from "@/actions/actions";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? "",
      clientSecret: process.env.GOOGLE_SECRET ?? "",
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
