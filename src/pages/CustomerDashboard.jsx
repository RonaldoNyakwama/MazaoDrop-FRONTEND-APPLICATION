import { useState } from "react";
import { PRODUCTS } from "../data/featuredProducts";
import { ShoppingBag, MapPinned, Heart, User, LogOut, Edit, Plus, Check, RefreshCw, Clock, Truck } from "lucide-react";
import { StatusBadge } from "../components/StatusBadge";

// Each past order stores real product IDs + quantities so Reorder can re-add them.
const PAST_ORDERS = [
    {
        id: "#SK-1241",
        date: "Today, 10:30 AM",
        status: "Delivered",
        amount: 440,
        lines: [
        { productId: 1, qty: 2 },  // Organic Tomatoes
        { productId: 2, qty: 1 },  // Fresh Spinach
        { productId: 3, qty: 1 },  // Ripe Avocados
        ],
    },
    {
        id: "#SK-1188",
        date: "Yesterday, 2:15 PM",
        status: "Delivered",
        amount: 725,
        lines: [
        { productId: 8, qty: 2 },  // Unga Pembe Flour
        { productId: 6, qty: 3 },  // Fresh Whole Milk
        { productId: 7, qty: 2 },  // White Bread Loaf
        ],
    },
    {
        id: "#SK-1102",
        date: "3 days ago",
        status: "Delivered",
        amount: 1370,
        lines: [
        { productId: 5, qty: 2 },  // Farm Chicken
        { productId: 9, qty: 1 },  // Fresh Carrots
        ],
    },
];

