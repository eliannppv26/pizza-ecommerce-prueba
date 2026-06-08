import Link from "next/link"
import Reveal from "@/components/reveal"

const BannerDiscount = () => {
  return (
    <section id="promo" className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
      <Reveal>
      <div className="rounded-2xl border border-border bg-brand-green/15 px-6 py-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-green-strong">
          Promo de la semana
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Hasta 25% de descuento
        </h2>
        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
          20% al gastar $200 o 25% al gastar $300. Usa el código{" "}
          <span className="font-semibold text-brand-red-strong">BELLA25</span>.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/#destacados"
            className="inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Pedir ahora
          </Link>
          <Link
            href="/#complementos"
            className="inline-flex items-center rounded-lg border border-border bg-background px-5 py-2.5 text-sm font-bold text-foreground transition-colors hover:bg-secondary"
          >
            Más información
          </Link>
        </div>
      </div>
      </Reveal>
    </section>
  )
}

export default BannerDiscount
