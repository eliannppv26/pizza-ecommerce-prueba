"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"

import { useCartItems, useCartTotal, cart } from "@/hooks/use-cart"
import { toast } from "@/hooks/use-toast"
import { formatPrice } from "@/lib/formatPrice"
import { Separator } from "@/components/ui/separator"
import CartItem from "./components/cart-item"
import { makePaymentRequest } from "@/hooks/payment"

const FREE_SHIPPING_FROM = 250
const SHIPPING_FEE = 49

export default function CartPage() {
  const items = useCartItems()
  const subtotal = useCartTotal()
  const shipping =
    subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
  const total = subtotal + shipping

  const buyStripe = async () => {
    try {
      // El backend (Strapi) crea la sesión de Checkout y devuelve { stripeSession }.
      const res = await makePaymentRequest.post("/api/orders", {
        products: items,
      })
      const session = res.data?.stripeSession
      // Stripe.js ya no soporta redirectToCheckout: redirigimos a la URL
      // de la sesión que devuelve Stripe. El carrito se vacía en /success.
      if (session?.url) {
        window.location.href = session.url
        return
      }
      throw new Error("Stripe no devolvió la URL de pago")
    } catch (error) {
      console.error(error)
      toast({
        title: "No se pudo iniciar el pago",
        description: "Revisa la consola y la configuración de Stripe.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-foreground">
        Tu carrito
      </h1>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-card py-20 text-center shadow-card">
          <ShoppingBag className="size-10 text-muted-foreground" strokeWidth={1.5} />
          <p className="mt-4 text-lg font-semibold text-foreground">
            Tu carrito está vacío
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Agrega una pizza recién horneada para empezar.
          </p>
          <Link
            href="/#destacados"
            className="mt-6 inline-flex items-center rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver el menú
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-2xl border border-border bg-card px-5 shadow-card">
            <ul className="divide-y divide-border">
              {items.map((item) => (
                <CartItem key={item.lineId} item={item} />
              ))}
            </ul>
          </div>

          <div className="h-fit rounded-2xl border border-border bg-card p-6 shadow-card lg:sticky lg:top-24">
            <p className="text-lg font-semibold text-foreground">Resumen</p>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Envío</span>
                <span className="font-medium">
                  {shipping === 0 ? "Gratis" : formatPrice(shipping)}
                </span>
              </div>
              {subtotal > 0 && subtotal < FREE_SHIPPING_FROM && (
                <p className="text-xs text-muted-foreground">
                  Te faltan {formatPrice(FREE_SHIPPING_FROM - subtotal)} para
                  envío gratis.
                </p>
              )}
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between text-base font-bold text-foreground">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <button
              onClick={buyStripe}
              className="mt-5 w-full rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Continuar al pago
            </button>
            <button
              onClick={() => cart.clear()}
              className="mt-2 w-full rounded-lg px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
            >
              Vaciar carrito
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
