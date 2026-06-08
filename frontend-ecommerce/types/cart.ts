export type CartExtra = {
  name: string
  price: number
}

export type CartLine = {
  lineId: string
  kind: "pizza" | "product" | "combo"
  refId: number
  slug: string
  name: string
  imageUrl?: string
  unitPrice: number
  quantity: number
  // Detalle de personalización (solo pizzas)
  size?: string
  sizeLabel?: string
  crustLabel?: string
  sauceLabel?: string
  extras?: CartExtra[]
  removed?: string[]
}

export type LovedItem = {
  refId: number
  kind: "pizza" | "product" | "combo"
  name: string
  slug: string
  imageUrl?: string
  price: number
  label?: string | null
}
