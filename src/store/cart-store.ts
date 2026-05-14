import { create } from 'zustand'
import { CartItemWithProduct } from '@/types'

interface CartStore {
  items: CartItemWithProduct[]
  addItem: (item: CartItemWithProduct) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
}

export const useCart = create<CartStore>((set) => ({
  items: [],

  addItem: (item) => set((state) => {
    const exists = state.items.find((i) => i.id === item.id)
    if (exists) {
      // if it exists, increase the quantity
      return {
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      }
    }
    return { items: [...state.items, item] }
  }),

  removeItem: (itemId) => set((state) => ({
    items: state.items.filter((i) => i.id !== itemId),
  })),

  clearCart: () => set({ items: [] }),
}))
