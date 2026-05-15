"use server";

import { executeAction } from "@/lib/executeAction";
import { TLoginForm, TSignupForm } from "@/schemas/auth";
import { signIn } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import { randomUUID } from "crypto";

export async function handleCredentialsLogin(formData: TLoginForm) {
  return await executeAction({
    actionFn: async () => {
      await signIn("credentials", { ...formData, redirect: false });
    },
    successMessage: "Login realizado com sucesso!",
    errorMessage: "Falha no login",
  });
}

export async function handleGoogleLogin() {
  return await executeAction({
    actionFn: async () => {
      await signIn("google");
    },
    successMessage: "Login realizado com sucesso!",
    errorMessage: "Falha no login",
  });
}

export async function handleSignup(formData: TSignupForm) {
  const existingUser = await prisma.user.findUnique({
    where: { email: formData.email },
  });

  if (existingUser) {
    throw new Error("Email já cadastrado. Tente fazer login.");
  }

  const hashedPassword = await bcrypt.hash(formData.password, 12);

  await prisma.user.create({
    data: {
      name: formData.name,
      email: formData.email,
      password: hashedPassword,
    },
  });

  const token = randomUUID();
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24);

  await prisma.verificationToken.create({
    data: {
      identifier: formData.email,
      token,
      expires,
    },
  });

  await sendVerificationEmail(formData.email, formData.name, token);

  return { success: true, message: "Verifique seu email!" };
}
