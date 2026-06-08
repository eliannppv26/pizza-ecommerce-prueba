"use client"

import { useEffect, useState } from "react"

export type StoreConfig = {
  is_store_open?: boolean
  estimated_delivery_time?: number
  banner?: { url: string } | null
}

export function useGetStoreConfig() {
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/store-configuration?populate=*`
  const [result, setResult] = useState<StoreConfig | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(url)
        const json = await res.json()
        setResult(json.data ?? null)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error al cargar la configuración")
      } finally {
        setLoading(false)
      }
    })()
  }, [url])

  return { loading, result, error }
}
