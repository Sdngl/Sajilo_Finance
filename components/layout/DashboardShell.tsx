"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  ActivityItem,
  subscribeUserActivities,
  logUserActivity,
} from "@/lib/services/activityService";
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
  Lock,
  ArrowLeft,
  UserCheck,
  Briefcase,
  Check,
} from "lucide-react";

// Default activity logs for initial display
const DEFAULT_ACTIVITIES: ActivityItem[] = [
  {
    id: "def-1",
    title: "Account Login",
    message: "Logged into NepalFi workspace successfully.",
    type: "info",
    timestamp: "Just now",
  },
  {
    id: "def-2",
    title: "Security Verified",
    message: "Two-factor fraud protection check passed.",
    type: "success",
    timestamp: "12m ago",
  },
  {
    id: "def-3",
    title: "Savings Goal Updated",
    message: "Added Rs. 2,500 to Emergency Fund goal.",
    type: "info",
    timestamp: "1h ago",
  },
  {
    id: "def-4",
    title: "Payment Processed",
    message: "Khalti transfer of Rs. 1,250 completed.",
    type: "success",
    timestamp: "Today, 10:32 AM",
  },
];

const allNavItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, requiresBusiness: false },
  { label: "Manage Accounts", href: "/dashboard/accounts", icon: Landmark, requiresBusiness: false },
  { label: "Savings", href: "/dashboard/savings", icon: WalletCards, requiresBusiness: false },
  { label: "Business", href: "/dashboard/business", icon: Building2, requiresBusiness: true },
  { label: "Financial Literacy", href: "/dashboard/literacy", icon: BookOpen, requiresBusiness: false },
  { label: "Fraud Protection", href: "/dashboard/fraud", icon: ShieldCheck, requiresBusiness: false },
  { label: "What-if Simulator", href: "/dashboard/simulator", icon: Calculator, requiresBusiness: false },
];

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  // Auth & Profile State
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [userData, setUserData] = useState<{
    fullName: string;
    email: string;
    accountType: string;
    uid: string;
  }>({
    fullName: "User",
    email: "",
    accountType: "Personal account",
    uid: "",
  });
  const [loadingUser, setLoadingUser] = useState(true);

  // Activities State
  const [activities, setActivities] = useState<ActivityItem[]>(DEFAULT_ACTIVITIES);
  const [unreadCount, setUnreadCount] = useState(DEFAULT_ACTIVITIES.length);
  const [isSwitchingRole, setIsSwitchingRole] = useState(false);

  // 1. Listen to Auth State and fetch Firestore User profile
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        try {
          const userRef = doc(db, "users", user.uid);
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data();
            setUserData({
              fullName: data.fullName || user.displayName || "User",
              email: data.email || user.email || "",
              accountType: data.accountType || "Personal account",
              uid: user.uid,
            });
          } else {
            setUserData({
              fullName: user.displayName || "User",
              email: user.email || "",
              accountType: "Personal account",
              uid: user.uid,
            });
          }
        } catch (err) {
          console.error("Error fetching user document:", err);
        }
      } else {
        setCurrentUser(null);
        // ROUTE PROTECTION: Redirect unauthenticated user to /login
        router.replace("/login");
      }
      setLoadingUser(false);
    });

    return () => unsubscribeAuth();
  }, [router]);

  // 2. Subscribe to real-time user activities
  useEffect(() => {
    if (!userData.uid) return;

    const unsubActivities = subscribeUserActivities(userData.uid, (fetched) => {
      if (fetched.length > 0) {
        setActivities(fetched);
        setUnreadCount(fetched.length);
      } else {
        setActivities(DEFAULT_ACTIVITIES);
      }
    });

    return () => unsubActivities();
  }, [userData.uid]);

  // Handle Account Type switch dynamically
  const handleSwitchAccountType = async (newType: string) => {
    if (!userData.uid || isSwitchingRole) return;
    setIsSwitchingRole(true);
    try {
      const userRef = doc(db, "users", userData.uid);
      await updateDoc(userRef, {
        accountType: newType,
      });

      setUserData((prev) => ({
        ...prev,
        accountType: newType,
      }));

      await logUserActivity(
        userData.uid,
        "Account Type Updated",
        `Switched account type to ${newType}.`,
        "info"
      );

      setProfileOpen(false);
    } catch (err) {
      console.error("Failed to switch account type:", err);
    } finally {
      setIsSwitchingRole(false);
    }
  };

  // Sign out handler
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };
  // Loading indicator while verifying authentication state
  if (loadingUser) {
    return (
      <div className="grid min-h-screen place-items-center bg-[#f8faf9]">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#139b70] border-t-transparent" />
          <p className="text-xs font-bold uppercase tracking-wider text-[#102a27]">
            Verifying workspace session...
          </p>
        </div>
      </div>
    );
  }

  // Route protection: Block rendering dashboard if not logged in
  if (!currentUser) {
    return null;
  }

  // Get User Initials
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // Determine visible menu items based on accountType
  const isBusinessAccount = userData.accountType === "Business account";
  const visibleNavItems = allNavItems.filter((item) => {
    if (item.requiresBusiness && !isBusinessAccount) {
      return false;
    }
    return true;
  });

  // Check if current route is business dashboard
  const isBusinessRoute = path.startsWith("/dashboard/business");

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[250px] bg-[#102a27] text-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* LOGO */}
        <div className="flex h-20 items-center justify-between px-7">
          <Link href="/" className="text-xl font-bold tracking-tight">
            nepal<span className="text-emerald-400">fi</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-[#809b92] hover:bg-[#163d38] hover:text-white lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* NAV ITEMS */}
        <div className="px-4">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#809b92]">
            Workspace
          </p>

          {visibleNavItems.map(({ label, href, icon: Icon }) => {
            const isActive =
              path === href || (href !== "/dashboard" && path.startsWith(href));

            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#1b574d] text-white shadow-lg shadow-emerald-900/20"
                    : "text-[#aec0bb] hover:bg-[#163d38] hover:text-white hover:translate-x-1"
                }`}
              >
                <Icon size={17} />
                <span>{label}</span>
                {href === "/dashboard/business" && (
                  <span className="ml-auto rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                    Pro
                  </span>
                )}
              </Link>
            );
          })}

          <div className="my-6 h-px bg-[#285049]" />

          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-[#809b92]">
            Support
          </p>
          <Link
            href="/dashboard/settings"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-[#aec0bb] transition-all duration-200 hover:bg-[#163d38] hover:text-white hover:translate-x-1"
          >
            <Settings size={17} />
            Settings
          </Link>
          <Link
            href="/dashboard/help"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-[13px] text-[#aec0bb] transition-all duration-200 hover:bg-[#163d38] hover:text-white hover:translate-x-1"
          >
            <HelpCircle size={17} />
            Help center
          </Link>
        </div>

        {/* BOTTOM USER WIDGET */}
        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-[#32665c] bg-[#173d37] p-3 shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-emerald-400 text-xs font-bold text-[#102a27]">
              {getInitials(userData.fullName)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-semibold text-white">
                {userData.fullName}
              </p>
              <span
                className={`inline-block truncate text-[10px] font-medium ${
                  isBusinessAccount ? "text-amber-300 font-semibold" : "text-[#9eb8b0]"
                }`}
              >
                {userData.accountType}
              </span>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <main className="lg:pl-[250px]">
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#e7eeeb] bg-[#f8faf9]/90 px-5 backdrop-blur md:px-10">
          <button
            onClick={() => setOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <Menu size={20} />
          </button>

          {/* SEARCH BAR */}
          <div className="relative hidden w-72 md:block">
            <Search
              className="absolute left-3 top-2.5 text-[#9aa9a4]"
              size={17}
            />
            <input
              placeholder="Search features, tools..."
              className="w-full rounded-xl border-0 bg-white py-2.5 pl-10 pr-4 text-sm outline-none ring-1 ring-[#e7eeeb] transition focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex items-center gap-4">
            {/* NOTIFICATION BELL BUTTON */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className="relative rounded-xl border border-transparent p-2 text.gray-600 transition-all duration-200 hover:bg-white hover:text-[#139b70] hover:shadow-sm"
                title="Notifications"
              >
                <Bell size={20} className="text-[#51635d]" />
                {unreadCount > 0 && (
                  <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white ring-2 ring-[#f8faf9]">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* NOTIFICATIONS POPOVER */}
              {notificationsOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-2xl border border-[#e7eeeb] bg-white shadow-2xl transition-all animate-in fade-in zoom-in-95">
                  <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3.5">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-[#139b70]" />
                      <h3 className="text-sm font-bold text-[#102a27]">
                        Activity Notifications
                      </h3>
                    </div>
                    {unreadCount > 0 && (
                      <button
                        onClick={() => setUnreadCount(0)}
                        className="text-xs font-semibold text-[#139b70] hover:underline"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 p-1">
                    {activities.length === 0 ? (
                      <div className="py-8 text-center text-xs text-gray-400">
                        No recent activity recorded
                      </div>
                    ) : (
                      activities.map((act) => (
                        <div
                          key={act.id}
                          className="flex items-start gap-3 p-3 transition hover:bg-[#f8faf9] rounded-xl"
                        >
                          <div className="mt-0.5 shrink-0">
                            {act.type === "success" && (
                              <CheckCircle2 size={16} className="text-emerald-500" />
                            )}
                            {act.type === "warning" && (
                              <AlertCircle size={16} className="text-amber-500" />
                            )}
                            {act.type === "error" && (
                              <AlertCircle size={16} className="text-red-500" />
                            )}
                            {act.type === "info" && (
                              <Info size={16} className="text-blue-500" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <p className="text-xs font-semibold text-gray-800 truncate">
                                {act.title}
                              </p>
                              <span className="flex items-center gap-1 text-[10px] font-medium text-gray-400 shrink-0">
                                <Clock size={10} />
                                {act.timestamp}
                              </span>
                            </div>
                            <p className="mt-0.5 text-xs text-gray-500 leading-snug">
                              {act.message}
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="border-t border-gray-100 bg-[#f9fbfb] p-2.5 text-center">
                    <p className="text-[11px] text-gray-400">
                      Tracking real-time user actions & activity logs
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* PROFILE MENU DROPDOWN */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-white px-3 py-1.5 shadow-sm transition hover:border-gray-200"
              >
                <div className="grid h-8 w-8 place-items-center rounded-full bg-[#d5eee5] text-xs font-bold text-[#138862]">
                  {getInitials(userData.fullName)}
                </div>
                <div className="hidden text-left sm:block">
                  <p className="text-xs font-bold text-[#102a27]">
                    {userData.fullName}
                  </p>
                  <p className="text-[10px] text-[#71817b]">
                    {userData.accountType}
                  </p>
                </div>
                <ChevronDown size={14} className="text-[#71817b]" />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-12 z-50 w-60 rounded-2xl border border-[#e7eeeb] bg-white p-2 shadow-2xl animate-in fade-in zoom-in-95">
                  <div className="border-b border-gray-100 px-3 py-2.5">
                    <p className="text-xs font-bold text-gray-900">
                      {userData.fullName}
                    </p>
                    <p className="text-[11px] text-gray-500 truncate">
                      {userData.email || currentUser?.email}
                    </p>
                    <div className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      {isBusinessAccount ? (
                        <Briefcase size={10} />
                      ) : (
                        <UserCheck size={10} />
                      )}
                      {userData.accountType}
                    </div>
                  </div>

                  {/* ACCOUNT SWITCHING TOGGLE */}
                  <div className="my-1 px-1 py-1">
                    <p className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Account Type
                    </p>
                    <button
                      onClick={() =>
                        handleSwitchAccountType(
                          isBusinessAccount ? "Personal account" : "Business account"
                        )
                      }
                      disabled={isSwitchingRole}
                      className="flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs text-gray-700 transition hover:bg-gray-50"
                    >
                      <span className="flex items-center gap-2">
                        {isBusinessAccount ? (
                          <UserCheck size={14} className="text-emerald-600" />
                        ) : (
                          <Briefcase size={14} className="text-amber-600" />
                        )}
                        Switch to {isBusinessAccount ? "Personal" : "Business"}
                      </span>
                      {isSwitchingRole && (
                        <span className="text-[10px] text-gray-400">Updating...</span>
                      )}
                    </button>
                  </div>

                  <div className="my-1 h-px bg-gray-100" />

                  {/* SIGN OUT BUTTON */}
                  <button
                    onClick={handleSignOut}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={14} />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <div className="mx-auto max-w-[1440px] p-5 md:p-10">
          {/* RESTRICT BUSINESS ROUTE IF PERSONAL ACCOUNT */}
          {isBusinessRoute && !isBusinessAccount ? (
            <div className="mx-auto max-w-xl rounded-3xl border border-amber-200 bg-white p-8 text-center shadow-xl">
              <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-amber-50 text-amber-600">
                <Lock size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Business Page Restricted
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                Your account is currently set up as a <strong>Personal account</strong>. 
                Business features, SME products, inventory, and reports are reserved for 
                <strong> Business accounts</strong>.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/dashboard"
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-gray-200 px-5 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  <ArrowLeft size={14} />
                  Return to Dashboard
                </Link>

                <button
                  onClick={() => handleSwitchAccountType("Business account")}
                  disabled={isSwitchingRole}
                  className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#139b70] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-[#108560] transition"
                >
                  <Briefcase size={14} />
                  {isSwitchingRole ? "Updating Account..." : "Switch to Business Account"}
                </button>
              </div>
            </div>
          ) : (
            children
          )}
        </div>
      </main>
    </div>
  );
}
