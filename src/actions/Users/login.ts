"use server";

import * as z from "zod";
import { loginSchemas } from "@/schemas/formSchemas";
import { signIn } from "@/auth";
import { default_redirect } from "@/middlewareRoutes";
import { AuthError } from "next-auth";
import { getUserByEmail } from "./getUsersData";
import { generateTokenByEmail } from "./generateToken";
import { sendVerificationEmail } from "./sendEmail";

export const login = async (values: z.infer<typeof loginSchemas>) => {
  const validateFields = loginSchemas.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid credential!" };
  }

  const { email, password } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credential!" };
  }

  if (!existingUser?.emailVerified) {
    const newToken = await generateTokenByEmail(existingUser.email);
    await sendVerificationEmail({
      token: newToken.token,
      email: newToken.email,
    });
    return { error: "Email has not been verified." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: default_redirect,
    });
    return { success: "User Logged in" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };

        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
