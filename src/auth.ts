import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import db from "@/db/db";
import { getUserById } from "./actions/Users/getUsersData";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;

      const currentUser = await getUserById(user.id);
      if (!currentUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return null;
      const getUser = await getUserById(token.sub);

      if (!getUser) return token;
      token.role = getUser.role;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session?.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  ...authConfig,
});
