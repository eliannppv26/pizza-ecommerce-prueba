"use client"

import { useState } from "react"
import { useGetComplements } from "@/hooks/useGetComplements"
import { ProductType } from "@/types/product"
import { productCategoryLabels } from "@/lib/pizza"
import ProductCard from "@/components/product-card"
import SkeletonSchema from "./skeletonSchema"
import { cn } from "@/lib/utils"
import Reveal from "@/components/reveal"

const filters: { value: string; label: string }[] = [
  { value: "", label: "Todos" },
  { value: "drink", label: productCategoryLabels.drink },
  { value: "side", label: productCategoryLabels.side },
  { value: "dessert", label: productCategoryLabels.dessert },
]

const Complementos = () => {
  const [active, setActive] = useState("")
  const { result, loading } = useGetComplements()
  const products: ProductType[] = Array.isArray(result) ? result : []
  const visible = active
    ? products.filter((p) => p.category === active)
    : products

  return (
    <section id="complementos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Complementos
          </h2>
          <p className="mt-1 text-muted-foreground">
            Bebidas, entradas y postres para acompañar tu pizza.
          </p>
        </div>
      </Reveal>

      <div className="mb-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              "rounded-sm px-3 py-1.5 text-sm font-medium transition-colors",
              active === f.value
                ? "bg-brand-red text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {loading && <SkeletonSchema grid={4} />}
        {!loading &&
          visible.map((product, i) => (
            <Reveal key={product.id} delay={i * 60} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        {!loading && visible.length === 0 && (
          <p className="text-muted-foreground">
            Aún no hay complementos en esta categoría.
          </p>
        )}
      </div>
    </section>
  )
}

export default Complementos
