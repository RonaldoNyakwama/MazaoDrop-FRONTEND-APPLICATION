import { useState } from "react";
import { CheckCircle, Check, Shield, Clock, Smartphone} from "lucide-react";
import { LOCATIONS } from "../data/locations"

const ERRAND_TYPES = [
  { id: "parcel", emoji: "📦", label: "Parcel Pickup", desc: "Collect a package from a courier office, shop, or neighbour and bring it to you.", fee: 250, placeholder: "e.g. G4S Westlands branch, tracking #KE2245. Call before pickup." },
  { id: "pet", emoji: "🐾", label: "Pet Supplies", desc: "Dog food, cat litter, pet medicines, accessories — whatever your furry friend needs.", fee: 180, placeholder: "e.g. Pedigree Adult 3kg + 2× Whiskas pouches from Zucchini or any vet shop." },
  { id: "pharmacy", emoji: "💊", label: "Pharmacy Run", desc: "Prescription medicine, OTC drugs, vitamins, first-aid items, or health products.", fee: 200, placeholder: "e.g. Amoxicillin 250mg × 2 strips (prescription attached). Any Chandarana pharmacy." },
  { id: "laundry", emoji: "👔", label: "Dry Cleaning / Laundry", desc: "Drop off or collect your dry cleaning, ironing, or laundry bundle.", fee: 150, placeholder: "e.g. Pick up suit + 3 shirts from Westex Cleaners, Westlands Square." },
  { id: "office", emoji: "📎", label: "Office Supplies", desc: "Stationery, printer paper, toner cartridges, files, stamps, or desk accessories.", fee: 180, placeholder: "e.g. 2 reams A4 80gsm paper + 1 box ballpoint pens (blue) from Office Mart." },
  { id: "hardware", emoji: "🔧", label: "Hardware & Home Repair", desc: "Nails, paint, light bulbs, plumbing fittings, or small tools for home jobs.", fee: 200, placeholder: "e.g. 1 tin Crown Matt white paint (1L) + paint brush from Kenya Hardware." },
  { id: "electronics", emoji: "📱", label: "Electronics & Accessories", desc: "USB cables, phone chargers, adapters, power banks, batteries, or SIM cards.", fee: 200, placeholder: "e.g. USB-C to HDMI cable + micro-SD 64GB from Phone City, Sarit Centre." },
  { id: "mpesa", emoji: "💵", label: "M-Pesa / Cash Errands", desc: "Withdraw or deposit cash, top up a biller, or pay a bill on your behalf.", fee: 150, placeholder: "e.g. Deposit KES 5,000 to my M-Pesa account 0722 XXX XXX." },
  { id: "custom", emoji: "✨", label: "Custom Errand", desc: "Anything else — name it and we will handle it within our delivery zones.", fee: 300, placeholder: "Describe exactly what you need done, where to go, and what to bring back." },
];

