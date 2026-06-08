"use client"

import { createStore } from "@/lib/store"
import { CartLine } from "@/types/cart"
import { toast } from "@/hooks/use-toast"

type CartState = { items: CartLine[] }

const store = createStore<CartState>({ items: [] }, "bella-masa-cart")

export function useCartItems() {
  return store.useStore((s) => s.items)
}

export function useCartCount() {
  return store.useStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))
}

export function useCartTotal() {
  return store.useStore((s) =>
    s.items.reduce((total, i) => total + i.unitPrice * i.quantity, 0)
  )
}

export const cart = {
  add(line: CartLine) {
    store.set((s) => {
      const existing = s.items.find((i) => i.lineId === line.lineId)
      if (existing) {
        return {
          items: s.items.map((i) =>
            i.lineId === line.lineId
              ? { ...i, quantity: i.quantity + line.quantity }
              : i
          ),
        }
      }
      return { items: [...s.items, line] }
    })
    toast({ title: "Añadido al carrito", description: line.name, variant: "success" })
  },
  setQty(lineId: string, quantity: number) {
    store.set((s) => ({
      items: s.items.map((i) =>
        i.lineId === lineId ? { ...i, quantity: Math.max(1, quantity) } : i
      ),
    }))
  },
  remove(lineId: string) {
    store.set((s) => ({ items: s.items.filter((i) => i.lineId !== lineId) }))
    toast({ title: "Producto eliminado del carrito" })
  },
  clear() {
    store.set(() => ({ items: [] }))
  },
  get items() {
    return store.get().items
  },
}
