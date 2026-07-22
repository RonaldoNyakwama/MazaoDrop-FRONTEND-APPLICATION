import { useState } from "react";
import { ChevronDown, Package, CreditCard, Leaf, User, RefreshCw, Truck, MessageSquare, Phone, Mail } from "lucide-react";

export const Support = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    { q: "What areas do you deliver to?", a: "We currently deliver to Westlands, Waiyaki Way, Kitsuru, Parklands, Gigiri, Lavington, and Riverside. We are expanding to more areas — check our Contact page for updates." },
    { q: "How long does delivery take?", a: "Most orders are delivered within 60 minutes of confirmation. During peak hours (7–9 AM and 5–8 PM) it may take up to 90 minutes. You will receive live updates via SMS." },
    { q: "What is the minimum order amount?", a: "The minimum order is KES 500. Orders above KES 5,000 qualify for free delivery. A flat delivery fee of KES 150 applies for orders below that threshold." },
    { q: "How do I pay?", a: "We accept M-Pesa (Lipa Na M-Pesa), debit and credit cards (Visa & Mastercard), and cash on delivery. M-Pesa is the most popular option among our customers." },
    { q: "What if an item I ordered is unavailable?", a: "Our pickers will contact you immediately if an item is out of stock. You can choose a substitute, remove the item, or cancel the order entirely — no charges for cancellations." },
    { q: "Can I return or exchange products?", a: "Yes. If any product does not meet your expectations in terms of freshness or quality, contact us within 2 hours of delivery. We will replace it or issue a full refund." },
    { q: "How do I track my order?", a: "Log in to your customer dashboard to track your order in real time. You will also receive SMS updates at each stage: confirmed, shopping, out for delivery, and delivered." },
    { q: "Do you source from local farms?", a: "Absolutely. We partner with smallholder farmers from Limuru, Kiambu, Nyandarua, and Meru, as well as trusted vendors at Westlands and Kangemi markets." },
  ];

  const categories = [
    { icon: Package, label: "Orders & Delivery", count: 12 },
    { icon: CreditCard, label: "Payments & Billing", count: 8 },
    { icon: Leaf, label: "Product Quality", count: 6 },
    { icon: User, label: "My Account", count: 9 },
    { icon: RefreshCw, label: "Returns & Refunds", count: 5 },
    { icon: Truck, label: "Delivery Areas", count: 4 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Help Centre</p>
        <h1 className="text-4xl font-bold text-foreground mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Customer Support</h1>
        <p className="text-muted-foreground max-w-lg mx-auto">Find answers to common questions or reach out to our team directly.</p>
      </div>

      {/* Support Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
        {categories.map(({ icon: Icon, label, count }) => (
          <button key={label} className="bg-card rounded-2xl border border-border shadow-sm p-4 text-center hover:border-primary hover:shadow-md transition-all group">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2 group-hover:bg-primary/20 transition-colors">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-xs font-semibold text-foreground leading-tight">{label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{count} articles</p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* FAQ Accordion */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-foreground mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-muted/30 transition-colors">
                  <span className="font-semibold text-sm text-foreground pr-4">{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Direct Contact */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Still Need Help?</h2>
          <p className="text-sm text-muted-foreground">Our support team is available 7 days a week.</p>
          {[
            { icon: MessageSquare, label: "WhatsApp Chat", desc: "Reply within 5 minutes", action: "Chat Now", color: "bg-green-600" },
            { icon: Phone, label: "Call Us", desc: "+254 712 345 678", action: "Call Now", color: "bg-blue-600" },
            { icon: Mail, label: "Email Support", desc: "support@mazaodrop.co.ke", action: "Email Us", color: "bg-purple-600" },
          ].map(({ icon: Icon, label, desc, action, color }) => (
            <div key={label} className="bg-card rounded-2xl border border-border shadow-sm p-5 flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl ${color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm text-foreground">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <button className="text-xs font-bold text-primary hover:text-primary/80 transition-colors whitespace-nowrap">{action}</button>
            </div>
          ))}

          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
            <p className="font-semibold text-sm text-primary mb-1">Operating Hours</p>
            <p className="text-xs text-muted-foreground">Mon – Sat: 7:00 AM – 8:00 PM</p>
            <p className="text-xs text-muted-foreground">Sunday: 8:00 AM – 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};