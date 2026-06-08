"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel"
import { useGetFeaturedProducts } from "@/hooks/useGetFeaturedProducts"
import SkeletonSchema from "./skeletonSchema"
import PizzaCard from "@/components/shared/pizza-card"
import { PizzaType } from "@/types/pizza"
import Reveal from "@/components/reveal"

const FeaturedProducts = () => {
  const { result, loading } = useGetFeaturedProducts()
  const pizzas: PizzaType[] = Array.isArray(result) ? result : []

  return (
    <section id="destacados" className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground">
              Las más pedidas
            </h2>
            <p className="mt-1 text-muted-foreground">
              Nuestras pizzas destacadas, listas para personalizar.
            </p>
          </div>
        </div>
      </Reveal>

      <Carousel opts={{ align: "start" }} className="px-1">
        <CarouselContent className="-ml-4">
          {loading && <SkeletonSchema grid={3} />}
          {!loading &&
            pizzas.map((pizza) => (
              <CarouselItem
                key={pizza.id}
                className="basis-full pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <PizzaCard pizza={pizza} />
              </CarouselItem>
            ))}
          {!loading && pizzas.length === 0 && (
            <CarouselItem className="pl-4">
              <p className="text-muted-foreground">
                Aún no hay pizzas destacadas. Marca alguna como “Featured” en
                Strapi.
              </p>
            </CarouselItem>
          )}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  )
}

export default FeaturedProducts
