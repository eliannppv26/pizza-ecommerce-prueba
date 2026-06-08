import { StrapiMedia } from "./pizza"

export type ProductCategory = "drink" | "side" | "dessert"

export type ProductType = {
  id: number
  documentId?: string
  name: string
  slug: string
  description?: string
  image?: StrapiMedia | null
  price: number
  is_available?: boolean
  category?: ProductCategory | null
  isFeatured?: boolean
}
