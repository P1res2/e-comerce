import { Prisma } from "@/generated/prisma/client";

export function createPrismaExtension() {
  return Prisma.getExtensionContext(
    Prisma.defineExtension({
      result: {
        product: {
          price: {
            needs: { price: true },
            compute(product) {
              return Number(product.price);
            },
          },
        },
      },
    })
  );
}
