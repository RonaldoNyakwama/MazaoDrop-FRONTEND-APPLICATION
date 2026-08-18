import { useState } from "react";
import { PRODUCTS } from "../data/featuredProducts";
import { Heart, ShoppingCart, ChevronRight, CheckCircle, Minus, Plus, Check, Truck, Leaf, Shield, RefreshCw } from "lucide-react";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";

export const ProductDetails = ({ product, onAddToCart, onBack, wishlist, onToggleWishlist }) => {

    const [qty, setQty] = useState(1);
    const [added, setAdded] = useState(false);
    const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAdd = () => {
        onAddToCart(product, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <button 
                onClick={onBack} 
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
                <ChevronRight className="w-4 h-4 rotate-180" /> 
                Back to shop
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                {/* Gallery */}
                <div className="space-y-3">
                <div className="rounded-3xl overflow-hidden bg-muted aspect-square">
                    <img 
                        src={(product.image)} 
                        w={700} 
                        h={700} 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                    />
                </div>
                <div className="grid grid-cols-4 gap-2">
                    {[product.image, ...related.slice(0, 3).map(r => r.image)].map((imgId, i) => (
                    <div key={i} className={`rounded-xl overflow-hidden aspect-square border-2 transition-colors ${i === 0 ? "border-primary" : "border-transparent"}`}>
                        <img 
                            src={(imgId)} 
                            w={120} 
                            h={120} 
                            alt="" 
                            className="w-full h-full object-cover" 
                        />
                    </div>
                    ))}
                </div>
            </div>

            {/* Info */}
            <div>
            <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded-full">{product.category}</span>
                {product.badge && <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">{product.badge}</span>}
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>{product.name}</h1>

            <div className="flex items-center gap-3 mb-5">
                <StarRating rating={product.rating} size="md" />
                <span className="text-sm font-semibold text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            <div className="bg-muted/50 rounded-2xl p-5 mb-6">
                <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>KES {product.price}</span>
                <span className="text-muted-foreground mb-1">/{product.unit}</span>
                </div>
                <p className="text-xs text-green-600 font-semibold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> In Stock — Ready for delivery today
                </p>
            </div>

            {product.description && (
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>
            )}

            <div className="mb-6">
                <p className="text-sm font-semibold text-foreground mb-2">Quantity</p>
                <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-xl overflow-hidden bg-card shadow-sm">
                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-muted transition-colors">
                    <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 font-bold text-foreground min-w-[2rem] text-center">{qty}</span>
                    <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 hover:bg-muted transition-colors">
                    <Plus className="w-4 h-4" />
                    </button>
                </div>
                <p className="text-sm text-muted-foreground">
                    Subtotal: <span className="font-bold text-foreground">KES {product.price * qty}</span>
                </p>
                </div>
            </div>

            <div className="flex gap-3 mb-6">
                <button 
                    onClick={handleAdd}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold py-3.5 rounded-2xl text-base transition-all active:scale-95 ${added ? "bg-green-500 text-white" : "bg-primary text-white hover:bg-primary/90"}`}
                >
                {added ? <><Check className="w-5 h-5" /> Added to Cart!</> : <><ShoppingCart className="w-5 h-5" /> Add to Cart</>}
                </button>
                <button 
                    onClick={() => onToggleWishlist(product.id)}
                    className={`w-14 h-14 rounded-2xl border flex items-center justify-center transition-colors ${wishlist.has(product.id) ? "bg-red-50 border-red-200 text-red-500" : "border-border text-muted-foreground hover:border-red-200 hover:text-red-500"}`}
                >
                <Heart className={`w-5 h-5 ${wishlist.has(product.id) ? "fill-current" : ""}`} />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {[
                { icon: Truck, text: "Delivered in 60 minutes" },
                { icon: Leaf, text: "Sourced from local markets" },
                { icon: Shield, text: "Freshness guaranteed" },
                { icon: RefreshCw, text: "Easy returns policy" },
                ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    {text}
                </div>
                ))}
            </div>
            </div>
        </div>

        {/* Nutritional Info */}
        {(product.category === "Fresh Vegetables" || product.category === "Fruits" || product.category === "Dairy") && (
            <div className="mb-12">
            <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Nutritional Information (per 100g)</h2>
            <div className="bg-card rounded-2xl border border-border p-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                { label: "Calories", value: product.category === "Dairy" ? "61 kcal" : "35 kcal" },
                { label: "Protein", value: "2.1g" },
                { label: "Carbohydrates", value: product.category === "Fruits" ? "14.3g" : "7.2g" },
                { label: "Fibre", value: "2.4g" },
                ].map(({ label, value }) => (
                <div key={label} className="text-center">
                    <p className="text-2xl font-bold text-primary" style={{ fontFamily: "Outfit, sans-serif" }}>{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                </div>
                ))}
            </div>
            </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
            <div>
            <h2 className="text-xl font-bold text-foreground mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>You May Also Like</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {related.map((p) => (
                    <ProductCard 
                        key={p.id} 
                        product={p} 
                        onAddToCart={onAddToCart} 
                        onSelect={() => {}} 
                        isWishlisted={wishlist.has(p.id)} 
                        onToggleWishlist={onToggleWishlist} 
                    />
                ))}
            </div>
            </div>
        )}
        
        </div>
    )
};