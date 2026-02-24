import { ShoppingBag } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="bg-[#111111] text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <ShoppingBag className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-white">Burger Babai</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Fresh food from the best local restaurants, delivered fast to your door.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Menu
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["Burgers", "Pizzas", "Indian", "Italian", "Beverages", "Crushers"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Company
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["About Us", "Careers", "Partner with Us", "Blog"].map((item) => (
                <li key={item}>
                  <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
              Support
            </h3>
            <ul className="flex flex-col gap-2.5">
              {["Help Center", "Safety", "Terms of Service", "Privacy Policy"].map(
                (item) => (
                  <li key={item}>
                    <span className="text-sm text-gray-500 hover:text-primary transition-colors cursor-pointer">
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>

        <div className="h-px bg-gray-800 my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>2026 Burger Babai. All rights reserved.</p>
          <p>Made with care in your neighborhood.</p>
        </div>
      </div>
    </footer>
  )
}
