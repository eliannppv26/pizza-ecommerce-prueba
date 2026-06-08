"use client"

import Link from "next/link"
import { useEffect } from "react"
import { CheckCircle2 } from "lucide-react"
import { cart } from "@/hooks/use-cart"

export default function SuccessPage() {
  useEffect(() => {
    // Tras un pago exitoso, vaciamos el carrito.
    cart.clear()
  }, [])

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-brand-green/20 text-brand-green-strong">
        <CheckCircle2 className="size-9" strokeWidth={1.5} />
      </span>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground">
        ¡Gracias por tu pedido!
      </h1>
      <p className="mt-3 text-muted-foreground">
        Estamos preparando tu pizza con cuidado. En breve estará recién salida
        del horno, lista para ti.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
      >
        Volver al inicio
      </Link>
    </div>
  )
}
