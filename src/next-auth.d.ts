import { UserRole } from "@prisma/client";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole;
      id: string;
    };
  }
}
