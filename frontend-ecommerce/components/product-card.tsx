"use client"

import { Heart, Plus } from "lucide-react"
import { ProductType } from "@/types/product"
import { strapiMedia, productCartLine, productLovedItem } from "@/lib/pizza"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { cart } from "@/hooks/use-cart"
import { loved, useIsLoved } from "@/hooks/use-loved"
import ProductPreview from "@/components/product-preview"

const ProductCard = ({ product }: { product: ProductType }) => {
  const isLoved = useIsLoved(product.id, "product")

  return (
    <div className="group/card flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-premium hover:-translate-y-1 hover:shadow-soft">
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <img
          src={strapiMedia(product.image)}
          alt={product.name}
          loading="lazy"
          className="animate-fade-in h-full w-full object-cover transition-transform duration-[600ms] group-hover/card:scale-105"
        />
        <button
          onClick={() => loved.toggle(productLovedItem(product))}
          aria-label="Favorito"
          className="absolute right-3 top-3 z-10 flex size-8 items-center justify-center rounded-full border border-border bg-card/90 backdrop-blur transition-colors hover:bg-card"
        >
          <Heart
            className={cn(
              "size-4",
              isLoved ? "fill-brand-red text-brand-red" : "text-muted-foreground"
            )}
          />
        </button>

        {/* Quick-view en hover */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center opacity-0 transition-all duration-200 translate-y-1 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <ProductPreview product={product} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-base font-semibold leading-snug text-foreground line-clamp-1">
          {product.name}
        </h3>
        {product.description && (
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-3">
          <span className="text-sm font-semibold text-foreground">
            {formatPrice(product.price)}
          </span>
          <button
            onClick={() => cart.add(productCartLine(product))}
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground transition-premium hover:bg-primary/90 active:translate-y-px"
          >
            <Plus className="size-3.5" /> Agregar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
