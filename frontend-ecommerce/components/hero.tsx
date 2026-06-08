"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const HERO_IMG =
  "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1400&auto=format&fit=crop"

const Hero = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12">
      <div className="sheen grid items-center gap-8 rounded-2xl border border-border bg-card p-6 shadow-card transition-premium hover:shadow-soft sm:p-10 lg:grid-cols-2 lg:gap-12">
        <div>
          <Badge variant="green" className="mb-4 animate-fade-up">
            Recién horneada
          </Badge>
          <h1
            className="animate-fade-up text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
            style={{ animationDelay: "60ms" }}
          >
            La pizza <span className="text-brand-red-strong">real</span>, recién
            salida del horno.
          </h1>
          <p
            className="animate-fade-up mt-4 max-w-md text-base text-muted-foreground"
            style={{ animationDelay: "120ms" }}
          >
            Sabrosa, honesta y con calidez. Arma tu pizza a tu gusto y recíbela
            caliente en minutos.
          </p>
          <div
            className="animate-fade-up mt-7 flex flex-wrap gap-3"
            style={{ animationDelay: "180ms" }}
          >
            <Link
              href="/#destacados"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-premium hover:bg-primary/90 hover:shadow-soft active:translate-y-px"
            >
              Pedir ahora
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#combos"
              className="inline-flex items-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground transition-premium hover:bg-secondary"
            >
              Ver combos
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-secondary lg:aspect-square">
          <img
            src={HERO_IMG}
            alt="Pizza artesanal recién horneada"
            className="animate-scale-in h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
