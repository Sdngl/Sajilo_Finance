import Link from "next/link";
export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-7xl flex-col justify-between gap-4 px-6 py-8 text-xs text-[#71817b] md:flex-row">
      <p>© 2026 NepalFi. Demo product for a digital Nepal.</p>
      <div className="flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/smes">For SMEs</Link>
        <Link href="/learn">Learn</Link>
        <Link href="/about">About</Link>
        <Link href="/#features">Features</Link>
      </div>
    </footer>
  );
}

