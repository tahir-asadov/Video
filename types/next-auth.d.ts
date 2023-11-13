import { DefaultSession, DefaultUser } from 'next-auth'

import { JWT, DefautlJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string,
      role: string,
      email: string
    } & DefaultSession
  }

  interface User extends DefaultUser {
    id: string,
    role: string
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefautlJWT {
    id: string,
    role: string
  }
}