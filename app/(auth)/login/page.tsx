import Link from "next/link";
export default function Login() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f8faf9] p-5">
      <div className="w-full max-w-md">
        <Link href="/" className="mb-8 block text-center text-xl font-bold">
          nepal<span className="text-[#139b70]">fi</span>
        </Link>
        <div className="rounded-2xl border border-[#e7eeeb] bg-white p-7 shadow-xl md:p-9">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-[#71817b]">
            Log in to continue to your NepalFi account.
          </p>
          <form className="mt-7 space-y-4">
            <label className="block text-xs font-semibold">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="field mt-2"
              />
            </label>
            <label className="block text-xs font-semibold">
              Password
              <input
                type="password"
                placeholder="••••••••"
                className="field mt-2"
              />
            </label>
            <div className="flex justify-between text-xs">
              <label className="flex gap-2 text-[#71817b]">
                <input type="checkbox" /> Remember me
              </label>
              <a className="font-semibold text-[#139b70]" href="#">
                Forgot password?
              </a>
            </div>
            <Link
              href="/dashboard"
              className="block rounded-xl bg-[#139b70] py-3 text-center text-sm font-bold text-white"
            >
              Log in
            </Link>
          </form>
          <div className="my-6 text-center text-xs text-[#9aa9a4]">or</div>
          <button className="w-full rounded-xl border border-[#d8e5df] py-3 text-sm font-semibold">
            Continue with Google
          </button>
          <p className="mt-7 text-center text-xs text-[#71817b]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-bold text-[#139b70]">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
