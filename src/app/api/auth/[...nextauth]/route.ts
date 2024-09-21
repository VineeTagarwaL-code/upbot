import NextAuth, { SessionStrategy } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { headers } from "next/headers";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  secret: process.env.SECRET || "secret2",
  session: { strategy: "jwt" as SessionStrategy },

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && user) {
        try {
          const response = await axios.get(
            `${process.env.BACKEND_URL}/api/auth/google`,
            {
              headers: {
                Authorization: `Bearer ${account.access_token}`,
              },
            }
          );

          const data = response.data;
          token.token = data.additional.token;
        } catch (err) {
          console.log(err);
        }
      }
      return token;
    },
    async session({ session, token }: any) {
      session.token = token.token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
