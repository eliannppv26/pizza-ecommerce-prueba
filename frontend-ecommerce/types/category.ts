export type CategoryType = {
  id: number
  documentId?: string
  name: string
  slug: string
  image?: {
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
  } | null
}
