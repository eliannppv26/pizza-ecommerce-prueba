"use client"

import { useToasts, dismiss } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Check, Info, X } from "lucide-react"

const variantStyles: Record<string, string> = {
  default: "border-border bg-card text-foreground",
  success: "border-brand-green-strong/40 bg-card text-foreground",
  destructive: "border-destructive/40 bg-card text-foreground",
}

const iconFor = (variant?: string) => {
  if (variant === "success")
    return <Check className="size-4 text-brand-green-strong" strokeWidth={2} />
  if (variant === "destructive")
    return <Info className="size-4 text-destructive" strokeWidth={2} />
  return <Info className="size-4 text-brand-red-strong" strokeWidth={2} />
}

export function Toaster() {
  const toasts = useToasts()

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[100] flex flex-col items-center gap-2 p-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "animate-fade-in pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-soft",
            variantStyles[t.variant ?? "default"]
          )}
        >
          <span className="mt-0.5">{iconFor(t.variant)}</span>
          <div className="flex-1">
            {t.title && (
              <p className="text-sm font-semibold leading-tight">{t.title}</p>
            )}
            {t.description && (
              <p className="mt-0.5 text-xs text-muted-foreground">
                {t.description}
              </p>
            )}
          </div>
          <button
            onClick={() => dismiss(t.id)}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Cerrar"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
