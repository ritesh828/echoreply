import NextAuth from "next-auth"
import TwitterProvider from "next-auth/providers/twitter"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getServerSession } from "next-auth/next"
import { prisma } from "./prisma"

const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      version: "2.0",
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
        
        // Fetch user settings from database
        const userSettings = await prisma.settings.findUnique({
          where: { userId: user.id }
        })
        
        session.user.settings = userSettings
      }
      return session
    },
    async signIn({ user, account, profile }) {
      if (account && account.provider === "twitter") {
        // Store Twitter access token in database
        await prisma.account.upsert({
          where: {
            provider_providerAccountId: {
              provider: "twitter",
              providerAccountId: account.providerAccountId,
            },
          },
          update: {
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
          },
          create: {
            userId: user.id,
            type: "oauth",
            provider: "twitter",
            providerAccountId: account.providerAccountId,
            access_token: account.access_token,
            refresh_token: account.refresh_token,
            expires_at: account.expires_at,
            token_type: account.token_type,
            scope: account.scope,
          },
        })
      }
      return true
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: "database",
  },
}

const handler = NextAuth(authOptions)

export { authOptions }
export const auth = () => getServerSession(authOptions)
export const handlers = handler
export default handler