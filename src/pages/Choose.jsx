import { Leaf, Tag, Zap, Shield } from "lucide-react"

export const WhyChooseUsSection = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center mb-10">
                <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">
                    Our Promise
                </p>

                <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>
                    Why Choose MazaoDrop?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                    {[
                        { 
                            icon: Leaf, 
                            title: "Fresh from Local Markets", 
                            desc: "We source directly from trusted local farmers and market vendors in and around Nairobi every single day.", 
                            color: "bg-green-50 text-green-600" 
                        },
                        { 
                            icon: Zap, title: "Delivery Within 60 Minutes", 
                            desc: "Order before 6PM and get your groceries delivered straight to your door in under an hour, guaranteed.", 
                            color: "bg-amber-50 text-amber-600" 
                        },
                        { 
                            icon: Tag, 
                            title: "Affordable Prices", 
                            desc: "We match local market prices with no hidden markups. Fresh groceries that are actually fair.",
                            color: "bg-blue-50 text-blue-600" 
                        },
                        { 
                            icon: Shield, 
                            title: "Secure Payments", 
                            desc: "Pay safely with M-Pesa or cash on delivery. Your security is our priority.",
                            color: "bg-purple-50 text-purple-600" 
                        },

                    ].map(({ icon: Icon, title, desc, color }) => (
                        <div key={title} className="bg-card rounded-2xl p-6 border border-border shadow-sm text-center">
                        <div className={`w-14 h-14 rounded-2xl ${color} flex items-center justify-center mx-auto mb-4`}>
                            <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                        </div>
                    ))}

                    </div>
            </div>
        </section>
      
    )
};