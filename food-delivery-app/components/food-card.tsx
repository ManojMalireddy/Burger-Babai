"use client"

import Image from "next/image"
import { Plus, Star, Clock, Flame } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import type { MenuItem } from "@/lib/menu-data"

interface FoodCardProps {
  item: MenuItem
}

export function FoodCard({ item }: FoodCardProps) {
  const { addItem } = useCart()

  return (
    <article className="group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />

        {/* Price tag */}
        <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-md">
          <span className="text-sm font-bold text-foreground">
            {'₹'}{item.price}
          </span>
        </div>

        {/* Popular badge */}
        {item.popular && (
          <div className="absolute top-3 left-3 bg-primary text-primary-foreground rounded-lg px-2.5 py-1 text-xs font-semibold shadow-md">
            Popular
          </div>
        )}

        {/* Bottom info */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <div className="flex items-center gap-1 bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1">
            <Star className="w-3 h-3 text-primary fill-primary" />
            <span className="text-xs font-semibold text-foreground">{item.rating}</span>
          </div>
          <div className="flex items-center gap-1 bg-card/95 backdrop-blur-sm rounded-lg px-2 py-1">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs font-medium text-foreground">{item.prepTime}</span>
          </div>
        </div>
      </div>

      {/* Card content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-base leading-tight">
          {item.name}
        </h3>
        <p className="mt-1.5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        <div className="flex items-center justify-between mt-4">
          {/* Calories */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Flame className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">{item.calories} cal</span>
          </div>

          {/* Add to cart */}
          <button
            onClick={() =>
              addItem({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                calories: item.calories,
              })
            }
            className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity active:scale-95"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>
    </article>
  )
}
