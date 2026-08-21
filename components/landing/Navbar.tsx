import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="text-xl font-bold">
        nepal<span className="text-[#139b70]">fi</span>
      </Link>
      <div className="hidden items-center gap-8 text-sm text-[#71817b] md:flex">
        <a href="#features">Features</a>
        <Link href="/smes">For SMEs</Link>
        <Link href="/learn">Financial Literacy</Link>
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
          className="rounded-xl bg-[#139b70] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}