export const ErrandsPage = ({ setPage })=> {
  const [selected, setSelected] = useState([]);
  const [configs, setConfigs] = useState({});
  const [deliveryArea, setDeliveryArea] = useState("Westlands");
  const [timeSlot, setTimeSlot] = useState("As soon as possible");
  const [submitted, setSubmitted] = useState(false);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
    if (!configs[id]) setConfigs((c) => ({ ...c, [id]: { details: "", pickup: "" } }));
  };

  const updateConfig = (id, field, value) => {
    setConfigs((c) => ({ ...c, [id]: { ...c[id], details: c[id]?.details ?? "", pickup: c[id]?.pickup ?? "", [field]: value } }));
  };

  const selectedTypes = ERRAND_TYPES.filter((t) => selected.includes(t.id));
  const totalFee = selectedTypes.reduce((s, t) => s + t.fee, 0);
  const canSubmit = selectedTypes.length > 0 && selectedTypes.every((t) => configs[t.id]?.details?.trim());

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Errand Request Sent!</h2>
        <p className="text-muted-foreground mb-2">Your <span className="font-bold text-primary">{selectedTypes.length} errand{selectedTypes.length > 1 ? "s" : ""}</span> have been confirmed.</p>
        <p className="text-muted-foreground mb-8">Our runner will handle everything and deliver to you in <span className="font-semibold text-foreground">{deliveryArea}</span>.</p>
        <div className="bg-card rounded-2xl border border-border p-5 mb-6 text-left space-y-2">
          {selectedTypes.map((t) => (
            <div key={t.id} className="flex items-center justify-between text-sm">
              <span>{t.emoji} {t.label}</span>
              <span className="font-semibold text-foreground">KES {t.fee}</span>
            </div>
          ))}
          <div className="border-t border-border pt-2 flex justify-between font-bold">
            <span>Total Runner Fee</span>
            <span className="text-primary" style={{ fontFamily: "Outfit, sans-serif" }}>KES {totalFee}</span>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPage("dashboard")} className="flex-1 bg-primary text-white font-bold py-3 rounded-2xl hover:bg-primary/90 transition-colors">Track My Errand</button>
          <button onClick={() => { setSelected([]); setSubmitted(false); }} className="flex-1 border border-border font-semibold py-3 rounded-2xl hover:bg-muted transition-colors">New Errand</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-primary/70 text-white py-14 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <span className="inline-block bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full mb-4 backdrop-blur">
            🏃 MazaoDrop Runners
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>
            We Handle Your Errands, <span className="text-accent">You Stay Home.</span>
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto mb-6">
            From picking up parcels to getting pet food — tell us what you need and our runners will take care of it across Westlands and Waiyaki Way.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-white/70">
            {["📦 Parcel Collection", "🐾 Pet Supplies", "💊 Pharmacy", "✨ Custom Requests"].map((t) => (
              <span key={t} className="bg-white/10 px-3 py-1.5 rounded-full">{t}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Errand picker */}
          <div className="lg:col-span-2 space-y-5">
            <div>
              <h2 className="text-xl font-bold text-foreground mb-1" style={{ fontFamily: "Outfit, sans-serif" }}>
                What do you need done?
              </h2>
              <p className="text-sm text-muted-foreground">Select one or more errands, then fill in the details for each.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ERRAND_TYPES.map((errand) => {
                const isOn = selected.includes(errand.id);
                return (
                  <div key={errand.id}
                    className={`rounded-2xl border-2 transition-all duration-200 overflow-hidden ${isOn ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/40"}`}>
                    {/* Card header — click to toggle */}
                    <button
                      onClick={() => toggle(errand.id)}
                      className="w-full flex items-start gap-3 p-4 text-left">
                      <span className="text-2xl shrink-0 mt-0.5">{errand.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <p className={`font-bold text-sm ${isOn ? "text-primary" : "text-foreground"}`} style={{ fontFamily: "Outfit, sans-serif" }}>
                            {errand.label}
                          </p>
                          <span className="text-xs font-semibold text-muted-foreground shrink-0">from KES {errand.fee}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{errand.desc}</p>
                      </div>
                      <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isOn ? "border-primary bg-primary" : "border-border"}`}>
                        {isOn && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </button>

                    {/* Expanded config when selected */}
                    {isOn && (
                      <div className="px-4 pb-4 space-y-3 border-t border-primary/10 pt-3">
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground block mb-1">
                            {errand.id === "custom" ? "Describe your errand in detail *" : "What exactly do you need? *"}
                          </label>
                          <textarea
                            value={configs[errand.id]?.details ?? ""}
                            onChange={(e) => updateConfig(errand.id, "details", e.target.value)}
                            placeholder={errand.placeholder}
                            rows={3}
                            className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/60"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground block mb-1">
                            Pickup location <span className="font-normal">(optional — if runner must collect from somewhere)</span>
                          </label>
                          <input
                            value={configs[errand.id]?.pickup ?? ""}
                            onChange={(e) => updateConfig(errand.id, "pickup", e.target.value)}
                            placeholder="e.g. Westgate Mall, Ground Floor, Shop 14"
                            className="w-full px-3 py-2.5 bg-white border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Order summary sidebar */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-card rounded-2xl border border-border shadow-sm p-6 space-y-5">
              <h3 className="font-bold text-foreground" style={{ fontFamily: "Outfit, sans-serif" }}>Errand Summary</h3>

              {/* Delivery details */}
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Deliver to</label>
                  <select value={deliveryArea} onChange={(e) => setDeliveryArea(e.target.value)}
                    className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors">
                    {LOCATIONS.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-muted-foreground block mb-1">Preferred time</label>
                  <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full px-3 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors">
                    {["As soon as possible", "Within 2 hours", "This afternoon", "This evening", "Schedule for tomorrow"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Selected errands list */}
              {selectedTypes.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Selected Errands</p>
                  {selectedTypes.map((t) => (
                    <div key={t.id} className="flex items-center justify-between text-sm py-1.5">
                      <span className="flex items-center gap-2 text-foreground">
                        <span>{t.emoji}</span>
                        <span className="font-medium">{t.label}</span>
                        {!configs[t.id]?.details?.trim() && (
                          <span className="text-xs text-amber-500 font-semibold">· needs details</span>
                        )}
                      </span>
                      <span className="font-semibold text-foreground">KES {t.fee}</span>
                    </div>
                  ))}
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                    <span>Runner Fee Total</span>
                    <span className="text-primary" style={{ fontFamily: "Outfit, sans-serif" }}>KES {totalFee}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    + cost of any items purchased on your behalf (paid on delivery or via M-Pesa).
                  </p>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-3xl mb-2">🏃</p>
                  <p className="text-sm text-muted-foreground">Select errands on the left to see your summary here.</p>
                </div>
              )}

              <button
                onClick={() => canSubmit && setSubmitted(true)}
                disabled={!canSubmit}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100">
                {selectedTypes.length === 0
                  ? "Select an errand to continue"
                  : !canSubmit
                  ? "Fill in all errand details"
                  : `Request ${selectedTypes.length} Errand${selectedTypes.length > 1 ? "s" : ""} — KES ${totalFee}`}
              </button>

              <div className="pt-2 border-t border-border space-y-2">
                {[
                  { icon: Shield, text: "Vetted, trusted runners" },
                  { icon: Clock, text: "Real-time SMS updates" },
                  { icon: Smartphone, text: "Pay via M-Pesa on delivery" },
                ].map(({ icon: Icon, text }) => (
                  <p key={text} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Icon className="w-3.5 h-3.5 text-primary shrink-0" />
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};