import { DashboardShell } from "../../../components/layout/DashboardShell";

export default function HelpPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-[-.03em] text-[#102a27] sm:text-3xl">
          Help center
        </h1>
        <p className="mt-2 text-sm text-[#71817b]">
          Find answers, guides and support resources.
        </p>

        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            [
              "Getting started",
              "Learn how to set up your account and explore NepalFi.",
            ],
            [
              "Payments & transfers",
              "How to send money, pay bills and track transactions.",
            ],
            [
              "Savings goals",
              "Create and manage your financial goals.",
            ],
            [
              "Business tools",
              "Inventory, sales, expenses and customer credit.",
            ],
            [
              "Fraud protection",
              "Spot scams and keep your money safe.",
            ],
            [
              "Account & security",
              "Password, 2FA and profile settings.",
            ],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="rounded-2xl border border-[#e7eeeb] bg-white p-5 transition-all duration-200 hover:shadow-lg hover:border-[#139b70]/30 hover:-translate-y-1"
            >
              <h3 className="text-sm font-bold">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-[#71817b]">{desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 rounded-2xl border border-[#e7eeeb] bg-white p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:border-[#139b70]/30">
          <h2 className="text-lg font-bold">Contact support</h2>
          <p className="mt-2 text-sm text-[#71817b]">
            Need more help? Reach our support team.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-sm">
            <p>
              <span className="font-semibold">Email:</span> support@nepalfi.com
            </p>
            <p>
              <span className="font-semibold">Phone:</span> +977 9800 000 000
            </p>
            <p>
              <span className="font-semibold">Hours:</span> Sun-Fri, 9 AM - 6 PM
            </p>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
