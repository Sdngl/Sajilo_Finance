"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("EMAIL LOGIN ERROR:", err);
      if (
        err?.code === "auth/invalid-credential" ||
        err?.code === "auth/user-not-found" ||
        err?.code === "auth/wrong-password"
      ) {
        setError("Invalid email or password.");
      } else {
        setError("Login failed. Check your credentials.");
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: "select_account",
      });

      await signInWithPopup(auth, provider);
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("GOOGLE LOGIN ERROR:", err);
      setError("Google Sign-In failed.");
      setLoading(false);
    }
  };

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

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 p-3 text-center text-xs font-semibold text-red-600 border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleEmailLogin} className="mt-7 space-y-4">
            <label className="block text-xs font-semibold">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="field mt-2 w-full rounded-xl border border-[#d8e5df] p-3 text-sm font-normal outline-none focus:border-[#139b70]"
              />
            </label>

            <label className="block text-xs font-semibold">
              Password
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="field mt-2 w-full rounded-xl border border-[#d8e5df] p-3 text-sm font-normal outline-none focus:border-[#139b70]"
              />
            </label>

            <div className="flex justify-between text-xs">
              <label className="flex gap-2 text-[#71817b]">
                <input type="checkbox" className="rounded" /> Remember me
              </label>
              <a className="font-semibold text-[#139b70]" href="#">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#139b70] py-3 text-center text-sm font-bold text-white transition hover:bg-[#108560] disabled:bg-gray-400 cursor-pointer"
            >
              {loading ? "Checking..." : "Log in"}
            </button>
          </form>

          <div className="my-6 text-center text-xs text-[#9aa9a4]">or</div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="flex w-full items-center justify-center gap-3 rounded-xl border border-[#d8e5df] py-3 text-sm font-semibold transition hover:bg-gray-50 disabled:bg-gray-100 cursor-pointer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg"
              alt="Google"
              className="h-4 w-4 pointer-events-none"
            />
            <span>{loading ? "Connecting..." : "Continue with Google"}</span>
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