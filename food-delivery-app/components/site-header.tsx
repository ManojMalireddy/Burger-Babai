"use client"

import { useState } from "react"
import { Search, ShoppingBag, MapPin, Menu, X } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

interface SiteHeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function SiteHeader({ searchQuery, onSearchChange }: SiteHeaderProps) {
  const { totalItems, setIsCartOpen } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
            <ShoppingBag className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Burger Babai
          </span>
        </div>

        {/* Location - desktop */}
        <div className="hidden md:flex items-center gap-1.5 text-sm text-muted-foreground shrink-0">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">Madhapur</span>
          <span className="text-muted-foreground">{"- Hyderabad, Telangana"}</span>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for dishes, cuisines..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity"
            aria-label={`Open cart with ${totalItems} items`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="flex items-center justify-center min-w-5 h-5 rounded-full bg-card text-primary text-xs font-bold px-1">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary text-foreground transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search - shown in mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-border pt-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search for dishes, cuisines..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-secondary text-foreground text-sm placeholder:text-muted-foreground border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mt-3">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="font-medium text-foreground">Madhapur</span>
            <span>{"- Hyderabad, Telangana"}</span>
          </div>
        </div>
      )}
    </header>
  )
}

interface CategoryNavProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryNav({ activeCategory, onCategoryChange }: CategoryNavProps) {
  const categories = [
    { id: "all", label: "All" },
    { id: "burgers", label: "Burgers" },
    { id: "pizzas", label: "Pizzas" },
    { id: "indian", label: "Indian" },
    { id: "italian", label: "Italian" },
    { id: "beverages", label: "Beverages" },
    { id: "crushers", label: "Crushers" },
  ]

  return (
    <nav className="sticky top-[65px] z-40 bg-card/95 backdrop-blur-md border-b border-border" aria-label="Menu categories">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-1 overflow-x-auto py-3 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onCategoryChange(cat.id)}
              className={cn(
                "shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all",
                activeCategory === cat.id
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-secondary-foreground hover:bg-primary/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
