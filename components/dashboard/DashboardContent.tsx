"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowRight,
  Plus,
  Search,
  ShieldAlert,
  ShieldCheck,
  Send,
  Target,
  TrendingUp,
  Wallet,
  Landmark,
  CreditCard,
  CheckCircle2,
  ArrowDownLeft,
  ArrowUpRight,
  Calendar,
  Building2,
  Coins,
  Clock,
  ChevronRight,
  Bell,
  Trash2,
  Package,
  Users,
  Receipt,
  Sparkles,
} from "lucide-react";
import {
  Card,
  Badge,
  Button,
  Progress,
  SectionTitle,
  Stat,
} from "../ui/Primitives";

export interface AccountItem {
  id: string;
  type: "Bank Account" | "Digital Wallet" | "Cash" | "Savings Account";
  bankName: string;
  holderName: string;
  accountNumber: string;
  balance: number;
}

export interface ReminderItem {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  type: "Receive" | "Give";
  partyName: string;
}

export interface TransactionItem {
  id: string;
  description: string;
  category: string;
  date: string;
  amount: string;
  numericAmount: number;
  type: "Income" | "Expense";
  accountName: string;
  status: string;
}

export interface SavingGoalItem {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  monthly: string;
  category: string;
}

export interface SmeProductItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: string;
  numericPrice: number;
  status: string;
}

