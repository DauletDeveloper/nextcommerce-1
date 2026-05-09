"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowLeft, CreditCard, Lock, Tag, X } from "lucide-react";
import items from "../DB/items"; 

const PROMO_CODES = {
  DAULET: 0.15, 
};

const Pay = () => {
  const [isDark, setIsDark] = useState(false);
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [basePrice, setBasePrice] = useState(0);
  const [promo, setPromo] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  function Buy() {
    localStorage.removeItem('chosenProduct');
    alert("Succsesfully")
  }
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "Dark");
  }, []);


  useEffect(() => {
    try {
      const saved = localStorage.getItem("chosenProduct");
      if (!saved) return;
      const chosen = JSON.parse(saved); // [{ id, count }]
      const total = chosen.reduce((sum, { id, count }) => {
        const item = items.find((i) => i.id === id);
        return sum + (item ? Number(item.price) * count : 0);
      }, 0);
      setBasePrice(total);
    } catch (error) {
      console.error(error);
      setBasePrice(0);
    }
  }, []);

  const discount = appliedPromo ? PROMO_CODES[appliedPromo] : 0;
  const finalPrice = (basePrice * (1 - discount)).toFixed(2);

  const applyPromo = () => {
    const code = promo.trim().toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo(code);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setAppliedPromo(null);
    }
  };

  const removePromo = () => {
    setAppliedPromo(null);
    setPromo("");
    setPromoError("");
  };

  const formatCardNumber = (val) =>
    val.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    return digits.length >= 3 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
  };

  const base = `w-full px-4 py-3 rounded-xl border text-sm font-medium outline-none transition-all duration-200 focus:ring-2`;
  const light = `bg-slate-50 border-slate-200 text-slate-800 placeholder:text-slate-400 focus:border-sky-400 focus:ring-sky-400/20`;
  const dark = `bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 focus:border-sky-500 focus:ring-sky-500/20`;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-slate-950 text-white" : "bg-slate-100 text-black"}`}>
      <Link href="/cart" className="flex items-center gap-2 p-5">
        <ArrowLeft size={22} />
        <span className="font-semibold text-lg">Back</span>
      </Link>
      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className={`w-full max-w-md rounded-2xl p-8 shadow-xl border ${isDark ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"}`}>

       
          <div className="w-full h-48 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-700 p-6 mb-8 flex flex-col justify-between text-white shadow-lg">
            <div className="flex justify-between items-center">
              <CreditCard size={28} />
              <span className="text-sm font-semibold tracking-widest opacity-80">VISA</span>
            </div>
            <div>
              <p className="text-xl font-mono tracking-widest mb-2">
                {card.number || "•••• •••• •••• ••••"}
              </p>
              <div className="flex justify-between text-sm opacity-80">
                <span>{card.name || "YOUR NAME"}</span>
                <span>{card.expiry || "MM/YY"}</span>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

          <div className="flex flex-col gap-4">

            <div>
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Card Number</label>
              <input
                className={`${base} ${isDark ? dark : light}`}
                placeholder="0000 0000 0000 0000"
                value={card.number}
                maxLength={19}
                onChange={(e) => setCard((p) => ({ ...p, number: formatCardNumber(e.target.value) }))}
                />
            </div>


            <div>
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Cardholder Name</label>
              <input
                className={`${base} ${isDark ? dark : light}`}
                placeholder="John Doe"
                value={card.name}
                onChange={(e) => setCard((p) => ({ ...p, name: e.target.value.toUpperCase() }))}
                />
            </div>

 
            <div className="flex gap-4">
              <div className="flex-1">
                <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>Expiry</label>
                <input
                  className={`${base} ${isDark ? dark : light}`}
                  placeholder="MM/YY"
                  value={card.expiry}
                  maxLength={5}
                  onChange={(e) => setCard((p) => ({ ...p, expiry: formatExpiry(e.target.value) }))}
                  />
              </div>
              <div className="flex-1">
                <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>CVV</label>
                <input
                  className={`${base} ${isDark ? dark : light}`}
                  placeholder="•••"
                  type="password"
                  maxLength={3}
                  value={card.cvv}
                  onChange={(e) => setCard((p) => ({ ...p, cvv: e.target.value.replace(/\D/g, "").slice(0, 3) }))}
                  />
              </div>
            </div>

  
            <div>
                  <h1 className="italic font-bold text-xl ">Promocode Daulet -15%</h1>
              <label className={`text-xs font-semibold uppercase tracking-wider mb-1 block ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                Promo Code
              </label>
              {appliedPromo ? (
                <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                    <span>{appliedPromo} — 15% off applied!</span>
                  </div>
                  <button onClick={removePromo} className="text-green-500 hover:text-green-700">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    className={`${base} ${isDark ? dark : light}`}
                    placeholder="Enter code"
                    value={promo}
                    onChange={(e) => { setPromo(e.target.value); setPromoError(""); }}
                    onKeyDown={(e) => e.key === "Enter" && applyPromo()}
                  />
                  <button
                    onClick={applyPromo}
                    className="px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold transition-all active:scale-95 whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              )}
              {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
            </div>


            {appliedPromo && (
              <div className={`text-sm rounded-xl p-3 flex flex-col gap-1 ${isDark ? "bg-slate-800" : "bg-slate-50"}`}>
                <div className="flex justify-between">
                  <span className={isDark ? "text-slate-400" : "text-slate-500"}>Subtotal</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-green-500">
                  <span>Discount (15%)</span>
                  <span>−${(basePrice * 0.15).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          <p className={`text-center text-xs mt-5 mb-2 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            ⚠️ Educational project — do not enter real card details.
          </p>
      <Link href='/'>
          <button onClick={() => Buy()} className="w-full py-3.5 rounded-xl bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-bold text-base transition-all duration-200 flex items-center justify-center gap-2">
            <Lock size={16} />
            Pay Now ${finalPrice}
          </button>
      </Link>

          <p className={`text-center text-xs mt-4 ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            🔒 Secured with 256-bit SSL encryption
          </p>
        </div>
      </main>
    </div>
  );
};

export default Pay;