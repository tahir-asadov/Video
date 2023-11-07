import { addUser, getUser } from "@/lib/user";
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    strategy: "jwt", // See https://next-auth.js.org/configuration/nextjs#caveats, middleware (currently) doesn't support the "database" strategy which is used by default when using an adapter (https://next-auth.js.org/configuration/options#session)

  },
  callbacks: {
    async session({ token, session }) {
      if (session && session.user && session.user.email) {
        const dbUser = await getUser({
          email: session.user.email,
        })
        session.user.role = dbUser?.role || "MEMBER";
      }
      return { ...session, token };
    },
    async jwt({ token, user }) {
      if (token.email) {
        const dbUser = await addUser({
          email: token.email,
          name: token.name,
        })
        return {
          name: token.name,
          email: token.email,
          role: dbUser?.role || "MEMBER",
        }
      }
      return token;
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }