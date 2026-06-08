import { cn } from "@/lib/utils"
import React from "react"

interface IconButtonProps {
  onClick: () => void
  icon: React.ReactElement
  className?: string
  "aria-label"?: string
}

const IconButton = ({ onClick, icon, className, ...props }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center rounded-full border border-border bg-card p-2 text-foreground shadow-card transition-colors duration-200 hover:bg-secondary active:translate-y-px",
        className
      )}
      {...props}
    >
      {icon}
    </button>
  )
}

export default IconButton
