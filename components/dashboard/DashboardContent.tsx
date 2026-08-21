"use client";
import { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Pie,
  PieChart,
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
  Download,
  CheckCircle2,
} from "lucide-react";
import {
  Card,
  Badge,
  Button,
  Progress,
  SectionTitle,
  Stat,
} from "../ui/Primitives";
import {
  customers,
  lessons,
  products,
  savingsGoals,
  transactions,
} from "../../lib/mock-data";
const chart = [
  { name: "Jan", income: 42, expense: 28, saving: 10 },
  { name: "Feb", income: 48, expense: 31, saving: 14 },
  { name: "Mar", income: 45, expense: 25, saving: 18 },
  { name: "Apr", income: 52, expense: 36, saving: 20 },
  { name: "May", income: 48, expense: 29, saving: 24 },
  { name: "Jun", income: 56, expense: 32, saving: 29 },
];
const bars = [
  { name: "Mon", v: 12 },
  { name: "Tue", v: 8 },
  { name: "Wed", v: 16 },
  { name: "Thu", v: 10 },
  { name: "Fri", v: 22 },
  { name: "Sat", v: 14 },
  { name: "Sun", v: 9 },
];
export default function DashboardContent() {
  const path = usePathname();
  if (path.includes("/savings")) return <Savings />;
  if (path.includes("/fraud")) return <Fraud />;
  if (path.includes("/simulator")) return <Simulator />;
  if (path.includes("/literacy")) return <Literacy />;
  if (path.includes("/business")) return <Business path={path} />;
  if (path.includes("/payments")) return <Payments />;
  return <Overview />;
}
function Overview() {
  return (
    <>
      <SectionTitle
        eyebrow="Monday, June 22, 2026"
        title="Good morning, Navin"
        action={
          <Button>
            <Plus size={16} className="mr-2 inline" />
            Add money
          </Button>
        }
      />
      <p className="-mt-4 mb-7 text-sm text-[#71817b]">
        Here&apos;s your financial overview for this month.
      </p>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Total balance" value="Rs. 84,250" change="12.8%" />
        <Stat label="Monthly income" value="Rs. 48,000" change="8.4%" />
        <Stat
          label="Monthly expenses"
          value="Rs. 29,420"
          change="3.2%"
          up={false}
        />
        <Stat label="Total savings" value="Rs. 100,000" change="15.7%" />
      </div>
      <div className="mt-7 grid gap-5 xl:grid-cols-[1.55fr_1fr]">
        <Card>
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-bold">Income vs expenses</h3>
              <p className="mt-1 text-xs text-[#71817b]">
                Your monthly cash flow
              </p>
            </div>
            <select className="rounded-lg border border-[#e7eeeb] px-2 py-1.5 text-xs">
              <option>Last 6 months</option>
            </select>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <defs>
                  <linearGradient id="in" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0" stopColor="#139b70" stopOpacity=".2" />
                    <stop offset="1" stopColor="#139b70" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `Rs.${v}k`}
                />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#139b70"
                  fill="url(#in)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#f2b84b"
                  fill="none"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex gap-5 text-xs">
            <span>
              <i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#139b70]" />
              Income
            </span>
            <span>
              <i className="mr-2 inline-block h-2 w-2 rounded-full bg-[#f2b84b]" />
              Expenses
            </span>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Financial health</h3>
              <p className="mt-1 text-xs text-[#71817b]">
                You&apos;re doing great
              </p>
            </div>
            <span className="text-3xl font-bold text-[#139b70]">
              78<span className="text-sm text-[#9aa9a4]">/100</span>
            </span>
          </div>
          <div className="mt-7 space-y-5">
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Savings rate</span>
                <b>72%</b>
              </div>
              <Progress value={72} />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Expense control</span>
                <b>84%</b>
              </div>
              <Progress value={84} color="bg-[#f2b84b]" />
            </div>
            <div>
              <div className="mb-2 flex justify-between text-xs">
                <span>Goal progress</span>
                <b>55%</b>
              </div>
              <Progress value={55} color="bg-[#8b7cf6]" />
            </div>
          </div>
          <div className="mt-7 rounded-xl bg-[#f3f8f5] p-3 text-xs leading-5 text-[#71817b]">
            Save <b className="text-[#102a27]">Rs. 2,000</b> more this month to
            improve your score.
          </div>
        </Card>
      </div>
      <Card className="mt-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold">Recent transactions</h3>
          <Button variant="ghost">
            View all <ArrowRight className="ml-1 inline" size={14} />
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left text-xs">
            <thead className="border-b border-[#edf2ef] text-[#8c9a95]">
              <tr>
                {["Transaction", "Category", "Date", "Amount", "Status"].map(
                  (x) => (
                    <th className="pb-3 font-medium" key={x}>
                      {x}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr className="border-b border-[#f0f4f2] last:border-0" key={i}>
                  <td className="py-4 font-semibold">{t.description}</td>
                  <td className="py-4 text-[#71817b]">{t.category}</td>
                  <td className="py-4 text-[#71817b]">{t.date}</td>
                  <td
                    className={`py-4 font-bold ${t.type === "Income" ? "text-[#139b70]" : ""}`}
                  >
                    {t.amount}
                  </td>
                  <td className="py-4">
                    <Badge>{t.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
function Savings() {
  const [goals, setGoals] = useState(savingsGoals);
  const [show, setShow] = useState(false);
  return (
    <>
      <SectionTitle
        eyebrow="Your goals"
        title="Build your financial future"
        action={
          <Button onClick={() => setShow(true)}>
            <Plus size={16} className="mr-2 inline" />
            Create goal
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Total savings" value="Rs. 100,000" change="15.7%" />
        <Stat label="Monthly saving" value="Rs. 7,500" change="Rs. 1,200" />
        <Stat
          label="Active goals"
          value={`${goals.length}`}
          change="1 new goal"
        />
      </div>
      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {goals.map((g) => (
          <Card key={g.name}>
            <div className="flex items-start justify-between">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#e5f6ed] text-[#139b70]">
                <Target size={20} />
              </div>
              <Badge tone={g.progress > 35 ? "green" : "orange"}>
                {g.progress}% complete
              </Badge>
            </div>
            <h3 className="mt-5 font-bold">{g.name}</h3>
            <p className="mt-1 text-xs text-[#71817b]">
              Target by {g.deadline}
            </p>
            <div className="mt-5 flex items-end justify-between">
              <p className="text-xl font-bold">
                Rs. {g.current.toLocaleString()}
              </p>
              <p className="text-xs text-[#71817b]">
                of Rs. {g.target.toLocaleString()}
              </p>
            </div>
            <div className="mt-3">
              <Progress value={g.progress} />
            </div>
            <div className="mt-4 flex justify-between text-xs text-[#71817b]">
              <span>Recommended monthly</span>
              <b className="text-[#102a27]">{g.monthly}</b>
            </div>
          </Card>
        ))}
      </div>
      <Card className="mt-6 border-0 bg-[#102a27] text-white">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold text-emerald-300">
              Smart suggestion
            </p>
            <h3 className="mt-2 text-lg font-bold">
              Reach your Emergency Fund 8 months earlier.
            </h3>
            <p className="mt-1 text-sm text-[#a8c0b8]">
              Save Rs. 2,000 more each month to build a stronger safety net.
            </p>
          </div>
          <Button>
            Update my plan <ArrowRight className="ml-2 inline" size={15} />
          </Button>
        </div>
      </Card>
      {show && (
        <Modal title="Create savings goal" onClose={() => setShow(false)}>
          <div className="space-y-3">
            <input placeholder="Goal name" className="field" />
            <input placeholder="Target amount (NPR)" className="field" />
            <input placeholder="Current savings (NPR)" className="field" />
            <input type="date" className="field" />
            <Button
              onClick={() => {
                setShow(false);
                setGoals([
                  ...goals,
                  {
                    name: "New goal",
                    current: 0,
                    target: 50000,
                    progress: 0,
                    deadline: "Dec 2026",
                    monthly: "Rs. 2,000",
                  },
                ]);
              }}
            >
              Create goal
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}
function Payments() {
  return (
    <>
      <SectionTitle
        eyebrow="Money movement"
        title="Payments"
        action={
          <Button>
            <Send size={15} className="mr-2 inline" />
            Send money
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <Stat label="Available balance" value="Rs. 84,250" />
        <Stat
          label="Spent this month"
          value="Rs. 29,420"
          change="3.2%"
          up={false}
        />
        <Stat label="Received this month" value="Rs. 48,000" change="8.4%" />
      </div>
      <div className="mt-7 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        <Card>
          <h3 className="font-bold">Send money</h3>
          <p className="mt-1 text-xs text-[#71817b]">
            Fast, simple and secure transfers.
          </p>
          <div className="mt-5 space-y-3">
            <input placeholder="Recipient name or phone" className="field" />
            <input placeholder="Amount in NPR" className="field" />
            <input placeholder="Purpose (optional)" className="field" />
            <Button className="w-full">Continue</Button>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold">Weekly spending</h3>
              <p className="mt-1 text-xs text-[#71817b]">
                Rs. 12,850 spent this week
              </p>
            </div>
            <Badge>On track</Badge>
          </div>
          <div className="mt-5 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Bar dataKey="v" fill="#139b70" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      <Card className="mt-5">
        <h3 className="font-bold">Payment history</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-xs">
            <tbody>
              {transactions.map((t, i) => (
                <tr className="border-b border-[#f0f4f2] last:border-0" key={i}>
                  <td className="py-4 font-semibold">{t.description}</td>
                  <td className="py-4 text-[#71817b]">{t.category}</td>
                  <td className="py-4">{t.amount}</td>
                  <td className="py-4">
                    <Badge>{t.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
function Business({ path }: { path: string }) {
  let sub = path.split("/").pop();
  if (sub === "inventory")
    return (
      <>
        <SectionTitle
          eyebrow="Himalayan Coffee House"
          title="Inventory"
          action={
            <Button>
              <Plus size={15} className="mr-2 inline" />
              Add product
            </Button>
          }
        />
        <div className="grid gap-4 sm:grid-cols-4">
          <Stat label="Total products" value="48" />
          <Stat
            label="Low stock"
            value="6"
            change="2 need attention"
            up={false}
          />
          <Stat label="Inventory value" value="Rs. 2.4L" />
          <Stat label="Out of stock" value="3" />
        </div>
        <Card className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold">Product catalog</h3>
            <div className="relative">
              <Search
                className="absolute left-3 top-2.5 text-[#9aa9a4]"
                size={15}
              />
              <input placeholder="Search products" className="field pl-9" />
            </div>
          </div>
          <Table
            rows={products.map((p) => [
              p.name,
              p.sku,
              p.category,
              String(p.stock),
              p.price,
              p.status,
            ])}
            headers={["Product", "SKU", "Category", "Stock", "Price", "Status"]}
          />
        </Card>
      </>
    );
  return (
    <>
      <SectionTitle
        eyebrow="Business workspace"
        title="Himalayan Coffee House"
        action={
          <Button>
            <Plus size={15} className="mr-2 inline" />
            Add transaction
          </Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Today's sales" value="Rs. 18,450" change="12.4%" />
        <Stat label="Monthly sales" value="Rs. 4.8L" change="8.2%" />
        <Stat label="Expenses" value="Rs. 2.1L" change="3.2%" up={false} />
        <Stat label="Net profit" value="Rs. 2.7L" change="14.6%" />
        <Stat
          label="Receivable"
          value="Rs. 42,800"
          change="3 overdue"
          up={false}
        />
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <h3 className="font-bold">Sales overview</h3>
          <div className="mt-5 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chart}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#139b70"
                  fill="#e3f6ec"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card>
          <h3 className="font-bold">Quick actions</h3>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {["Add sale", "Add expense", "Add product", "Add customer"].map(
              (x) => (
                <button
                  className="rounded-xl border border-[#e7eeeb] p-4 text-left text-xs font-semibold hover:bg-[#f3f8f5]"
                  key={x}
                >
                  <Plus size={16} className="mb-3 text-[#139b70]" />
                  {x}
                </button>
              ),
            )}
          </div>
        </Card>
      </div>
      <Card className="mt-6">
        <h3 className="font-bold">Recent business transactions</h3>
        <Table
          rows={transactions
            .slice(0, 4)
            .map((t) => [t.date, t.type, t.description, t.amount, t.status])}
          headers={["Date", "Type", "Description", "Amount", "Status"]}
        />
      </Card>
    </>
  );
}
function Literacy() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <>
      <SectionTitle
        eyebrow="Learn. Understand. Grow."
        title="Financial literacy"
        action={<Badge>32% overall progress</Badge>}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {lessons.map((l, i) => (
          <Card key={l.title}>
            <div className="flex items-start justify-between">
              <Badge tone={i === 2 ? "orange" : "green"}>{l.tag}</Badge>
              <span className="text-xs text-[#71817b]">{l.time}</span>
            </div>
            <h3 className="mt-5 font-bold">{l.title}</h3>
            <p className="mt-2 text-xs leading-5 text-[#71817b]">
              Practical guidance to help you make safer, smarter financial
              decisions.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <Progress value={l.progress} />
              <span className="text-xs font-bold">{l.progress}%</span>
            </div>
            <Button variant="ghost" className="mt-4">
              {l.progress ? "Continue lesson" : "Start lesson"}{" "}
              <ArrowRight className="ml-1 inline" size={14} />
            </Button>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <p className="text-xs font-bold uppercase tracking-[.15em] text-[#139b70]">
          Quick quiz
        </p>
        <h3 className="mt-2 text-lg font-bold">
          What should you do if someone asks for your OTP?
        </h3>
        <div className="mt-5 grid gap-2 md:grid-cols-2">
          {[
            "Share it",
            "Ignore it",
            "Report/block the person",
            "Post it online",
          ].map((x, i) => (
            <button
              onClick={() => setSelected(i)}
              className={`rounded-xl border p-4 text-left text-sm ${selected === i ? (i === 2 ? "border-[#139b70] bg-[#e7f8ef]" : "border-red-300 bg-red-50") : "border-[#e7eeeb] hover:bg-[#f3f8f5]"}`}
              key={x}
            >
              {x}
            </button>
          ))}
        </div>
        {selected !== null && (
          <p
            className={`mt-4 flex items-center gap-2 text-sm font-semibold ${selected === 2 ? "text-[#139b70]" : "text-red-500"}`}
          >
            {selected === 2 ? (
              <CheckCircle2 size={16} />
            ) : (
              <ShieldAlert size={16} />
            )}{" "}
            {selected === 2
              ? "Correct. Never share OTPs — report and block suspicious requests."
              : "Not quite. Your OTP is private. Never share it with anyone."}
          </p>
        )}
      </Card>
    </>
  );
}
function Fraud() {
  const [checked, setChecked] = useState(false);
  return (
    <>
      <SectionTitle
        eyebrow="Safety center"
        title="Stay protected from digital fraud."
      />
      <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
        <Card>
          <h3 className="font-bold">Transaction checker</h3>
          <p className="mt-1 text-xs text-[#71817b]">
            Review a payment before you send it.
          </p>
          <div className="mt-5 space-y-3">
            <input placeholder="Amount (NPR)" className="field" />
            <input placeholder="Recipient name or phone" className="field" />
            <select className="field">
              <option>Payment method</option>
              <option>QR payment</option>
              <option>Wallet transfer</option>
            </select>
            <textarea
              placeholder="Message or description"
              className="field min-h-24"
            />
            <Button onClick={() => setChecked(true)}>Check transaction</Button>
          </div>
        </Card>
        <Card
          className={
            checked ? "border-red-200 bg-red-50/40" : "bg-[#102a27] text-white"
          }
        >
          {checked ? (
            <>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-red-100 text-red-500">
                  <ShieldAlert />
                </div>
                <div>
                  <Badge tone="red">HIGH RISK</Badge>
                  <p className="mt-1 text-xs text-[#71817b]">
                    Review completed just now
                  </p>
                </div>
              </div>
              <h3 className="mt-6 font-bold">Pause before sending.</h3>
              <ul className="mt-3 space-y-3 text-sm text-[#71817b]">
                <li>• Unusual payment request</li>
                <li>• Urgency language detected</li>
                <li>• Unknown recipient</li>
                <li>• Request for OTP</li>
              </ul>
              <div className="mt-5 rounded-xl bg-white p-4 text-xs leading-5 text-[#71817b]">
                <b className="text-[#102a27]">Recommendation</b>
                <br />
                Do not send money until the recipient is verified.
              </div>
            </>
          ) : (
            <>
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#1b574d] text-emerald-300">
                <ShieldCheck />
              </div>
              <h3 className="mt-6 text-xl font-bold">
                A second opinion for every payment.
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#a8c0b8]">
                Our demo checker highlights common scam signals like urgency,
                unknown recipients and OTP requests.
              </p>
            </>
          )}
        </Card>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {[
          "OTP scams",
          "Fake QR codes",
          "Fake payment screenshots",
          "Fake investment offers",
          "Impersonation",
          "Urgent requests",
        ].map((x) => (
          <Card key={x}>
            <ShieldAlert size={18} className="text-[#f2b84b]" />
            <h3 className="mt-4 text-sm font-bold">{x}</h3>
            <p className="mt-2 text-xs leading-5 text-[#71817b]">
              Learn the warning signs and protect your money.
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
function Simulator() {
  const [saving, setSaving] = useState(2000);
  const current = Math.ceil(100000 / 2000),
    next = Math.ceil(100000 / saving);
  return (
    <>
      <SectionTitle
        eyebrow="Plan with confidence"
        title="What if you changed one financial habit?"
      />
      <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
        <Card>
          <h3 className="font-bold">Your scenario</h3>
          <p className="mt-1 text-xs text-[#71817b]">
            Adjust the numbers and see the difference.
          </p>
          <div className="mt-6 space-y-5">
            <label className="block text-xs font-semibold">
              Monthly income
              <input value="48000" readOnly className="field mt-2" />
            </label>
            <label className="block text-xs font-semibold">
              Monthly expenses
              <input value="29420" readOnly className="field mt-2" />
            </label>
            <label className="block text-xs font-semibold">
              Monthly savings{" "}
              <span className="float-right text-[#139b70]">
                Rs. {saving.toLocaleString()}
              </span>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={saving}
                onChange={(e) => setSaving(+e.target.value)}
                className="mt-4 w-full accent-[#139b70]"
              />
            </label>
            <label className="block text-xs font-semibold">
              Financial goal
              <input
                value="Emergency Fund — Rs. 100,000"
                readOnly
                className="field mt-2"
              />
            </label>
          </div>
        </Card>
        <Card className="bg-[#102a27] text-white">
          <p className="text-xs font-semibold text-emerald-300">
            Your projection
          </p>
          <h3 className="mt-2 text-2xl font-bold">
            Small changes. Big difference.
          </h3>
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-[#173d37] p-4">
              <p className="text-xs text-[#a8c0b8]">Current plan</p>
              <p className="mt-2 text-xl font-bold">{current} months</p>
              <p className="mt-1 text-xs text-[#a8c0b8]">
                Save Rs. 2,000/month
              </p>
            </div>
            <div className="rounded-xl bg-emerald-400 p-4 text-[#102a27]">
              <p className="text-xs opacity-70">New scenario</p>
              <p className="mt-2 text-xl font-bold">{next} months</p>
              <p className="mt-1 text-xs opacity-70">
                Save Rs. {saving.toLocaleString()}/month
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-xl border border-[#32665c] p-4">
            <p className="text-sm font-semibold">
              {Math.max(0, current - next)} months earlier
            </p>
            <p className="mt-1 text-xs text-[#a8c0b8]">
              That&apos;s the power of a more intentional habit.
            </p>
          </div>
          <div className="mt-6 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { m: 0, a: 0, b: 0 },
                  { m: 10, a: 20000, b: saving * 10 },
                  { m: 20, a: 40000, b: saving * 20 },
                  { m: 30, a: 60000, b: saving * 30 },
                  { m: 40, a: 80000, b: saving * 40 },
                  { m: 50, a: 100000, b: saving * 50 },
                ]}
              >
                <XAxis dataKey="m" hide />
                <YAxis hide />
                <Area
                  dataKey="a"
                  stroke="#94aaa3"
                  fill="none"
                  strokeDasharray="4 4"
                />
                <Area
                  dataKey="b"
                  stroke="#61e2ad"
                  fill="#61e2ad"
                  fillOpacity=".15"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
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
                <td className="py-4 font-medium" key={j}>
                  {j === r.length - 1 ? (
                    <Badge
                      tone={
                        x.includes("Out") || x.includes("Over")
                          ? "red"
                          : x.includes("Low") || x.includes("Due")
                            ? "orange"
                            : "green"
                      }
                    >
                      {x}
                    </Badge>
                  ) : (
                    x
                  )}
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
    <div className="fixed inset-0 z-50 grid place-items-center bg-[#102a27]/40 p-5">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-bold">{title}</h2>
          <button onClick={onClose} className="text-xl text-[#71817b]">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
