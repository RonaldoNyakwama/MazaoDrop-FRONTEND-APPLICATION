import { useState } from "react";
import { LOCATIONS } from "../data/locations";
import { CheckCircle, Truck, MapPinned, Shield, CreditCard, Smartphone, Banknote } from "lucide-react";

export const Checkout = ({ cart, setPage }) => {
  const [payment, setPayment] = useState("mpesa");
  const [timeSlot, setTimeSlot] = useState("10:00 - 11:00 AM");
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState({ name: "", phone: "", street: "", area: "Westlands", instructions: "" });
  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal >= 5000 ? 0 : 150;
  const total = subtotal + delivery;

  if (placed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-500" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-3" style={{ fontFamily: "Outfit, sans-serif" }}>Order Placed!</h2>
        <p className="text-muted-foreground mb-2">Your order <span className="font-bold text-primary">#SK-1242</span> has been confirmed.</p>
        <p className="text-muted-foreground mb-8">Estimated delivery: <span className="font-semibold text-foreground">within 60 minutes</span></p>
        <div className="bg-card rounded-2xl border border-border p-5 mb-6 text-left">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-semibold text-sm">On the Way</p>
              <p className="text-xs text-muted-foreground">We are shopping your order now</p>
            </div>
          </div>
          <div className="w-full bg-muted rounded-full h-2 mb-1">
            <div className="bg-primary h-2 rounded-full" style={{ width: "40%" }} />
          </div>
          <p className="text-xs text-muted-foreground">Order confirmed → Shopping → Out for delivery → Delivered</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setPage("dashboard")} className="flex-1 bg-primary text-white font-bold py-3 rounded-2xl hover:bg-primary/90 transition-colors">
            Track Order
          </button>
          <button onClick={() => setPage("home")} className="flex-1 border border-border font-semibold py-3 rounded-2xl hover:bg-muted transition-colors">
            Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-8" style={{ fontFamily: "Outfit, sans-serif" }}>Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Delivery Address */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
              <MapPinned className="w-4 h-4 text-primary" /> Delivery Address
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Full Name</label>
                <input value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  placeholder="e.g. Full Name"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Phone Number</label>
                <input value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Street Address / Building</label>
                <input value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="e.g. Peponi Road, Spring Valley Court, Apt 4B"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Area</label>
                <select value={address.area} onChange={(e) => setAddress({ ...address, area: e.target.value })}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors">
                  {LOCATIONS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Delivery Time</label>
                <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors">
                  {["8:00 - 9:00 AM", "9:00 - 10:00 AM", "10:00 - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 - 1:00 PM", "2:00 - 3:00 PM", "4:00 - 5:00 PM"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Delivery Instructions (optional)</label>
                <textarea value={address.instructions} onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                  placeholder="e.g. Call when you arrive. Leave at gate if not home."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-bold text-foreground mb-4 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
              <CreditCard className="w-4 h-4 text-primary" /> Payment Method
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "mpesa", icon: Smartphone, label: "M-Pesa", desc: "Pay via M-Pesa STK push" },
                { id: "airtel", icon: Smartphone, label: "AirtelMoney", desc: "Pay via Airtel Money STK push" },
                { id: "cash", icon: Banknote, label: "Cash on Delivery", desc: "Pay when we arrive" },
              ].map(({ id, icon: Icon, label, desc }) => (
                <button key={id} onClick={() => setPayment(id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${payment === id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"}`}>
                  <Icon className={`w-6 h-6 ${payment === id ? "text-primary" : "text-muted-foreground"}`} />
                  <span className={`text-sm font-bold ${payment === id ? "text-primary" : "text-foreground"}`}>{label}</span>
                  <span className="text-xs text-muted-foreground text-center">{desc}</span>
                </button>
              ))}
            </div>

            {payment === "mpesa" && (
              <div className="mt-4 bg-green-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-800 mb-1">M-Pesa Payment</p>
                <p className="text-xs text-green-700">Enter your M-Pesa registered phone number. We will send a payment request prompt to your phone.</p>
                <input placeholder="+254 7XX XXX XXX"
                  className="mt-2 w-full max-w-xs px-3 py-2 bg-white border border-green-200 rounded-lg text-sm outline-none focus:border-green-500 transition-colors" />
              </div>
            )}

            {payment === "airtel" && (
              <div className="mt-4 bg-green-50 rounded-xl p-4">
                <p className="text-sm font-semibold text-green-800 mb-1"> Airtel Money Payment</p>
                <p className="text-xs text-green-700">Enter your Airtel registered phone number. We will send a payment request prompt to your phone.</p>
                <input placeholder="+254 7XX XXX XXX"
                  className="mt-2 w-full max-w-xs px-3 py-2 bg-white border border-green-200 rounded-lg text-sm outline-none focus:border-green-500 transition-colors" />
              </div>
            )}

          </div>
        </div>

        {/* Order Summary */}
        <div>
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6 sticky top-20">
            <h3 className="font-bold text-lg text-foreground mb-4" style={{ fontFamily: "Outfit, sans-serif" }}>Order Summary</h3>
            <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <img src={item.image} width={48} height={48} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">x{item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-foreground shrink-0">KES {item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-3 space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className={`font-semibold ${delivery === 0 ? "text-green-600" : ""}`}>{delivery === 0 ? "FREE" : `KES ${delivery}`}</span>
              </div>
              <div className="flex justify-between font-bold text-foreground pt-1 border-t border-border">
                <span>Total</span>
                <span style={{ fontFamily: "Outfit, sans-serif" }}>KES {total.toLocaleString()}</span>
              </div>
            </div>
            <button onClick={() => setPlaced(true)}
              className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-base">
              Place Order — KES {total.toLocaleString()}
            </button>
            <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> Secured by SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}