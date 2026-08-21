import Link from "next/link";
import { ArrowRight } from "lucide-react";
export default function CallToAction() {
  return (
    <section id="about" className="bg-[#102a27] px-6 py-20 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.2em] text-emerald-300">
            A better financial future
          </p>
          <h2 className="mt-3 text-4xl font-bold">
            Take control of your money.
          </h2>
          <p className="mt-4 max-w-lg leading-7 text-[#a8c0b8]">
            Tools, knowledge and confidence for your next money decision.
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
  );
}
