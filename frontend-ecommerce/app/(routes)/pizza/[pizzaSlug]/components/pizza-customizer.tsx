"use client"

import { useMemo, useState } from "react"
import { Heart, Minus, Plus } from "lucide-react"

import { PizzaType } from "@/types/pizza"
import { CartExtra } from "@/types/cart"
import {
  strapiMedia,
  sortSizes,
  sizeLabels,
  crustLabels,
  sauceLabels,
  labelText,
  pizzaLovedItem,
} from "@/lib/pizza"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { cart } from "@/hooks/use-cart"
import { loved, useIsLoved } from "@/hooks/use-loved"

const PizzaCustomizer = ({ pizza }: { pizza: PizzaType }) => {
  const sizes = useMemo(() => sortSizes(pizza.sizes), [pizza.sizes])
  const ingredients = pizza.ingredients ?? []
  const allowExtra = pizza.config?.allow_extra ?? false
  const allowRemove = pizza.config?.allow_remove ?? false
  const isLoved = useIsLoved(pizza.id, "pizza")

  const [sizeId, setSizeId] = useState<number | null>(sizes[0]?.id ?? null)
  const [extras, setExtras] = useState<Record<number, boolean>>({})
  const [removed, setRemoved] = useState<Record<number, boolean>>({})
  const [quantity, setQuantity] = useState(1)

  const selectedSize = sizes.find((s) => s.id === sizeId) ?? sizes[0]

  const extrasList: CartExtra[] = ingredients
    .filter((i) => extras[i.id])
    .map((i) => ({ name: i.name, price: i.extra_price ?? 0 }))

  const extrasTotal = extrasList.reduce((sum, e) => sum + e.price, 0)
  const unitPrice = (selectedSize?.price ?? 0) + extrasTotal
  const total = unitPrice * quantity

  const removedNames = ingredients
    .filter((i) => removed[i.id])
    .map((i) => i.name)

  const handleAdd = () => {
    const extrasKey = extrasList
      .map((e) => e.name)
      .sort()
      .join("|")
    const removedKey = [...removedNames].sort().join("|")
    cart.add({
      lineId: `pizza-${pizza.id}-${selectedSize?.size ?? "std"}-e${extrasKey}-r${removedKey}`,
      kind: "pizza",
      refId: pizza.id,
      slug: pizza.slug,
      name: pizza.name,
      imageUrl: strapiMedia(pizza.image),
      unitPrice,
      quantity,
      size: selectedSize?.size,
      sizeLabel: selectedSize ? sizeLabels[selectedSize.size] : undefined,
      crustLabel: pizza.crust?.crust_type
        ? crustLabels[pizza.crust.crust_type]
        : undefined,
      sauceLabel: pizza.crust?.sauce_type
        ? sauceLabels[pizza.crust.sauce_type]
        : undefined,
      extras: extrasList,
      removed: removedNames,
    })
  }

  return (
    <div className="mt-6 grid gap-8 lg:grid-cols-2">
      {/* Imagen */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-secondary">
          <img
            src={strapiMedia(pizza.image)}
            alt={pizza.name}
            className="animate-fade-in h-full w-full object-cover"
          />
          {pizza.label && (
            <Badge
              variant={pizza.label === "promo" ? "green" : "red"}
              className="absolute left-4 top-4 shadow-card"
            >
              {labelText[pizza.label] ?? pizza.label}
            </Badge>
          )}
        </div>
      </div>

      {/* Personalización */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {pizza.name}
          </h1>
          <button
            onClick={() => loved.toggle(pizzaLovedItem(pizza))}
            aria-label="Favorito"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
          >
            <Heart
              className={cn(
                "size-5",
                isLoved
                  ? "fill-brand-red text-brand-red"
                  : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        {pizza.description && (
          <p className="mt-2 text-muted-foreground">{pizza.description}</p>
        )}

        {/* Masa y salsa */}
        {(pizza.crust?.crust_type || pizza.crust?.sauce_type) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {pizza.crust?.crust_type && (
              <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                {crustLabels[pizza.crust.crust_type]}
              </span>
            )}
            {pizza.crust?.sauce_type && (
              <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                {sauceLabels[pizza.crust.sauce_type]}
              </span>
            )}
          </div>
        )}

        {/* Tamaño */}
        {sizes.length > 0 && (
          <div className="mt-6">
            <p className="mb-2 text-sm font-semibold text-foreground">
              Elige el tamaño
            </p>
            <div className="grid grid-cols-3 gap-2">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSizeId(s.id)}
                  className={cn(
                    "rounded-lg border px-3 py-2.5 text-center transition-colors",
                    sizeId === s.id
                      ? "border-brand-red bg-brand-red/10"
                      : "border-border hover:bg-secondary"
                  )}
                >
                  <span className="block text-sm font-semibold text-foreground">
                    {sizeLabels[s.size]}
                  </span>
                  <span className="block text-xs text-muted-foreground">
                    {formatPrice(s.price)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Ingredientes */}
        {ingredients.length > 0 && (
          <div className="mt-6">
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-foreground">
                Ingredientes
              </p>
              {(allowExtra || allowRemove) && (
                <span className="text-xs text-muted-foreground">
                  Por ingrediente: agrega extra o quítalo (no ambos).
                </span>
              )}
            </div>
            <ul className="divide-y divide-border rounded-xl border border-border">
              {ingredients.map((ing) => {
                const isRemoved = !!removed[ing.id]
                const isExtra = !!extras[ing.id]
                return (
                  <li
                    key={ing.id}
                    className="flex items-center justify-between gap-3 px-4 py-3"
                  >
                    <div className="min-w-0">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isRemoved
                            ? "text-muted-foreground line-through"
                            : "text-foreground"
                        )}
                      >
                        {ing.name}
                      </span>
                      {ing.is_premium && (
                        <Badge variant="neutral" className="ml-2">
                          Premium
                        </Badge>
                      )}
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                      {allowExtra && (
                        <button
                          onClick={() => {
                            setExtras((p) => ({ ...p, [ing.id]: !p[ing.id] }))
                            setRemoved((p) => ({ ...p, [ing.id]: false }))
                          }}
                          className={cn(
                            "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                            isExtra
                              ? "bg-brand-green/25 text-brand-green-strong"
                              : "bg-secondary text-secondary-foreground hover:bg-muted"
                          )}
                        >
                          {isExtra ? "Extra ✓" : "Extra"}
                          {ing.extra_price
                            ? ` +${formatPrice(ing.extra_price)}`
                            : ""}
                        </button>
                      )}
                      {allowRemove && (
                        <button
                          onClick={() => {
                            setRemoved((p) => ({ ...p, [ing.id]: !p[ing.id] }))
                            setExtras((p) => ({ ...p, [ing.id]: false }))
                          }}
                          className={cn(
                            "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors",
                            isRemoved
                              ? "bg-destructive/15 text-destructive"
                              : "bg-secondary text-secondary-foreground hover:bg-muted"
                          )}
                        >
                          {isRemoved ? "Quitado" : "Quitar"}
                        </button>
                      )}
                    </div>
                  </li>
                )
              })}
            </ul>
            {!allowExtra && !allowRemove && (
              <p className="mt-2 text-xs text-muted-foreground">
                Esta pizza viene con su receta de la casa.
              </p>
            )}
          </div>
        )}

        {/* Cantidad + total */}
        <div className="mt-8 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-foreground">
              Cantidad
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                aria-label="Quitar uno"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-6 text-center text-sm font-semibold">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                aria-label="Agregar uno"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex items-end justify-between">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(total)}
            </span>
          </div>

          <button
            onClick={handleAdd}
            disabled={sizes.length > 0 && !selectedSize}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px disabled:opacity-50"
          >
            <Plus className="size-4" /> Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaCustomizer
