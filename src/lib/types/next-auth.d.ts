/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    emailVerified: boolean | null;
    phoneVerified: boolean | null;
    token: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Session extends Omit<User, "token"> {}
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface JWT extends User {}
}
