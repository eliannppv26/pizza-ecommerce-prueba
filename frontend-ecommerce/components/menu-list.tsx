"use client"

import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { useGetCategories } from "@/hooks/getProducts"
import { CategoryType } from "@/types/category"

const MenuList = () => {
  const { result } = useGetCategories()
  const categories: CategoryType[] = Array.isArray(result) ? result : []

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Nuestras pizzas</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[420px] gap-1 p-2 md:grid-cols-2">
              {categories.length === 0 && (
                <li className="px-3 py-2 text-sm text-muted-foreground">
                  Cargando categorías...
                </li>
              )}
              {categories.map((category) => (
                <ListItem
                  key={category.id}
                  href={`/category/${category.slug}`}
                  title={category.name}
                >
                  Descubre nuestras pizzas de {category.name?.toLowerCase()}.
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/#combos">Combos</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/#complementos">Complementos</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/#destacados">Destacadas</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/#nosotros">Nosotros</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
}: {
  title: string
  children: React.ReactNode
  href: string
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block rounded-lg px-3 py-2 transition-colors hover:bg-secondary"
        >
          <div className="text-sm font-semibold leading-none text-foreground">
            {title}
          </div>
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}

export default MenuList
