import { useState } from "react";
import { Leaf, Eye, EyeOff, Check } from "lucide-react";
import { LOCATIONS } from "../data/locations";
import { emailRe, phoneRe, strongPw, fieldCls } from "../Validations/Validations";
import { FieldError } from "../Validations/FieldError";

export const Register = ({ setPage, onLogin }) => {

    const [form, setForm] = useState({ 
        name: "", 
        email: "", phone: "", 
        location: "Westlands", 
        password: "", confirm: "" 
    });

    const [showConfirm, setShowConfirm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [agreed, setAgreed] = useState(false);
    const [touched, setTouched] = useState(new Set());
    const [submitAttempted, setSubmitAttempted] = useState(false);
    
    const touch = (f) => setTouched(t => new Set(t).add(f));
    const show = (f) => submitAttempted || touched.has(f);

    const errors = {
        name: !form.name.trim() ? "Full name is required." : form.name.trim().length < 2 ? "Name must be at least 2 characters." : "",
        email: !form.email ? "Email is required." : !emailRe.test(form.email) ? "Enter a valid email address (e.g. yourname@gmail.com)." : "",
        phone: !form.phone ? "Phone number is required." : !phoneRe.test(form.phone.replace(/\s/g, "")) ? "Enter a valid Kenyan number (07XX or +2547XX)." : "",
        password: !form.password ? "Password is required." : !strongPw(form.password) ? "Password must be 8+ characters with at least one letter and one number." : "",
        confirm: !form.confirm ? "Please confirm your password." : form.confirm !== form.password ? "Passwords do not match." : "",
        agreed: !agreed ? "You must accept the terms to continue." : "",
    };

    const isValid = Object.values(errors).every(e => !e);

    const handleSubmit = () => {
        // Show all validation errors
        setSubmitAttempted(true);
        
        // Stop if there are validation errors
        if (!isValid) return;

        console.log("Form is valid");
        // Auto-login immediately after registration — no extra sign-in step needed
        const user = ({
            name: form.name.trim(),
            email: form.email,
            phone: form.phone,
            location: form.location,
        });

        onLogin(user);
        setPage("dashboard");
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
            <div className="text-center mb-8">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Create Your Account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join thousands of Nairobians shopping fresh</p>
            </div>

            <div className="bg-card rounded-3xl border border-border shadow-lg p-6 sm:p-8 space-y-4">
            {/* Full Name */}
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
                <input value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                onBlur={() => touch("name")}
                placeholder="e.g. FirstName LastName"
                className={`${fieldCls(show("name") && !!errors.name)} px-4`} />
                {show("name") && errors.name && <FieldError msg={errors.name} />}
            </div>

            {/* Email */}
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
                <input type="email" value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                onBlur={() => touch("email")}
                placeholder="yourname@gmail.com"
                className={`${fieldCls(show("email") && !!errors.email)} px-4`} />
                {show("email") && errors.email && <FieldError msg={errors.email} />}
            </div>

            {/* Phone */}
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Phone Number <span className="font-normal text-muted-foreground">(M-Pesa / Airtel)</span></label>
                <input value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                onBlur={() => touch("phone")}
                placeholder="0712 345 678 or +254 712 345 678"
                className={`${fieldCls(show("phone") && !!errors.phone)} px-4`} />
                {show("phone") && errors.phone && <FieldError msg={errors.phone} />}
            </div>

            {/* Delivery Area */}
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Preferred Delivery Area</label>
                <select value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors">
                {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                </select>
            </div>

            {/* Password */}
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Password</label>
                <div className="relative">
                <input type={showPassword ? "text" : "password"} value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    onBlur={() => touch("password")}
                    placeholder="At least 8 characters with a number"
                    className={`${fieldCls(show("password") && !!errors.password)} px-4 pr-10`} />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                </div>
                {show("password") && errors.password && <FieldError msg={errors.password} />}
                {/* Strength indicator */}
                {form.password && (
                <div className="flex gap-1 mt-1.5">
                    {[form.password.length >= 8, /[A-Z]/.test(form.password), /\d/.test(form.password), form.password.length >= 12].map((ok, i) => (
                    <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${ok ? "bg-green-400" : "bg-muted"}`} />
                    ))}
                    <span className="text-xs text-muted-foreground ml-1">
                    {form.password.length < 8 ? "Too short" : !strongPw(form.password) ? "Add a number" : form.password.length < 12 ? "Good" : "Strong"}
                    </span>
                </div>
                )}
            </div>

            {/* Confirm Password */}
            <div>
                <label className="text-xs font-semibold text-muted-foreground block mb-1">Confirm Password</label>
                <div className="relative">
                <input type={showConfirm ? "text" : "password"} value={form.confirm}
                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                    onBlur={() => touch("confirm")}
                    placeholder="Repeat your password"
                    className={`${fieldCls(show("confirm") && !!errors.confirm)} px-4 pr-10`} />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                </div>
                {show("confirm") && errors.confirm && <FieldError msg={errors.confirm} />}
                {form.confirm && !errors.confirm && (
                <p className="flex items-center gap-1 text-xs text-green-600 mt-1"><Check className="w-3 h-3" />Passwords match</p>
                )}
            </div>

            {/* Terms */}
            <div>
                <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={(e) => { setAgreed(e.target.checked); touch("agreed"); }}
                    className="mt-0.5 w-4 h-4 accent-primary rounded" />
                <span className="text-xs text-muted-foreground leading-relaxed">
                    I agree to MazaoDrop&apos;s{" "}
                    <button type="button" onClick={() => setPage("support")} className="text-primary font-semibold hover:underline">Terms of Service</button>
                    {" "}and{" "}
                    <button type="button" onClick={() => setPage("support")} className="text-primary font-semibold hover:underline">Privacy Policy</button>
                </span>
                </label>
                {show("agreed") && errors.agreed && <FieldError msg={errors.agreed} />}
            </div>

            <button onClick={handleSubmit}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all">
                Create Account & Start Shopping
            </button>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setPage("signin")} className="text-primary font-semibold hover:underline">Sign In</button>
            </p>
            </div>
        </div>
    </div>
    )

};

    
