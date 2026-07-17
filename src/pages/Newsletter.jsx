import { CheckCircle } from "lucide-react";

export const Newsletter = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2" />
          <div className="relative">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Stay in the Loop</p>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>
              Get Fresh Deals Delivered to Your Inbox
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Subscribe for weekly grocery offers, seasonal produce alerts, and exclusive MazaoDrop discounts.
            </p>
            
              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <CheckCircle className="w-5 h-5 text-green-400" />
                Thanks for subscribing! Check your inbox for a welcome offer.
              </div>
            
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none bg-white/95 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  className="bg-accent text-white font-bold px-6 py-3 rounded-xl hover:bg-accent/90 transition-colors whitespace-nowrap">
                  Subscribe Free
                </button>
              </div>
            
          </div>
        </div>
      </section>
    )
};