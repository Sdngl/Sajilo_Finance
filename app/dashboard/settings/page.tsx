import { DashboardShell } from "../../../components/layout/DashboardShell";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold tracking-[-.03em] text-[#102a27] sm:text-3xl">
          Settings
        </h1>
        <p className="mt-2 text-sm text-[#71817b]">
          Manage your account preferences and security.
        </p>

        <section className="mt-8 rounded-2xl border border-[#e7eeeb] bg-white p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:border-[#139b70]/30">
          <h2 className="text-lg font-bold">Profile</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">
                Full name
              </label>
              <input
                defaultValue="Navin Shrestha"
                className="field mt-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">
                Email
              </label>
              <input
                defaultValue="navin@example.com"
                className="field mt-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">
                Phone
              </label>
              <input
                defaultValue="+977 9841 234 567"
                className="field mt-2"
                readOnly
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#71817b]">
                Account type
              </label>
              <input
                defaultValue="Personal"
                className="field mt-2"
                readOnly
              />
            </div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#e7eeeb] bg-white p-5 sm:p-6 transition-all duration-200 hover:shadow-lg hover:border-[#139b70]/30">
          <h2 className="text-lg font-bold">Security</h2>
          <div className="mt-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-[#e7eeeb] p-4 transition-all duration-200 hover:border-[#139b70]/30 hover:shadow-md">
              <div>
                <p className="text-sm font-semibold">Two-factor authentication</p>
                <p className="text-xs text-[#71817b]">
                  Add an extra layer of security.
                </p>
              </div>
              <button className="rounded-xl bg-[#139b70] px-4 py-2 text-xs font-bold text-white transition-all duration-200 hover:bg-[#0f805d] hover:shadow-md hover:shadow-emerald-900/20">
                Enable
              </button>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-[#e7eeeb] p-4 transition-all duration-200 hover:border-[#139b70]/30 hover:shadow-md">
              <div>
                <p className="text-sm font-semibold">Change password</p>
                <p className="text-xs text-[#71817b]">
                  Update your password regularly.
                </p>
              </div>
              <button className="rounded-xl border border-[#d8e5df] px-4 py-2 text-xs font-semibold text-[#193a31] transition-all duration-200 hover:border-[#139b70] hover:text-[#139b70] hover:shadow-md">
                Update
              </button>
            </div>
          </div>
        </section>
      </div>
    </DashboardShell>
  );
}
