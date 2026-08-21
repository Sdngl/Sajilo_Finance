import Link from "next/link";
import { ArrowRight, WalletCards } from "lucide-react";
export default function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-16 px-6 pb-24 pt-12 lg:grid-cols-[.9fr_1.1fr] lg:pt-24">
      <div>
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
            className="flex items-center gap-2 rounded-xl bg-[#139b70] px-5 py-3.5 text-sm font-semibold text-white"
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
      </div>
      <div className="rounded-[28px] bg-[#102a27] p-4 shadow-2xl md:p-6">
        <div className="rounded-2xl bg-[#f7faf8] p-5 md:p-7">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#71817b]">Good morning, Navin</p>
              <p className="mt-1 text-lg font-bold">Your financial overview</p>
            </div>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d5eee5] text-xs font-bold text-[#139b70]">
              NS
            </div>
          </div>
          <div className="mt-6 rounded-2xl bg-[#dff5e9] p-5">
            <p className="text-xs text-[#4a7568]">Total balance</p>
            <p className="mt-1 text-3xl font-bold">Rs. 84,250.00</p>
            <p className="mt-4 text-xs text-[#139b70]">+12.8% this month</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#e7eeeb] bg-white p-4">
              <p className="text-[11px] text-[#71817b]">Monthly income</p>
              <p className="mt-2 font-bold">Rs. 48,000</p>
            </div>
            <div className="rounded-xl border border-[#e7eeeb] bg-white p-4">
              <p className="text-[11px] text-[#71817b]">Financial health</p>
              <p className="mt-2 font-bold">78 / 100</p>
            </div>
          </div>
          <p className="mt-5 text-sm font-bold">Recent activity</p>
          {["Salary credit", "Khalti payment", "Daraz purchase"].map((x, i) => (
            <div
              className="flex items-center justify-between border-b border-[#eef3f0] py-3 last:border-0"
              key={x}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-600">
                  <WalletCards size={15} />
                </div>
                <p className="text-xs font-semibold">{x}</p>
              </div>
              <p className="text-xs font-bold">
                {i === 0 ? "+ Rs. 48,000" : "- Rs. 1,250"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
