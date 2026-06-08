"use client"

import { useEffect } from "react"
import { createStore } from "@/lib/store"

export type Theme = "light" | "dark" | "system"

type ThemeState = { theme: Theme }

const store = createStore<ThemeState>({ theme: "system" }, "bella-masa-theme")

function systemPrefersDark() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  )
}

/** Aplica (o quita) la clase `dark` en <html> según el tema elegido. */
export function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return
  const dark = theme === "dark" || (theme === "system" && systemPrefersDark())
  document.documentElement.classList.toggle("dark", dark)
  document.documentElement.style.colorScheme = dark ? "dark" : "light"
}

export function useTheme() {
  const theme = store.useStore((s) => s.theme)
  const setTheme = (next: Theme) => {
    store.set(() => ({ theme: next }))
    applyTheme(next)
  }
  return { theme, setTheme }
}

/** Inicializa el tema en el cliente y reacciona a cambios del sistema. */
export function useThemeInit() {
  const theme = store.useStore((s) => s.theme)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (store.get().theme === "system") applyTheme("system")
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])
}
