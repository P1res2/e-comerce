import { resend } from "./resend";
import { VerifyEmail } from "@/emails/verify-email";

export async function sendVerificationEmail(
  email: string,
  name: string,
  token: string,
) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "noreply@ecomerce.com",
    to: email,
    subject: "Confirme seu email",
    react: VerifyEmail({ verificationUrl, name }),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
