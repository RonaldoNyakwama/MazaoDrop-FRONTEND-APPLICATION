import { Home } from "./pages/Home";
import { WhyChooseUsSection } from "./pages/Choose"
import { ShoppingSteps } from "./pages/ShoppingSteps";
import { Testimonials } from "./pages/Testimonials";
import { Newsletter } from "./pages/Newsletter";
import { Footer } from "./pages/Footer";
import { CategoriesSection } from "./pages/Categories";
import { HandpickedProducts } from "./pages/HandpickedProducts";
import { SignIn } from "./pages/SignIn";
import { Navbar } from "./components/Navbar";
import { ShopGroceries } from "./pages/ShopGroceries";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { CustomerDashboard } from "./pages/CustomerDashboard";
import { Support } from "./pages/Support";
import { ProductDetails } from "./pages/ProductDetails";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Register } from "./pages/Register";
import { ErrandsPage } from "./pages/Errands";
import { AdminDashboard } from "./pages/AdminDashboard";
import { useState } from "react";
import { Leaf } from "lucide-react";

function App() {
  const [page, setPage] = useState("home");
  const [wishlist, setWishlist] = useState(new Set());
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setPage("home");
  };

  const handleToggleWishlist = (id) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleAddToCart = (product, qty = 1) => {
    // console.log("Button clicked....Adding to cart");
    
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const handleUpdateQty = (id, qty) => {
    if (qty <= 0) {
      setCart((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCart((prev) => prev.map((i) => i.id === id ? { ...i, quantity: qty } : i));
    }
  };

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setPage("product");
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  const isFullScreen = page === "admin";

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {!isFullScreen && (
        < Navbar 
          page={page} 
          setPage={setPage} 
          cartCount={cartCount}
          isLoggedIn={isLoggedIn} 
          userName={currentUser?.name ?? null} 
          onLogout={handleLogout} 
        />
      )}
      
      <main className="flex-1">
        {page === "home" &&(
          <>
          < Home 
            setPage={setPage} 
            cart={cart} 
            onAddToCart={handleAddToCart}
            wishlist={wishlist} 
            onToggleWishlist={handleToggleWishlist} 
            onSelectProduct={handleSelectProduct} 
          />

          < CategoriesSection setPage={setPage} />
          
          < HandpickedProducts 
            setPage={setPage} 
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
            
          < WhyChooseUsSection />
          < ShoppingSteps />
          < Testimonials />
          < Newsletter />
          </>
        )}

        {page === "shop" &&(
          < ShopGroceries 
            onAddToCart={handleAddToCart} 
            onSelectProduct={handleSelectProduct}
            wishlist={wishlist} 
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {page === "product" &&(
          < ProductDetails 
            product={selectedProduct} 
            onAddToCart={handleAddToCart}
            onBack={() => setPage("shop")} 
            wishlist={wishlist} 
            onToggleWishlist={handleToggleWishlist} 
          />
        )}

        {page === "cart" &&(
          < Cart 
            cart={cart} 
            onUpdateQty={handleUpdateQty} 
            onRemove={(id) => setCart(c => c.filter(i => i.id !== id))} setPage={setPage} 
          />
        )}

        {page === "checkout" &&(
          < Checkout 
            cart={cart} 
            setPage={setPage}
            isLoggedIn={isLoggedIn}
            currentUser={currentUser} 
          />
        )}

        {page === "dashboard" &&(
          < CustomerDashboard 
            setPage={setPage} 
            onAddToCart={handleAddToCart}
            currentUser={currentUser} 
          />
        )}

        {page === "about" &&(
          < About setPage={setPage} />
        )}

        {page === "contact" &&(
          < Contact />
        )}
        
        {page === "support" &&(
          < Support setPage={setPage} />
        )}

        {page === "signin" &&(
          < SignIn 
            setPage={setPage} 
            onLogin={handleLogin} 
          />
        )}

        {page === "register" &&(
          < Register 
            setPage={setPage} 
            onLogin={handleLogin} 
          />
        )}

        {page === "errands" &&(
          < ErrandsPage />
        )}

        {page === "admin" && (
          <div>
            <div className="bg-sidebar text-sidebar-foreground h-14 flex items-center px-5 border-b border-sidebar-border sticky top-0 z-50">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-sidebar-primary rounded-lg flex items-center justify-center">
                  <Leaf className="w-3.5 h-3.5 text-sidebar-primary-foreground" />
                </div>
                <span className="font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>MazaoDrop Admin</span>
              </div>
              <button onClick={() => setPage("home")} className="ml-auto text-xs font-medium text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors flex items-center gap-1.5">
                {/*<LogOut className="w-3.5 h-3.5" /> Exit*/}
              </button>
            </div>
            <AdminDashboard setPage={setPage} />
          </div>
        )}

        {!isFullScreen && page !== "admin" && page !== "register" && page !== "signin" && (
        <Footer setPage={setPage} />
        )}
                
      </main>
    </div>
  )
}

export default App
