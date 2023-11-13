// import { addUser, getUser } from "@/lib/user";
import { createNewUser, getUserByEmail } from "@/lib/common"
import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '@/lib/db';
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      // profile(profile, tokens) {
      //   return { ...profile, role: "user", id: '2' }
      // },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {

        if (credentials && credentials.email) {
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });

          if (user && user.password) {
            const signedIn = await bcrypt.compare(
              credentials?.password,
              user.password
            );

            if (signedIn) {
              return {
                name: `${user.firstName} ${user.lastName}`,
                firstname: user.firstName,
                lastname: user.lastName,
                id: user.id,
                role: user.role,
                email: user.email,
                emailVerified: user.emailVerified,
                active: user.active,
              };
            }
          }
        }
        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],
  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    strategy: "jwt", // See https://next-auth.js.org/configuration/nextjs#caveats, middleware (currently) doesn't support the "database" strategy which is used by default when using an adapter (https://next-auth.js.org/configuration/options#session)

  },
  callbacks: {
    async session({ token, session }) {
      return { ...session, user: { ...session.user, ...{ role: token.role, id: token.id } } };
    },
    async jwt({ token, user }) {

      if (token && token && token.email && token.name) {

        const dbUser = await getUserByEmail(token.email);
        if (dbUser) {
          token.role = dbUser?.role;
          token.id = dbUser?.id;
        } else {
          token.role = "USER"
          token.id = "";
        }

      }

      return token;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async signIn({ user, account, profile, email, credentials }) {
      if (!credentials && user && user.name && user.email) {

        const dbUser = await getUserByEmail(user.email);
        if (!dbUser) {
          const firstName = user.name?.split(' ').at(0) ?? ''
          const lastName = user.name?.split(' ').at(1) ?? ''
          await createNewUser({
            email: user.email,
            firstName: firstName,
            lastName: lastName,
          });
        }
      }
      if (credentials) {
        if (!user.email) { return false }
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email,
          },
        });
        if (!dbUser) { return false }

        if (dbUser.active == false) {
          return '/account-blocked'
        }
        if (dbUser.emailVerified == null) {
          return '/verfiy-email'
        }
      }
      return true;
    }
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }