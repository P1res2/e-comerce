import NextAuth from "next-auth";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { LoginError } from "@/lib/errors";
import { prisma } from "@/lib/prisma";
import { Role } from "@/generated/prisma/enums";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password)
          throw new LoginError("Campos vazios.");

        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string },
        });

        if (!user)
          throw new LoginError(
            "Email não cadastrado. Crie uma conta e tente novamente.",
          );

        if (user && !user.password) {
          throw new LoginError(
            "Este email já está vinculado ao Google. Faça login com o Google.",
          );
        }

        // Email verification
        if (!user.emailVerified) {
          throw new LoginError("Verifique o seu email.");
        }

        // verificar senha com bcrypt
        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password!,
        );

        if (!passwordMatch) throw new LoginError("Senha incorreta.");

        return user;
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.role = token.role as Role;
      return session;
    },
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        });
        if (!dbUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              name: user.name,
              image: user.image,
            },
          });
        }
        return true;
      } catch {
        return false;
      }
    },
  },
});
