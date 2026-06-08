"use client"

import { useState } from "react"
import { Eye, Heart, Minus, Plus } from "lucide-react"

import { ProductType } from "@/types/product"
import {
  strapiMedia,
  productCartLine,
  productLovedItem,
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

const ProductPreview = ({ product }: { product: ProductType }) => {
  const [open, setOpen] = useState(false)
  const [qty, setQty] = useState(1)
  const isLoved = useIsLoved(product.id, "product")

  const handleAdd = () => {
    cart.add({ ...productCartLine(product), quantity: qty })
    setOpen(false)
    setQty(1)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <IconButton onClick={() => setOpen(true)} icon={<Eye size={18} />} />
      </DialogTrigger>
      <DialogContent className="overflow-hidden">
        <div className="grid sm:grid-cols-2">
          <div className="aspect-square overflow-hidden bg-secondary sm:aspect-auto">
            <img
              src={strapiMedia(product.image)}
              alt={product.name}
              className="animate-fade-in h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col p-6">
            {product.category && (
              <Badge variant="green" className="mb-2 w-fit">
                {productCategoryLabels[product.category] ?? product.category}
              </Badge>
            )}
            <DialogTitle>{product.name}</DialogTitle>
            <DialogDescription className="mt-2">
              {product.description || "Un complemento perfecto para tu pizza."}
            </DialogDescription>

            <span className="mt-4 text-2xl font-bold text-foreground">
              {formatPrice(product.price)}
            </span>

            <div className="mt-auto pt-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-semibold">Cantidad</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                    aria-label="Quitar uno"
                  >
                    <Minus className="size-4" />
                  </button>
                  <span className="w-5 text-center text-sm font-semibold">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    className="flex size-8 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
                    aria-label="Agregar uno"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleAdd}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-premium hover:bg-primary/90 active:translate-y-px"
                >
                  <Plus className="size-4" /> Agregar al carrito
                </button>
                <button
                  onClick={() => loved.toggle(productLovedItem(product))}
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ProductPreview
