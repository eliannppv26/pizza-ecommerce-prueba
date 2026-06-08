"use client"

import { useGetCombos } from "@/hooks/useGetCombos"
import { ComboType } from "@/types/combo"
import ComboCard from "@/components/combo-card"
import { Skeleton } from "@/components/ui/skeleton"
import Reveal from "@/components/reveal"

const Combos = () => {
  const { result, loading } = useGetCombos()
  const combos: ComboType[] = Array.isArray(result)
    ? result.filter((c) => c.is_available !== false)
    : []

  // Si no hay combos cargados, no mostramos la sección vacía.
  if (!loading && combos.length === 0) return null

  return (
    <section id="combos" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mb-6">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Combos para compartir
          </h2>
          <p className="mt-1 text-muted-foreground">
            Pizza y complementos juntos, a precio especial.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {loading &&
          Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        {!loading &&
          combos.map((combo, i) => (
            <Reveal key={combo.id} delay={i * 70} className="h-full">
              <ComboCard combo={combo} />
            </Reveal>
          ))}
      </div>
    </section>
  )
}

export default Combos
