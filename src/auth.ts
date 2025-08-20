import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  pages: {
    signIn: "/signin",
  },

  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);

        // throw new Error("Error in Loin");
        return {
            id:"2"
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
      }
      return token;
    },

    session: ({ session, token }) => {
      if (session.user?.email) {
        session.user.email = token.email;
      }

      return session;
    },
  },
};
