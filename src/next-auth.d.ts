import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    phoneNumber: string | null;
    accessToken?: string;
  }

  interface JWT {
    id: string;
    name: string | null;
    email: string;
    role: string;
    phoneNumber: string | null;
    accessToken?: string;
  }

  interface Session {
    user: {
      id: string;
      name: string | null;
      email: string;
      role: string;
      phoneNumber: string | null;
    };
    accessToken?: string;
  }
}
