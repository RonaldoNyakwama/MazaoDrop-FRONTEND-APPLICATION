import { useState } from "react";
import { Leaf, Eye, EyeOff, CheckCircle } from "lucide-react";
import { LOCATIONS } from "../data/locations";

export const Register = ({setPage}) => {

    const [form, setForm] = useState({ 
        name: "", 
        email: "", phone: "", 
        location: "Westlands", 
        password: "", confirm: "" 
    });

    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [done, setDone] = useState(false);

    const handleSubmit = () => {
        if (form.name && form.email && form.phone && form.password && form.password === form.confirm && agreed) {
        setDone(true);
        }
    };

    if (done) {
        return (
            <div className="max-w-md mx-auto px-4 py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
                <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Welcome to MazaoDrop!</h2>
                <p className="text-muted-foreground mb-6">
                    Your account has been created. Start shopping fresh groceries from your local market.
                </p>
                <button onClick={() => setPage("shop")} className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 transition-colors mb-3">
                    Start Shopping
                </button>
                <button onClick={() => setPage("dashboard")} className="w-full border border-border font-semibold py-3.5 rounded-2xl hover:bg-muted transition-colors text-sm">
                    Go to My Dashboard
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

            {/* Logo */}
            <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Create Your Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join thousands of Nairobians shopping fresh</p>
            </div>

            <div className="bg-card rounded-3xl border border-border shadow-lg p-6 sm:p-8 space-y-4">
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Full Name"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="yourname@gmail.com"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Phone Number (M-Pesa)</label>
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+254 7XX XXX XXX"
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
            </div>
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Delivery Area</label>
                <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors">
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                </select>
            </div>
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Password</label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="At least 8 characters"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors pr-10" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                </div>
            </div>
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Confirm Password</label>
                <input type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                placeholder="Repeat your password"
                className={`w-full px-4 py-3 bg-muted/50 border rounded-xl text-sm outline-none transition-colors ${form.confirm && form.confirm !== form.password ? "border-red-400 focus:border-red-400" : "border-border focus:border-primary"}`} />
                {form.confirm && form.confirm !== form.password && (
                <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                )}
            </div>

            <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 accent-primary rounded" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to SokoFresh's{" "}
                <button onClick={() => setPage("support")} className="text-primary font-semibold hover:underline">Terms of Service</button>
                {" "}and{" "}
                <button onClick={() => setPage("support")} className="text-primary font-semibold hover:underline">Privacy Policy</button>
                </span>
            </label>

            <button onClick={handleSubmit}
                disabled={!agreed || !form.name || !form.email || !form.password || form.password !== form.confirm}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100">
                Create Account
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setPage("signin")} className="text-primary font-semibold hover:underline">Sign In</button>
            </p>
            </div>
        </div>
        </div>
    );

};

    
