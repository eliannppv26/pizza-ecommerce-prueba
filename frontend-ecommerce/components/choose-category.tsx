"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useGetCategories } from "@/hooks/getProducts"
import { CategoryType } from "@/types/category"
import { strapiMedia } from "@/lib/pizza"
import { Skeleton } from "@/components/ui/skeleton"
import Reveal from "@/components/reveal"

const ChooseCategory = () => {
  const { result, loading } = useGetCategories()
  const categories: CategoryType[] = Array.isArray(result) ? result : []

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <h2 className="mb-6 text-3xl font-semibold tracking-tight text-foreground">
          Explora por categoría
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-xl" />
          ))}

        {!loading &&
          categories.map((category, i) => (
            <Reveal key={category.id} delay={i * 70}>
              <Link
                href={`/category/${category.slug}`}
                className="group relative block h-64 overflow-hidden rounded-xl border border-border shadow-card transition-premium hover:-translate-y-1 hover:shadow-soft"
              >
                <img
                  src={strapiMedia(category.image)}
                  alt={category.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[600ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-lg font-semibold text-white drop-shadow">
                    {category.name}
                  </h3>
                  <span className="mt-1 flex items-center gap-1 text-sm text-white/85 transition-all duration-300 group-hover:gap-2">
                    Ver menú{" "}
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
      </div>
    </section>
  )
}

export default ChooseCategory
