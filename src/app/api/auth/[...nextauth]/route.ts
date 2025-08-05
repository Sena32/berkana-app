import NextAuth from "next-auth";
import authOptions from "../authOptions";
import { User as UserType } from "@/types/auth";

// Extendendo o tipo Session para incluir accessToken
declare module "next-auth" {
  interface User extends Omit<UserType, 'accessToken'> {
    accessToken: string,
    refreshToken: string
  }

  interface Session {
    accessToken?: string;
    user: User
  }

  interface JWT {
    accessToken?: string;
    refreshToken?: string
    accessTokenExpires?: number;  // timestamp (ms)
    user?: User
    error?: string;
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };