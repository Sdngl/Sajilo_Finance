"use client";
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
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24">
      <p className="text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
        Everything in one place
      </p>
      <h2 className="mt-3 text-4xl font-bold tracking-[-.05em]">
        Your money, with more clarity.
      </h2>
      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map(([t, d, Icon]) => (
          <div
            key={t}
            className="group relative rounded-2xl border border-[#e7eeeb] bg-white p-6 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:shadow-lg hover:shadow-emerald-950/5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
              <Icon size={20} />
            </div>
            <h3 className="mt-6 font-bold text-[#102a27]">{t}</h3>
            <p className="mt-2 text-sm leading-6 text-[#71817b]">{d}</p>
            <ArrowUpRight
              className="mt-7 text-[#139b70] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              size={18}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
