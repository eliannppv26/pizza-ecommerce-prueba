import { PizzaType, SizePrice } from "@/types/pizza"

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL || ""

/** Devuelve la URL absoluta de un medio de Strapi (o un placeholder). */
export function strapiMedia(
  media?: { url?: string } | null,
  fallback = "/placeholder-pizza.svg"
) {
  if (!media?.url) return fallback
  return media.url.startsWith("http") ? media.url : `${BACKEND}${media.url}`
}

export const sizeLabels: Record<string, string> = {
  small: "Chica",
  medium: "Mediana",
  large: "Grande",
}

export const crustLabels: Record<string, string> = {
  thin: "Masa delgada",
  thick: "Masa gruesa",
  stuffed: "Orilla rellena",
  gluten_free: "Sin gluten",
}

export const sauceLabels: Record<string, string> = {
  tomato: "Salsa de tomate",
  white: "Salsa blanca",
  bbq: "Salsa BBQ",
  pesto: "Salsa pesto",
}

export const labelText: Record<string, string> = {
  new: "Nuevo",
  bestseller: "Más vendida",
  promo: "Promo",
}

export const productCategoryLabels: Record<string, string> = {
  drink: "Bebidas",
  side: "Entradas",
  dessert: "Postres",
}

const SIZE_ORDER: Record<string, number> = { small: 0, medium: 1, large: 2 }

export function sortSizes(sizes: SizePrice[] = []) {
  return [...sizes].sort(
    (a, b) => (SIZE_ORDER[a.size] ?? 9) - (SIZE_ORDER[b.size] ?? 9)
  )
}

/** Precio "desde" de una pizza (tamaño más pequeño disponible). */
export function pizzaBasePrice(pizza: PizzaType) {
  const sizes = sortSizes(pizza.sizes)
  return sizes.length ? sizes[0].price : 0
}

// ---- Helpers de carrito / favoritos ----
import { CartLine, LovedItem } from "@/types/cart"
import { ProductType } from "@/types/product"

/** Línea de carrito por defecto (tamaño más pequeño, sin extras). */
export function defaultPizzaCartLine(pizza: PizzaType): CartLine {
  const size = sortSizes(pizza.sizes)[0]
  return {
    lineId: `pizza-${pizza.id}-${size?.size ?? "std"}`,
    kind: "pizza",
    refId: pizza.id,
    slug: pizza.slug,
    name: pizza.name,
    imageUrl: strapiMedia(pizza.image),
    unitPrice: size?.price ?? 0,
    quantity: 1,
    size: size?.size,
    sizeLabel: size ? sizeLabels[size.size] : undefined,
    extras: [],
    removed: [],
  }
}

export function pizzaLovedItem(pizza: PizzaType): LovedItem {
  return {
    refId: pizza.id,
    kind: "pizza",
    name: pizza.name,
    slug: pizza.slug,
    imageUrl: strapiMedia(pizza.image),
    price: pizzaBasePrice(pizza),
    label: pizza.label ?? null,
  }
}

export function productCartLine(product: ProductType): CartLine {
  return {
    lineId: `product-${product.id}`,
    kind: "product",
    refId: product.id,
    slug: product.slug,
    name: product.name,
    imageUrl: strapiMedia(product.image),
    unitPrice: product.price ?? 0,
    quantity: 1,
  }
}

export function productLovedItem(product: ProductType): LovedItem {
  return {
    refId: product.id,
    kind: "product",
    name: product.name,
    slug: product.slug,
    imageUrl: strapiMedia(product.image),
    price: product.price ?? 0,
  }
}

// ---- Combos ----
import { ComboType } from "@/types/combo"

export function comboCartLine(combo: ComboType): CartLine {
  return {
    lineId: `combo-${combo.id}`,
    kind: "combo",
    refId: combo.id,
    slug: combo.slug,
    name: combo.name,
    imageUrl: strapiMedia(combo.image),
    unitPrice: combo.promo_price ?? 0,
    quantity: 1,
  }
}

export function comboLovedItem(combo: ComboType): LovedItem {
  return {
    refId: combo.id,
    kind: "combo",
    name: combo.name,
    slug: combo.slug,
    imageUrl: strapiMedia(combo.image),
    price: combo.promo_price ?? 0,
  }
}
