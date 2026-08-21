import Link from "next/link";
import Navbar from "../../components/landing/Navbar";
import {
  ArrowRight,
  BarChart3,
  Boxes,
  Users,
  Receipt,
  Check,
} from "lucide-react";
export default function Smes() {
  return (
    <main className="min-h-screen bg-[#f8faf9]">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
          For Nepal&apos;s small businesses
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-[-.06em] text-[#102a27] md:text-7xl">
          Run your business with more confidence.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#71817b]">
          NepalFi gives growing shops, cafés and service businesses a clear view
          of sales, expenses, inventory and customer credit in one calm
          workspace.
        </p>
        <Link
          href="/register"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#139b70] px-5 py-3.5 text-sm font-bold text-white"
        >
          Set up your business <ArrowRight size={16} />
        </Link>
        <div className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            [BarChart3, "Sales tracking", "See daily and monthly revenue."],
            [Receipt, "Expenses", "Keep operating costs organized."],
            [Boxes, "Inventory", "Know what is low or out of stock."],
            [Users, "Customer credit", "Track balances with confidence."],
          ].map(([Icon, title, desc]) => (
            <div
              className="rounded-2xl border border-[#e7eeeb] bg-white p-5"
              key={title as string}
            >
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
                <Icon size={19} />
              </div>
              <h3 className="mt-5 font-bold">{title as string}</h3>
              <p className="mt-2 text-sm leading-6 text-[#71817b]">
                {desc as string}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-16 rounded-[28px] bg-[#102a27] p-6 text-white md:p-10">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">
                A clearer day at work
              </p>
              <h2 className="mt-3 text-3xl font-bold">
                Less guessing. More doing.
              </h2>
              <div className="mt-7 space-y-4 text-sm text-[#b1c7c0]">
                {[
                  "Know your real profit after expenses",
                  "Keep customer balances visible",
                  "Make stock decisions before it runs out",
                ].map((x) => (
                  <p key={x}>
                    <Check className="mr-2 inline text-emerald-300" size={16} />
                    {x}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#f7faf8] p-5 text-[#102a27]">
              <p className="text-xs text-[#71817b]">Himalayan Coffee House</p>
              <p className="mt-2 text-3xl font-bold">Rs. 2.7L</p>
              <p className="mt-1 text-xs text-[#139b70]">
                Net profit this month
              </p>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center text-xs">
                <div className="rounded-xl bg-[#e7f7ef] p-3">
                  <b>Rs. 4.8L</b>
                  <p className="mt-1 text-[#71817b]">Sales</p>
                </div>
                <div className="rounded-xl bg-[#fff4df] p-3">
                  <b>Rs. 2.1L</b>
                  <p className="mt-1 text-[#71817b]">Expenses</p>
                </div>
                <div className="rounded-xl bg-[#edf0ff] p-3">
                  <b>42</b>
                  <p className="mt-1 text-[#71817b]">Customers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
