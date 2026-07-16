import { CATEGORIES } from "../data/productCategories";
import { ChevronRight } from "lucide-react";

export const CategoriesSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-end justify-between mb-8">
                <div>
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">
                        Shop by Category
                    </p>
                    <h2 className="text-3xl font-bold text-foreground" 
                    style={{ fontFamily: "Outfit, sans-serif" }}>
                        Browse Our Categories
                    </h2>
                </div>
                <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                        View All <ChevronRight className="w-4 h-4" />
                </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {CATEGORIES.map((c) => (
                        <button key={c.name}
                        className="group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-left">
                        <div className="relative h-32 overflow-hidden">
                            <img src={c.image} width={400} height={260} alt={c.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                                <span className="absolute bottom-2.5 left-3 text-white font-semibold text-sm" style={{ fontFamily: "Outfit, sans-serif" }}>{c.name}
                                </span>
                            </div>
                        <div className="px-3 py-2.5 flex items-center justify-between">
                            <span className="text-2xl">{c.emoji}</span>
                            <span className="text-xs text-muted-foreground font-medium">{c.count} items</span>
                        </div>
                        </button>
                    ))}
            </div>
        </section>
    )
};