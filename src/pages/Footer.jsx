import { MapPin, Phone, Mail, Leaf } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaTiktok } from "react-icons/fa6";


export const Footer = () => {
  return (
    <footer className="bg-foreground text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg" style={{ fontFamily: "Outfit, sans-serif" }}>
                Mazao<span className="text-accent">Drop</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed mb-4">
              Fresh groceries from your local Nairobi market, delivered to your door in 60 minutes. Serving Waiyaki Way, Westlands, and Kitsuru.
            </p>
            <div className="flex items-center gap-3">
              {[FaFacebookF, FaInstagram, FaXTwitter, FaTiktok].map((Icon, i) => (
                <button key={i} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Quick Links</h4>
            <ul className="space-y-2.5">
              {([["Shop Now", "shop"], ["Categories", "shop"], ["About Us", "about"], ["Contact Us", "contact"], ["Careers", "about"]]).map(([label]) => (
                <li key={label}><button className="text-sm text-white/60 hover:text-white transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Customer Support</h4>
            <ul className="space-y-2.5">
              {([["FAQs", "support"], ["Track Your Order", "dashboard"], ["Delivery Areas", "contact"], ["Returns & Refunds", "support"], ["Privacy Policy", "support"], ["Terms of Service", "support"]]).map(([label]) => (
                <li key={label}><button className="text-sm text-white/60 hover:text-white transition-colors">{label}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/60">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-accent" />
                Kangemi, Waiyaki Way, Nairobi
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Phone className="w-4 h-4 shrink-0 text-accent" />
                +254 712 345 678
              </li>
              <li className="flex items-center gap-2.5 text-sm text-white/60">
                <Mail className="w-4 h-4 shrink-0 text-accent" />
                hello@sokofresh.co.ke
              </li>
            </ul>
            <div className="mt-5">
              <p className="text-xs text-white/40 mb-2">Delivery Areas</p>
              <div className="flex flex-wrap gap-1.5">
                {["Westlands", "Waiyaki Way", "Kitsuru", "Parklands", "Gigiri", "Lavington"].map((a) => (
                  <span key={a} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/40">© 2026 MazaoDrop. All rights reserved.</p>
          <p className="text-xs text-white/40">Built with ❤️ in Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}