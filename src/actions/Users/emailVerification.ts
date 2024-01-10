"use server";

import db from "@/db/db";

export const getVerificationByToken = async (token: string) => {
  try {
    const verificationToken = await db.emailVerification.findUnique({
      where: { token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationByEmail = async (email: string) => {
  try {
    const verificationToken = await db.emailVerification.findFirst({
      where: { email },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
