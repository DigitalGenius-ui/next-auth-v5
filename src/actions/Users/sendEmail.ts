import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type verifyEmail = {
  token: string;
  email: string;
};

export const sendVerificationEmail = async ({ token, email }: verifyEmail) => {
  const verifyLink = `http://localhost:3000/verify/new-verification?token${token}`;
  try {
    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Verify your email.",
      html: `<p>Please click <a href="${verifyLink}">here</a> to verify your email.</p>`,
    });
    return data;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
