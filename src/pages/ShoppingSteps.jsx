import { Grid3X3, ShoppingCart, Package, Truck } from "lucide-react";

export const ShoppingSteps = () => {
    return (
        <section className="bg-primary text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-12">
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Simple & Fast</p>
                <h2 className="text-3xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>How It Works</h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 relative">
                {[
                    { 
                        n: "01", 
                        icon: Grid3X3, 
                        title: "Choose Products", 
                        desc: "Browse hundreds of fresh items across all categories" 
                    },
                    { 
                        n: "02", 
                        icon: ShoppingCart, 
                        title: "Place Your Order", 
                        desc: "Add to cart and checkout in under 2 minutes" 
                    },
                    { 
                        n: "03", 
                        icon: Package, 
                        title: "We Shop for You", 
                        desc: "Our pickers hand-select the freshest items from the market" 
                    },
                    { 
                        n: "04", 
                        icon: Truck, 
                        title: "We Deliver to Your Door", 
                        desc: "Your order arrives fresh within 60 minutes" 
                    },
                ].map(({ n, icon: Icon, title, desc }, i) => (
                <div key={n} className="relative text-center">
                    {i < 3 && <div className="hidden lg:block absolute top-8 left-[calc(50%+36px)] right-0 h-px bg-white/20" />}
                    <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-4 relative">
                        <Icon className="w-7 h-7 text-white" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full text-xs font-bold flex items-center justify-center">{n}</span>
                    </div>
                    </div>
                    <h3 className="font-bold mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h3>
                    <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
                </div>
                ))}
            </div>
            </div>
      </section>
    )
}