"use client"

import { useState } from "react"
import Image from "next/image"
import {
  X,
  CreditCard,
  Banknote,
  Smartphone,
  MapPin,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { cn } from "@/lib/utils"

type PaymentMethod = "card" | "cash" | "digital"

export function CheckoutModal() {
  const {
    items,
    isCheckoutOpen,
    setIsCheckoutOpen,
    setIsCartOpen,
    subtotal,
    tax,
    deliveryFee,
    total,
    clearCart,
  } = useCart()

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
      setTimeout(() => {
        clearCart()
        setIsComplete(false)
        setIsCheckoutOpen(false)
      }, 3000)
    }, 2000)
  }

  if (!isCheckoutOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={() => !isProcessing && !isComplete && setIsCheckoutOpen(false)}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-card rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Success state */}
        {isComplete ? (
          <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Order Placed!</h2>
            <p className="text-muted-foreground mt-2 leading-relaxed">
              Your food is being prepared. Estimated delivery in 25-35 minutes.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-border">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    setIsCheckoutOpen(false)
                    setIsCartOpen(true)
                  }}
                  className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
                  aria-label="Back to cart"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <h2 className="text-lg font-bold text-foreground">Checkout</h2>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="p-2 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              {/* Delivery address */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Delivery Address
                </h3>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary border border-border">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Home</p>
                    <p className="text-sm text-muted-foreground">
                      Plot 42, Ayyappa Society, Madhapur, Hyderabad, Telangana 500081
                    </p>
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Order Summary
                </h3>
                <div className="flex flex-col gap-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}{" "}
                          <span className="text-muted-foreground">
                            x{item.quantity}
                          </span>
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        {'₹'}{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment method */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3">
                  Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {([
                    { id: "card" as const, label: "Card", icon: CreditCard },
                    { id: "cash" as const, label: "Cash", icon: Banknote },
                    { id: "digital" as const, label: "UPI", icon: Smartphone },
                  ]).map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-sm font-medium",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-border bg-card text-muted-foreground hover:border-primary/30"
                      )}
                    >
                      <method.icon className="w-5 h-5" />
                      {method.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Card form (mock) */}
              {paymentMethod === "card" && (
                <div className="flex flex-col gap-3 mb-6">
                  <input
                    type="text"
                    placeholder="Card number"
                    defaultValue="4242 4242 4242 4242"
                    className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      defaultValue="12/28"
                      className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                    />
                    <input
                      type="text"
                      placeholder="CVC"
                      defaultValue="123"
                      className="w-full px-4 py-3 rounded-xl bg-secondary text-foreground text-sm border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-5">
              <div className="flex flex-col gap-2 text-sm mb-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-medium text-foreground">{'₹'}{subtotal.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>GST</span>
                  <span className="font-medium text-foreground">{'₹'}{tax.toFixed(0)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery</span>
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

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className={cn(
                  "w-full py-3.5 rounded-xl text-sm font-bold transition-all",
                  isProcessing
                    ? "bg-muted text-muted-foreground cursor-wait"
                    : "bg-primary text-primary-foreground hover:opacity-90"
                )}
              >
                {isProcessing ? "Processing..." : `Place Order - ₹${total.toFixed(0)}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
