import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Building2,
  Check,
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
  [
    "Micro-Savings",
    "Turn small, consistent habits into a safety net.",
    Sparkles,
  ],
  ["SME Management", "Simple tools to run your business every day.", Building2],
  [
    "Fraud Protection",
    "Spot suspicious requests before money leaves.",
    ShieldCheck,
  ],
  ["Financial Literacy", "Build confidence with practical lessons.", BookOpen],
  [
    "What-if Simulator",
    "See how small changes shape your future.",
    ArrowUpRight,
  ],
] as const;
export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f8faf9]">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-[#102a27]"
        >
          nepal<span className="text-[#139b70]">fi</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-[#71817b] md:flex">
          <a href="#features">Features</a>
          <a href="#smes">For SMEs</a>
          <a href="#learn">Financial Literacy</a>
          <a href="#about">About</a>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden px-3 py-2 text-sm font-semibold md:block"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="rounded-xl bg-[#139b70] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-900/10"
          >
            Get started
          </Link>
        </div>
      </nav>
      <section className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-12 lg:grid-cols-[.9fr_1.1fr] lg:pt-24">
        <div className="absolute -left-32 top-10 -z-0 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
        <div className="relative z-10">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white px-3 py-1.5 text-xs font-semibold text-[#139b70]">
            <span className="h-2 w-2 rounded-full bg-[#139b70]" /> Built for a
            digital Nepal
          </div>
          <h1 className="max-w-xl text-5xl font-bold leading-[1.04] tracking-[-.06em] text-[#102a27] md:text-7xl">
            Smarter money management for a{" "}
            <span className="text-[#139b70]">digital Nepal.</span>
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-[#71817b]">
            One calm, clear place to pay, save, run your business, learn about
            money, and stay protected from fraud.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              href="/register"
              className="flex items-center gap-2 rounded-xl bg-[#139b70] px-5 py-3.5 text-sm font-semibold text-white shadow-xl shadow-emerald-900/15"
            >
              Get started <ArrowRight size={16} />
            </Link>
            <a
              href="#features"
              className="rounded-xl border border-[#d8e5df] bg-white px-5 py-3.5 text-sm font-semibold"
            >
              Explore features
            </a>
          </div>
          <div className="mt-9 flex items-center gap-3 text-xs text-[#71817b]">
            <div className="flex -space-x-2">
              <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f8faf9] bg-orange-200">
                AS
              </div>
              <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f8faf9] bg-blue-200">
                RM
              </div>
              <div className="grid h-7 w-7 place-items-center rounded-full border-2 border-[#f8faf9] bg-emerald-200">
                PK
              </div>
            </div>{" "}
            Trusted by 10,000+ demo users
          </div>
        </div>
        <div className="relative rounded-[28px] bg-[#102a27] p-4 shadow-2xl shadow-[#102a27]/20 md:p-6">
          <div className="rounded-2xl bg-[#f7faf8] p-5 md:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-[#71817b]">Good morning, Navin</p>
                <p className="mt-1 text-lg font-bold">
                  Your financial overview
                </p>
              </div>
              <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d5eee5] text-xs font-bold text-[#139b70]">
                NS
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-[#dff5e9] p-5">
              <p className="text-xs text-[#4a7568]">Total balance</p>
              <p className="mt-1 text-3xl font-bold text-[#102a27]">
                Rs. 84,250.00
              </p>
              <div className="mt-4 flex justify-between text-xs">
                <span className="text-[#139b70]">+12.8% this month</span>
                <span className="text-[#71817b]">•••• 4829</span>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[#e7eeeb] bg-white p-4">
                <p className="text-[11px] text-[#71817b]">Monthly income</p>
                <p className="mt-2 font-bold">Rs. 48,000</p>
                <div className="mt-3 h-1.5 rounded bg-emerald-100">
                  <div className="h-full w-3/4 rounded bg-[#139b70]" />
                </div>
              </div>
              <div className="rounded-xl border border-[#e7eeeb] bg-white p-4">
                <p className="text-[11px] text-[#71817b]">Financial health</p>
                <p className="mt-2 font-bold">
                  78 <span className="text-xs text-[#139b70]">/ 100</span>
                </p>
                <div className="mt-3 h-1.5 rounded bg-emerald-100">
                  <div className="h-full w-[78%] rounded bg-[#f2b84b]" />
                </div>
              </div>
            </div>
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm font-bold">Recent activity</p>
              <p className="text-xs font-semibold text-[#139b70]">View all</p>
            </div>
            {["Salary credit", "Khalti payment", "Daraz purchase"].map(
              (x, i) => (
                <div
                  className="flex items-center justify-between border-b border-[#eef3f0] py-3 last:border-0"
                  key={x}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`grid h-8 w-8 place-items-center rounded-lg ${i === 0 ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"}`}
                    >
                      <WalletCards size={15} />
                    </div>
                    <p className="text-xs font-semibold">{x}</p>
                  </div>
                  <p className="text-xs font-bold">
                    {i === 0 ? "+ Rs. 48,000" : "- Rs. 1,250"}
                  </p>
                </div>
              ),
            )}
          </div>
        </div>
      </section>
      <section className="border-y border-[#e7eeeb] bg-white py-7">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
          <div>
            <p className="text-2xl font-bold">
              10K<span className="text-[#139b70]">+</span>
            </p>
            <p className="mt-1 text-xs text-[#71817b]">Demo users</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              2.5M<span className="text-[#139b70]">+</span>
            </p>
            <p className="mt-1 text-xs text-[#71817b]">Transactions tracked</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              8K<span className="text-[#139b70]">+</span>
            </p>
            <p className="mt-1 text-xs text-[#71817b]">Savings goals</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              1.2K<span className="text-[#139b70]">+</span>
            </p>
            <p className="mt-1 text-xs text-[#71817b]">SMEs supported</p>
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
            Everything in one place
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-[-.05em]">
            Your money, with more clarity.
          </h2>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map(([title, desc, Icon]) => (
            <div
              className="group rounded-2xl border border-[#e7eeeb] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-900/5"
              key={title}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
                <Icon size={20} />
              </div>
              <h3 className="mt-6 font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[#71817b]">{desc}</p>
              <ArrowUpRight
                className="mt-7 text-[#b5c6c0] transition group-hover:text-[#139b70]"
                size={18}
              />
            </div>
          ))}
        </div>
      </section>
      <section id="about" className="bg-[#102a27] px-6 py-20 text-white">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">
              A better financial future
            </p>
            <h2 className="mt-3 max-w-xl text-4xl font-bold tracking-[-.05em]">
              Take control of your money.
            </h2>
            <p className="mt-4 max-w-lg leading-7 text-[#a8c0b8]">
              NepalFi brings the tools, knowledge and confidence to make your
              next money decision a little better.
            </p>
          </div>
          <Link
            href="/register"
            className="flex items-center gap-2 rounded-xl bg-emerald-400 px-5 py-3.5 text-sm font-bold text-[#102a27]"
          >
            Create free account <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 text-xs text-[#71817b] md:flex-row">
        <p>© 2026 NepalFi. Demo product for a digital Nepal.</p>
        <div className="flex gap-6">
          <a href="#features">Features</a>
          <a href="#smes">For SMEs</a>
          <a href="#learn">Learn</a>
          <a href="#">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
