"use client"

import Link from "next/link"
import { Heart } from "lucide-react"

import { useLovedItems } from "@/hooks/use-loved"
import LovedItemCard from "./components/loved-item"

export default function LovedProductsPage() {
  const items = useLovedItems()

  return (
    <div className="mx-auto min-h-[70vh] max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-foreground">
        Tus favoritos
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center shadow-card">
          <Heart className="size-10 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold text-foreground">
            Aún no tienes favoritos
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Toca el corazón en cualquier pizza para guardarla aquí.
          </p>
          <Link
            href="/#destacados"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Explorar pizzas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <LovedItemCard key={`${item.kind}-${item.refId}`} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
