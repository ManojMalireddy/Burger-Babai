"use client"

import { Suspense } from "react"
import Image from "next/image"
import { Clock, Star, Truck } from "lucide-react"
import { motion } from "framer-motion"
import { FoodScene3D } from "@/components/food-scene-3d"

function HeroLoader() {
  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#111111] to-[#0d0d0d]" />
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#111111] min-h-[600px] md:min-h-[640px]">
      {/* 3D Background */}
      <Suspense fallback={<HeroLoader />}>
        <FoodScene3D />
      </Suspense>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#111111]/90 via-[#111111]/70 to-[#111111]/40 pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#111111] via-transparent to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Text content with Framer Motion */}
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-primary text-xs font-semibold mb-6 tracking-wide uppercase border border-primary/20"
            >
              <Truck className="w-3.5 h-3.5" />
              Free delivery on orders over ₹499
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight text-balance"
            >
              Delicious Food,{" "}
              <span className="text-primary">Delivered Fast</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-4 text-lg text-gray-400 max-w-lg leading-relaxed text-pretty"
            >
              From gourmet burgers to authentic Indian cuisine, discover
              the best restaurants in your neighborhood. Fresh, fast, and
              always satisfying.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex items-center justify-center md:justify-start gap-6 mt-8"
            >
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 border border-primary/10">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">25 min</p>
                  <p className="text-xs text-gray-500">Avg. delivery</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-700" />
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 border border-primary/10">
                  <Star className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">4.8+</p>
                  <p className="text-xs text-gray-500">Top rated</p>
                </div>
              </div>
              <div className="w-px h-8 bg-gray-700" />
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/20 border border-primary/10">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">500+</p>
                  <p className="text-xs text-gray-500">Restaurants</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative flex-1 w-full max-w-lg"
          >
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-gray-800/50">
              <Image
                src="/images/hero-food.jpg"
                alt="Assortment of delicious food including burgers, pizza and drinks"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/40 to-transparent" />
            </div>
            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#1a1a1a] text-white rounded-2xl shadow-lg shadow-primary/5 px-5 py-3 flex items-center gap-3 border border-gray-800/50"
            >
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-primary fill-primary" />
                <span className="font-bold text-sm">4.9</span>
              </div>
              <div className="w-px h-6 bg-gray-700" />
              <span className="text-xs text-gray-400 font-medium">
                2,400+ reviews
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
