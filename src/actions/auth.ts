'use server';

import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { NextAuthLoginSchema } from '@/schema';

export async function loginAction(value: z.infer<typeof NextAuthLoginSchema>) {
  const { email, password } = value;
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return true;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logoutAction() {
  await signOut({ redirect: false });
}