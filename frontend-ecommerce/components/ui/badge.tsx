import * as React from "react"
import { cn } from "@/lib/utils"

type BadgeVariant = "red" | "green" | "neutral"

const variants: Record<BadgeVariant, string> = {
  red: "bg-brand-red/15 text-brand-red-strong",
  green: "bg-brand-green/20 text-brand-green-strong",
  neutral: "bg-secondary text-secondary-foreground",
}

export function Badge({
  className,
  variant = "red",
  ...props
}: React.ComponentProps<"span"> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-[11px] font-semibold tracking-wide",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}
