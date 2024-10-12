// lib/authOptions.ts
import { NextAuthOptions,getServerSession  } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        domain: { label: "Domain", type: "text" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
            {
              username: credentials?.username,
              password: credentials?.password,
              domain: credentials?.domain,
            }
          );

          const token = res.data?.token;

          if (token) {
            return { ...res.data, token };
          } else {
            return null;
          }
        } catch (error) {
          console.error("Authorization error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token; 
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.accessToken = token.accessToken; // Assuming 'accessToken' is a property of 'token' object
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
};
