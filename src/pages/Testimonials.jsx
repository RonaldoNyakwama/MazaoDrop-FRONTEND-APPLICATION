import { MapPin } from "lucide-react";
import { TESTIMONIALS } from "../data/testimonialData";
import { StarRating } from "../components/StarRating";

export const Testimonials = () => {
    return (
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Customer Love</p>
          <h2 className="text-3xl font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>What Nairobians Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-card rounded-2xl p-6 border border-border shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <img 
                    src={t.img} alt={t.name} 
                    className="w-12 h-12 rounded-full object-cover" 
                    width={80}
                    height={80}
                />
                <div>
                  <p className="font-semibold text-sm text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>{t.name}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />{t.location}
                  </p>
                </div>
                <div className="ml-auto">
                  <StarRating rating={t.rating} />
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{t.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>
    )
}