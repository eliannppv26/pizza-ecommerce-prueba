"use client"

import { useThemeInit } from "@/hooks/use-theme"

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useThemeInit()
  return <>{children}</>
}
