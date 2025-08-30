import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { REQUEST_HEADERS } from "./lib/constants/request-headers.constant";
import { RegisterResponse } from "./lib/types/auth";

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
        const url = process.env.BASE_API_URL + "/auth/signin"
        const response = await fetch(url, {
          method: "POST",
          headers: {
            ...REQUEST_HEADERS
          },
          body: JSON.stringify({ email: credentials?.email, password: credentials?.password })
        })

        const payload: ApiResponse<RegisterResponse> = await response.json();

        if ("code" in payload) {
          throw new Error(payload.message)
        }

        return {
          id: payload.user._id,
          token: payload.token,
          ...payload.user
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        token = {
          ...token,
          ...user
        }
      }
      return token;
    },

    session: ({ session, token }) => {
      if (session.user?.email) {
        session.email = token.email || "";
        session.firstName = token.firstName;
        session.lastName = token.lastName;
        session.username = token.username;
        session.role = token.role;
        session.phone = token.phone;
        session._id = token._id;
      }

      return session;
    },
  },
};
