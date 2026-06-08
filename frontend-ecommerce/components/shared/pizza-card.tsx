"use client"

import { useRouter } from "next/navigation"
import { Expand, Heart, Plus } from "lucide-react"

import { PizzaType } from "@/types/pizza"
import {
  strapiMedia,
  pizzaBasePrice,
  labelText,
  defaultPizzaCartLine,
  pizzaLovedItem,
} from "@/lib/pizza"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import IconButton from "@/components/icon-button"
import { cart } from "@/hooks/use-cart"
import { loved, useIsLoved } from "@/hooks/use-loved"

const PizzaCard = ({ pizza }: { pizza: PizzaType }) => {
  const router = useRouter()
  const isLoved = useIsLoved(pizza.id, "pizza")
  const image = strapiMedia(pizza.image)
  const price = pizzaBasePrice(pizza)

  return (
    <div className="group/card flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-premium hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={image}
          alt={pizza.name}
          loading="lazy"
          className="animate-fade-in h-full w-full object-cover transition-transform duration-500 ease-out group-hover/card:scale-105"
        />

        {pizza.label && (
          <Badge
            variant={pizza.label === "promo" ? "green" : "red"}
            className="absolute left-3 top-3 shadow-card"
          >
            {labelText[pizza.label] ?? pizza.label}
          </Badge>
        )}

        <button
          onClick={() => loved.toggle(pizzaLovedItem(pizza))}
          aria-label="Favorito"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur transition-colors hover:bg-card"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              isLoved
                ? "fill-brand-red text-brand-red"
                : "text-muted-foreground"
            )}
          />
        </button>

        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-3 opacity-0 transition duration-200 group-hover/card:opacity-100">
          <IconButton
            onClick={() => router.push(`/pizza/${pizza.slug}`)}
            icon={<Expand size={18} />}
          />
          <IconButton
            onClick={() => cart.add(defaultPizzaCartLine(pizza))}
            icon={<Plus size={18} />}
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3
          onClick={() => router.push(`/pizza/${pizza.slug}`)}
          className="cursor-pointer text-base font-semibold leading-snug text-foreground line-clamp-1 hover:text-brand-red-strong"
        >
          {pizza.name}
        </h3>
        {pizza.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {pizza.description}
          </p>
        )}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm font-semibold text-foreground">
            <span className="text-xs font-medium text-muted-foreground">
              Desde{" "}
            </span>
            {formatPrice(price)}
          </span>
          <button
            onClick={() => router.push(`/pizza/${pizza.slug}`)}
            className="text-xs font-bold text-brand-red-strong transition-colors hover:text-brand-red"
          >
            Personalizar
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaCard
