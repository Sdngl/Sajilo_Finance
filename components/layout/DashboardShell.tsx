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
              className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium ${path === href || (href != "/dashboard" && path.startsWith(href)) ? "bg-[#1b574d] text-white" : "text-[#aec0bb] hover:bg-[#163d38] hover:text-white"}`}
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
            href="#"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-[#aec0bb]"
          >
            <Settings size={17} />
            Settings
          </Link>
          <Link
            href="#"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-[#aec0bb]"
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
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative text-[#71817b] hover:text-[#138862] transition-colors"
              >
                <Bell size={19} />
                <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-orange-400 ring-2 ring-[#f8faf9]" />
              </button>
              
              {notificationsOpen && (
                <div className="absolute right-0 top-12 w-80 md:w-96 rounded-2xl border border-[#e7eeeb] bg-white shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
                  <div className="flex items-center justify-between border-b border-[#e7eeeb] bg-[#f8faf9] px-4 py-3">
                    <h3 className="font-semibold text-[#102a27]">Notifications</h3>
                    <div className="flex gap-2">
                      <button className="text-xs font-medium text-[#138862] hover:text-[#0f6b4d]">Mark all read</button>
                    </div>
                  </div>
                  <div className="max-h-[400px] overflow-y-auto">
                    {/* Activity 1 */}
                    <div className="flex gap-3 border-b border-[#f1f5f3] p-4 bg-[#f4fbf8] hover:bg-[#ebf7f3] transition-colors cursor-pointer">
                      <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle2 size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#102a27]">Deposit Successful</p>
                        <p className="text-xs text-[#71817b] mt-0.5">Your deposit of $500.00 has been confirmed.</p>
                        <p className="text-[10px] text-[#9aa9a4] mt-1 flex items-center gap-1"><Clock size={10} /> 2 mins ago</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2"></div>
                    </div>
                    
                    {/* Activity 2 */}
                    <div className="flex gap-3 border-b border-[#f1f5f3] p-4 bg-[#f4fbf8] hover:bg-[#ebf7f3] transition-colors cursor-pointer">
                      <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-orange-100 text-orange-600">
                        <AlertCircle size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#102a27]">Security Alert</p>
                        <p className="text-xs text-[#71817b] mt-0.5">Unrecognized login from a new device.</p>
                        <p className="text-[10px] text-[#9aa9a4] mt-1 flex items-center gap-1"><Clock size={10} /> 1 hour ago</p>
                      </div>
                      <div className="h-2 w-2 rounded-full bg-orange-500 mt-2"></div>
                    </div>

                    {/* Activity 3 */}
                    <div className="flex gap-3 p-4 hover:bg-[#f8faf9] transition-colors cursor-pointer">
                      <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-100 text-blue-600">
                        <Info size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#102a27]">System Update</p>
                        <p className="text-xs text-[#71817b] mt-0.5">We've added new features to the What-if Simulator.</p>
                        <p className="text-[10px] text-[#9aa9a4] mt-1 flex items-center gap-1"><Clock size={10} /> 1 day ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-[#e7eeeb] p-2 text-center bg-[#f8faf9]">
                    <button className="text-xs font-medium text-[#71817b] hover:text-[#102a27]">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setProfile(!profile)}
                className="flex items-center gap-2"
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
                  <button className="flex w-full gap-2 rounded-lg px-3 py-2 text-left text-xs text-red-500 hover:bg-red-50">
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
