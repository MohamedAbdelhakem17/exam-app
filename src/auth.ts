import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { REQUEST_HEADERS } from "./lib/constants/request-headers.constant";
import { RegisterResponse } from "./lib/types/auth";

export const authOptions: NextAuthOptions = {
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
        const url = process.env.BASE_API_URL + "/auth/signin";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            ...REQUEST_HEADERS,
          },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const payload: ApiResponse<RegisterResponse> = await response.json();

        if ("code" in payload) {
          throw new Error(payload.message);
        }

        return {
          id: payload.user._id,
          token: payload.token,
          user: payload.user,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      if (user) {
        token = {
          ...token,
          ...user,
        };
      }

      if (trigger === "update" && session) {
        token = {
          ...token,
          ...session,
        };
      }

      return token;
    },

    session: ({ session, token }) => {
      session.user = token.user;

      return session;
    },
  },
};
