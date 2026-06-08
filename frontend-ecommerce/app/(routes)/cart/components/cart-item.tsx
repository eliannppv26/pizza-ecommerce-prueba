"use client"

import { Minus, Plus, Trash2 } from "lucide-react"
import { CartLine } from "@/types/cart"
import { formatPrice } from "@/lib/formatPrice"
import { cart } from "@/hooks/use-cart"

const CartItem = ({ item }: { item: CartLine }) => {
  const detail: string[] = []
  if (item.sizeLabel) detail.push(item.sizeLabel)
  if (item.crustLabel) detail.push(item.crustLabel)

  return (
    <li className="flex gap-4 py-4">
      <div className="size-20 shrink-0 overflow-hidden rounded-lg border border-border bg-secondary">
        {item.imageUrl && (
          <img
            src={item.imageUrl}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="font-semibold leading-tight text-foreground">
              {item.name}
            </p>
            {detail.length > 0 && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {detail.join(" · ")}
              </p>
            )}
            {item.extras && item.extras.length > 0 && (
              <p className="mt-0.5 text-xs text-brand-green-strong">
                Extra: {item.extras.map((e) => e.name).join(", ")}
              </p>
            )}
            {item.removed && item.removed.length > 0 && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                Sin: {item.removed.join(", ")}
              </p>
            )}
          </div>
          <button
            onClick={() => cart.remove(item.lineId)}
            aria-label="Eliminar"
            className="text-muted-foreground transition-colors hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => cart.setQty(item.lineId, item.quantity - 1)}
              className="flex size-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Quitar uno"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="w-5 text-center text-sm font-semibold">
              {item.quantity}
            </span>
            <button
              onClick={() => cart.setQty(item.lineId, item.quantity + 1)}
              className="flex size-7 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
              aria-label="Agregar uno"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <span className="text-sm font-semibold text-foreground">
            {formatPrice(item.unitPrice * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  )
}

export default CartItem
