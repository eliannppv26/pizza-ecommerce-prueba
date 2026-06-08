import Link from "next/link"
import { AtSign, MessageCircle, MapPin, Clock } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const columns = [
  {
    title: "Menú",
    links: [
      { name: "Nuestras pizzas", href: "/#destacados" },
      { name: "Combos", href: "/#combos" },
      { name: "Complementos", href: "/#complementos" },
      { name: "Promociones", href: "/#promo" },
    ],
  },
  {
    title: "Bella Masa",
    links: [
      { name: "Nosotros", href: "/#nosotros" },
      { name: "Mi carrito", href: "/cart" },
      { name: "Favoritos", href: "/loved-products" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Política de privacidad", href: "#" },
      { name: "Términos y condiciones", href: "#" },
      { name: "Aviso de cookies", href: "#" },
    ],
  },
]

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-border bg-card">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-2xl font-bold tracking-tight">
            Bella<span className="text-brand-red-strong">Masa</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Pizza real, recién salida del horno. Sabrosa, honesta y con calidez.
          </p>
          <div className="mt-4 flex gap-2">
            <Link
              href="#"
              aria-label="Instagram"
              className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
            >
              <AtSign className="size-4" />
            </Link>
            <Link
              href="#"
              aria-label="WhatsApp"
              className="flex size-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary"
            >
              <MessageCircle className="size-4" />
            </Link>
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-sm font-semibold text-foreground">{col.title}</p>
            <ul className="mt-3 space-y-2">
              {col.links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-brand-red-strong"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <Separator />
        <div className="flex flex-col items-center justify-between gap-3 py-6 text-sm text-muted-foreground sm:flex-row">
          <span className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" /> Pedidos en línea
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5" /> Todos los días
            </span>
          </span>
          <span>
            &copy; {new Date().getFullYear()} Bella Masa. Todos los derechos
            reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
