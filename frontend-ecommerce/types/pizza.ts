import { CategoryType } from "./category"

export type StrapiMedia = {
  id: number
  url: string
  name?: string
  alternativeText?: string | null
  formats?: {
    large?: { url: string }
    medium?: { url: string }
    small?: { url: string }
    thumbnail?: { url: string }
  }
}

export type PizzaSize = "small" | "medium" | "large"
export type CrustType = "thin" | "thick" | "stuffed" | "gluten_free"
export type SauceType = "tomato" | "white" | "bbq" | "pesto"
export type PizzaLabel = "new" | "bestseller" | "promo"

export type SizePrice = {
  id: number
  size: PizzaSize
  price: number
}

export type CrustOptions = {
  id: number
  crust_type: CrustType | null
  sauce_type: SauceType | null
  extra_price: number | null
}

export type Customization = {
  id: number
  allow_extra: boolean
  allow_remove: boolean
}

export type IngredientType = {
  id: number
  documentId?: string
  name: string
  is_premium?: boolean
  extra_price?: number | null
}

export type PizzaType = {
  id: number
  documentId?: string
  name: string
  slug: string
  description?: string
  image?: StrapiMedia | null
  is_available?: boolean
  is_featured?: boolean
  label?: PizzaLabel | null
  category?: CategoryType | null
  ingredients?: IngredientType[]
  config?: Customization | null
  crust?: CrustOptions | null
  sizes?: SizePrice[]
}
