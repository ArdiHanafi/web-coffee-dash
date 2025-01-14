import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { NextAuthLoginSchema } from "./schema";

export const { auth, signIn, signOut, unstable_update } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = NextAuthLoginSchema.safeParse({
          email: credentials.email,
          password: credentials.password,
        });

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_SERVICE}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.API_KEY ?? "",
            },
            body: JSON.stringify({ email, password }),
          });

          if (res.ok) {
            const data = await res.json();
            if (data?.token && data?.user) {
              // Return user and token
              return {
                ...data.user,
                accessToken: data.token, // Include the token
              };
            }
          }
        }
        return null; // Return null if login fails
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        token.phoneNumber = user.phoneNumber;
        token.accessToken = user.accessToken;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          phoneNumber: token.phoneNumber,
        } as any;
        session.accessToken = token.accessToken as string;
      }
      return session;
    }
  },
});
