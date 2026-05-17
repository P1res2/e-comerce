import type {
  User,
  Address,
  Category,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
} from "@/generated/prisma/client";

// Re-export base types
export type {
  User,
  Address,
  Category,
  Product,
  Cart,
  CartItem,
  Order,
  OrderItem,
  Payment,
};

// Composite types
export type CartItemWithProduct = Omit<CartItem, "price"> & {
  product: Omit<Product, "price"> & { price: number };
  price: number;
};

export type CartWithItems = Cart & {
  items: CartItemWithProduct[];
};

export type OrderWithItems = Order & {
  items: (Omit<OrderItem, "price"> & {
    product: Omit<Product, "price"> & { price: number };
    price: number;
  })[];
};

export type ProductWithCategory = Omit<Product, "price"> & {
  category: Category;
  price: number;
};
