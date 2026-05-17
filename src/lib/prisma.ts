import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma/client";
import { createPrismaExtension } from "./prisma-extensions";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("⚠️ DATABASE_URL não está definida no ambiente.");
}

const pool = new Pool({ connectionString });

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

function createPrismaClient() {
  return new PrismaClient({ adapter }).$extends(createPrismaExtension());
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
