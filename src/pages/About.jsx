import { Leaf, Users, Shield, Zap, ArrowRight } from "lucide-react";

export const About = ({setPage}) => {

    const values = [
        { icon: Leaf, title: "Farm Fresh", desc: "We partner directly with local smallholder farmers and vendors across Nairobi's highlands, cutting out the middlemen and ensuring fresher produce at fairer prices." },
        { icon: Users, title: "Community First", desc: "MazaoDrop was born in Kangemi, built for its neighbours. Every order supports local vendors, riders, and farmers in our community." },
        { icon: Shield, title: "Quality Guaranteed", desc: "Every item is hand-picked and inspected before dispatch. If anything fails your expectations, we'll replace or refund it, no questions asked." },
        { icon: Zap, title: "Speed & Reliability", desc: "We designed our entire operation around the 60-minute promise. Our dispatch network across Waiyaki Way and Westlands keeps us on time, every time." },
    ];

    const team = [
        { name: "Ronaldo Nyakwama", role: "Co-founder & CEO", avatar: "/images/ceo.png" },
        { name: "Tracy Kwamboka", role: "Co-founder & COO", avatar: "/images/cofounder.png" },
        { name: "Collin Nyangena", role: "Head of Logistics", avatar: "/images/logistics.png" },
        { name: "Millicent Bosibori", role: "Head of Partnerships", avatar: "/images/partnerships.png" },
    ];

    return (
        <div>
            {/* Hero */}
            <section className="relative h-72 flex items-end overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/images/groceriesconstant.png" 
                        width={1400}
                        height={600}
                        alt="Fresh market" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-foreground/20" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 w-full">
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Our Story</p>
                    <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "Outfit, sans-serif" }}>About MazaoDrop</h1>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">Our Mission</p>
                        <h2 className="text-3xl font-bold text-foreground mb-5" style={{ fontFamily: "Outfit, sans-serif" }}>
                            Bringing the Local Market to Every Doorstep along Waiyaki Way
                        </h2>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            MazaoDrop started in 2023 when our founders, frustrated by long supermarket queues and overpriced imported produce, decided to build something better. We connected directly with the vendors at Kangemi market and launched a simple WhatsApp delivery service.
                        </p>
                        <p className="text-muted-foreground leading-relaxed mb-6">
                            Today we serve thousands of households across Waiyaki Way, Westlands, Kitsuru, Parklands, and beyond. Our platform connects you with the same fresh produce you would find at your local market, without the journey.
                        </p>
                        <button onClick={() => setPage("shop")} className="inline-flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-2xl hover:bg-primary/90 transition-colors">
                             Start Shopping <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            ["1,000+", "Happy Customers"],
                            ["500+", "Products Listed"],
                            ["15+", "Partner Farms"],
                            ["60 min", "Avg Delivery Time"],
                            ].map(([v, l]) => (
                            <div key={l} className="bg-card rounded-2xl border  border-border shadow-sm p-6 text-center">
                                <p className="text-3xl font-bold text-primary mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>{v}</p>
                                <p className="text-sm text-muted-foreground">{l}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="bg-muted/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="text-center mb-10">
                            <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">What Drives Us</p>
                            <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Our Core Values</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-card rounded-2xl border border-border shadow-sm p-6">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                                <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="font-bold text-foreground mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>{title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                            </div>
                            ))}
                        </div>
                </div>
            </section>
            
            {/* Team */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-10">
                    <p className="text-xs font-bold text-accent uppercase tracking-widest mb-2">The People Behind MazaoDrop</p>
                    <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Meet Our Team</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                    {team.map(({ name, role, avatar }) => (
                        <div key={name} className="text-center">
                        <img src={avatar}
                            alt={name} className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-4 border-card shadow-md" />
                        <p className="font-bold text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>{name}</p>
                        <p className="text-xs text-muted-foreground">{role}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
};