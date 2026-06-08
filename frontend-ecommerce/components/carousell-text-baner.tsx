"use client"

import { Carousel, CarouselItem, CarouselContent } from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export const dataCarouselTop = [
  {
    id: 1,
    title: "Entrega en 30–40 min",
    description: "Recién salida del horno, directo a tu puerta.",
  },
  {
    id: 2,
    title: "Envío gratis en pedidos desde $250",
    description: "Aplica en tu primera compra en línea.",
  },
  {
    id: 3,
    title: "Arma tu pizza a tu gusto",
    description: "Elige tamaño, masa e ingredientes. Sin complicaciones.",
  },
  {
    id: 4,
    title: "Combos para compartir",
    description: "Pizza + complementos con precio especial.",
  },
]

const CarruselTextBanner = () => {
  return (
    <div className="bg-primary text-primary-foreground">
      <Carousel
        className="mx-auto w-full max-w-4xl"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 3500 })]}
      >
        <CarouselContent>
          {dataCarouselTop.map(({ id, title, description }) => (
            <CarouselItem key={id}>
              <div className="flex flex-col items-center justify-center px-4 py-2 text-center">
                <p className="text-sm font-semibold sm:text-base">{title}</p>
                <p className="text-xs text-primary-foreground/80">
                  {description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default CarruselTextBanner
