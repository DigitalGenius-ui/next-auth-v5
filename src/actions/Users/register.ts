"use server";

import * as z from "zod";
import { registerSchemas } from "@/schemas/formSchemas";
import db from "@/db/db";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "./getUsersData";
import { generateTokenByEmail } from "./generateToken";
import { sendVerificationEmail } from "./sendEmail";

export const register = async (values: z.infer<typeof registerSchemas>) => {
  const isValidInput = registerSchemas.safeParse(values);

  if (!isValidInput.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = isValidInput.data;

  const isUserExist = await getUserByEmail(email);

  if (isUserExist) {
    return { error: "Email already in use!" };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });

  const newToken = await generateTokenByEmail(email);

  await sendVerificationEmail({ token: newToken.token, email: newToken.email });

  return { success: "Confirmation Email has been sent." };
};
