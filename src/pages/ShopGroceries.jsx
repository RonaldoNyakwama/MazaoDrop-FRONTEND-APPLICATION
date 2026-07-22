import { useState } from "react";
import { PRODUCTS } from "../data/featuredProducts";
import { CATEGORIES } from "../data/productCategories";
import { ProductCard } from "../components/ProductCard";
import { Search, AlertCircle, X, Filter } from "lucide-react";
import { Sidebar } from "../components/Sidebar/Sidebar";

export const ShopGroceries = ({ onAddToCart, onSelectProduct, wishlist, onToggleWishlist}) => {
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState(null);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sortBy, setSortBy] = useState("popular");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  let filtered = PRODUCTS.filter((p) => {
    if (selectedCat && p.category !== selectedCat) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (p.price > maxPrice) return false;
    return true;
  });

  if (sortBy === "price-asc") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sortBy === "price-desc") filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sortBy === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const Sidebar = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-sm text-foreground mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Categories</h3>
        <div className="space-y-1">
          <button
            onClick={() => { setSelectedCat(null); setPage(1); }}
            className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors ${!selectedCat ? "bg-primary text-white font-semibold" : "text-foreground hover:bg-muted"}`}>
            All Categories
          </button>
          {CATEGORIES.map((c) => (
            <button key={c.name}
              onClick={() => { setSelectedCat(c.name); setPage(1); }}
              className={`w-full text-left text-sm px-3 py-2 rounded-lg transition-colors flex items-center justify-between ${selectedCat === c.name ? "bg-primary text-white font-semibold" : "text-foreground hover:bg-muted"}`}>
              <span>{c.emoji} {c.name}</span>
              <span className="text-xs opacity-70">{c.count}</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-bold text-sm text-foreground mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Max Price</h3>
        <input type="range" min={500} max={5000} step={50} value={maxPrice}
          onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
          className="w-full accent-primary" />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>KES 50</span>
          <span className="font-semibold text-primary">KES {maxPrice}</span>
          <span>KES 5,000</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>Shop Fresh Groceries</h1>
        <p className="text-sm text-muted-foreground">Delivering to Westlands, Waiyaki Way & Kitsuru</p>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-2.5 shadow-sm">
          <Search className="w-4 h-4 text-muted-foreground shrink-0" />
          <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            placeholder="Search for tomatoes, milk, bread..."
            className="flex-1 text-sm bg-transparent outline-none placeholder:text-muted-foreground" />
          {search && <button onClick={() => setSearch("")}><X className="w-4 h-4 text-muted-foreground" /></button>}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}
            className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium shadow-sm">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2.5 bg-card border border-border rounded-xl text-sm font-medium shadow-sm outline-none text-foreground">
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar desktop */}
        <aside className="hidden sm:block w-56 shrink-0">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-5 sticky top-20">
            <Sidebar />
          </div>
        </aside>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="sm:hidden fixed inset-0 z-40 flex">
            <div className="flex-1 bg-foreground/40" onClick={() => setSidebarOpen(false)} />
            <div className="w-72 bg-card border-l border-border p-5 overflow-y-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Filters</h3>
                <button onClick={() => setSidebarOpen(false)}><X className="w-5 h-5" /></button>
              </div>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Products */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">{filtered.length} products found</p>
          </div>
          {paged.length === 0 ? (
            <div className="text-center py-20">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">No products found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {paged.map((p) => (
                <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} onSelect={onSelectProduct}
                  isWishlisted={wishlist.has(p.id)} onToggleWishlist={onToggleWishlist} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)}
                className="px-3 py-1.5 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors">
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button key={n} onClick={() => setPage(n)}
                  className={`w-9 h-9 rounded-lg text-sm font-semibold transition-colors ${n === page ? "bg-primary text-white" : "border border-border hover:bg-muted"}`}>
                  {n}
                </button>
              ))}
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}
                className="px-3 py-1.5 rounded-lg border border-border text-sm font-medium disabled:opacity-40 hover:bg-muted transition-colors">
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};