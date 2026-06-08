import type { Metadata } from "next"
import { Quicksand } from "next/font/google"

import "./globals.css"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Bella Masa — Pizzería artesanal",
  description:
    "Pizza real, recién salida del horno. Sabrosa, honesta y con calidez. Pide en línea en Bella Masa.",
}

// Script anti-parpadeo: aplica el tema guardado ANTES de pintar la página,
// leyendo la misma clave de localStorage que usa el controlador de tema.
const themeScript = `
(function(){
  try {
    var raw = localStorage.getItem('bella-masa-theme');
    var theme = raw ? (JSON.parse(raw).theme || 'system') : 'system';
    var dark = theme === 'dark' ||
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    var root = document.documentElement;
    root.classList.toggle('dark', dark);
    root.style.colorScheme = dark ? 'dark' : 'light';
  } catch (e) {}
})();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={cn(quicksand.variable)}>
      <body
        suppressHydrationWarning
        className="font-sans antialiased bg-background text-foreground min-h-screen flex flex-col"
      >
        <script
          dangerouslySetInnerHTML={{ __html: themeScript }}
          suppressHydrationWarning
        />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
