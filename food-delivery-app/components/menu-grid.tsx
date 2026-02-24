"use client"

import { useMemo } from "react"
import { FoodCard } from "@/components/food-card"
import { menuItems } from "@/lib/menu-data"
import { TrendingUp } from "lucide-react"

interface MenuGridProps {
  activeCategory: string
  searchQuery: string
}

export function MenuGrid({ activeCategory, searchQuery }: MenuGridProps) {
  const popularItems = useMemo(
    () => menuItems.filter((item) => item.popular),
    []
  )

  const filteredItems = useMemo(() => {
    let items = menuItems

    if (activeCategory !== "all") {
      items = items.filter((item) => item.category === activeCategory)
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
      )
    }

    return items
  }, [activeCategory, searchQuery])

  const showPopular = activeCategory === "all" && !searchQuery.trim()

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Popular Near You */}
      {showPopular && (
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold text-foreground">
              Popular Near You
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}

      {/* Full Menu */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            {activeCategory === "all"
              ? "Full Menu"
              : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
          </h2>
          <span className="text-sm text-muted-foreground font-medium">
            {filteredItems.length} {filteredItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground">
              No dishes found. Try a different search or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
