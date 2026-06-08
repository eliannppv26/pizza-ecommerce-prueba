"use client"

import { useEffect, useState } from "react"
import { CategoryType } from "@/types/category"

export function useGetCategories() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/categories?populate=*`
  const [result, setResult] = useState<CategoryType[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar categorías")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
