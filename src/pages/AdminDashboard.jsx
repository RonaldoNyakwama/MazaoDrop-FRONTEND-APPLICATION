import { useState } from "react";
import { LayoutDashboard, ShoppingBag, Package, Users, Truck, BarChart3, Settings, TrendingUp, LogOut, Leaf, Bell, Star, Edit, Clock, Eye, Trash2, Plus } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { PRODUCTS } from "../data/featuredProducts";
import { StatusBadge } from "../components/StatusBadge";
import { SALES_DATA } from "../data/salesData";
import { RECENT_ORDERS_ADMIN } from "../data/recentOrders";

export const AdminDashboard = ({setPage}) => {

    const [activeSection, setActiveSection] = useState("overview");

    const navItems = [
        { id: "overview", label: "Overview", icon: LayoutDashboard },
        { id: "orders", label: "Orders", icon: ShoppingBag },
        { id: "products", label: "Products", icon: Package },
        { id: "customers", label: "Customers", icon: Users },
        { id: "delivery", label: "Delivery", icon: Truck },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const stats = [
        { label: "Total Orders Today", value: "128", change: "+12%", icon: ShoppingBag, color: "bg-blue-50 text-blue-600" },
        { label: "Revenue Today", value: "KES 58,420", change: "+8.4%", icon: TrendingUp, color: "bg-green-50 text-green-600" },
        { label: "Active Deliveries", value: "23", change: "Live", icon: Truck, color: "bg-amber-50 text-amber-600" },
        { label: "Total Customers", value: "2,418", change: "+5.2%", icon: Users, color: "bg-purple-50 text-purple-600" },
    ];


    return (
        <div className="flex min-h-[calc(100vh-64px)] bg-background">
            {/* Sidebar */}
            <aside className="hidden lg:flex flex-col w-60 bg-sidebar text-sidebar-foreground border-r border-sidebar-border shrink-0">
                <div className="p-5 border-b border-sidebar-border">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
                    <Leaf className="w-4 h-4 text-sidebar-primary-foreground" />
                    </div>
                    <span className="font-bold text-base" style={{ fontFamily: "Outfit, sans-serif" }}>Admin Panel</span>
                </div>
                <p className="text-xs text-sidebar-foreground/50 mt-1">MazaoDrop Operations</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                {navItems.map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => setActiveSection(id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeSection === id ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"}`}>
                    <Icon className="w-4 h-4" />
                    {label}
                    </button>
                ))}
                </nav>
                <div className="p-4 border-t border-sidebar-border">
                <button onClick={() => setPage("home")} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
                    <LogOut className="w-4 h-4" />
                    Exit Admin
                </button>
                </div>
            </aside>

            {/* Mobile nav */}
            <div className="lg:hidden flex overflow-x-auto gap-2 px-4 py-3 bg-sidebar w-full fixed bottom-0 z-40 border-t border-sidebar-border">
                {navItems.slice(0, 5).map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => setActiveSection(id)}
                        className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeSection === id ? "bg-sidebar-primary text-sidebar-primary-foreground" : "text-sidebar-foreground/60"}`}>
                        <Icon className="w-4 h-4" />
                        {label}
                    </button>
                ))}
            </div>

            {/* Content */}
            <main className="flex-1 p-6 lg:p-8 overflow-auto pb-20 lg:pb-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
                        {navItems.find(n => n.id === activeSection)?.label}
                        </h1>
                        <p className="text-sm text-muted-foreground">Saturday, 5 July 2025</p>
                    </div>
                <div className="flex items-center gap-3">
                    <button className="relative p-2 rounded-xl border border-border hover:bg-muted transition-colors">
                    <Bell className="w-5 h-5 text-foreground" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs font-bold rounded-full flex items-center justify-center">5</span>
                    </button>
                    <div className="flex items-center gap-2">
                    <img 
                        src="images/ronnie.png" w={40} h={40}alt="Admin" className="w-8 h-8 rounded-full object-cover" 
                    />
                    <span className="text-sm font-medium text-foreground hidden sm:block">Ronnie Admin</span>
                    </div>
                </div>
                </div>

                {(activeSection === "overview" || activeSection === "analytics") && (
                    <>
                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map(({ label, value, change, icon: Icon, color }) => (
                            <div key={label} className="bg-card rounded-2xl border border-border shadow-sm p-5">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center`}>
                                <Icon className="w-5 h-5" />
                                </div>
                                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${change === "Live" ? "bg-amber-100 text-amber-700" : "bg-green-100 text-green-700"}`}>{change}</span>
                            </div>
                            <p className="text-2xl font-bold text-foreground mb-0.5" style={{ fontFamily: "Outfit, sans-serif" }}>{value}</p>
                            <p className="text-xs text-muted-foreground">{label}</p>
                            </div>
                        ))}
                        </div>

                        {/* Charts */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
                            <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Orders Over Time</h3>
                            <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={SALES_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7566" }} />
                                <YAxis tick={{ fontSize: 11, fill: "#6b7566" }} />
                                <Tooltip formatter={(v) => [v, "Orders"]} contentStyle={{ fontSize: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)" }} />
                                <Area type="monotone" dataKey="orders" stroke="#2d6a4f" fill="#2d6a4f20" strokeWidth={2} />
                            </AreaChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
                            <h3 className="font-bold text-foreground mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Revenue (KES 000s)</h3>
                            <ResponsiveContainer width="100%" height={200}>
                            <BarChart data={SALES_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6b7566" }} />
                                <YAxis tick={{ fontSize: 11, fill: "#6b7566" }} />
                                <Tooltip formatter={(v) => [`KES ${Number(v)}K`, "Revenue"]} contentStyle={{ fontSize: 12, borderRadius: 12, border: "1px solid rgba(0,0,0,0.1)" }} />
                                <Bar dataKey="revenue" fill="#f4861f" radius={[6, 6, 0, 0]} />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>
                        </div>
                    </>
                    )}

                    {/* Recent Orders Table */}
                    {(activeSection === "overview" || activeSection === "orders") && (
                        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                            <div className="flex items-center justify-between p-5 border-b border-border">
                            <h3 className="font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Recent Orders</h3>
                            <button className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    {["Order ID", "Customer", "Items", "Amount", "Status", "Time", "Actions"].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {RECENT_ORDERS_ADMIN.map((order) => (
                                    <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                    <td className="px-5 py-3.5 font-semibold text-primary">{order.id}</td>
                                    <td className="px-5 py-3.5 text-foreground">{order.customer}</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">{order.items} items</td>
                                    <td className="px-5 py-3.5 font-semibold text-foreground">KES {order.amount.toLocaleString()}</td>
                                    <td className="px-5 py-3.5"><StatusBadge status={order.status} /></td>
                                    <td className="px-5 py-3.5 text-muted-foreground text-xs">{order.time}</td>
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2">
                                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                                        </div>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    )}

                    {activeSection === "products" && (
                        <div>
                            <div className="flex items-center justify-between mb-4">
                            <p className="text-sm text-muted-foreground">{PRODUCTS.length} products total</p>
                            <button className="flex items-center gap-2 bg-primary text-white font-semibold text-sm px-4 py-2 rounded-xl hover:bg-primary/90 transition-colors">
                                <Plus className="w-4 h-4" /> Add Product
                            </button>
                            </div>
                            <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-border bg-muted/50">
                                    {["Product", "Category", "Price", "Rating", "Stock", "Actions"].map((h) => (
                                        <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                                    ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {PRODUCTS.map((p) => (
                                    <tr key={p.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                        <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                            <img src={(p.image)} w={48} h={48} alt={p.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                                            <span className="font-medium text-foreground">{p.name}</span>
                                        </div>
                                        </td>
                                        <td className="px-5 py-3.5 text-muted-foreground">{p.category}</td>
                                        <td className="px-5 py-3.5 font-semibold text-foreground">KES {p.price}/{p.unit}</td>
                                        <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                            <span className="text-foreground font-medium">{p.rating}</span>
                                        </div>
                                        </td>
                                        <td className="px-5 py-3.5">
                                        <span className="text-xs bg-green-100 text-green-700 font-semibold px-2.5 py-1 rounded-full">In Stock</span>
                                        </td>
                                        <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                                            <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><Edit className="w-4 h-4 text-muted-foreground" /></button>
                                            <button className="p-1.5 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4 text-red-400" /></button>
                                        </div>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    )}

                    {activeSection === "customers" && (
                        <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    {["Customer", "Location", "Orders", "Total Spent", "Joined", "Actions"].map((h) => (
                                    <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {[
                                    { name: "Wanjiku Kamau", avatar: "1494790108377-be9c29b29330", location: "Westlands", orders: 14, spent: 8420, joined: "Jan 2024" },
                                    { name: "Brian Otieno", avatar: "1507003211169-0a1dd7228f2d", location: "Waiyaki Way", orders: 8, spent: 4250, joined: "Mar 2024" },
                                    { name: "Amina Hassan", avatar: "1438761681033-6461ffad8d80", location: "Parklands", orders: 22, spent: 12880, joined: "Nov 2023" },
                                    { name: "Peter Njoroge", avatar: "1472099645785-5658abf4ff4e", location: "Westlands", orders: 5, spent: 2100, joined: "May 2024" },
                                ].map((c) => (
                                    <tr key={c.name} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                                    <td className="px-5 py-3.5">
                                        <div className="flex items-center gap-3">
                                        <img src={(c.avatar)} w={40} h={40} alt={c.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                                        <span className="font-medium text-foreground">{c.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-3.5 text-muted-foreground">{c.location}</td>
                                    <td className="px-5 py-3.5 font-medium text-foreground">{c.orders}</td>
                                    <td className="px-5 py-3.5 font-semibold text-foreground">KES {c.spent.toLocaleString()}</td>
                                    <td className="px-5 py-3.5 text-muted-foreground">{c.joined}</td>
                                    <td className="px-5 py-3.5">
                                        <button className="p-1.5 hover:bg-muted rounded-lg transition-colors"><Eye className="w-4 h-4 text-muted-foreground" /></button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                    </div>
                    )}

                    {activeSection === "delivery" && (
                        <div className="space-y-4">
                            {RECENT_ORDERS_ADMIN.map((order) => (
                            <div key={order.id} className="bg-card rounded-2xl border border-border shadow-sm p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className="font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>{order.id}</span>
                                    <StatusBadge status={order.status} />
                                </div>
                                <p className="text-sm text-muted-foreground">{order.customer} · {order.items} items · KES {order.amount.toLocaleString()}</p>
                                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> {order.time}
                                </p>
                                </div>
                                <div className="flex items-center gap-2">
                                <button className="text-xs font-semibold bg-primary text-white px-3 py-1.5 rounded-lg hover:bg-primary/90 transition-colors">Assign Rider</button>
                                <button className="text-xs font-semibold border border-border px-3 py-1.5 rounded-lg hover:bg-muted transition-colors">View Map</button>
                                </div>
                            </div>
                            ))}
                        </div>
                    )}

                    {activeSection === "settings" && (
                        <div className="max-w-lg">
                            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5">
                            {[
                                { label: "Store Name", value: "MazaoDrop Nairobi" },
                                { label: "Delivery Radius (km)", value: "10" },
                                { label: "Minimum Order (KES)", value: "500" },
                                { label: "Delivery Fee (KES)", value: "150" },
                                { label: "Free Delivery Threshold (KES)", value: "1,000" },
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
                                Save Settings
                            </button>
                            </div>
                        </div>
                    )}
            </main>
        
        </div>
    )
};