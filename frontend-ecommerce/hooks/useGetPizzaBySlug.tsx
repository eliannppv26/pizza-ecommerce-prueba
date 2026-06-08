"use client"

import { useEffect, useState } from "react"
import { PizzaType } from "@/types/pizza"

export function useGetPizzaBySlug(slug: string | string[]) {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/pizzas?filters[slug][$eq]=${slug}&populate=*`
  const [result, setResult] = useState<PizzaType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data?.[0] ?? null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar la pizza")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
