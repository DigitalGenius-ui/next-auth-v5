import { v4 as uuid } from "uuid";
import { getVerificationByEmail } from "./emailVerification";
import db from "@/db/db";

export const generateTokenByEmail = async (email: string) => {
  const token = uuid();
  const expireDate = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationByEmail(email);
  if (existingToken) {
    await db.emailVerification.delete({
      where: { id: existingToken.id },
    });
  }

  const createNewToken = await db.emailVerification.create({
    data: {
      email,
      expireDate,
      token,
    },
  });

  return createNewToken;
};
