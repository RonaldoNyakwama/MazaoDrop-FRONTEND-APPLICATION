import { MapPin } from "lucide-react";

export const Home = () => {
    return (
        <div>
        {/* Hero section */}
        <section className="relative min-h-[88vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    src="images/groceriesconstant.png" 
                    alt="Fresh produce market"
                    width={1600}
                    height={900}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-foreground/85 via-foreground/60 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="max-w-xl">
                    <span className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 backdrop-blur">
                    < MapPin />
                    Now delivering in Waiyaki Way, Westlands, and Kitsuru
                    </span>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
                        Fresh Groceries from Your Local Market,{" "}
                        <span className="text-accent">
                            Delivered to Your Door.
                        </span>
                    </h1>

                    <p className="text-white/80 text-lg mb-8 leading-relaxed">
                        Same-day delivery across Waiyaki Way and Westlands in as little as 60 minutes. Supporting local farmers, keeping prices fair.
                    </p>
                </div>

                 {/* Location Selector */}
            <div className="bg-white rounded-2xl p-4 mb-6 shadow-xl max-w-md">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                < MapPin /> 
                Where should we deliver?
              </p>

              <div className="flex gap-2">
                <div className="flex-1 flex items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
                  <select value={location} 
                    className="bg-transparent text-sm font-medium text-foreground w-full outline-none">
                  </select>
                </div>
                <button
                  className="bg-primary text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-primary/90 transition-colors text-sm whitespace-nowrap">
                  Confirm
                </button>
              </div>
              
            </div>
            <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 bg-accent text-white font-bold px-7 py-3.5 rounded-2xl hover:bg-accent/90 active:scale-95 transition-all text-base shadow-lg shadow-accent/30">
                Start Shopping
                </button>

                <button className="flex items-center gap-2 bg-white/15 text-white font-semibold px-7 py-3.5 rounded-2xl hover:bg-white/25 transition-all text-base backdrop-blur border border-white/20">
                Browse Categories
                </button>
            </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur border-t border-white/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-white">
                        {[["1000+", "Happy Customers"], ["60 min", "Avg Delivery Time"], ["500+", "Fresh Products"], ["4.9★", "App Rating"]].map(([v, l]) => (
                            <div key={l}>
                            <p className="font-bold text-lg text-accent" style={{ fontFamily: "Outfit, sans-serif" }}>{v}</p>
                            <p className="text-xs text-white/70">{l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section> 
        </div>      
    )
};
