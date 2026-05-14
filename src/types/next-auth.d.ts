import { Role } from "@/generated/prisma/client";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: Role;
      name: string;
      email: string;
      image: string;
    } & DefaultSession["user"];
  }

  interface User {
    role: Role;
  }
}
