"use client"

import { createStore } from "@/lib/store"

export type ToastVariant = "default" | "success" | "destructive"

export type ToastItem = {
  id: number
  title?: string
  description?: string
  variant?: ToastVariant
}

type ToastState = { toasts: ToastItem[] }

const store = createStore<ToastState>({ toasts: [] })
let counter = 0

export function toast(input: Omit<ToastItem, "id">) {
  const id = ++counter
  store.set((s) => ({ toasts: [...s.toasts, { id, variant: "default", ...input }] }))
  if (typeof window !== "undefined") {
    window.setTimeout(() => dismiss(id), 3500)
  }
  return id
}

export function dismiss(id: number) {
  store.set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) }))
}

export function useToasts() {
  return store.useStore((s) => s.toasts)
}
