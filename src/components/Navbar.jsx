import { Leaf, ShoppingCart, User, Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = ({page, setPage, cartCount}) => {

    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        { label: "Home", target: "home" },
        { label: "Shop", target: "shop" },
        { label: "Errands", target: "errands" },
        { label: "About", target: "about" },
        { label: "Contact", target: "contact" },
    ];

    const go = p => setPage(p);
    
    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <button onClick={() => go("home")}
                className="flex items-center gap-2 font-bold text-xl"
                style={{ fontFamily: "Outfit, sans-serif" }}
                >
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                        <Leaf className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-foreground">Mazao<span className="text-accent">Drop</span></span>
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6">
                    {links.map((l) => (
                    <button key={l.label} onClick={()=>go(l.target)}
                        className={`text-sm font-medium transition-colors hover:text-primary ${page === l.target ? "text-primary": "text-muted-foreground"}`}>
                        {l.label}
                    </button>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <button onClick={() => go("cart")}
                    className="relative p-2 rounded-full hover:bg-muted transition-colors">
                    <ShoppingCart className="w-5 h-5 text-foreground" />
                        {cartCount > 0 && (
                            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    <button onClick={() => go("signin")}
                        className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary">
                        <User className="w-4 h-4" />
                        Sign In
                    </button>

                    <button onClick={() => go("register")}
                        className="hidden sm:flex items-center gap-1.5 text-sm font-semibold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                        Register
                    </button>

                    <button onClick={() => setMobileOpen(!mobileOpen)} 
                        className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors">
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5"/>}
                    </button>
                </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
                {links.map((l) => (
                    <button key={l.label} onClick={() => go(l.target)}
                    className="text-left text-sm font-medium py-2 text-foreground hover:text-primary transition-colors">
                    {l.label}
                    </button>
                ))}
                <div className="flex gap-2 pt-2 border-t border-border">
                    <button onClick={() => go("signin")} 
                        className="flex-1 text-sm font-medium text-foreground border border-border rounded-lg py-2 hover:border-primary hover:text-primary transition-colors">
                            Sign In
                    </button>

                    <button onClick={() => go("register")} 
                        className="flex-1 text-sm font-semibold bg-primary text-white rounded-lg py-2 hover:bg-primary/90 transition-colors">
                            Register
                    </button>

                </div>
            </div>
          )}
        </nav>
    )
};