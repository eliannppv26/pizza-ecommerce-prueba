"use client"

import { useState } from "react"
import { Eye, Gift, Heart, Minus, Pizza, Plus } from "lucide-react"

import { ComboType } from "@/types/combo"
import {
  strapiMedia,
  comboCartLine,
  comboLovedItem,
  productCategoryLabels,
} from "@/lib/pizza"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import IconButton from "@/components/icon-button"
import { cart } from "@/hooks/use-cart"
import { loved, useIsLoved } from "@/hooks/use-loved"

const ComboPreview = ({ combo }: { combo: ComboType }) => {
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const isLoved = useIsLoved(combo.id, "combo")

  const pizzas = (combo.pizzas ?? []).filter((p) => p?.name)
  const products = combo.products ?? []
  const hasContent = pizzas.length > 0 || products.length > 0

  const handleAdd = () => {
    cart.add({ ...comboCartLine(combo), quantity: qty })
    setOpen(false)
    setQty(1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton onClick={() => setOpen(true)} icon={<Eye size={18} />} />
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
          <img
            src={strapiMedia(combo.image)}
            alt={combo.name}
            className="animate-fade-in h-full w-full object-cover"
          />
          <Badge
            variant="green"
            className="absolute left-4 top-4 gap-1 shadow-card"
          >
            <Gift className="size-3" /> Combo
          </Badge>
        </div>

        <div className="p-6 pt-4">
          <DialogTitle>{combo.name}</DialogTitle>
          <DialogDescription className="mt-1.5">
            {combo.description || "Un combo pensado para compartir."}
          </DialogDescription>

          {hasContent ? (
            <div className="mt-5 space-y-5">
              {pizzas.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Pizza className="size-4 text-brand-red-strong" /> Pizzas
                    incluidas
                  </p>
                  <ul className="space-y-2">
                    {pizzas.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-2"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary">
                          {p.image?.url ? (
                            <img
                              src={strapiMedia(p.image)}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Pizza className="size-4 text-muted-foreground" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {p.name}
                          </p>
                          {p.category?.name && (
                            <p className="text-xs text-muted-foreground">
                              {p.category.name}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {products.length > 0 && (
                <div>
                  <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold text-foreground">
                    <Gift className="size-4 text-brand-green-strong" />{" "}
                    Complementos
                  </p>
                  <ul className="space-y-2">
                    {products.map((p) => (
                      <li
                        key={p.id}
                        className="flex items-center gap-3 rounded-lg border border-border bg-background/60 p-2"
                      >
                        <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-md bg-secondary">
                          {p.image?.url ? (
                            <img
                              src={strapiMedia(p.image)}
                              alt={p.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Gift className="size-4 text-muted-foreground" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">
                            {p.name}
                          </p>
                          {p.category && (
                            <p className="text-xs text-muted-foreground">
                              {productCategoryLabels[p.category] ?? p.category}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <p className="mt-5 rounded-lg border border-dashed border-border p-3 text-sm text-muted-foreground">
              Este combo aún no tiene productos enlazados en Strapi.
            </p>
          )}

          <div className="mt-6 flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Precio combo</span>
            <span className="text-2xl font-bold text-foreground">
              {formatPrice(combo.promo_price)}
            </span>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-semibold">Cantidad</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                aria-label="Quitar uno"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-5 text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                aria-label="Agregar uno"
              >
                <Plus className="size-4" />
              </button>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <button
              onClick={handleAdd}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-premium hover:bg-primary/90 active:translate-y-px"
            >
              <Plus className="size-4" /> Agregar al carrito
            </button>
            <button
              onClick={() => loved.toggle(comboLovedItem(combo))}
              aria-label="Favorito"
              className="flex size-10 items-center justify-center rounded-lg border border-border transition-colors hover:bg-secondary"
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
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ComboPreview
