import { ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";

export const Cart = ({ cart, onUpdateQty, onRemove, setPage }) => {
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal === 0 ? 0 : subtotal >= 5000 ? 0 : 150;
  const total = subtotal + delivery;

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-5">
          <ShoppingCart className="w-10 h-10 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Your cart is empty</h2>
        <p className="text-muted-foreground mb-6">Looks like you have not added anything yet. Start shopping!</p>
        <button onClick={() => setPage("shop")} className="bg-primary text-white font-bold px-8 py-3.5 rounded-2xl hover:bg-primary/90 transition-colors">
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-3">
          {cart.map((item) => (
            <div key={item.id} className="bg-card rounded-2xl border border-border shadow-sm p-4 flex items-center gap-4">
              <img src={item.image} width={100} height={100} alt={item.name} className="w-18 h-18 rounded-xl object-cover w-[72px] h-[72px] shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground truncate" style={{ fontFamily: "Outfit, sans-serif" }}>{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.unit} · {item.category}</p>
                <p className="font-bold text-primary text-sm mt-1">KES {item.price}</p>
              </div>
              <div className="flex items-center gap-1 border border-border rounded-xl bg-muted/50">
                <button onClick={() => onUpdateQty(item.id, item.quantity - 1)} className="p-1.5 hover:bg-muted rounded-l-xl transition-colors">
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="px-3 text-sm font-bold text-foreground">{item.quantity}</span>
                <button onClick={() => onUpdateQty(item.id, item.quantity + 1)} className="p-1.5 hover:bg-muted rounded-r-xl transition-colors">
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-sm text-foreground">KES {item.price * item.quantity}</p>
                <button onClick={() => onRemove(item.id)} className="text-xs text-red-500 hover:text-red-600 mt-1 flex items-center gap-1">
                  <Trash2 className="w-3 h-3" /> Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sticky top-20">
            <h3 className="font-bold text-lg text-foreground mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>Order Summary</h3>
            <div className="space-y-3 mb-5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({cart.length} items)</span>
                <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery Fee</span>
                <span className={`font-semibold ${delivery === 0 ? "text-green-600" : ""}`}>
                  {delivery === 0 ? "FREE" : `KES ${delivery}`}
                </span>
              </div>
              {subtotal > 0 && subtotal < 5000 && (
                <p className="text-xs text-muted-foreground bg-muted rounded-lg px-3 py-2">
                  Add KES {5000 - subtotal} more for free delivery!
                </p>
              )}
              <div className="border-t border-border pt-3 flex justify-between">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-xl text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>KES {total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => setPage("checkout")} className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-colors text-base">
              Proceed to Checkout
            </button>
            <button onClick={() => setPage("shop")} className="w-full text-center text-sm text-muted-foreground hover:text-primary transition-colors mt-3">
              Continue Shopping
            </button>
            <div className="mt-5 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground text-center mb-2">Accepted Payments</p>
              <div className="flex justify-center gap-2">
                {["M-Pesa", "Airtel", "Cash"].map((p) => (
                  <span key={p} className="text-xs px-2 py-1 bg-muted rounded-md font-medium text-muted-foreground">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}