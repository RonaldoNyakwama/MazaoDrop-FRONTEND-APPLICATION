import { useState } from "react";
import { Leaf, Mail, Shield, Eye, EyeOff } from "lucide-react";
import { emailRe, fieldCls } from "../Validations/Validations";
import { FieldError } from "../Validations/FieldError";

export const SignIn = ({ setPage, onLogin }) => {

    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [touched, setTouched] = useState(new Set());
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const touch = (f) => setTouched(t => new Set(t).add(f));
    const show = (f) => submitAttempted || touched.has(f);

    const errors = {
        email: !form.email ? "Email is required." : !emailRe.test(form.email) ? "Enter a valid email address." : "",
        password: !form.password ? "Password is required." : form.password.length < 8 ? "Password must be at least 8 characters." : "",
    };

    const isValid = !errors.email && !errors.password;

    const handleSubmit = () => {
        //console.log("Submit button clicked");

        setSubmitAttempted(true);

        if (!isValid) return;

        // Replace later upon setting up the backend
        const user = {
            name: form.email.split("@")[0],
            email: form.email,
        };

        onLogin(user);

        setPage("dashboard");
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-background flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm">

                {/* Logo */}
                <div className="text-center mb-8">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <Leaf className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Welcome back</h1>
                <p className="text-sm text-muted-foreground mt-1">Sign in to your MazaoDrop account</p>
                </div>

                <div className="bg-card rounded-3xl border border-border shadow-lg p-6 sm:p-8 space-y-4">
                {/* Email */}
                <div>
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
                    <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        onBlur={() => touch("email")}
                        placeholder="yourname@gmail.com"
                        className={`${fieldCls(show("email") && !!errors.email)} pl-10 pr-4`}
                    />
                    </div>
                    {show("email") && errors.email && <FieldError msg={errors.email} />}
                </div>

                {/* Password */}
                <div>
                    <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-muted-foreground">Password</label>
                    <button className="text-xs text-primary font-semibold hover:underline">Forgot password?</button>
                    </div>
                    <div className="relative">
                    <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type={showPassword ? "text" : "password"}
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        onBlur={() => touch("password")}
                        onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                        placeholder="Your password (min. 8 characters)"
                        className={`${fieldCls(show("password") && !!errors.password)} pl-10 pr-10`}
                    />
                    <button onClick={() => setShowPassword(!showPassword)} type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    </div>
                    {show("password") && errors.password && <FieldError msg={errors.password} />}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all">
                    Sign In
                </button>

                <div className="relative flex items-center gap-3 py-1">
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground">or continue with</span>
                    <div className="flex-1 h-px bg-border" />
                </div>

                <button className="w-full flex items-center justify-center gap-3 border border-border rounded-2xl py-3 text-sm font-medium hover:bg-muted transition-colors">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign in with Google
                </button>

                <p className="text-center text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <button onClick={() => setPage("register")} className="text-primary font-semibold hover:underline">
                        Create one free
                    </button>
                </p>
                </div>
            </div>
    </div>
    );
};
