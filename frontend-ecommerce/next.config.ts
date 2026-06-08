import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      // Producción: agrega aquí el dominio de tu Strapi cuando lo despliegues
      // { protocol: "https", hostname: "tu-strapi.com", pathname: "/uploads/**" },
    ],
  },
}

export default nextConfig
