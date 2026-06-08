import Link from "next/link"
import Reveal from "@/components/reveal"

const PIZZA_BG =
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1600&auto=format&fit=crop"

const BannerProduct = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
      <div className="relative overflow-hidden rounded-2xl border border-border">
        <img
          src={PIZZA_BG}
          alt="Pizza recién horneada"
          className="h-[360px] w-full object-cover sm:h-[460px]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-charcoal/75 via-brand-charcoal/35 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center gap-3 p-8 sm:p-14">
          <p className="text-sm font-medium uppercase tracking-wide text-white/80">
            Recién salida del horno
          </p>
          <h2 className="max-w-md text-3xl font-bold leading-tight text-white sm:text-4xl">
            El sabor de una pizza hecha con calma
          </h2>
          <p className="max-w-sm text-white/85">
            Masa fermentada, ingredientes reales y el punto exacto de horno.
          </p>
          <div>
            <Link
              href="/#destacados"
              className="mt-2 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Ver el menú
            </Link>
          </div>
        </div>
      </div>
      </Reveal>
    </section>
  )
}

export default BannerProduct
