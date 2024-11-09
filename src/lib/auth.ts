import axios from "axios";
import { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET || "secret",
  session: { strategy: "jwt" as SessionStrategy },

  callbacks: {
    async jwt({ token, account }: any) {
      if (account?.access_token) {
        token.accessToken = account.access_token;

        try {
          const response = await axios.get(
            `${process.env.BACKEND_URL}/api/auth/google`,
            {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            }
          );

          token.signedToken = response.data.token;
        } catch (error) {
          console.error("Error fetching custom JWT:", error);
        }
      }

      return token;
    },

    async session({ session, token }: any) {
      session.token = token.signedToken;
      return session;
    },
  },
};
