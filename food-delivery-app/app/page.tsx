"use client"

import { useState } from "react"
import { SiteHeader, CategoryNav } from "@/components/site-header"
import { HeroSection } from "@/components/hero-section"
import { MenuGrid } from "@/components/menu-grid"
import { SlideCart } from "@/components/slide-cart"
import { CheckoutModal } from "@/components/checkout-modal"
import { SiteFooter } from "@/components/site-footer"

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteHeader searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CategoryNav
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <main className="flex-1">
        <HeroSection />
        <MenuGrid activeCategory={activeCategory} searchQuery={searchQuery} />
      </main>

      <SiteFooter />
      <SlideCart />
      <CheckoutModal />
    </div>
  )
}