export default function DashboardContent() {
  const path = usePathname();
  const router = useRouter();

  // Dashboard Data State - ALL INITIAL DATA SET TO ZERO (0)
  const [accounts, setAccounts] = useState<AccountItem[]>([]);
  const [reminders, setReminders] = useState<ReminderItem[]>([]);
  const [txList, setTxList] = useState<TransactionItem[]>([]);
  const [savingsGoals, setSavingsGoals] = useState<SavingGoalItem[]>([]);
  const [smeProducts, setSmeProducts] = useState<SmeProductItem[]>([]);
  const [smeSales, setSmeSales] = useState<number>(0);
  const [smeExpenses, setSmeExpenses] = useState<number>(0);
  // Maps local temp IDs to real MongoDB _ids for savings goals
  const [goalIdMap, setGoalIdMap] = useState<Record<string, string>>({});

  // Modals state
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddReminder, setShowAddReminder] = useState(false);

  // Load stored data or fetch from API / LocalStorage on mount
  useEffect(() => {
    fetch("/api/accounts")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setAccounts(
            data.data.map((a: any) => ({
              id: a._id || a.id,
              type: a.type,
              bankName: a.bankName,
              holderName: a.holderName,
              accountNumber: a.accountNumber,
              balance: a.balance || 0,
            }))
          );
        }
      })
      .catch(() => {});

    fetch("/api/transactions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setTxList(
            data.data.map((t: any) => ({
              id: t._id || t.id,
              description: t.description,
              category: t.category,
              date: t.date,
              amount: `${t.type === "Income" ? "+" : "-"} Rs. ${t.amount.toLocaleString()}`,
              numericAmount: t.amount,
              type: t.type,
              accountName: t.accountName,
              status: t.status || "Completed",
            }))
          );
        }
      })
      .catch(() => {});

    fetch("/api/reminders")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setReminders(
            data.data.map((r: any) => ({
              id: r._id || r.id,
              title: r.title,
              amount: r.amount,
              dueDate: r.dueDate,
              type: r.type,
              partyName: r.partyName,
            }))
          );
        }
      })
      .catch(() => {});

    fetch("/api/savings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setSavingsGoals(
            data.data.map((g: any) => ({
              id: g._id || g.id,
              name: g.name,
              target: g.target,
              current: g.current || 0,
              deadline: g.deadline,
              monthly: g.monthly || `Rs. ${Math.ceil(g.target / 12).toLocaleString()}`,
              category: g.category || "Micro-Savings",
            }))
          );
        }
      })
      .catch(() => {});

    fetch("/api/sme/products")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setSmeProducts(
            data.data.map((p: any) => ({
              id: p._id || p.id,
              name: p.name,
              sku: p.sku,
              category: p.category,
              stock: p.stock,
              price: p.price,
              numericPrice: p.numericPrice,
              status: p.status,
            }))
          );
        }
      })
      .catch(() => {});
  }, []);


  // Dynamic Calculated Totals starting strictly at 0
  const totalBalance = useMemo(
    () => accounts.reduce((sum, acc) => sum + acc.balance, 0),
    [accounts]
  );

  const totalIncome = useMemo(
    () =>
      txList
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.numericAmount, 0),
    [txList]
  );

  const totalExpense = useMemo(
    () =>
      txList
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.numericAmount, 0),
    [txList]
  );

  const totalToReceive = useMemo(
    () =>
      reminders
        .filter((r) => r.type === "Receive")
        .reduce((sum, r) => sum + r.amount, 0),
    [reminders]
  );

  const totalToGive = useMemo(
    () =>
      reminders
        .filter((r) => r.type === "Give")
        .reduce((sum, r) => sum + r.amount, 0),
    [reminders]
  );

  // Handlers with MongoDB API integration
  const handleAddAccount = async (newAcc: Omit<AccountItem, "id">) => {
    const accItem: AccountItem = {
      ...newAcc,
      id: `acc-${Date.now()}`,
    };
    setAccounts((prev) => [...prev, accItem]);
    setShowAddAccount(false);

    try {
      await fetch("/api/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAcc),
      });
    } catch (e) {}
  };

  const handleAddIncome = async (data: {
    amount: number;
    category: string;
    accountName: string;
    description: string;
    date: string;
  }) => {
    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      description: data.description || "Income Entry",
      category: data.category,
      date: data.date || "Today",
      amount: `+ Rs. ${data.amount.toLocaleString()}`,
      numericAmount: data.amount,
      type: "Income",
      accountName: data.accountName,
      status: "Completed",
    };
    setTxList((prev) => [newTx, ...prev]);

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.bankName.toLowerCase() === data.accountName.toLowerCase() ||
        acc.type.toLowerCase() === data.accountName.toLowerCase()
          ? { ...acc, balance: acc.balance + data.amount }
          : acc
      )
    );
    setShowAddIncome(false);

    try {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: data.description || "Income Entry",
          category: data.category,
          date: data.date || "Today",
          amount: data.amount,
          type: "Income",
          accountName: data.accountName,
        }),
      });
    } catch (e) {}
  };

  const handleAddExpense = async (data: {
    amount: number;
    category: string;
    accountName: string;
    description: string;
    date: string;
  }) => {
    const newTx: TransactionItem = {
      id: `tx-${Date.now()}`,
      description: data.description || "Expense Entry",
      category: data.category,
      date: data.date || "Today",
      amount: `- Rs. ${data.amount.toLocaleString()}`,
      numericAmount: data.amount,
      type: "Expense",
      accountName: data.accountName,
      status: "Completed",
    };
    setTxList((prev) => [newTx, ...prev]);

    setAccounts((prev) =>
      prev.map((acc) =>
        acc.bankName.toLowerCase() === data.accountName.toLowerCase() ||
        acc.type.toLowerCase() === data.accountName.toLowerCase()
          ? { ...acc, balance: Math.max(0, acc.balance - data.amount) }
          : acc
      )
    );
    setShowAddExpense(false);

    try {
      await fetch("/api/transactions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: data.description || "Expense Entry",
          category: data.category,
          date: data.date || "Today",
          amount: data.amount,
          type: "Expense",
          accountName: data.accountName,
        }),
      });
    } catch (e) {}
  };

  const handleAddReminder = async (data: Omit<ReminderItem, "id">) => {
    const remItem: ReminderItem = {
      id: `rem-${Date.now()}`,
      ...data,
    };
    setReminders((prev) => [...prev, remItem]);
    setShowAddReminder(false);

    try {
      const res = await fetch("/api/reminders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const saved = await res.json();
      if (saved.success && saved.data?._id) {
        // Replace temp id with real MongoDB _id
        setReminders((prev) =>
          prev.map((r) => (r.id === remItem.id ? { ...r, id: saved.data._id } : r))
        );
      }
    } catch (e) {}
  };

  const handleAddGoal = async (data: { name: string; target: number; deadline: string }) => {
    const goal: SavingGoalItem = {
      id: `goal-${Date.now()}`,
      name: data.name,
      target: data.target,
      current: 0,
      deadline: data.deadline || "Dec 2026",
      monthly: `Rs. ${Math.ceil(data.target / 12).toLocaleString()}`,
      category: "Micro-Savings",
    };
    setSavingsGoals((prev) => [...prev, goal]);

    try {
      const res = await fetch("/api/savings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(goal),
      });
      const saved = await res.json();
      if (saved.success && saved.data?._id) {
        setGoalIdMap((prev) => ({ ...prev, [goal.id]: saved.data._id }));
      }
    } catch (e) {}
  };

  const handleDepositGoal = async (goalId: string, amount: number) => {
    setSavingsGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, current: g.current + amount } : g))
    );

    try {
      // Use MongoDB _id if available, otherwise use local id
      const mongoId = goalIdMap[goalId] || goalId;
      await fetch(`/api/savings/${mongoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
    } catch (e) {}
  };


  const handleAddSmeProduct = async (prod: Omit<SmeProductItem, "id">) => {
    const item: SmeProductItem = {
      ...prod,
      id: `prod-${Date.now()}`,
    };
    setSmeProducts((prev) => [...prev, item]);

    try {
      await fetch("/api/sme/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prod),
      });
    } catch (e) {}
  };

  if (path.includes("/savings"))
    return (
      <Savings
        goals={savingsGoals}
        onAddGoal={handleAddGoal}
        onDeposit={handleDepositGoal}
        accounts={accounts}
      />
    );
  if (path.includes("/fraud")) return <Fraud />;
  if (path.includes("/simulator")) return <Simulator income={totalIncome} expense={totalExpense} />;
  if (path.includes("/literacy")) return <Literacy />;
  if (path.includes("/business"))
    return (
      <Business
        path={path}
        products={smeProducts}
        sales={smeSales}
        expenses={smeExpenses}
        onAddProduct={handleAddSmeProduct}
        onAddSale={(amt) => setSmeSales((prev) => prev + amt)}
        onAddExpense={(amt) => setSmeExpenses((prev) => prev + amt)}
      />
    );
  if (path.includes("/accounts") || path.includes("/payments"))
    return (
      <ManageAccounts
        accounts={accounts}
        txList={txList}
        totalBalance={totalBalance}
        onAddAccount={handleAddAccount}
        onOpenAddAccount={() => setShowAddAccount(true)}
      />
    );

  return (
    <>
      {/* Top Header & Quick Actions */}
      <SectionTitle
        eyebrow="Fintech Nepal Dashboard"
        title="Welcome Navin"
        action={
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAddExpense(true)}
              className="flex items-center gap-2 rounded-xl bg-[#dc2626] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#b91c1c] active:scale-95 shadow-sm"
            >
              <Plus size={16} />
              Add Expense
            </button>
            <button
              onClick={() => setShowAddIncome(true)}
              className="flex items-center gap-2 rounded-xl bg-[#139b70] px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#0f805d] active:scale-95 shadow-sm"
            >
              <Plus size={16} />
              Add Income
            </button>
            <button
              onClick={() => router.push("/dashboard/accounts")}
              className="flex items-center gap-2 rounded-xl border border-[#d8e5df] bg-white px-4 py-2.5 text-sm font-semibold text-[#102a27] transition-all hover:bg-[#f2f8f5]"
            >
              <Landmark size={16} className="text-[#139b70]" />
              Manage Accounts
            </button>
          </div>
        }
      />

      {/* Top 4 Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Income (Bhadau) */}
        <div className="relative overflow-hidden rounded-2xl border border-[#164e40] bg-[#102a27] p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#80b3a3]">
              Income (Bhadau)
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#1b574d] text-emerald-400">
              <Coins size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-white">
            Rs. {totalIncome.toLocaleString()}
          </p>
          <p className="mt-2 text-xs font-medium text-[#80b3a3]">
            {totalIncome > 0 ? "▲ Active Income Recorded" : "No income added yet"}
          </p>
        </div>

        {/* Expense (Bhadau) */}
        <div className="relative overflow-hidden rounded-2xl border border-[#4a1d24] bg-[#271015] p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#c78893]">
              Expense (Bhadau)
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#541f27] text-rose-400">
              <CreditCard size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-white">
            Rs. {totalExpense.toLocaleString()}
          </p>
          <p className="mt-2 text-xs font-medium text-[#c78893]">
            {totalExpense > 0 ? "▼ Expenses Tracked" : "No expense added yet"}
          </p>
        </div>

        {/* To Receive */}
        <div className="relative overflow-hidden rounded-2xl border border-[#164e40] bg-[#102a27] p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#80b3a3]">
              To Receive
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#1b574d] text-emerald-400">
              <ArrowDownLeft size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-white">
            Rs. {totalToReceive.toLocaleString()}
          </p>
          <p className="mt-2 text-xs font-medium text-[#80b3a3]">
            {reminders.filter((r) => r.type === "Receive").length} pending receivable(s)
          </p>
        </div>

        {/* To Give */}
        <div className="relative overflow-hidden rounded-2xl border border-[#4a1d24] bg-[#271015] p-5 text-white shadow-md transition-transform hover:-translate-y-0.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#c78893]">
              To Give
            </span>
            <div className="grid h-8 w-8 place-items-center rounded-xl bg-[#541f27] text-rose-400">
              <ArrowUpRight size={18} />
            </div>
          </div>
          <p className="mt-3 text-2xl font-bold tracking-tight text-white">
            Rs. {totalToGive.toLocaleString()}
          </p>
          <p className="mt-2 text-xs font-medium text-[#c78893]">
            {reminders.filter((r) => r.type === "Give").length} pending payable(s)
          </p>
        </div>
      </div>

      {/* Main Grid: Cashflow Chart & Right Side Accounts & Reminders */}
      <div className="mt-7 grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <Card className="flex flex-col justify-between">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#102a27]">
                Cashflow <span className="text-xs font-normal text-[#71817b]">(Nepal Financial Flow)</span>
              </h3>
            </div>
            <select className="rounded-xl border border-[#e7eeeb] bg-[#f8faf9] px-3 py-1.5 text-xs font-semibold outline-none">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>

          <div className="h-64 w-full flex flex-col justify-center items-center">
            {txList.length === 0 ? (
              <div className="text-center py-10">
                <Coins size={36} className="mx-auto text-[#b4c4bf] mb-2" />
                <p className="text-sm font-bold text-[#102a27]">No Cashflow Data Yet</p>
                <p className="text-xs text-[#71817b] mt-1 max-w-xs">
                  Click <b className="text-[#139b70]">+ Add Income</b> or <b className="text-[#dc2626]">+ Add Expense</b> above to start visualizing your daily cash flow.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={txList.slice(0, 7)}>
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "#71817b", fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#71817b", fontSize: 11 }} tickFormatter={(v) => `Rs.${v}`} />
                  <Tooltip />
                  <Bar dataKey="numericAmount" name="Amount (NPR)" fill="#139b70" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="mt-4 flex items-center gap-6 border-t border-[#edf2ef] pt-3 text-xs font-semibold">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#139b70]" />
              Total Income: <b className="text-[#139b70]">Rs. {totalIncome.toLocaleString()}</b>
            </span>
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#dc2626]" />
              Total Expense: <b className="text-[#dc2626]">Rs. {totalExpense.toLocaleString()}</b>
            </span>
          </div>
        </Card>

        {/* Right Side Column */}
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#71817b]">
                  Total Balance (Cash & Bank)
                </p>
                <p className="mt-1 text-2xl font-bold text-[#102a27]">
                  Rs. {totalBalance.toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => router.push("/dashboard/accounts")}
                className="rounded-lg bg-[#e4f6ed] px-3 py-1.5 text-xs font-bold text-[#139b70] hover:bg-[#d0f0e0]"
              >
                + Add Account
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {accounts.length === 0 ? (
                <div className="py-6 text-center">
                  <Landmark size={24} className="mx-auto text-[#b4c4bf]" />
                  <p className="mt-2 text-xs font-bold text-[#102a27]">No Accounts Added Yet</p>
                  <p className="mt-1 text-[11px] text-[#71817b]">
                    Add your eSewa, Khalti, or Bank accounts (Nabil, Prabhu, NIC Asia).
                  </p>
                  <Button
                    onClick={() => router.push("/dashboard/accounts")}
                    variant="secondary"
                    className="mt-3 text-xs"
                  >
                    + Add Account (Manual Form)
                  </Button>
                </div>
              ) : (
                accounts.map((acc) => (
                  <div
                    key={acc.id}
                    onClick={() => router.push("/dashboard/accounts")}
                    className="flex items-center justify-between rounded-xl border border-[#f0f4f2] bg-[#fcfdfe] p-3 transition-colors hover:bg-[#f3f8f5] cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
                        {acc.type === "Cash" ? (
                          <Wallet size={18} />
                        ) : acc.type === "Digital Wallet" ? (
                          <CreditCard size={18} />
                        ) : (
                          <Landmark size={18} />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#102a27] capitalize">
                          {acc.bankName}
                        </p>
                        <p className="text-[10px] text-[#71817b]">{acc.type}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#102a27]">
                      Rs. {acc.balance.toLocaleString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
              <h3 className="font-bold text-[#102a27]">
                Upcoming Reminders ({reminders.length})
              </h3>
              <button
                onClick={() => setShowAddReminder(true)}
                className="text-xs font-bold text-[#139b70] hover:underline flex items-center gap-1"
              >
                <Plus size={14} /> Add New
              </button>
            </div>

            {reminders.length === 0 ? (
              <div className="py-8 text-center">
                <Bell size={24} className="mx-auto text-[#b4c4bf]" />
                <p className="mt-2 text-xs font-bold text-[#102a27]">
                  Reminder Not Created Yet!
                </p>
                <p className="mt-1 text-[11px] text-[#71817b]">
                  Looks like you haven&apos;t created any reminders yet.
                </p>
                <Button
                  onClick={() => setShowAddReminder(true)}
                  variant="secondary"
                  className="mt-4 text-xs"
                >
                  + Add New Reminder
                </Button>
              </div>
            ) : (
              <div className="mt-4 space-y-3">
                {reminders.map((rem) => (
                  <div
                    key={rem.id}
                    className="flex items-center justify-between rounded-xl border border-[#e7eeeb] bg-[#fcfdfe] p-3 text-xs"
                  >
                    <div>
                      <p className="font-bold text-[#102a27]">{rem.title}</p>
                      <p className="mt-0.5 text-[10px] text-[#71817b]">
                        Due {rem.dueDate} • {rem.partyName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-bold ${
                          rem.type === "Receive"
                            ? "text-[#139b70]"
                            : "text-[#dc2626]"
                        }`}
                      >
                        {rem.type === "Receive" ? "+" : "-"} Rs.{" "}
                        {rem.amount.toLocaleString()}
                      </p>
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 text-[9px] font-bold ${
                          rem.type === "Receive"
                            ? "bg-[#e4f6ed] text-[#139b70]"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        {rem.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <Card className="mt-7">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-[#102a27]">Recent Transactions</h3>
          <Button variant="ghost" onClick={() => router.push("/dashboard/accounts")}>
            View all accounts <ArrowRight className="ml-1 inline" size={14} />
          </Button>
        </div>

        {txList.length === 0 ? (
          <div className="py-12 text-center text-[#71817b]">
            <Receipt size={32} className="mx-auto text-[#b4c4bf] mb-2" />
            <p className="text-sm font-bold text-[#102a27]">No Transactions Logged</p>
            <p className="text-xs text-[#71817b] mt-1">
              Add income or expenses to populate your transaction history.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-xs">
              <thead className="border-b border-[#edf2ef] text-[#8c9a95]">
                <tr>
                  {["Description", "Category", "Account", "Date", "Amount", "Status"].map(
                    (x) => (
                      <th className="pb-3 font-medium" key={x}>
                        {x}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {txList.map((t) => (
                  <tr className="border-b border-[#f0f4f2] last:border-0" key={t.id}>
                    <td className="py-4 font-semibold text-[#102a27]">{t.description}</td>
                    <td className="py-4 text-[#71817b]">{t.category}</td>
                    <td className="py-4 font-medium text-[#139b70] capitalize">{t.accountName}</td>
                    <td className="py-4 text-[#71817b]">{t.date}</td>
                    <td
                      className={`py-4 font-bold ${
                        t.type === "Income" ? "text-[#139b70]" : "text-[#dc2626]"
                      }`}
                    >
                      {t.amount}
                    </td>
                    <td className="py-4">
                      <Badge tone={t.type === "Income" ? "green" : "orange"}>
                        {t.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* MODALS */}
      {showAddAccount && (
        <AddAccountModal
          onClose={() => setShowAddAccount(false)}
          onAdd={handleAddAccount}
        />
      )}

      {showAddIncome && (
        <Modal title="Add Income Entry (Digital Nepal)" onClose={() => setShowAddIncome(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const amount = parseFloat((form.elements.namedItem("amount") as HTMLInputElement).value);
              const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
              const accountName = (form.elements.namedItem("accountName") as HTMLSelectElement).value;
              const description = (form.elements.namedItem("description") as HTMLInputElement).value;

              if (amount && accountName) {
                handleAddIncome({
                  amount,
                  category,
                  accountName,
                  description,
                  date: "Today",
                });
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Income Amount (NPR)</label>
              <input name="amount" type="number" required placeholder="Rs. 0" className="field mt-1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Income Category</label>
              <select name="category" className="field mt-1">
                <option>SME Sales & Business</option>
                <option>Salary & Remittance</option>
                <option>Digital Payment QR Received</option>
                <option>Freelance / IT Services</option>
                <option>Other Income</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Deposit To Account</label>
              {accounts.length === 0 ? (
                <p className="text-xs text-red-500 mt-1">Please add a Bank or Wallet account first in Manage Accounts.</p>
              ) : (
                <select name="accountName" className="field mt-1">
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.bankName}>
                      {acc.bankName} ({acc.type}) — Current: Rs. {acc.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Description / Notes</label>
              <input name="description" placeholder="e.g. eSewa QR payment from customer" className="field mt-1" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowAddIncome(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={accounts.length === 0}>
                Save Income
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {showAddExpense && (
        <Modal title="Add Expense Entry" onClose={() => setShowAddExpense(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const amount = parseFloat((form.elements.namedItem("amount") as HTMLInputElement).value);
              const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
              const accountName = (form.elements.namedItem("accountName") as HTMLSelectElement).value;
              const description = (form.elements.namedItem("description") as HTMLInputElement).value;

              if (amount && accountName) {
                handleAddExpense({
                  amount,
                  category,
                  accountName,
                  description,
                  date: "Today",
                });
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Expense Amount (NPR)</label>
              <input name="amount" type="number" required placeholder="Rs. 0" className="field mt-1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Expense Category</label>
              <select name="category" className="field mt-1">
                <option>Shop Rent</option>
                <option>Supplies & Raw Materials</option>
                <option>Utilities / Internet & Electricity</option>
                <option>Staff Salary</option>
                <option>Personal & Miscellaneous</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Pay From Account</label>
              {accounts.length === 0 ? (
                <p className="text-xs text-red-500 mt-1">Please add an account first in Manage Accounts.</p>
              ) : (
                <select name="accountName" className="field mt-1">
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.bankName}>
                      {acc.bankName} ({acc.type}) — Balance: Rs. {acc.balance.toLocaleString()}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Description / Notes</label>
              <input name="description" placeholder="e.g. Electricity bill payment via Khalti" className="field mt-1" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowAddExpense(false)}>
                Cancel
              </Button>
              <button
                type="submit"
                disabled={accounts.length === 0}
                className="rounded-xl bg-[#dc2626] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#b91c1c] disabled:opacity-50"
              >
                Save Expense
              </button>
            </div>
          </form>
        </Modal>
      )}

      {showAddReminder && (
        <Modal title="Add New Reminder (Receivable / Payable)" onClose={() => setShowAddReminder(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const title = (form.elements.namedItem("title") as HTMLInputElement).value;
              const amount = parseFloat((form.elements.namedItem("amount") as HTMLInputElement).value) || 0;
              const dueDate = (form.elements.namedItem("dueDate") as HTMLInputElement).value || "Soon";
              const type = (form.elements.namedItem("type") as HTMLSelectElement).value as "Receive" | "Give";
              const partyName = (form.elements.namedItem("partyName") as HTMLInputElement).value || "Client";

              handleAddReminder({ title, amount, dueDate, type, partyName });
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Reminder Title</label>
              <input name="title" required placeholder="e.g. Payment for stock" className="field mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#71817b]">Amount (Rs.)</label>
                <input name="amount" type="number" required placeholder="0" className="field mt-1" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#71817b]">Type</label>
                <select name="type" className="field mt-1">
                  <option value="Receive">To Receive (Money In)</option>
                  <option value="Give">To Give (Money Out)</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Party / Customer Name</label>
              <input name="partyName" placeholder="e.g. Himalayan Bakery" className="field mt-1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Due Date</label>
              <input name="dueDate" placeholder="e.g. Bhd 12" className="field mt-1" />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowAddReminder(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Reminder</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

{/* MANAGE ACCOUNTS SECTION WITH INLINE MANUAL INPUT FORM */}
function ManageAccounts({
  accounts,
  txList,
  totalBalance,
  onAddAccount,
  onOpenAddAccount,
}: {
  accounts: AccountItem[];
  txList: TransactionItem[];
  totalBalance: number;
  onAddAccount: (acc: Omit<AccountItem, "id">) => void;
  onOpenAddAccount: () => void;
}) {
  const [selectedAccId, setSelectedAccId] = useState<string>(accounts[0]?.id || "");
  const selectedAccount = accounts.find((a) => a.id === selectedAccId) || accounts[0];

  // Inline manual form states
  const [type, setType] = useState<AccountItem["type"]>("Bank Account");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");

  const handleInlineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName) return;

    onAddAccount({
      type,
      bankName,
      holderName: holderName || "Navin Shrestha",
      accountNumber: accountNumber || "ACC-" + Math.floor(1000 + Math.random() * 9000),
      balance: parseFloat(balance) || 0,
    });

    // Reset inputs
    setBankName("");
    setHolderName("");
    setAccountNumber("");
    setBalance("");
  };

  const setPreset = (name: string, accType: AccountItem["type"]) => {
    setBankName(name);
    setType(accType);
  };

  return (
    <>
      <SectionTitle
        eyebrow="Fintech Digital Accounts"
        title={`Manage Accounts (${accounts.length})`}
        action={
          <Button onClick={onOpenAddAccount}>
            <Plus size={16} className="mr-2 inline" />
            + Add Account Modal
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total Balance (Cash & Bank)" value={`Rs. ${totalBalance.toLocaleString()}`} />
        <Stat label="Connected Bank Accounts" value={`${accounts.filter((a) => a.type === "Bank Account").length}`} />
        <Stat label="Digital Wallets & Cash" value={`${accounts.filter((a) => a.type !== "Bank Account").length}`} />
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[340px_1fr]">
        {/* Left Column: Accounts List */}
        <Card className="h-fit">
          <div className="flex items-center justify-between border-b border-[#edf2ef] pb-3">
            <div>
              <p className="text-xs font-semibold uppercase text-[#71817b]">Accounts List</p>
              <p className="mt-1 text-sm font-bold text-[#102a27]">
                Total: Rs. {totalBalance.toLocaleString()}
              </p>
            </div>
            <button
              onClick={onOpenAddAccount}
              className="rounded-lg bg-[#e4f6ed] p-1.5 text-[#139b70] hover:bg-[#d0f0e0]"
            >
              <Plus size={18} />
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {accounts.length === 0 ? (
              <div className="py-6 text-center text-[#71817b]">
                <p className="text-xs font-bold text-[#102a27]">No Accounts Added Yet</p>
                <p className="text-[11px] mt-1 text-[#71817b]">Fill out the manual input form on the right to add your first Bank or Wallet account.</p>
              </div>
            ) : (
              accounts.map((acc) => {
                const isSelected = acc.id === selectedAccount?.id;
                return (
                  <div
                    key={acc.id}
                    onClick={() => setSelectedAccId(acc.id)}
                    className={`flex items-center justify-between rounded-xl p-3 cursor-pointer transition-all ${
                      isSelected
                        ? "bg-[#102a27] text-white shadow-md"
                        : "border border-[#e7eeeb] bg-white text-[#102a27] hover:bg-[#f3f8f5]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`grid h-9 w-9 place-items-center rounded-xl ${
                          isSelected
                            ? "bg-[#1b574d] text-emerald-300"
                            : "bg-[#e4f6ed] text-[#139b70]"
                        }`}
                      >
                        {acc.type === "Cash" ? (
                          <Wallet size={18} />
                        ) : acc.type === "Digital Wallet" ? (
                          <CreditCard size={18} />
                        ) : (
                          <Landmark size={18} />
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-bold capitalize">{acc.bankName}</p>
                        <p
                          className={`text-[10px] ${
                            isSelected ? "text-[#a8c0b8]" : "text-[#71817b]"
                          }`}
                        >
                          {acc.type}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs font-bold">
                      Rs. {acc.balance.toLocaleString()}
                    </p>
                  </div>
                );
              })
            )}
          </div>
        </Card>

        {/* Right Column: MANUAL INPUT FORM (Matching Screenshot 2) + Selected Account Statement */}
        <div className="space-y-6">
          {/* MANUAL INPUT FORM CARD FOR ADDING BANK / WALLET ACCOUNTS */}
          <div className="rounded-2xl border border-[#23423b] bg-[#121c1a] p-6 text-white shadow-xl">
            <div className="mb-4 flex items-center justify-between border-b border-[#213832] pb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Landmark size={20} className="text-[#139b70]" />
                  Add New Account (Manual Entry)
                </h3>
                <p className="text-xs text-[#a3b8b1] mt-0.5">
                  Enter your Bank or Digital Wallet details below to connect your balance.
                </p>
              </div>

              {/* Presets */}
              <div className="hidden sm:flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setPreset("prabhu", "Bank Account")}
                  className="rounded-lg bg-[#182623] border border-[#2a453e] px-2.5 py-1 text-[11px] font-semibold text-emerald-400 hover:bg-[#20332f]"
                >
                  + Prabhu
                </button>
                <button
                  type="button"
                  onClick={() => setPreset("eSewa", "Digital Wallet")}
                  className="rounded-lg bg-[#182623] border border-[#2a453e] px-2.5 py-1 text-[11px] font-semibold text-emerald-400 hover:bg-[#20332f]"
                >
                  + eSewa
                </button>
                <button
                  type="button"
                  onClick={() => setPreset("Khalti", "Digital Wallet")}
                  className="rounded-lg bg-[#182623] border border-[#2a453e] px-2.5 py-1 text-[11px] font-semibold text-emerald-400 hover:bg-[#20332f]"
                >
                  + Khalti
                </button>
                <button
                  type="button"
                  onClick={() => setPreset("Cash", "Cash")}
                  className="rounded-lg bg-[#182623] border border-[#2a453e] px-2.5 py-1 text-[11px] font-semibold text-emerald-400 hover:bg-[#20332f]"
                >
                  + Cash
                </button>
              </div>
            </div>

            <form onSubmit={handleInlineSubmit} className="grid gap-4 sm:grid-cols-2">
              {/* Account Type */}
              <div>
                <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
                  Account Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as AccountItem["type"])}
                  className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
                >
                  <option value="Bank Account">Bank Account (Prabhu, Nabil, NIC Asia)</option>
                  <option value="Digital Wallet">Digital Wallet (eSewa, Khalti, IME Pay)</option>
                  <option value="Cash">Cash in Hand</option>
                  <option value="Savings Account">Savings Account</option>
                </select>
              </div>

              {/* Bank / Wallet Name */}
              <div>
                <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
                  Bank Name / Wallet Name
                </label>
                <input
                  type="text"
                  required
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  placeholder="Enter name (e.g. Prabhu Bank, eSewa)"
                  className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
                />
              </div>

              {/* Account Holder Name */}
              <div>
                <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  placeholder="Enter account holder name"
                  className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
                />
              </div>

              {/* Account Number */}
              <div>
                <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number or wallet ID"
                  className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
                />
              </div>

              {/* Current Account Balance */}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
                  Current Account Balance (NPR)
                </label>
                <div className="flex gap-3">
                  <input
                    type="number"
                    required
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    placeholder="Rs. 0"
                    className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
                  />
                  <button
                    type="submit"
                    className="whitespace-nowrap rounded-xl bg-[#139b70] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#0f805d] transition-colors"
                  >
                    + Add Account
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Statement details for selected account */}
          {selectedAccount && (
            <Card>
              <div className="flex flex-col justify-between gap-4 border-b border-[#edf2ef] pb-6 md:flex-row md:items-center">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#e4f6ed] text-[#139b70]">
                    {selectedAccount.type === "Cash" ? (
                      <Wallet size={28} />
                    ) : selectedAccount.type === "Digital Wallet" ? (
                      <CreditCard size={28} />
                    ) : (
                      <Landmark size={28} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-[#102a27] capitalize">
                        {selectedAccount.bankName}
                      </h2>
                      <Badge tone="green">{selectedAccount.type}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-[#71817b]">
                      Holder: <b className="text-[#102a27]">{selectedAccount.holderName}</b> • Account No:{" "}
                      <span className="font-mono">{selectedAccount.accountNumber}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase text-[#71817b]">Current Account Balance</p>
                  <p className="text-3xl font-bold text-[#139b70]">
                    Rs. {selectedAccount.balance.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="font-bold text-[#102a27]">
                  Account Statement ({selectedAccount.bankName})
                </h3>
                <div className="mt-4 overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left text-xs">
                    <thead className="border-b border-[#edf2ef] text-[#8c9a95]">
                      <tr>
                        <th className="pb-3 font-medium">Description</th>
                        <th className="pb-3 font-medium">Category</th>
                        <th className="pb-3 font-medium">Date</th>
                        <th className="pb-3 font-medium">Amount</th>
                        <th className="pb-3 font-medium">Type</th>
                      </tr>
                    </thead>
                    <tbody>
                      {txList
                        .filter(
                          (t) =>
                            t.accountName.toLowerCase() ===
                            selectedAccount.bankName.toLowerCase()
                        )
                        .map((t) => (
                          <tr key={t.id} className="border-b border-[#f0f4f2] last:border-0">
                            <td className="py-4 font-semibold text-[#102a27]">{t.description}</td>
                            <td className="py-4 text-[#71817b]">{t.category}</td>
                            <td className="py-4 text-[#71817b]">{t.date}</td>
                            <td
                              className={`py-4 font-bold ${
                                t.type === "Income" ? "text-[#139b70]" : "text-[#dc2626]"
                              }`}
                            >
                              {t.amount}
                            </td>
                            <td className="py-4">
                              <Badge tone={t.type === "Income" ? "green" : "red"}>
                                {t.type}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      {txList.filter(
                        (t) =>
                          t.accountName.toLowerCase() ===
                          selectedAccount.bankName.toLowerCase()
                      ).length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-[#71817b]">
                            No transaction records logged yet for {selectedAccount.bankName}.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

{/* ADD ACCOUNT MODAL - MATCHING SCREENSHOT 2 */}
function AddAccountModal({
  onClose,
  onAdd,
}: {
  onClose: () => void;
  onAdd: (acc: Omit<AccountItem, "id">) => void;
}) {
  const [type, setType] = useState<AccountItem["type"]>("Bank Account");
  const [bankName, setBankName] = useState("");
  const [holderName, setHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [balance, setBalance] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bankName) return;

    onAdd({
      type,
      bankName,
      holderName: holderName || "Navin Shrestha",
      accountNumber: accountNumber || "ACC-" + Math.floor(1000 + Math.random() * 9000),
      balance: parseFloat(balance) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[#23423b] bg-[#121c1a] p-6 text-white shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b border-[#213832] pb-4">
          <h2 className="text-lg font-bold text-white">Add New Account</h2>
          <button
            onClick={onClose}
            className="text-lg text-[#809b92] hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
              Account Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as AccountItem["type"])}
              className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
            >
              <option value="Bank Account">Bank Account (Prabhu, Nabil, NIC Asia)</option>
              <option value="Digital Wallet">Digital Wallet (eSewa, Khalti, IME Pay)</option>
              <option value="Cash">Cash in Hand</option>
              <option value="Savings Account">Savings Account</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
              Bank Name / Wallet Name
            </label>
            <input
              type="text"
              required
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              placeholder="Enter name (e.g. Prabhu Bank, eSewa)"
              className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
              Account Holder Name
            </label>
            <input
              type="text"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              placeholder="Enter account holder name"
              className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
              Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#a3b8b1] mb-1">
              Current Account Balance
            </label>
            <input
              type="number"
              required
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
              placeholder="Rs."
              className="w-full rounded-xl border border-[#1e3b34] bg-[#182623] px-3.5 py-2.5 text-sm text-white placeholder-[#5a736b] outline-none focus:border-[#139b70] focus:ring-1 focus:ring-[#139b70]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#213832] mt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#2a453e] bg-[#182623] px-4 py-2.5 text-sm font-semibold text-[#a3b8b1] hover:bg-[#20332f] hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-[#139b70] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0f805d] transition-colors"
            >
              Add Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

{/* MICRO-SAVINGS PAGE */}
function Savings({
  goals,
  onAddGoal,
  onDeposit,
  accounts,
}: {
  goals: SavingGoalItem[];
  onAddGoal: (data: { name: string; target: number; deadline: string }) => void;
  onDeposit: (goalId: string, amount: number) => void;
  accounts: AccountItem[];
}) {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showDepositModal, setShowDepositModal] = useState<string | null>(null);

  const totalSaved = goals.reduce((sum, g) => sum + g.current, 0);

  return (
    <>
      <SectionTitle
        eyebrow="Micro-Savings & Goal Safety Net"
        title="Build your financial future"
        action={
          <Button onClick={() => setShowGoalModal(true)}>
            <Plus size={16} className="mr-2 inline" />
            Create Savings Goal
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total Micro-Savings" value={`Rs. ${totalSaved.toLocaleString()}`} />
        <Stat label="Active Goals" value={`${goals.length}`} />
        <Stat label="Connected Accounts" value={`${accounts.length}`} />
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {goals.length === 0 ? (
          <div className="lg:col-span-3 rounded-2xl border border-[#e7eeeb] bg-white p-12 text-center">
            <Target size={36} className="mx-auto text-[#b4c4bf] mb-3" />
            <h3 className="text-base font-bold text-[#102a27]">No Micro-Savings Goals Created</h3>
            <p className="text-xs text-[#71817b] mt-1 max-w-md mx-auto">
              Start building a emergency safety net or savings plan for Dashain, education, or shop expansion.
            </p>
            <Button onClick={() => setShowGoalModal(true)} className="mt-4">
              + Create Savings Goal
            </Button>
          </div>
        ) : (
          goals.map((g) => {
            const pct = Math.min(100, Math.round((g.current / g.target) * 100)) || 0;
            return (
              <Card key={g.id}>
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e5f6ed] text-[#139b70]">
                    <Target size={20} />
                  </div>
                  <Badge tone={pct > 35 ? "green" : "orange"}>{pct}% complete</Badge>
                </div>
                <h3 className="mt-5 font-bold text-[#102a27]">{g.name}</h3>
                <p className="mt-1 text-xs text-[#71817b]">Target by {g.deadline}</p>
                <div className="mt-5 flex items-end justify-between">
                  <p className="text-xl font-bold text-[#102a27]">
                    Rs. {g.current.toLocaleString()}
                  </p>
                  <p className="text-xs text-[#71817b]">
                    of Rs. {g.target.toLocaleString()}
                  </p>
                </div>
                <div className="mt-3">
                  <Progress value={pct} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-[#f0f4f2] pt-3 text-xs text-[#71817b]">
                  <span>Target: {g.monthly}/mo</span>
                  <button
                    onClick={() => setShowDepositModal(g.id)}
                    className="font-bold text-[#139b70] hover:underline"
                  >
                    + Deposit Funds
                  </button>
                </div>
              </Card>
            );
          })
        )}
      </div>

      {showGoalModal && (
        <Modal title="Create Micro-Savings Goal" onClose={() => setShowGoalModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const target = parseFloat((form.elements.namedItem("target") as HTMLInputElement).value) || 0;
              const deadline = (form.elements.namedItem("deadline") as HTMLInputElement).value || "Dec 2026";

              if (name && target) {
                onAddGoal({ name, target, deadline });
                setShowGoalModal(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Goal Name</label>
              <input name="name" required placeholder="e.g. Dashain Emergency Fund" className="field mt-1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Target Amount (NPR)</label>
              <input name="target" type="number" required placeholder="Rs. 50,000" className="field mt-1" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Target Date</label>
              <input name="deadline" placeholder="e.g. Oct 2026" className="field mt-1" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowGoalModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Goal</Button>
            </div>
          </form>
        </Modal>
      )}

      {showDepositModal && (
        <Modal title="Deposit Micro-Savings" onClose={() => setShowDepositModal(null)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const amt = parseFloat((form.elements.namedItem("amount") as HTMLInputElement).value);
              if (amt) {
                onDeposit(showDepositModal, amt);
                setShowDepositModal(null);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Deposit Amount (NPR)</label>
              <input name="amount" type="number" required placeholder="Rs. 1,000" className="field mt-1" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowDepositModal(null)}>
                Cancel
              </Button>
              <Button type="submit">Save Deposit</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

{/* SME BUSINESS MANAGEMENT */}
function Business({
  path,
  products,
  sales,
  expenses,
  onAddProduct,
  onAddSale,
  onAddExpense,
}: {
  path: string;
  products: SmeProductItem[];
  sales: number;
  expenses: number;
  onAddProduct: (prod: Omit<SmeProductItem, "id">) => void;
  onAddSale: (amt: number) => void;
  onAddExpense: (amt: number) => void;
}) {
  const [showProdModal, setShowProdModal] = useState(false);
  const [showSaleModal, setShowSaleModal] = useState(false);

  return (
    <>
      <SectionTitle
        eyebrow="Nepal SME Toolkit"
        title="Himalayan Coffee House & SME Workspace"
        action={
          <div className="flex items-center gap-2">
            <Button onClick={() => setShowProdModal(true)}>
              <Plus size={15} className="mr-1.5 inline" />
              Add Product
            </Button>
            <Button onClick={() => setShowSaleModal(true)} variant="secondary">
              + Record Sale
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <Stat label="Total Products" value={`${products.length}`} />
        <Stat label="Total Sales (NPR)" value={`Rs. ${sales.toLocaleString()}`} />
        <Stat label="Total Expenses (NPR)" value={`Rs. ${expenses.toLocaleString()}`} />
        <Stat label="Net Profit" value={`Rs. ${Math.max(0, sales - expenses).toLocaleString()}`} />
      </div>

      <Card className="mt-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-[#102a27]">Product Inventory Catalog</h3>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-[#9aa9a4]" size={15} />
            <input placeholder="Search products..." className="field pl-9 text-xs" />
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-12 text-center text-[#71817b]">
            <Package size={32} className="mx-auto text-[#b4c4bf] mb-2" />
            <p className="text-sm font-bold text-[#102a27]">Inventory Empty</p>
            <p className="text-xs text-[#71817b] mt-1">
              Add your shop products, stock count, and selling prices to start tracking inventory.
            </p>
            <Button onClick={() => setShowProdModal(true)} className="mt-4 text-xs">
              + Add Product to Inventory
            </Button>
          </div>
        ) : (
          <Table
            headers={["Product Name", "SKU", "Category", "Stock Count", "Price", "Status"]}
            rows={products.map((p) => [
              p.name,
              p.sku,
              p.category,
              String(p.stock),
              p.price,
              p.status,
            ])}
          />
        )}
      </Card>

      {showProdModal && (
        <Modal title="Add SME Inventory Product" onClose={() => setShowProdModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const name = (form.elements.namedItem("name") as HTMLInputElement).value;
              const sku = (form.elements.namedItem("sku") as HTMLInputElement).value || "SKU-" + Math.floor(Math.random() * 1000);
              const category = (form.elements.namedItem("category") as HTMLSelectElement).value;
              const stock = parseInt((form.elements.namedItem("stock") as HTMLInputElement).value) || 0;
              const numericPrice = parseFloat((form.elements.namedItem("price") as HTMLInputElement).value) || 0;

              if (name && numericPrice) {
                onAddProduct({
                  name,
                  sku,
                  category,
                  stock,
                  price: `Rs. ${numericPrice.toLocaleString()}`,
                  numericPrice,
                  status: stock > 5 ? "In Stock" : "Low Stock",
                });
                setShowProdModal(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Product Name</label>
              <input name="name" required placeholder="e.g. Organic Ilam Tea" className="field mt-1" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#71817b]">Category</label>
                <select name="category" className="field mt-1">
                  <option>Beverages / Tea</option>
                  <option>Food & Bakery</option>
                  <option>Handicrafts</option>
                  <option>Electronics</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#71817b]">Stock Quantity</label>
                <input name="stock" type="number" required placeholder="10" className="field mt-1" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Price per Unit (NPR)</label>
              <input name="price" type="number" required placeholder="Rs. 250" className="field mt-1" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowProdModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Product</Button>
            </div>
          </form>
        </Modal>
      )}

      {showSaleModal && (
        <Modal title="Record Daily SME Sale" onClose={() => setShowSaleModal(false)}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const amt = parseFloat((form.elements.namedItem("amount") as HTMLInputElement).value);
              if (amt) {
                onAddSale(amt);
                setShowSaleModal(false);
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Sale Amount (NPR)</label>
              <input name="amount" type="number" required placeholder="Rs. 1,500" className="field mt-1" />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button type="button" variant="secondary" onClick={() => setShowSaleModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Sale</Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}

{/* FINANCIAL LITERACY PAGE */}
function Literacy() {
  const [qAns, setQAns] = useState<number | null>(null);
  const [budgetIncome, setBudgetIncome] = useState("");
  const [budgetExp, setBudgetExp] = useState("");

  const suggestedSavings = Math.max(
    0,
    (parseFloat(budgetIncome) || 0) - (parseFloat(budgetExp) || 0)
  );

  return (
    <>
      <SectionTitle
        eyebrow="Digital Nepal Literacy"
        title="Financial Literacy & Safety Quizzes"
        action={<Badge tone="green">Interactive Learning</Badge>}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#139b70]">
            Digital Safety Quiz #1
          </p>
          <h3 className="mt-2 text-base font-bold text-[#102a27]">
            What should you do if someone calls asking for your mobile banking OTP?
          </h3>
          <div className="mt-4 space-y-2">
            {[
              "Give the OTP quickly",
              "Never share your OTP with anyone",
              "Post the OTP online",
            ].map((option, idx) => (
              <button
                key={option}
                onClick={() => setQAns(idx)}
                className={`w-full rounded-xl border p-3 text-left text-xs font-semibold transition-colors ${
                  qAns === idx
                    ? idx === 1
                      ? "border-[#139b70] bg-[#e4f6ed] text-[#139b70]"
                      : "border-red-300 bg-red-50 text-red-600"
                    : "border-[#e7eeeb] bg-white hover:bg-[#f8faf9] text-[#102a27]"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {qAns !== null && (
            <p
              className={`mt-3 text-xs font-bold ${
                qAns === 1 ? "text-[#139b70]" : "text-red-600"
              }`}
            >
              {qAns === 1
                ? "Correct! Never share your OTP with anyone, even if they claim to be a bank agent."
                : "Incorrect. Sharing your OTP puts your bank balance at risk."}
            </p>
          )}
        </Card>

        <Card>
          <p className="text-xs font-bold uppercase tracking-[.15em] text-[#139b70]">
            Interactive Budget Planner
          </p>
          <h3 className="mt-2 text-base font-bold text-[#102a27]">
            Calculate Your Monthly Micro-Savings Potential
          </h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Monthly Salary / Business Income (NPR)</label>
              <input
                type="number"
                value={budgetIncome}
                onChange={(e) => setBudgetIncome(e.target.value)}
                placeholder="e.g. 45000"
                className="field mt-1"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">Monthly Living Expenses (NPR)</label>
              <input
                type="number"
                value={budgetExp}
                onChange={(e) => setBudgetExp(e.target.value)}
                placeholder="e.g. 28000"
                className="field mt-1"
              />
            </div>

            <div className="rounded-xl bg-[#e4f6ed] p-3 text-xs font-bold text-[#139b70]">
              Estimated Monthly Micro-Savings: Rs. {suggestedSavings.toLocaleString()}
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

{/* FRAUD PROTECTION PAGE */}
function Fraud() {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [method, setMethod] = useState("QR Payment");
  const [isUrgent, setIsUrgent] = useState(false);
  const [askedOtp, setAskedOtp] = useState(false);
  const [scanned, setScanned] = useState(false);

  const isHighRisk = isUrgent || askedOtp;

  return (
    <>
      <SectionTitle
        eyebrow="Fintech Safety Center"
        title="Stay protected from digital fraud in Nepal"
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h3 className="font-bold text-[#102a27]">Real-time Transaction Fraud Checker</h3>
          <p className="mt-1 text-xs text-[#71817b]">
            Verify QR payments or wallet transfers before sending money.
          </p>
          <div className="mt-5 space-y-3">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Payment Amount (NPR)"
              className="field"
            />
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="Recipient Name / eSewa Phone No."
              className="field"
            />
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="field"
            >
              <option value="QR Payment">Fonepay / eSewa QR</option>
              <option value="Wallet Transfer">Wallet Direct Transfer</option>
              <option value="Bank Transfer">ConnectIPS / Bank Transfer</option>
            </select>

            <div className="space-y-2 pt-1">
              <label className="flex items-center gap-2 text-xs text-[#71817b] cursor-pointer">
                <input
                  type="checkbox"
                  checked={isUrgent}
                  onChange={(e) => setIsUrgent(e.target.checked)}
                  className="rounded border-[#e7eeeb] accent-[#139b70]"
                />
                Is recipient urging you to send money urgently?
              </label>
              <label className="flex items-center gap-2 text-xs text-[#71817b] cursor-pointer">
                <input
                  type="checkbox"
                  checked={askedOtp}
                  onChange={(e) => setAskedOtp(e.target.checked)}
                  className="rounded border-[#e7eeeb] accent-[#139b70]"
                />
                Did someone ask for your OTP or login code?
              </label>
            </div>

            <Button onClick={() => setScanned(true)} className="w-full mt-2">
              Analyze Risk Level
            </Button>
          </div>
        </Card>

        <Card
          className={
            scanned
              ? isHighRisk
                ? "border-red-300 bg-red-50/50"
                : "border-emerald-300 bg-[#e4f6ed]/50"
              : "bg-[#102a27] text-white"
          }
        >
          {scanned ? (
            isHighRisk ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-100 text-red-600">
                    <ShieldAlert />
                  </div>
                  <div>
                    <Badge tone="red">HIGH RISK DETECTED</Badge>
                    <p className="mt-1 text-xs text-[#71817b]">Immediate Warning</p>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-red-600">Do NOT send money!</h3>
                <p className="mt-2 text-xs leading-5 text-[#71817b]">
                  Scam flags detected (Urgency or OTP request). Genuine bank or wallet staff will never ask for your private credentials.
                </p>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e4f6ed] text-[#139b70]">
                    <ShieldCheck />
                  </div>
                  <div>
                    <Badge tone="green">LOW RISK</Badge>
                    <p className="mt-1 text-xs text-[#71817b]">Safety Assessment Passed</p>
                  </div>
                </div>
                <h3 className="mt-4 font-bold text-[#102a27]">Transaction appears safe</h3>
                <p className="mt-2 text-xs leading-5 text-[#71817b]">
                  No suspicious urgency or credential requests detected. Always double-check recipient details before confirming.
                </p>
              </>
            )
          ) : (
            <>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#1b574d] text-emerald-300">
                <ShieldCheck />
              </div>
              <h3 className="mt-6 text-xl font-bold">Fintech Risk Prevention</h3>
              <p className="mt-2 text-sm leading-6 text-[#a8c0b8]">
                Fill out the payment details on the left to check for fake QR codes, OTP phishing, or pressure tactics.
              </p>
            </>
          )}
        </Card>
      </div>
    </>
  );
}

{/* WHAT-IF SIMULATOR */}
function Simulator({ income, expense }: { income: number; expense: number }) {
  const [savingsRate, setSavingsRate] = useState(2000);
  const currentMonths = Math.ceil(100000 / Math.max(1, savingsRate));

  return (
    <>
      <SectionTitle
        eyebrow="Fintech Simulator"
        title="What if you changed one financial habit?"
      />
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <h3 className="font-bold text-[#102a27]">Adjust Savings Habit</h3>
          <div className="mt-5 space-y-4">
            <label className="block text-xs font-semibold text-[#71817b]">
              Monthly Micro-Savings (NPR):{" "}
              <span className="float-right text-[#139b70] font-bold">
                Rs. {savingsRate.toLocaleString()}
              </span>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={savingsRate}
                onChange={(e) => setSavingsRate(+e.target.value)}
                className="mt-3 w-full accent-[#139b70]"
              />
            </label>
          </div>
        </Card>

        <Card className="bg-[#102a27] text-white">
          <p className="text-xs font-semibold text-emerald-300">Projection</p>
          <h3 className="mt-2 text-2xl font-bold">Build Rs. 100,000 Safety Net</h3>
          <p className="mt-4 text-3xl font-bold text-emerald-400">
            {currentMonths} Months
          </p>
          <p className="mt-1 text-xs text-[#a8c0b8]">
            At Rs. {savingsRate.toLocaleString()} saved every month.
          </p>
        </Card>
      </div>
    </>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[650px] text-left text-xs">
        <thead className="border-b border-[#edf2ef] text-[#8c9a95]">
          <tr>
            {headers.map((h) => (
              <th className="pb-3 font-medium" key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr className="border-b border-[#f0f4f2] last:border-0" key={i}>
              {r.map((x, j) => (
                <td className="py-4 font-medium text-[#102a27]" key={j}>
                  {x}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#102a27]/50 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between border-b border-[#edf2ef] pb-3">
          <h2 className="font-bold text-[#102a27]">{title}</h2>
          <button onClick={onClose} className="text-xl text-[#71817b] hover:text-[#102a27]">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
