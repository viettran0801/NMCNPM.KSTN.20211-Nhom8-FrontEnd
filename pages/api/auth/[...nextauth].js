import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        console.log(credentials);
        return {
          email: credentials.username,
        };
      },
    }),
  ],
  secret: "LlKq6ZtYbr+hTC073mAmAh9/h2HwMfsFo4hrfCx5mLg=",
});
