import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      twitterId?: string | null
      username?: string | null
      displayName?: string | null
      planType?: string
      settings?: any
    }
  }

  interface User {
    id: string
    name?: string | null
    email?: string | null
    image?: string | null
    twitterId?: string | null
    username?: string | null
    displayName?: string | null
    planType?: string
    settings?: any
  }
}