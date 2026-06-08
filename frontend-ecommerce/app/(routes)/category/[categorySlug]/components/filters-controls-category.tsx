"use client"

import { labelText } from "@/lib/pizza"
import { cn } from "@/lib/utils"

type Props = {
  active: string
  setActive: (value: string) => void
}

const options = [
  { value: "", label: "Todas" },
  { value: "bestseller", label: labelText.bestseller },
  { value: "new", label: labelText.new },
  { value: "promo", label: labelText.promo },
]

const FiltersControlsCategory = ({ active, setActive }: Props) => {
  return (
    <aside className="mb-6 sm:mb-0 sm:w-56 sm:shrink-0">
      <p className="mb-3 text-sm font-semibold text-foreground">Filtrar</p>
      <div className="flex flex-wrap gap-2 sm:flex-col sm:items-start">
        {options.map((o) => (
          <button
            key={o.value}
            onClick={() => setActive(o.value)}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              active === o.value
                ? "bg-brand-red text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default FiltersControlsCategory
