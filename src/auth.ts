// auth.ts
import { SERVER_ENV } from "@/lib/env";
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
        username: {},
        password: {},
      },

      authorize: async (credentials) => {
        const response = await fetch(`${SERVER_ENV.BASE_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            ...REQUEST_HEADERS,
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const payload: ApiResponse<RegisterResponse> = await response.json();

        if (!payload.status) {
          return null; // fail login safely
        }

        const successPayload = payload as SuccessResponse<RegisterResponse>;

        // Flatten user object - access nested payload
        const user = successPayload.payload.user;
        return {
          id: user.id,
          token: successPayload.payload.token,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
          role: user.role,
          emailVerified: user.emailVerified ? true : null,
          phoneVerified: user.phoneVerified ? true : null,
        };
      },
    }),
  ],

  callbacks: {
    jwt: ({ token, user, trigger, session }) => {
      // Merge user info on login
      if (user) {
        token = {
          ...token,
          ...user,
          emailVerified:
            typeof user.emailVerified === "boolean" ? user.emailVerified : null,
          phoneVerified:
            typeof user.phoneVerified === "boolean" ? user.phoneVerified : null,
        };
      }

      // Merge session updates
      if (trigger === "update" && session) {
        token = { ...token, ...session };
      }

      return token;
    },

    session: ({ session, token }) => {
      // Map token back to session properties
      if (session.user) {
        session.user.name = `${token.firstName} ${token.lastName}`;
        session.user.email = token.email || "";
      }

      // Add custom properties to session
      return {
        ...session,
        _id: token.id,
        username: token.username,
        firstName: token.firstName,
        lastName: token.lastName,
        email: token.email || "",
        phone: token.phone,
        role: token.role,
        emailVerified: token.emailVerified,
        phoneVerified: token.phoneVerified,
      };
    },
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,
};
