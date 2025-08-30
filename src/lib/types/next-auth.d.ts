import NextAuth, { User } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User {
        "_id": string,
        "username": string,
        "firstName": string,
        "lastName": string,
        "email": string,
        "phone": string,
        "role": string,
        token: string
    }

    interface Session extends Omit<User, "token"> { }
}


declare module "next-auth/jwt" {
    interface JWT extends User { }
} 