"use client"

import Image from "next/image"
import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

export function SlideCart() {
  const {
    items,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
    clearCart,
    subtotal,
    tax,
    deliveryFee,
    total,
    setIsCheckoutOpen,
  } = useCart()

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/50 backdrop-blur-sm transition-opacity duration-300",
          isCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Cart panel */}
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 h-full w-full max-w-md bg-card shadow-2xl flex flex-col transition-transform duration-300 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
        role="dialog"
        aria-label="Shopping cart"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-foreground">Your Cart</h2>
            {items.length > 0 && (
              <span className="text-xs text-muted-foreground font-medium">
                ({items.length} {items.length === 1 ? "item" : "items"})
              </span>
            )}
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <ShoppingBag className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add some delicious items to get started
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-xl bg-secondary/50 border border-border"
                >
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm font-bold text-primary mt-0.5">
                      {'₹'}{(item.price * item.quantity).toFixed(0)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg bg-card border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold text-foreground w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with totals */}
        {items.length > 0 && (
          <div className="border-t border-border p-5">
            {/* Free delivery indicator */}
            {subtotal > 0 && subtotal < 499 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 mb-4">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs text-foreground">
                  Add <span className="font-bold text-primary">{'₹'}{(499 - subtotal).toFixed(0)}</span> more for free delivery
                </p>
              </div>
            )}
            {subtotal >= 499 && (
              <div className="flex items-center gap-2 p-3 rounded-xl bg-primary/10 mb-4">
                <Truck className="w-4 h-4 text-primary shrink-0" />
                <p className="text-xs text-foreground font-medium">
                  You qualify for free delivery!
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">{'₹'}{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>GST (5%)</span>
                <span className="font-medium text-foreground">{'₹'}{tax.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Delivery fee</span>
                <span className={cn("font-medium", deliveryFee === 0 ? "text-primary" : "text-foreground")}>
                  {deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(0)}`}
                </span>
              </div>
              <div className="h-px bg-border my-1" />
              <div className="flex justify-between font-bold text-foreground text-base">
                <span>Total</span>
                <span>{'₹'}{total.toFixed(0)}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <button
                onClick={clearCart}
                className="px-4 py-3 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-secondary transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false)
                  setIsCheckoutOpen(true)
                }}
                className="flex-1 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-bold hover:opacity-90 transition-opacity"
              >
                Checkout - {'₹'}{total.toFixed(0)}
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
