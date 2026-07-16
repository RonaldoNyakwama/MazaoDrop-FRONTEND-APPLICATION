import { ProductCard } from "../components/ProductCard";
import { PRODUCTS } from "../data/featuredProducts";
import { ChevronRight } from "lucide-react";

export const HandpickedProducts = () => {
    return (
        <section className="bg-muted/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-end justify-between mb-8">
                    <div>
                        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">
                            Handpicked for You
                        </p>
                        <h2 className="text-3xl font-bold text-foreground" 
                            style={{ fontFamily: "Outfit, sans-serif" }}>
                                Featured Products
                        </h2>
                    </div>
                    <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                        Shop All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {PRODUCTS.slice(0, 8).map((product) => (
                        <ProductCard key={product.id} product={product} />
                        ))}
                </div>
            </div>
        </section>
    )
};