import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      id: "cas",
      name: "CAS",
      credentials: {},
      async authorize(credentials, req) {
        // This will be handled by our custom routes
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.netId = user.netId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && typeof token.netId === 'string') {
        session.user = { netId: token.netId };
      }
      return session;
    },
  },
  pages: {
    signIn: '/api/auth/cas',
  },
  session: {
    strategy: "jwt",
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);