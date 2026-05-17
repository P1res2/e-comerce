import { getProducts } from "@/lib/product";
import { ProductsTable } from "./table";

export async function ProductsDataTable({ className }: { className?: string }) {
  const products = await getProducts();

  for (let i = 0; i < 10; i++) {
    products.push({
      id: "prod_clx123abc456def789",
      name: "Teclado Mecânico RGB GPro",
      slug: "teclado-mecanico-rgb-gpro",
      description:
        "Teclado mecânico switch blue com retroiluminação RGB customizável e layout ABNT2.",
      price: 459.9,
      stock: 15,
      images: [],
      isActive: true,
      createdAt: new Date(),
      category: {
        id: "cat_gaming_hardware_01",
        name: "Gaming",
        slug: "gaming",
      },
      categoryId: "cat_gaming_hardware_01",
    });
  }

  return <ProductsTable className={className} data={products} />;
}
