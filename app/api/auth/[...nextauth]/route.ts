import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const CAS_SERVICE_URL = "https://secure.its.yale.edu/cas";
const BASE_URL = process.env.NEXTAUTH_URL || "http://localhost:3000";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "CAS",
      credentials: {
        netId: { label: "NetID", type: "text" }
      },
      async authorize(credentials) {
        if (credentials?.netId) {
          // Return user object when credentials are provided
          return {
            id: credentials.netId,
            netId: credentials.netId,
            name: credentials.netId,
            email: `${credentials.netId}@yale.edu`
          };
        }
        return null;
      },
    }),
  ],

  pages: {
    signIn: `${CAS_SERVICE_URL}/login?service=${encodeURIComponent(
      `${BASE_URL}/api/auth/cas/callback`
    )}`,
  },

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user = { 
          netId: token.netId,
          name: token.name || token.netId,
          email: token.email || `${token.netId}@yale.edu`
        };
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.netId = user.netId;
      }
      return token;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production"
      }
    }
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };