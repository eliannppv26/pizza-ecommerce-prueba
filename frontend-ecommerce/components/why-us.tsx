import { Flame, Sparkles, BadgeCheck } from "lucide-react"
import Reveal from "@/components/reveal"

const pillars = [
  {
    icon: Flame,
    title: "Calidez real",
    text: "Pizza honesta, apetitosa y con personalidad. Nada artificial.",
  },
  {
    icon: Sparkles,
    title: "Detalle cuidado",
    text: "Cada paso del pedido transmite que nos importa tu experiencia.",
  },
  {
    icon: BadgeCheck,
    title: "Accesible premium",
    text: "Refinada pero cercana. Calidad sin que cueste de más.",
  },
]

const WhyUs = () => {
  return (
    <section id="nosotros" className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <Reveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            ¿Por qué Bella Masa?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Sabroso, real y con calidez. Así queremos que se sienta cada pedido.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-3">
        {pillars.map(({ icon: Icon, title, text }, i) => (
          <Reveal key={title} delay={i * 90}>
            <div className="group h-full rounded-xl border border-border bg-card p-6 shadow-card transition-premium hover:-translate-y-1 hover:shadow-soft">
              <span className="flex size-11 items-center justify-center rounded-full bg-brand-red/12 text-brand-red-strong transition-transform duration-300 group-hover:scale-110">
                <Icon className="size-5" strokeWidth={1.75} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                {title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default WhyUs
