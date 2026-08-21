"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  HelpCircle,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  WalletCards,
  BookOpen,
  Calculator,
  Building2,
  X,
  LogOut,
  Landmark,
  CheckCircle2,
  AlertCircle,
  Info,
  Clock,
} from "lucide-react";
const items = [
  ["Overview", "/dashboard", LayoutDashboard],
  ["Manage Accounts", "/dashboard/accounts", Landmark],
  ["Savings", "/dashboard/savings", WalletCards],
  ["Business", "/dashboard/business", Building2],
  ["Financial Literacy", "/dashboard/literacy", BookOpen],
  ["Fraud Protection", "/dashboard/fraud", ShieldCheck],
  ["What-if Simulator", "/dashboard/simulator", Calculator],
] as const;
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[250px] bg-[#102a27] text-white transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-20 items-center justify-between px-7">
          <Link href="/" className="text-xl font-bold tracking-tight">
            nepal<span className="text-emerald-400">fi</span>
          </Link>
          <button onClick={() => setOpen(false)} className="lg:hidden">
            <X size={20} />
          </button>
        </div>
        <div className="px-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#809b92]">
            Workspace
          </p>
          {items.map(([label, href, Icon]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition-all duration-200 ${path === href || (href != "/dashboard" && path.startsWith(href)) ? "bg-[#1b574d] text-white shadow-lg shadow-emerald-900/20" : "text-[#aec0bb] hover:bg-[#163d38] hover:text-white hover:translate-x-1"}`}
            >
              <Icon size={17} />
              {label}
            </Link>
          ))}
          <div className="my-6 h-px bg-[#285049]" />
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#809b92]">
            Support
          </p>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-[#aec0bb] transition-all duration-200 hover:bg-[#163d38] hover:text-white hover:translate-x-1"
          >
            <Settings size={17} />
            Settings
          </Link>
          <Link
            href="/dashboard/help"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-[#aec0bb] transition-all duration-200 hover:bg-[#163d38] hover:text-white hover:translate-x-1"
          >
            <HelpCircle size={17} />
            Help center
          </Link>
        </div>
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[#32665c] bg-[#173d37] p-3">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400 text-xs font-bold text-[#102a27]">
              NS
            </div>
            <div>
              <p className="text-xs font-semibold">Navin Shrestha</p>
              <p className="text-[10px] text-[#9eb8b0]">Personal account</p>
            </div>
            <ChevronDown size={14} className="ml-auto text-[#9eb8b0]" />
          </div>
        </div>
      </aside>
      <main className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#e7eeeb] bg-[#f8faf9]/90 px-5 backdrop-blur md:px-10">
          <button onClick={() => setOpen(true)} className="lg:hidden">
            <Menu />
          </button>
          <div className="relative hidden w-72 md:block">
            <Search
              className="absolute left-3 top-2.5 text-[#9aa9a4]"
              size={17}
            />
            <input
              placeholder="Search anything..."
              className="w-full rounded-xl border-0 bg-white py-2.5 pl-10 text-sm outline-none ring-1 ring-[#e7eeeb] focus:ring-2 focus:ring-emerald-300"
            />
          </div>
          <div className="flex items-center gap-5">
            <button className="relative text-[#71817b] transition-all duration-200 hover:text-[#139b70] hover:scale-110">
              <Bell size={19} />
              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-400 ring-2 ring-[#f8faf9]" />
            </button>
            <div className="relative">
              <button
                onClick={() => setProfile(!profile)}
                className="flex items-center gap-2 transition-all duration-200 hover:scale-105"
              >
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#d5eee5] text-xs font-bold text-[#138862]">
                  NS
                </div>
                <ChevronDown size={15} className="text-[#71817b]" />
              </button>
              {profile && (
                <div className="absolute right-0 top-12 w-44 rounded-xl border border-[#e7eeeb] bg-white p-2 shadow-xl">
                  <p className="px-3 py-2 text-xs font-semibold">
                    Navin Shrestha
                  </p>
                  <button onClick={() => window.location.href = "/login"} className="flex w-full gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50">
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <div className="mx-auto max-w-[1440px] p-5 md:p-10">{children}</div>
      </main>
    </div>
  );
}
