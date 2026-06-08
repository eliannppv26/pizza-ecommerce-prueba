"use client"

import { useEffect, useState } from "react"
import { ComboType } from "@/types/combo"

export function useGetCombos() {
  // Populate profundo: imagen del combo, complementos con imagen,
  // y pizzas con imagen + su categoría.
  const params = [
    "populate[image]=true",
    "populate[products][populate][image]=true",
    "populate[pizzas][populate][image]=true",
    "populate[pizzas][populate][category]=true",
  ].join("&")
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/combos?${params}`

  const [result, setResult] = useState<ComboType[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar combos")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
