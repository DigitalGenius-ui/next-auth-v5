import CredentialsProvider from "next-auth/providers/credentials";

import type { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "./actions/Users/getUsersData";
import { loginSchemas } from "@/schemas/formSchemas";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const validateFields = loginSchemas.safeParse(credentials);

        if (validateFields.success) {
          const { email, password } = validateFields.data;
          const user = await getUserByEmail(email);

          if (!user || !user.password) return null;

          const isPasswordMatch = await bcrypt.compare(password, user.password);

          if (isPasswordMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
