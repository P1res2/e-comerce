import { Prisma } from "@/generated/prisma/client";
import { ProductsTable } from "./components/products-table";
import { getProducts } from "@/lib/product";

export default async function ProductsPage() {
  const products = await getProducts();
  for (let i = 0; i < 15; i++) {
    products.push({
      id: "prod_clx123abc456def789",
      name: "Teclado Mecânico RGB GPro",
      slug: "teclado-mecanico-rgb-gpro",
      description:
        "Teclado mecânico switch blue com retroiluminação RGB customizável e layout ABNT2.",
      price: new Prisma.Decimal(459.9), // Instancia o Decimal do Prisma corretamente
      stock: 15,
      images: [
        "https://seu-bucket-s3.amazonaws.com/produtos/teclado-gpro-1.jpg",
        "https://seu-bucket-s3.amazonaws.com/produtos/teclado-gpro-2.jpg",
      ],
      isActive: true,
      createdAt: new Date(), // Gera o timestamp do momento atual
      category: {
        id: "cat_gaming_hardware_01",
        name: "Gaming",
        slug: "gaming",
      },
      categoryId: "cat_gaming_hardware_01",
    });
  }

  return <ProductsTable data={products} />;
}
