"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("Personal account");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const router = useRouter();

  // ========================================
  // EMAIL / PASSWORD REGISTER
  // ========================================

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2. Update Display Name in Firebase Auth
      await updateProfile(user, {
        displayName: fullName,
      });

      // 3. Save additional user details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        fullName,
        email,
        accountType,
        provider: "email",
        createdAt: new Date().toISOString(),
      });

      // 4. Redirect to Dashboard
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("REGISTRATION ERROR:", err);

      if (err?.code === "auth/email-already-in-use") {
        setError("This email address is already in use.");
      } else if (err?.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (err?.code === "auth/weak-password") {
        setError("Password is too weak.");
      } else {
        setError("Failed to create account. Please try again.");
      }

      setLoading(false);
    }
  };

  // ========================================
  // GOOGLE REGISTER
  // ========================================

  const handleGoogleRegister = async () => {
    setError("");
    setGoogleLoading(true);

    try {
      const provider = new GoogleAuthProvider();

      // Open Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      // Save Google user information in Firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          fullName: user.displayName || "Google User",
          email: user.email || "",
          accountType,
          provider: "google",
          createdAt: new Date().toISOString(),
        },
        {
          merge: true,
        }
      );

      // Redirect to Dashboard
      router.replace("/dashboard");
    } catch (err: any) {
      console.error("GOOGLE REGISTRATION ERROR:", err);

      if (err?.code === "auth/popup-closed-by-user") {
        setError("Google sign-in was cancelled.");
      } else if (err?.code === "auth/popup-blocked") {
        setError("Google sign-in popup was blocked. Please allow popups.");
      } else if (err?.code === "auth/account-exists-with-different-credential") {
        setError(
          "An account already exists with this email using another sign-in method."
        );
      } else {
        setError("Failed to sign up with Google. Please try again.");
      }

      setGoogleLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#f8faf9] p-5">
      <div className="w-full max-w-md">
        {/* LOGO */}
        <Link href="/" className="mb-8 block text-center text-xl font-bold">
          nepal<span className="text-[#139b70]">fi</span>
        </Link>

        {/* REGISTER CARD */}
        <div className="rounded-2xl border border-[#e7eeeb] bg-white p-7 shadow-xl md:p-9">
          <h1 className="text-2xl font-bold">Create your account</h1>

          <p className="mt-2 text-sm text-[#71817b]">
            Start building better money habits today.
          </p>

          {/* ERROR */}
          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-xs font-semibold text-red-600">
              {error}
            </div>
          )}

          {/* GOOGLE BUTTON */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            disabled={googleLoading || loading}
            className="mt-7 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-[#d8e5df] bg-white py-3 text-sm font-semibold text-[#253b35] transition hover:bg-[#f5f8f7] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {/* Google Icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21.805 12.23c0-.79-.065-1.545-.205-2.27H12v4.3h5.49a4.7 4.7 0 0 1-2.04 3.08v2.56h3.3c1.93-1.78 3.055-4.4 3.055-7.67Z"
                fill="#4285F4"
              />
              <path
                d="M12 22c2.76 0 5.075-.915 6.765-2.48l-3.3-2.56c-.915.615-2.08.98-3.465.98-2.665 0-4.925-1.8-5.735-4.22H2.85v2.64A10.22 10.22 0 0 0 12 22Z"
                fill="#34A853"
              />
              <path
                d="M6.265 13.72A6.14 6.14 0 0 1 5.945 12c0-.6.11-1.18.32-1.72V7.64H2.85A10 10 0 0 0 1.78 12c0 1.61.385 3.135 1.07 4.36l3.415-2.64Z"
                fill="#FBBC05"
              />
              <path
                d="M12 6.06c1.5 0 2.85.515 3.91 1.525l2.93-2.93C17.07 3.045 14.755 2 12 2a10.22 10.22 0 0 0-9.15 5.64l3.415 2.64C7.075 7.86 9.335 6.06 12 6.06Z"
                fill="#EA4335"
              />
            </svg>

            {googleLoading ? "Connecting to Google..." : "Continue with Google"}
          </button>

          {/* DIVIDER */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-[#e7eeeb]" />
            <span className="text-[11px] font-medium text-[#9aa9a4]">
              OR
            </span>
            <div className="h-px flex-1 bg-[#e7eeeb]" />
          </div>

          {/* EMAIL REGISTER FORM */}
          <form onSubmit={handleRegister} className="space-y-4">
            {/* FULL NAME */}
            <label className="block text-xs font-semibold">
              Full name

              <input
                type="text"
                placeholder="Navin Shrestha"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="field mt-2 w-full rounded-xl border border-[#d8e5df] p-3 text-sm font-normal outline-none focus:border-[#139b70]"
              />
            </label>

            {/* EMAIL */}
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

            {/* PASSWORD */}
            <label className="block text-xs font-semibold">
              Password

              <input
                type="password"
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="field mt-2 w-full rounded-xl border border-[#d8e5df] p-3 text-sm font-normal outline-none focus:border-[#139b70]"
              />
            </label>

            {/* ACCOUNT TYPE */}
            <label className="block text-xs font-semibold">
              Account type

              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
                className="field mt-2 w-full rounded-xl border border-[#d8e5df] p-3 text-sm font-normal outline-none focus:border-[#139b70]"
              >
                <option value="Personal account">
                  Personal account
                </option>

                <option value="Business account">
                  Business account
                </option>
              </select>
            </label>

            {/* CREATE ACCOUNT */}
            <button
              type="submit"
              disabled={loading || googleLoading}
              className="w-full cursor-pointer rounded-xl bg-[#139b70] py-3 text-center text-sm font-bold text-white transition hover:bg-[#108560] disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* LOGIN */}
          <p className="mt-7 text-center text-xs text-[#71817b]">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#139b70]">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}