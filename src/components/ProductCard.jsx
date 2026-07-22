import { Heart, Plus } from "lucide-react";
import { StarRating } from "./StarRating";

export const ProductCard = ({product, onAddToCart, onSelect, onToggleWishlist, isWishlisted}) => {
  return (
    <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-200 group">
      <div 
        onClick={() => onSelect(product)}
        className="relative overflow-hidden cursor-pointer">
        <img
          src={product.image} 
          width={400} 
          height={280}
          alt={product.name}
          className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <span className="absolute top-2.5 left-2.5 text-xs font-bold px-2.5 py-1 rounded-full bg-accent text-white">
            {product.badge}
          </span>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleWishlist(product.id); }}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all">

          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>
      </div>
      <div className="p-3.5">
        <p className="text-xs text-muted-foreground mb-0.5">{product.category}</p>
        <h3 className="font-semibold text-sm text-foreground mb-1.5 cursor-pointer hover:text-primary transition-colors" >
          {product.name}
        </h3>
        <div className="flex items-center gap-1.5 mb-3">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <span className="font-bold text-foreground text-base">KES {product.price}</span>
            <span className="text-xs text-muted-foreground ml-1">/{product.unit}</span>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1 bg-primary text-white text-xs font-semibold px-3 py-2 rounded-xl hover:bg-primary/90 active:scale-95 transition-all">
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </div>
  );
};