export const CustomerDashboard = ({setPage, onAddToCart}) => {

    const [activeTab, setActiveTab] = useState("orders");
    const [reorderingId, setReorderingId] = useState(null);

    const tabs = [
        { id: "orders", label: "My Orders", icon: ShoppingBag },
        { id: "addresses", label: "Addresses", icon: MapPinned },
        { id: "favorites", label: "Favourites", icon: Heart },
        { id: "profile", label: "Profile", icon: User },
    ];

    const handleReorder = (order) => {
        setReorderingId(order.id);
        order.lines.forEach(({ productId, qty }) => {
            const product = PRODUCTS.find((p) => p.id === productId);
            if (product) onAddToCart(product, qty);
        });
        // Brief flash then navigate to cart so the customer can review & checkout
        setTimeout(() => {
            setReorderingId(null);
            setPage("cart");
        }, 900);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-primary/80 rounded-3xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/4 translate-x-1/4" />
                <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                    <img src="images/wanja.png" w={80} h={80} alt="Profile" className="w-14 h-14 rounded-full object-cover border-2 border-white/30" />
                    <div>
                    <h2 className="text-2xl font-bold" style={{ fontFamily: "Outfit, sans-serif" }}>Habari, Wanjiku! 👋</h2>
                    <p className="text-white/70 text-sm">Westlands · Member since Jan 2024</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {[["14", "Orders"], ["KES 8,420", "Total Spent"], ["4.9★", "Rating"]].map(([v, l]) => (
                    <div key={l} className="bg-white/10 rounded-2xl px-4 py-3">
                        <p className="font-bold text-xl" style={{ fontFamily: "Outfit, sans-serif" }}>{v}</p>
                        <p className="text-xs text-white/70">{l}</p>
                    </div>
                    ))}
                </div>
                </div>
            </div>

            {/* Active order tracker */}
            <div className="bg-card rounded-2xl border border-border shadow-sm p-5 mb-6">
                <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Current Order — #SK-1242</h3>
                <StatusBadge status="Out for Delivery" />
                </div>
                <div className="relative">
                <div className="absolute top-4 left-4 right-4 h-1 bg-muted rounded-full">
                    <div className="h-full bg-primary rounded-full" style={{ width: "66%" }} />
                </div>
                <div className="flex justify-between relative">
                    {[
                    { label: "Confirmed", done: true },
                    { label: "Shopping", done: true },
                    { label: "Out for Delivery", done: false, active: true },
                    { label: "Delivered", done: false },
                    ].map(({ label, done, active }) => (
                    <div key={label} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${done ? "bg-primary" : active ? "bg-accent ring-4 ring-accent/20" : "bg-muted border-2 border-border"}`}>
                        {done ? <Check className="w-4 h-4 text-white" /> : active ? <Truck className="w-4 h-4 text-white" /> : <Clock className="w-4 h-4 text-muted-foreground" />}
                        </div>
                        <p className={`text-xs font-medium ${done || active ? "text-foreground" : "text-muted-foreground"}`}>{label}</p>
                    </div>
                    ))}
                </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Estimated delivery: <span className="font-semibold text-foreground ml-1">12:45 PM (in ~18 minutes)</span>
                </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
                {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} onClick={() => setActiveTab(id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeTab === id ? "bg-primary text-white shadow-sm" : "bg-card border border-border text-muted-foreground hover:text-foreground"}`}>
                    <Icon className="w-4 h-4" />
                    {label}
                </button>
                ))}
            </div>

            {/* Tab Content */}
            {activeTab === "orders" && (
                <div className="space-y-4">
                {PAST_ORDERS.map((order) => {
                    const lineLabels = order.lines
                        .map(({ productId, qty }) => {
                            const product = PRODUCTS.find((p) => p.id === productId);

                            if (!product) return null;

                            return `${product.name} ×${qty}`;
                        })
                        .filter(Boolean);

                    const isReordering = reorderingId === order.id;
                    console.log("lineLabels are", lineLabels);

                    return (
                        <div key={order.id} className="bg-card rounded-2xl border border-border shadow-sm p-5">
                            <div className="flex items-start justify-between mb-3">
                            <div>
                                <p className="font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>{order.id}</p>
                                <p className="text-xs text-muted-foreground">{order.date}</p>
                            </div>
                            <StatusBadge status={order.status} />
                            </div>

                            {/* Item thumbnails + names */}
                            <div className="flex flex-wrap gap-2 mb-3">
                            {order.lines.map(({ productId, qty }) => {
                                const p = PRODUCTS.find((x) => x.id === productId);
                                if (!p) return null;
                                return (
                                <div key={productId} className="flex items-center gap-1.5 bg-muted/60 rounded-xl px-2.5 py-1.5">
                                    <img src={(p.image)} w={32} h={32} alt={p.name} className="w-6 h-6 rounded-md object-cover shrink-0" />
                                    <span className="text-xs text-foreground font-medium">{p.name}</span>
                                    <span className="text-xs text-muted-foreground">×{qty}</span>
                                </div>
                                );
                        })}
                        </div>

                        <div className="flex items-center justify-between">
                        <p className="font-bold text-foreground">KES {order.amount.toLocaleString()}</p>
                        <button
                            onClick={() => !isReordering && handleReorder(order)}
                            className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all active:scale-95
                            ${isReordering
                                ? "bg-green-500 text-white border-green-500"
                                : "text-primary border-primary/20 hover:bg-primary/5 hover:text-primary/80"}`}>
                            {isReordering
                            ? <><Check className="w-3 h-3" /> Added to Cart!</>
                            : <><RefreshCw className="w-3 h-3" /> Reorder</>}
                        </button>
                        </div>
                    </div>
                    );
                })}
                </div>
            )}

            {activeTab === "addresses" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { label: "Home", address: "Spring Valley Court, Apt 4B, Peponi Road, Westlands", default: true },
                    { label: "Office", address: "Westlands Commercial Centre, 3rd Floor, Waiyaki Way", default: false },
                ].map(({ label, address, default: isDefault }) => (
                    <div key={label} className="bg-card rounded-2xl border border-border shadow-sm p-5">
                    <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>{label}</span>
                        {isDefault && <span className="text-xs bg-primary/10 text-primary font-semibold px-2 py-0.5 rounded-full">Default</span>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">{address}</p>
                    <div className="flex gap-2">
                        <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Edit</button>
                        {!isDefault && <button className="text-xs font-semibold text-red-500 hover:text-red-600 transition-colors ml-2">Remove</button>}
                    </div>
                    </div>
                ))}
                <button className="bg-muted/50 border-2 border-dashed border-border rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                    <Plus className="w-6 h-6" />
                    <span className="text-sm font-medium">Add New Address</span>
                </button>
                </div>
            )}

            {activeTab === "favorites" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {PRODUCTS.slice(0, 4).map((p) => (
                    <div key={p.id} className="bg-card rounded-2xl border border-border shadow-sm p-4 flex flex-col gap-2">
                    <img src={(p.image)} w={200} h={150} alt={p.name} className="w-full h-28 object-cover rounded-xl" />
                    <p className="font-semibold text-xs text-foreground">{p.name}</p>
                    <p className="text-sm font-bold text-primary">KES {p.price}/{p.unit}</p>
                    <button className="mt-auto text-xs bg-primary text-white font-semibold py-2 rounded-xl hover:bg-primary/90 transition-colors">Add to Cart</button>
                    </div>
                ))}
                </div>
            )}

            {activeTab === "profile" && (
                <div className="max-w-lg">
                <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-4">
                    {[
                    { label: "Full Name", value: "Wanjiku Kamau" },
                    { label: "Email", value: "wanjiku@gmail.com" },
                    { label: "Phone", value: "+254 722 345 678" },
                    { label: "Delivery Area", value: "Westlands" },
                    ].map(({ label, value }) => (
                    <div key={label}>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">{label}</label>
                        <div className="flex items-center gap-2 bg-muted/50 border border-border rounded-xl px-4 py-2.5">
                        <span className="flex-1 text-sm text-foreground">{value}</span>
                        <Edit className="w-3.5 h-3.5 text-muted-foreground" />
                        </div>
                    </div>
                    ))}
                    <button className="w-full bg-primary text-white font-bold py-3 rounded-2xl hover:bg-primary/90 transition-colors mt-2">
                    Save Changes
                    </button>
                </div>
                <button onClick={() => setPage("home")} 
                    className="mt-4 w-full flex items-center justify-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors py-3 border border-red-100 rounded-2xl hover:bg-red-50">
                    <LogOut className="w-4 h-4" /> Sign Out
                </button>
                </div>
            )}
    </div>

    )
};