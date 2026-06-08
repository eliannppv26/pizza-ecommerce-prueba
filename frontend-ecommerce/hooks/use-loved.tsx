"use client"

import { createStore } from "@/lib/store"
import { LovedItem } from "@/types/cart"
import { toast } from "@/hooks/use-toast"

type LovedState = { items: LovedItem[] }

const store = createStore<LovedState>({ items: [] }, "bella-masa-loved")

export function useLovedItems() {
  return store.useStore((s) => s.items)
}

export function useLovedCount() {
  return store.useStore((s) => s.items.length)
}

export function useIsLoved(refId: number, kind: "pizza" | "product" | "combo") {
  return store.useStore((s) =>
    s.items.some((i) => i.refId === refId && i.kind === kind)
  )
}

export const loved = {
  toggle(item: LovedItem) {
    let added = false
    store.set((s) => {
      const exists = s.items.some(
        (i) => i.refId === item.refId && i.kind === item.kind
      )
      added = !exists
      return {
        items: exists
          ? s.items.filter(
              (i) => !(i.refId === item.refId && i.kind === item.kind)
            )
          : [...s.items, item],
      }
    })
    toast({
      title: added ? "Añadido a favoritos" : "Eliminado de favoritos",
      description: item.name,
      variant: added ? "success" : "default",
    })
  },
  remove(refId: number, kind: "pizza" | "product" | "combo") {
    store.set((s) => ({
      items: s.items.filter((i) => !(i.refId === refId && i.kind === kind)),
    }))
  },
}
