"use client"

import Link from "next/link"
import { Menu } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useGetCategories } from "@/hooks/getProducts"
import { CategoryType } from "@/types/category"

const ItemsMenuMobile = () => {
  const { result } = useGetCategories()
  const categories: CategoryType[] = Array.isArray(result) ? result : []

  return (
    <Popover>
      <PopoverTrigger
        aria-label="Menú"
        className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
      >
        <Menu strokeWidth={1.5} className="size-5" />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-52 flex-col gap-1 p-2">
        <p className="px-2 pb-1 pt-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Pizzas
        </p>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
          >
            {category.name}
          </Link>
        ))}
        <div className="my-1 h-px bg-border" />
        <Link
          href="/#combos"
          className="rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
        >
          Combos
        </Link>
        <Link
          href="/#complementos"
          className="rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
        >
          Complementos
        </Link>
        <Link
          href="/#nosotros"
          className="rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-secondary"
        >
          Nosotros
        </Link>
      </PopoverContent>
    </Popover>
  )
}

export default ItemsMenuMobile
