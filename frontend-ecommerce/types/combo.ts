import { StrapiMedia } from "./pizza"
import { ProductType } from "./product"

export type ComboType = {
  id: number
  documentId?: string
  name: string
  slug: string
  description?: string
  image?: StrapiMedia | null
  promo_price: number
  is_available?: boolean
  products?: ProductType[]
  // Nota: en Strapi la relación `pizzas` del combo apunta por error a
  // Category. Se tipa laxo para no romper si trae nombres genéricos.
  pizzas?: {
    id: number
    name?: string
    slug?: string
    image?: StrapiMedia | null
    category?: { id: number; name?: string; slug?: string } | null
  }[]
}
