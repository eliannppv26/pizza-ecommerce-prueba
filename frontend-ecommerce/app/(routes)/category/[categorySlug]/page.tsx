"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import { useGetPizzasByCategory } from "@/hooks/useGetPizzasByCategory"
import { PizzaType } from "@/types/pizza"
import PizzaCard from "@/components/shared/pizza-card"
import Reveal from "@/components/reveal"
import SkeletonSchema from "@/components/skeletonSchema"
import FiltersControlsCategory from "./components/filters-controls-category"
import { Separator } from "@/components/ui/separator"
import CategoryTabs from "@/components/category-tabs"

export default function CategoryPage() {
  const { categorySlug } = useParams<{ categorySlug: string }>()
  const { result, loading } = useGetPizzasByCategory(categorySlug)
  const [labelFilter, setLabelFilter] = useState("")

  const pizzas: PizzaType[] = Array.isArray(result) ? result : []
  const categoryName =
    pizzas[0]?.category?.name ??
    (typeof categorySlug === "string"
      ? categorySlug.replace(/-/g, " ")
      : "Pizzas")

  const visible = labelFilter
    ? pizzas.filter((p) => p.label === labelFilter)
    : pizzas

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="size-4" /> Inicio
      </Link>

      <h1 className="mt-3 text-3xl font-semibold capitalize tracking-tight text-foreground">
        {categoryName}
      </h1>

      <div className="mt-4">
        <CategoryTabs
          activeSlug={typeof categorySlug === "string" ? categorySlug : ""}
        />
      </div>
      <Separator className="my-5" />

      <div className="gap-8 sm:flex">
        <FiltersControlsCategory
          active={labelFilter}
          setActive={setLabelFilter}
        />

        <div className="flex-1">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {loading && <SkeletonSchema grid={3} />}
            {!loading &&
              visible.map((pizza, i) => (
                <Reveal key={pizza.id} delay={i * 60} className="h-full">
                  <PizzaCard pizza={pizza} />
                </Reveal>
              ))}
          </div>
          {!loading && visible.length === 0 && (
            <p className="text-muted-foreground">
              No hay pizzas en esta categoría todavía.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
