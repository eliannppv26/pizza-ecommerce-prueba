"use client"

import { Gift, Heart, Plus } from "lucide-react"

import { ComboType } from "@/types/combo"
import {
  strapiMedia,
  comboCartLine,
  comboLovedItem,
} from "@/lib/pizza"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { cart } from "@/hooks/use-cart"
import { loved, useIsLoved } from "@/hooks/use-loved"
import ComboPreview from "@/components/combo-preview"

const ComboCard = ({ combo }: { combo: ComboType }) => {
  const isLoved = useIsLoved(combo.id, "combo")
  const includes = [
    ...(combo.pizzas ?? []).map((p) => p?.name),
    ...(combo.products ?? []).map((p) => p?.name),
  ].filter(Boolean) as string[]

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-premium hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <img
          src={strapiMedia(combo.image)}
          alt={combo.name}
          loading="lazy"
          className="animate-fade-in h-full w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
        />
        <Badge variant="green" className="absolute left-3 top-3 gap-1 shadow-card">
          <Gift className="size-3" /> Combo
        </Badge>
        <button
          onClick={() => loved.toggle(comboLovedItem(combo))}
          aria-label="Favorito"
          className="absolute right-3 top-3 flex size-8 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur transition-colors hover:bg-card"
        >
          <Heart
            className={cn(
              "size-4",
              isLoved ? "fill-brand-red text-brand-red" : "text-muted-foreground"
            )}
          />
        </button>

        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-all duration-200 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100">
          <ComboPreview combo={combo} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold leading-snug text-foreground">
          {combo.name}
        </h3>
        {combo.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {combo.description}
          </p>
        )}

        {includes.length > 0 && (
          <ul className="mt-3 space-y-1">
            {includes.slice(0, 4).map((name, i) => (
              <li
                key={i}
                className="flex items-center gap-1.5 text-xs text-muted-foreground"
              >
                <span className="size-1.5 rounded-full bg-brand-green-strong" />
                {name}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(combo.promo_price)}
          </span>
          <button
            onClick={() => cart.add(comboCartLine(combo))}
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground transition-premium hover:bg-primary/90 hover:shadow-soft active:translate-y-px"
          >
            <Plus className="size-3.5" /> Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ComboCard
