import { useState } from "react";
import { LOCATIONS } from "../data/locations";
import { CheckCircle, Truck, MapPinned, Shield, CreditCard, Smartphone, Banknote, User, Check } from "lucide-react";

export const Checkout = ({ cart, setPage, isLoggedIn, currentUser }) => {
  const [payment, setPayment] = useState("mpesa");
  const [timeSlot, setTimeSlot] = useState("10:00 - 11:00 AM");
  const [placed, setPlaced] = useState(false);
  const [address, setAddress] = useState({ 
    name: currentUser?.name || "",
    phone: currentUser?.phone || "",
    street: "",
    area: currentUser?.location || "Westlands",
    instructions: "" 
  });

  // payPhone is the M-Pesa / Airtel number the customer enters for payment
  const [payPhone, setPayPhone] = useState("");
  // payState: idle → processing → paid
  const [payState, setPayState] = useState("idle");

  const subtotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const delivery = subtotal >= 5000 ? 0 : 150;
  const total = subtotal + delivery;

  // Reset payment state whenever the method changes
  const switchPayment = (m) => { setPayment(m); setPayState("idle"); setPayPhone(""); };

  const handlePay = () => {
    if (!payPhone.trim()) return;
    setPayState("processing");
    setTimeout(() => setPayState("paid"), 2800);
  };

  // Auth gate
  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-amber-50 border-2 border-amber-200 flex items-center justify-center mx-auto mb-5">
          <User className="w-9 h-9 text-amber-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: "Outfit, sans-serif" }}>Sign in to Checkout</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          You need an account to place an order. It only takes 30 seconds to register, and you&apos;ll be logged in immediately.
        </p>
        <div className="flex flex-col gap-3">
          <button 
            onClick={() => setPage("signin")}
            className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all"
          >
            Sign In to My Account
          </button>
          <button 
            onClick={() => setPage("register")}
            className="w-full border-2 border-primary text-primary font-bold py-3.5 rounded-2xl hover:bg-primary/5 transition-colors"
          >
            Create a Free Account
          </button>
          <button 
            onClick={() => setPage("cart")}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-1"
          >
            ← Back to cart
          </button>
        </div>
      </div>
    )
  };

  // Successful Order Placement
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
          <button 
            onClick={() => setPage("dashboard")} 
            className="flex-1 bg-primary text-white font-bold py-3 rounded-2xl hover:bg-primary/90 transition-colors"
          >
            Track Order
          </button>
          <button 
            onClick={() => setPage("home")} 
            className="flex-1 border border-border font-semibold py-3 rounded-2xl hover:bg-muted transition-colors"
          >
            Back Home
          </button>
        </div>
      </div>
    );
  }
  
  // Main checkout form
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
                <input 
                  value={address.name} 
                  onChange={(e) => setAddress({ ...address, name: e.target.value })}
                  placeholder="e.g. Firstname Lastname"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Phone Number</label>
                <input 
                  value={address.phone} 
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  placeholder="+254 7XX XXX XXX"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" 
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Street Address / Building</label>
                <input 
                  value={address.street} 
                  onChange={(e) => setAddress({ ...address, street: e.target.value })}
                  placeholder="e.g. Peponi Road, Spring Valley Court, Apt 4B"
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors" 
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Area</label>
                <select 
                  value={address.area} 
                  onChange={(e) => setAddress({ ...address, area: e.target.value })}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors"
                >
                    {LOCATIONS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Delivery Time</label>
                <select 
                  value={timeSlot} 
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors"
                >
                  {["8:00 - 9:00 AM", "9:00 - 10:00 AM", "10:00 - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 - 1:00 PM", "2:00 - 3:00 PM", "4:00 - 5:00 PM"].map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Delivery Instructions (optional)</label>
                <textarea 
                  value={address.instructions} 
                  onChange={(e) => setAddress({ ...address, instructions: e.target.value })}
                  placeholder="e.g. Call when you arrive. Leave at gate if not home."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-muted/50 border border-border rounded-xl text-sm outline-none focus:border-primary transition-colors resize-none" 
                />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-card rounded-2xl border border-border shadow-sm p-6">
            <h3 className="font-bold text-foreground mb-1 flex items-center gap-2" style={{ fontFamily: "Outfit, sans-serif" }}>
              <CreditCard className="w-4 h-4 text-primary" /> 
              Payment Method
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Pay before we dispatch your order. Your payment is secured and verified instantly.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {/* M-Pesa */}
              <button 
                onClick={() => switchPayment("mpesa")}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${payment === "mpesa" ? "border-green-500 bg-green-50" : "border-border hover:border-green-300"}`}
              >
                <Smartphone className={`w-6 h-6 ${payment === "mpesa" ? "text-green-600" : "text-muted-foreground"}`} />
                <span className={`text-sm font-bold ${payment === "mpesa" ? "text-green-700" : "text-foreground"}`}>M-Pesa</span>
                <span className="text-xs text-muted-foreground text-center">STK push</span>
              </button>

              {/* Airtel Money */}
              <button 
                onClick={() => switchPayment("airtel")}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${payment === "airtel" ? "border-red-500 bg-red-50" : "border-border hover:border-red-300"}`}
              >
                <Smartphone className={`w-6 h-6 ${payment === "airtel" ? "text-red-600" : "text-muted-foreground"}`} />
                <span className={`text-sm font-bold ${payment === "airtel" ? "text-red-600" : "text-foreground"}`}>Airtel Money</span>
                <span className="text-xs text-muted-foreground text-center">Push to pay</span>
              </button>

              {/* Cash — disabled */}
              <div className="flex flex-col items-center gap-2 p-4 rounded-2xl border-2 border-border bg-muted/30 opacity-60 cursor-not-allowed">
                <Banknote className="w-6 h-6 text-muted-foreground" />
                <span className="text-sm font-bold text-muted-foreground">Cash</span>
                <span className="text-xs text-red-500 font-semibold text-center">Not available for now</span>
              </div>
            </div>

            {/* M-Pesa panel */}
            {payment === "mpesa" && (
              <div className={`rounded-2xl p-5 border-2 transition-colors ${payState === "paid" ? "bg-green-50 border-green-300" : "bg-green-50/60 border-green-200"}`}>
                {payState === "paid" ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-green-800">Payment Confirmed!</p>
                      <p className="text-xs text-green-700">KES {total.toLocaleString()} received via M-Pesa. You can now place your order.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-green-800 mb-0.5">Pay via M-Pesa</p>
                    <p className="text-xs text-green-700 mb-3">Enter your M-Pesa number below. We will send a payment prompt (STK push) to your phone for KES {total.toLocaleString()}.</p>
                    <div className="flex gap-2">
                      <input 
                        value={payPhone} 
                        onChange={(e) => setPayPhone(e.target.value)}
                        placeholder="07XX XXX XXX"
                        className="flex-1 px-3 py-2.5 bg-white border border-green-300 rounded-xl text-sm outline-none focus:border-green-500 transition-colors" 
                      />

                      <button 
                        onClick={handlePay} disabled={!payPhone.trim() || payState === "processing"}
                        className="bg-green-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                        {payState === "processing" ? "Sending…" : `Pay KES ${total.toLocaleString()}`}
                      </button>
                    </div>
                    {payState === "processing" && (
                      <p className="text-xs text-green-700 mt-2 flex items-center gap-1.5">
                        <span className="inline-block w-3 h-3 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                        Waiting for M-Pesa confirmation on {payPhone}…
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Airtel Money panel */}
            {payment === "airtel" && (
              <div className={`rounded-2xl p-5 border-2 transition-colors ${payState === "paid" ? "bg-red-50 border-red-300" : "bg-red-50/40 border-red-200"}`}>
                {payState === "paid" ? (
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center shrink-0">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-red-800">Payment Confirmed!</p>
                      <p className="text-xs text-red-700">KES {total.toLocaleString()} received via Airtel Money. You can now place your order.</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm font-bold text-red-800 mb-0.5">Pay via Airtel Money</p>
                    <p className="text-xs text-red-700 mb-3">Enter your Airtel number. We will send a payment prompt to your phone for KES {total.toLocaleString()}.</p>
                    <div className="flex gap-2">
                      <input 
                        value={payPhone} 
                        onChange={(e) => setPayPhone(e.target.value)}
                        placeholder="073X XXX XXX"
                        className="flex-1 px-3 py-2.5 bg-white border border-red-300 rounded-xl text-sm outline-none focus:border-red-400 transition-colors" 
                      />
                      <button onClick={handlePay} disabled={!payPhone.trim() || payState === "processing"}
                        className="bg-red-600 text-white font-bold px-4 py-2.5 rounded-xl text-sm hover:bg-red-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap">
                        {payState === "processing" ? "Sending…" : `Pay KES ${total.toLocaleString()}`}
                      </button>
                    </div>

                    {payState === "processing" && (
                      <p className="text-xs text-red-600 mt-2 flex items-center gap-1.5">
                        <span className="inline-block w-3 h-3 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        Waiting for Airtel Money confirmation on {payPhone}…
                      </p>
                    )}
                  </>
                )}
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
                  <img 
                    src={(item.image)} 
                    w={48} h={48} 
                    alt={item.name} 
                    className="w-10 h-10 rounded-lg object-cover shrink-0" 
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">×{item.quantity}</p>
                  </div>
                  <p className="text-xs font-bold text-foreground shrink-0">KES {(item.price * item.quantity).toLocaleString()}</p>
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

            {payState !== "paid" ? (
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
                <p className="text-xs text-amber-700 font-semibold">Complete payment above to place your order</p>
              </div>
            ) : (
              <button onClick={() => setPlaced(true)}
                className="w-full bg-primary text-white font-bold py-3.5 rounded-2xl hover:bg-primary/90 active:scale-95 transition-all text-base">
                Place Order — KES {total.toLocaleString()}
              </button>
            )}

            <p className="text-xs text-muted-foreground text-center mt-3 flex items-center justify-center gap-1">
              <Shield className="w-3 h-3" /> Secured by SSL encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};