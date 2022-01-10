import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { fetchAPI } from "../../../utils";

export default nextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          tpye: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetchAPI("/api/v1/auth/login", {
            method: "POST",
            body: credentials,
          });
          return {
            name: res.result.username,
            token: res.result.token,
          };
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.token = user.token;
      }
      return token;
    },

    async session({ session, token }) {
      session.token = token.token;
      return session;
    },
  },
});
