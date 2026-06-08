"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Heart, ShoppingCart } from "lucide-react"

import MenuList from "./menu-list"
import ItemsMenuMobile from "./items-menu-mobile"
import ToggleTheme from "./toggle-theme"
import { useCartCount } from "@/hooks/use-cart"
import { useLovedCount } from "@/hooks/use-loved"

const Navbar = () => {
  const router = useRouter()
  const cartCount = useCartCount()
  const lovedCount = useLovedCount()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-baseline gap-1 text-2xl font-bold tracking-tight text-foreground"
        >
          Bella<span className="text-brand-red-strong">Masa</span>
        </button>

        <nav className="hidden items-center lg:flex">
          <MenuList />
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <Link
            href="/loved-products"
            aria-label="Favoritos"
            className="relative flex size-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
          >
            <Heart strokeWidth={1.5} className="size-5" />
            {lovedCount > 0 && (
              <span
                key={lovedCount}
                className="animate-pop absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-primary-foreground"
              >
                {lovedCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            aria-label="Carrito"
            className="relative flex size-9 items-center justify-center rounded-full transition-colors hover:bg-secondary"
          >
            <ShoppingCart strokeWidth={1.5} className="size-5" />
            {cartCount > 0 && (
              <span
                key={cartCount}
                className="animate-pop absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-primary-foreground"
              >
                {cartCount}
              </span>
            )}
          </Link>

          <ToggleTheme />

          <div className="lg:hidden">
            <ItemsMenuMobile />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
