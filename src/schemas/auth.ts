import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string("Dados inválidos").min(1, "Obrigatório"),
  password: z.string("Dados inválidos").min(1, "Obrigatório"),
});

export type TLoginForm = z.infer<typeof loginFormSchema>;

export const signupFormSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export type TSignupForm = z.infer<typeof signupFormSchema>;
