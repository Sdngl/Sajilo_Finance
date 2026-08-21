import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ShieldCheck,
  WalletCards,
  Calculator,
} from "lucide-react";
const topics = [
  [
    "Digital payments",
    "Pay safely with wallets, QR codes and mobile banking.",
    WalletCards,
  ],
  ["Saving money", "Build an emergency fund and make habits stick.", BookOpen],
  ["Online scams", "Recognize OTP requests and fake screenshots.", ShieldCheck],
  ["Budgeting", "Create a monthly plan that matches real life.", Calculator],
] as const;
export default function Learn() {
  return (
    <main className="min-h-screen bg-[#f8faf9]">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Link href="/" className="text-xl font-bold">
          nepal<span className="text-[#139b70]">fi</span>
        </Link>
        <Link
          href="/dashboard/literacy"
          className="rounded-xl bg-[#139b70] px-4 py-2.5 text-sm font-bold text-white"
        >
          Open learning hub
        </Link>
      </nav>
      <section className="mx-auto max-w-6xl px-6 pb-20 pt-16">
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
          Financial literacy, made practical
        </p>
        <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-[-.06em] text-[#102a27] md:text-7xl">
          Learn money skills you can use today.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#71817b]">
          Short lessons and friendly examples for safer payments, stronger
          savings and smarter budgets.
        </p>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {topics.map(([title, desc, Icon]) => (
            <div
              className="rounded-2xl border border-[#e7eeeb] bg-white p-6"
              key={title}
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
                <Icon size={20} />
              </div>
              <h2 className="mt-6 text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-[#71817b]">{desc}</p>
              <Link
                href="/dashboard/literacy"
                className="mt-6 inline-flex items-center gap-1 text-sm font-bold text-[#139b70]"
              >
                Start learning <ArrowRight size={15} />
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-[#ccebdd] bg-[#e7f7ef] p-6">
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#139b70]">
            Your first lesson
          </p>
          <h2 className="mt-2 text-2xl font-bold text-[#102a27]">
            What should you do if someone asks for your OTP?
          </h2>
          <Link
            href="/dashboard/literacy"
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#102a27] px-4 py-3 text-sm font-bold text-white"
          >
            Take the quiz <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
