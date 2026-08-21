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
  ],
  ["Micro-Savings", "Turn small habits into a safety net.", Sparkles],
  ["SME Management", "Simple tools to run your business.", Building2],
  ["Fraud Protection", "Spot suspicious requests early.", ShieldCheck],
  ["Financial Literacy", "Build confidence with practical lessons.", BookOpen],
  ["What-if Simulator", "See how small changes shape your future.", Calculator],
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
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(([t, d, Icon]) => (
          <div
            className="group rounded-2xl border border-[#e7eeeb] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
            key={t}
          >
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
              <Icon size={20} />
            </div>
            <h3 className="mt-6 font-bold">{t}</h3>
            <p className="mt-2 text-sm leading-6 text-[#71817b]">{d}</p>
            <ArrowUpRight className="mt-7 text-[#139b70]" size={18} />
          </div>
        ))}
      </div>
    </section>
  );
}
