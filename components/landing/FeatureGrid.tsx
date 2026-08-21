"use client";
import { useState } from "react";
import {
  ArrowUpRight,
  BookOpen,
  Building2,
  Calculator,
  ShieldCheck,
  Sparkles,
  WalletCards,
} from "lucide-react";
const features = [
  [
    "Digital Payments",
    "Pay, send and receive money with confidence.",
    WalletCards,
    "Send money instantly via QR, wallet or bank transfer. Track every transaction with real-time updates and detailed history.",
  ],
  [
    "Micro-Savings",
    "Turn small habits into a safety net.",
    Sparkles,
    "Set automated savings goals, track progress visually, and get smart suggestions to reach your targets faster.",
  ],
  [
    "SME Management",
    "Simple tools to run your business.",
    Building2,
    "Monitor sales, expenses, inventory and customer credit in one dashboard. Make better business decisions with clear data.",
  ],
  [
    "Fraud Protection",
    "Spot suspicious requests early.",
    ShieldCheck,
    "Review risky transactions before sending. Get instant alerts for OTP scams, fake QR codes and unknown recipients.",
  ],
  [
    "Financial Literacy",
    "Build confidence with practical lessons.",
    BookOpen,
    "Short interactive lessons on safe payments, budgeting and savings. Test your knowledge with quick quizzes.",
  ],
  [
    "What-if Simulator",
    "See how small changes shape your future.",
    Calculator,
    "Adjust your monthly savings and instantly see how many months earlier you can reach your financial goals.",
  ],
] as const;
export default function FeatureGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
        Everything in one place
      </p>
      <h2 className="mt-3 text-4xl font-bold tracking-[-.05em]">
        Your money, with more clarity.
      </h2>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(([t, d, Icon, detail], index) => (
          <div
            key={t}
            className="group relative rounded-2xl border border-[#e7eeeb] bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70] transition-transform duration-200 group-hover:scale-110">
              <Icon size={20} />
            </div>
            <h3 className="mt-6 font-bold">{t}</h3>
            <p className="mt-2 text-sm leading-6 text-[#71817b]">{d}</p>
            <ArrowUpRight className="mt-7 text-[#139b70] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={18} />

            {hoveredIndex === index && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-[#102a27]/95 p-6 backdrop-blur-sm transition-all duration-200">
                <div className="text-center">
                  <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-xl bg-emerald-400/20 text-emerald-400">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t}</h3>
                  <p className="mt-3 text-sm leading-6 text-[#a8c0b8]">{detail}</p>
                  <button onClick={() => window.location.href = "/login"} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-emerald-400 px-4 py-2 text-xs font-bold text-[#102a27] transition-all duration-200 hover:bg-emerald-300 hover:shadow-lg">
                    Learn more <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
