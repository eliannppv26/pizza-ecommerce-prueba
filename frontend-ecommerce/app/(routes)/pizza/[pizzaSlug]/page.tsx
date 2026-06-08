"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { useGetPizzaBySlug } from "@/hooks/useGetPizzaBySlug"
import PizzaCustomizer from "./components/pizza-customizer"
import { Skeleton } from "@/components/ui/skeleton"

export default function PizzaPage() {
  const { pizzaSlug } = useParams<{ pizzaSlug: string }>()
  const { result, loading } = useGetPizzaBySlug(pizzaSlug)

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Volver al menú
      </Link>

      {loading && (
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      )}

      {!loading && !result && (
        <p className="mt-10 text-muted-foreground">
          No encontramos esta pizza. Puede que ya no esté disponible.
        </p>
      )}

      {!loading && result && <PizzaCustomizer pizza={result} />}
    </div>
  )
}
