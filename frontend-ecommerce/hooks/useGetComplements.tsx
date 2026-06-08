"use client"

import { useEffect, useState } from "react"
import { ProductType } from "@/types/product"

/**
 * Complementos (bebidas, entradas, postres). Si pasas una categoría
 * (drink | side | dessert) filtra por ella; si no, trae todos.
 */
export function useGetComplements(category?: string) {
  const base = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products?populate=*`
  const url = category
    ? `${base}&filters[category][$eq]=${category}`
    : base
  const [result, setResult] = useState<ProductType[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar los complementos")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
