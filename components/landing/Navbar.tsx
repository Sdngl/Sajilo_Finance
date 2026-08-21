import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <Link href="/" className="text-xl font-bold">
        nepal<span className="text-[#139b70]">fi</span>
      </Link>
      <div className="hidden items-center gap-8 text-sm text-[#71817b] md:flex">
        <Link href="/" className="transition-colors hover:text-[#102a27]">
          Home
        </Link>
        <Link href="/#features" className="transition-colors hover:text-[#102a27]">
          Features
        </Link>
        <Link href="/smes" className="transition-colors hover:text-[#102a27]">
          For SMEs
        </Link>
        <Link href="/learn" className="transition-colors hover:text-[#102a27]">
          Financial Literacy
        </Link>
        <Link href="/about" className="transition-colors hover:text-[#102a27]">
          About
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="hidden px-3 py-2 text-sm font-semibold transition-colors hover:text-[#139b70] md:block"
        >
          Log in
        </Link>
        <Link
          href="/register"
          className="rounded-xl bg-[#139b70] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0f825e]"
        >
          Get started
        </Link>
      </div>
    </nav>
  );
}


