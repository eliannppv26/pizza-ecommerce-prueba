"use client"

import Link from "next/link"
import { Plus, X } from "lucide-react"

import { LovedItem } from "@/types/cart"
import { formatPrice } from "@/lib/formatPrice"
import { cart } from "@/hooks/use-cart"
import { loved } from "@/hooks/use-loved"

const hrefFor = (item: LovedItem) => {
  if (item.kind === "pizza") return `/pizza/${item.slug}`
  if (item.kind === "combo") return "/#combos"
  return "/#complementos"
}

const LovedItemCard = ({ item }: { item: LovedItem }) => {
  const href = hrefFor(item)

  const handleAdd = () => {
    cart.add({
      lineId: `${item.kind}-${item.refId}`,
      kind: item.kind,
      refId: item.refId,
      slug: item.slug,
      name: item.name,
      imageUrl: item.imageUrl,
      unitPrice: item.price,
      quantity: 1,
    })
  }

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-premium hover:-translate-y-1 hover:shadow-soft">
      <button
        onClick={() => loved.remove(item.refId, item.kind)}
        aria-label="Quitar de favoritos"
        className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur transition-colors hover:bg-card"
      >
        <X className="size-4" />
      </button>

      <Link href={href} className="block aspect-[4/3] overflow-hidden bg-secondary">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
          />
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <Link
          href={href}
          className="font-semibold text-foreground line-clamp-1 hover:text-brand-red-strong"
        >
          {item.name}
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            {item.kind === "pizza" ? "Desde " : ""}
            {formatPrice(item.price)}
          </span>
          {item.kind === "pizza" ? (
            <Link
              href={href}
              className="text-xs font-bold text-brand-red-strong hover:text-brand-red"
            >
              Personalizar
            </Link>
          ) : (
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-premium hover:bg-primary/90"
            >
              <Plus className="size-3.5" /> Agregar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default LovedItemCard
