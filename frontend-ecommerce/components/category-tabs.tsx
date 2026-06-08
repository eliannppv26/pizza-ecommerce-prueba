"use client"

import Link from "next/link"
import { useGetCategories } from "@/hooks/getProducts"
import { CategoryType } from "@/types/category"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

const CategoryTabs = ({ activeSlug }: { activeSlug: string }) => {
  const { result, loading } = useGetCategories()
  const categories: CategoryType[] = Array.isArray(result) ? result : []

  if (loading) {
    return (
      <div className="flex gap-2 overflow-x-auto pb-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 shrink-0 rounded-full" />
        ))}
      </div>
    )
  }

  return (
    <nav
      aria-label="Categorías"
      className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1"
    >
      {categories.map((category) => {
        const active = category.slug === activeSlug
        return (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            aria-current={active ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-premium",
              active
                ? "border-brand-red bg-brand-red text-primary-foreground shadow-card"
                : "border-border bg-card text-foreground hover:-translate-y-0.5 hover:border-brand-red/50 hover:bg-secondary"
            )}
          >
            {category.name}
          </Link>
        )
      })}
    </nav>
  )
}

export default CategoryTabs
