import { prisma } from "./prisma";

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
    });

    return products;
  } catch {
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const products = await prisma.product.findUnique({
      where: { id },
    });

    return products;
  } catch {
    return [];
  }
}

export async function getProductsByCategory(categoryId: string) {
  try {
    const products = await prisma.product.findMany({
      where: { categoryId },
    });
    return products;
  } catch {
    return [];
  }
}
