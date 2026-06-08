import CarruselTextBanner from "@/components/carousell-text-baner"
import Hero from "@/components/hero"
import ChooseCategory from "@/components/choose-category"
import FeaturedProducts from "@/components/featured-products"
import Combos from "@/components/combos"
import BannerDiscount from "@/components/banner-discount"
import Complementos from "@/components/complementos"
import WhyUs from "@/components/why-us"
import BannerProduct from "@/components/banner-product"

export default function Page() {
  return (
    <>
      <CarruselTextBanner />
      <Hero />
      <ChooseCategory />
      <FeaturedProducts />
      <Combos />
      <BannerDiscount />
      <Complementos />
      <WhyUs />
      <BannerProduct />
    </>
  )
}
