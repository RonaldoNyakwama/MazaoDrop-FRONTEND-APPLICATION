import { Leaf, ShoppingCart, User } from "lucide-react";

export const Navbar = () => {

    const links = [
        { label: "Home", target: "home" },
        { label: "Shop", target: "shop" },
        { label: "Errands", target: "errands" },
        { label: "About", target: "about" },
        { label: "Contact", target: "contact" },
    ];
    
    return (
        <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-border shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <button className="flex items-center gap-2 font-bold text-xl"
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
                    <button key={l.label}
                        className="text-sm font-medium transition-colors hover:text-primary">
                        {l.label}
                    </button>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-foreground" />
                    <button className="relative p-2 rounded-full hover:bg-muted transition-colors">
                        {(
                            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">
                                cc
                            </span>
                        )}
                    </button>

                    <button className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary">
                        <User className="w-4 h-4" />
                        Sign In
                    </button>

                    <button className="hidden sm:flex items-center gap-1.5 text-sm font-semibold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">
                        Register
                    </button>
                </div>
            </div>
          </div>

          {/* Mobile Menu */}
        </nav>
    )
};