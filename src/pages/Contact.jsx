import { useState } from "react";
import { Clock, Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { LOCATIONS } from "../data/locations";

export const Contact = () => {
    const [form, setForm] = useState(
        { name: "", email: "", phone: "", subject: "General Enquiry", message: "" }
    );
    const [sent, setSent] = useState(false);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-10">
            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Get in Touch</p>
            <h1 className="text-4xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Contact Us</h1>
            <p className="text-muted-foreground mt-2">We are here to help. Reach out and we will respond within 2 hours during business hours.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sm:p-8">
                {sent ? (
                <div className="text-center py-10">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Message Sent!</h3>
                    <p className="text-muted-foreground">Thanks for reaching out. We will get back to you within 2 hours.</p>
                    <button onClick={() => setSent(false)} className="mt-6 text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Send another message
                    </button>
                </div>
                ) : (
                <>
                    <h2 className="text-xl font-bold text-foreground mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>Send us a Message</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">Full Name</label>
                        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="e.g. Full Name"
                        className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">Email Address</label>
                        <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="yourname@email.com"
                        className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">Phone Number</label>
                        <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+254 7XX XXX XXX"
                        className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-muted-foreground block mb-1">Subject</label>
                        <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors">
                        {["General Enquiry", "Order Support", "Delivery Issue", "Product Quality", "Partnership", "Careers", "Other"].map((s) => (
                            <option key={s}>{s}</option>
                        ))}
                        </select>
                    </div>
                    </div>
                    <div className="mb-5">
                    <label className="text-xs font-semibold text-muted-foreground block mb-1">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Tell us how we can help you..."
                        rows={5}
                        className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none" />
                    </div>
                    <button onClick={() => { if (form.name && form.email && form.message) setSent(true); }}
                    className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all">
                    Send Message
                    </button>
                </>
                )}
            </div>
            </div>

            {/* Contact Details */}
            <div className="space-y-4">
            {[
                { icon: MapPin, title: "Our Location", lines: ["Kangemi Commercial Centre", "Waiyaki Way, Nairobi, Kenya"] },
                { icon: Phone, title: "Call or WhatsApp", lines: ["+254 712 345 678", "+254 733 456 789"] },
                { icon: Mail, title: "Email Us", lines: ["hello@sokofresh.co.ke", "support@sokofresh.co.ke"] },
                { icon: Clock, title: "Operating Hours", lines: ["Mon – Fri: 7:00 AM – 8:00 PM", "Sunday: 8:00 AM – 6:00 PM"] },
            ].map(({ icon: Icon, title, lines }) => (
                <div key={title} className="bg-card rounded-2xl border border-border shadow-sm p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <p className="font-semibold text-sm text-foreground mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</p>
                    {lines.map((l) => <p key={l} className="text-sm text-muted-foreground">{l}</p>)}
                </div>
                </div>
            ))}

            <div className="bg-card rounded-2xl border border-border shadow-sm p-5">
                <p className="font-semibold text-sm text-foreground mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Delivery Areas</p>
                <div className="flex flex-wrap gap-2">
                {LOCATIONS.map((a) => (
                    <span key={a} className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium">{a}</span>
                ))}
                </div>
            </div>
            </div>
        </div>
        </div>
    );
};