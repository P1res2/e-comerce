import type { User, Address, Category, Product, Cart, CartItem, Order, OrderItem, Payment } from "@/generated/prisma/client"

// Re-export base types
export type { User, Address, Category, Product, Cart, CartItem, Order, OrderItem, Payment }

// Composite types
export type CartItemWithProduct = CartItem & {
  product: Product
}

export type CartWithItems = Cart & {
  items: CartItemWithProduct[]
}

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[]
}
