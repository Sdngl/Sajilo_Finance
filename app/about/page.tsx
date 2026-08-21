import Link from "next/link";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import {
  Target,
  ShieldCheck,
  TrendingUp,
  Users,
  Sparkles,
  HeartHandshake,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata = {
  title: "About NepalFi — Sajilo Finance for Nepal",
  description:
    "Learn how NepalFi is building simpler, safer, and smarter financial tools for individuals and small businesses in Nepal.",
};

const pillars = [
  {
    icon: Target,
    title: "Financial Inclusion",
    description:
      "Bringing modern financial tools to small shop owners, freelancers, and families across urban and rural Nepal.",
  },
  {
    icon: ShieldCheck,
    title: "Fraud Prevention & Trust",
    description:
      "Protecting users against digital scams, fake payment receipts, and unauthorized transactions through active education.",
  },
  {
    icon: TrendingUp,
    title: "SME Growth",
    description:
      "Replacing paper ledgers with clear digital tracking for sales, operating expenses, and customer credit.",
  },
  {
    icon: HeartHandshake,
    title: "Practical Literacy",
    description:
      "Interactive micro-lessons and simulators designed for real Nepali financial situations—from budgeting to micro-savings.",
  },
];

const stats = [
  { label: "Small Businesses Empowered", value: "10,000+" },
  { label: "Literacy Quiz Completion Rate", value: "94%" },
  { label: "Digital Scams Prevented", value: "50,000+" },
  { label: "Average Time Saved Daily", value: "45 mins" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f8faf9] text-[#102a27]">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-block rounded-full bg-[#e4f6ed] px-3.5 py-1 text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
            Our Story & Purpose
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-[-.05em] text-[#102a27] md:text-6xl">
            Smarter, safer money management for everyday Nepal.
          </h1>
          <p className="mt-6 text-lg leading-8 text-[#71817b]">
            NepalFi (Sajilo Finance) was created to make digital finance calm, accessible, 
            and transparent. Whether you are running a local tea shop in Pokhara or managing 
            your first monthly salary in Kathmandu, we build tools tailored for real life in Nepal.
          </p>
        </div>
      </section>

      {/* Impact Stats Banner */}
      <section className="border-y border-[#e7eeeb] bg-white py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-[#139b70] md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-[#71817b]">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Vision */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
              Why NepalFi Exists
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              From paper registers to calm digital clarity.
            </h2>
            <p className="mt-5 text-base leading-7 text-[#71817b]">
              Nepal is rapidly moving toward digital payments with QR codes and mobile banking. 
              However, most small business owners still track customer credit on paper note pads, 
              and many users struggle with financial literacy and digital scam risks.
            </p>
            <p className="mt-4 text-base leading-7 text-[#71817b]">
              We bridge this gap with an all-in-one companion that combines digital payment logs, 
              SME management, fraud alerts, and practical goal-based savings.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Designed specifically for Nepali currency & business habits",
                "Works seamlessly across smartphones and web browsers",
                "Includes localized educational quizzes and budget simulators",
              ].map((item) => (
                <div className="flex items-center gap-3" key={item}>
                  <div className="grid h-6 w-6 place-items-center rounded-full bg-[#e4f6ed] text-[#139b70]">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-sm font-semibold text-[#102a27]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-[#e7eeeb] bg-white p-8 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#e4f6ed] text-[#139b70]">
                <Sparkles size={24} />
              </div>
              <div>
                <h3 className="font-bold text-[#102a27]">NepalFi Core Promise</h3>
                <p className="text-xs text-[#71817b]">Built for Nepal, by Nepal</p>
              </div>
            </div>
            <blockquote className="mt-6 border-l-2 border-[#139b70] pl-4 italic text-[#71817b]">
              &ldquo;Finance should never feel intimidating or overly technical. 
              Our mission is to give every household and business in Nepal complete control over their money with total peace of mind.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Four Pillars */}
      <section className="bg-[#f1f6f4] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#139b70]">
              Our Foundation
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
              The four pillars behind NepalFi
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-[#e7eeeb] bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
                    <Icon size={20} />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-[#102a27]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#71817b]">
                    {p.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-full py-20">
        <div className="bg-[#102a27] p-8 text-white md:p-14">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              Ready to simplify your finances?
            </h2>
            <p className="mt-4 text-base leading-7 text-[#b1c7c0]">
              Join thousands of Nepalis making smarter decisions with NepalFi today.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-[#139b70] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#0f825e]"
              >
                Get started for free <ArrowRight size={16} />
              </Link>
              <Link
                href="/learn"
                className="inline-flex items-center gap-2 rounded-xl border border-[#2d4945] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#1a3a36]"
              >
                Explore Learning Hub
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
