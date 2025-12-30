/** @format */
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type AuthMode = "login" | "register";

type AdminMe = {
  sub: string;
  email: string;
  role: "admin";
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** ✅ Keep Card OUTSIDE component so it does NOT remount on every keystroke */
const Card = React.memo(function Card({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={cx(
        "relative w-full max-w-[560px]",
        "rounded-2xl border border-cyan-300/20 bg-[#0A1016]/90",
        "shadow-[0_16px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl",
        "p-5 sm:p-6"
      )}>
      <div className="absolute inset-x-0 top-0 h-[2px] rounded-t-2xl bg-gradient-to-r from-cyan-400/70 via-sky-400/70 to-fuchsia-400/50" />
      {children}
    </motion.div>
  );
});

/** ✅ Keep Input OUTSIDE too (and forwardRef for better UX) */
const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={cx(
        "h-11 w-full rounded-xl px-3 text-[14px] text-white",
        "border border-white/10 bg-white/5 outline-none",
        "placeholder:text-white/35",
        "focus:border-cyan-300/40 focus:ring-2 focus:ring-cyan-300/20",
        props.className
      )}
    />
  );
});

export default function AdminAuthPage() {
  const router = useRouter();

  const API_BASE =
    process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:3001";

  const authTokenKey = "adminToken";

  const gradientBg = useMemo(
    () =>
      "bg-[#060A0F] [background-image:radial-gradient(1200px_600px_at_10%_10%,rgba(0,234,255,0.14),transparent_60%),radial-gradient(900px_500px_at_90%_20%,rgba(255,100,180,0.12),transparent_55%)]",
    []
  );

  const [mode, setMode] = useState<AuthMode>("login");

  // form
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true); // initial auth check
  const [me, setMe] = useState<AdminMe | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [capsOn, setCapsOn] = useState(false);

  const [touched, setTouched] = useState({
    email: false,
    password: false,
    confirm: false,
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const clearNotices = useCallback(() => {
    setError(null);
    setOk(null);
  }, []);

  const emailTrimmed = email.trim();
  const isEmailValid = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed),
    [emailTrimmed]
  );

  const emailError = !emailTrimmed
    ? "Email is required."
    : !isEmailValid
    ? "Enter a valid email address."
    : "";

  const passwordError = !password
    ? "Password is required."
    : mode === "register" && password.length < 8
    ? "Password must be at least 8 characters."
    : "";

  const confirmError =
    mode === "register"
      ? !confirmPassword
        ? "Please confirm your password."
        : confirmPassword !== password
        ? "Passwords do not match."
        : ""
      : "";

  const showEmailErr = (touched.email || submitAttempted) && !!emailError;
  const showPassErr = (touched.password || submitAttempted) && !!passwordError;
  const showConfirmErr = (touched.confirm || submitAttempted) && !!confirmError;

  const canSubmit =
    !submitting && !emailError && !passwordError && !confirmError;

  const handleCapsCheck = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      setCapsOn(!!e.getModifierState?.("CapsLock"));
    },
    []
  );

  const switchMode = useCallback(
    (next: AuthMode) => {
      clearNotices();
      setMode(next);

      // Pro UX: clear sensitive fields and validation state
      setPassword("");
      setConfirmPassword("");
      setTouched({ email: false, password: false, confirm: false });
      setSubmitAttempted(false);
      setCapsOn(false);
      setShowPass(false);
      setShowConfirm(false);
    },
    [clearNotices]
  );

  const api = useCallback(
    async <T,>(path: string, init?: RequestInit): Promise<T> => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem(authTokenKey)
          : null;

      const res = await fetch(`${API_BASE}${path}`, {
        ...init,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...(init?.headers || {}),
        },
      });

      if (!res.ok) {
        let msg = `${res.status} ${res.statusText}`;
        try {
          const j = await res.json();
          msg = j?.message ? String(j.message) : msg;
        } catch {}
        throw new Error(msg);
      }
      return (await res.json()) as T;
    },
    [API_BASE]
  );

  const loadMe = useCallback(async () => {
    setError(null);
    try {
      const data = await api<{ user: AdminMe }>("/admin/auth/me");
      setMe(data.user);
    } catch {
      setMe(null);
      if (typeof window !== "undefined") localStorage.removeItem(authTokenKey);
    } finally {
      setLoading(false);
    }
  }, [api]);

  // initial auth check
  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(authTokenKey) : null;

    if (!token) {
      setLoading(false);
      return;
    }
    loadMe();
  }, [loadMe]);

  const onLogin = useCallback(async () => {
    clearNotices();
    setSubmitting(true);

    try {
      const data = await api<{
        access_token: string;
        admin: { email: string };
      }>("/admin/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: emailTrimmed, password }),
      });

      localStorage.setItem(authTokenKey, data.access_token);
      await loadMe();

      // ✅ Professional: replace so back button doesn’t go back to login
      router.replace("/admin");
    } catch (e: any) {
      setError(e?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }, [api, clearNotices, emailTrimmed, loadMe, password, router]);

  const onRegister = useCallback(async () => {
    clearNotices();
    setSubmitting(true);

    try {
      await api<{ admin: { email: string } }>("/admin/auth/register", {
        method: "POST",
        body: JSON.stringify({ email: emailTrimmed, password }),
      });

      setOk("Admin created successfully. Please sign in.");
      switchMode("login");
    } catch (e: any) {
      setError(e?.message || "Register failed");
    } finally {
      setSubmitting(false);
    }
  }, [api, clearNotices, emailTrimmed, password, switchMode]);

  const onLogout = useCallback(() => {
    localStorage.removeItem(authTokenKey);
    setMe(null);
    setMode("login");
    setPassword("");
    setConfirmPassword("");
    clearNotices();
  }, [clearNotices]);

  const handleAuthSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitAttempted(true);
      setTouched({ email: true, password: true, confirm: true });

      if (!canSubmit) return;

      if (mode === "login") return onLogin();
      return onRegister();
    },
    [canSubmit, mode, onLogin, onRegister]
  );

  // --------------------
  // Loading
  // --------------------
  if (loading) {
    return (
      <div
        className={cx(
          "min-h-screen w-full text-white",
          gradientBg,
          "flex items-center justify-center px-4 py-8"
        )}>
        <Card>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
            Loading…
          </div>
        </Card>
      </div>
    );
  }

  // --------------------
  // Already logged in
  // --------------------
  if (me) {
    return (
      <div
        className={cx(
          "min-h-screen w-full text-white",
          gradientBg,
          "flex items-center justify-center px-4 py-8"
        )}>
        <Card>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <div className="text-[20px] font-extrabold tracking-tight sm:text-[22px]">
                Admin Access
              </div>
              <div className="mt-1 text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
                You are already signed in.
              </div>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px] border border-white/10 bg-white/5 text-white/80">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              Logged in
            </span>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="text-[12px] text-white/60">Signed in as</div>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <span className="font-semibold text-white">{me.email}</span>
              <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[12px] text-white/80">
                role: {me.role}
              </span>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              onClick={() => router.replace("/admin")}
              className={cx(
                "h-11 w-full rounded-xl font-extrabold",
                "text-[#041018]",
                "bg-gradient-to-r from-cyan-400 to-sky-400",
                "shadow-[0_10px_25px_rgba(0,234,255,0.15)]",
                "transition active:scale-[0.99]"
              )}>
              Go to Admin Panel
            </button>

            <button
              onClick={onLogout}
              className={cx(
                "h-11 w-full rounded-xl border border-white/10 bg-white/5",
                "text-sm font-semibold text-white",
                "transition hover:bg-white/10 active:scale-[0.99]"
              )}>
              Logout
            </button>
          </div>
        </Card>
      </div>
    );
  }

  // --------------------
  // Auth form
  // --------------------
  return (
    <div
      className={cx(
        "min-h-screen w-full text-white",
        gradientBg,
        "flex items-center justify-center px-4 py-8"
      )}>
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute left-1/2 top-24 h-40 w-[38rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-40 w-72 rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>

      <Card>
        {/* header */}
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <div className="text-[20px] font-extrabold tracking-tight sm:text-[22px]">
              {mode === "login" ? "Admin Login" : "Admin Register"}
            </div>
            <div className="mt-1 text-[12px] leading-relaxed text-white/70 sm:text-[13px]">
              {mode === "login"
                ? "Sign in to manage users, uploads, and content."
                : "Create a new admin account for internal management."}
            </div>
          </div>

          <span
            className={cx(
              "inline-flex items-center gap-2 rounded-full px-3 py-1 text-[12px]",
              "border border-white/10 bg-white/5 text-white/80"
            )}>
            <span
              className={cx(
                "h-2 w-2 rounded-full",
                mode === "login" ? "bg-amber-400" : "bg-cyan-300"
              )}
            />
            {mode === "login" ? "Login" : "Register"}
          </span>
        </div>

        {/* mode switch */}
        <div className="mb-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/10 bg-white/5 p-1">
          <button
            type="button"
            disabled={submitting}
            onClick={() => switchMode("login")}
            className={cx(
              "h-10 rounded-xl text-sm font-extrabold transition",
              mode === "login"
                ? "bg-black/30 border border-white/10"
                : "hover:bg-white/5",
              submitting && "opacity-60 cursor-not-allowed"
            )}>
            Login
          </button>

          <button
            type="button"
            disabled={submitting}
            onClick={() => switchMode("register")}
            className={cx(
              "h-10 rounded-xl text-sm font-extrabold transition",
              mode === "register"
                ? "bg-black/30 border border-white/10"
                : "hover:bg-white/5",
              submitting && "opacity-60 cursor-not-allowed"
            )}>
            Register
          </button>
        </div>

        <form onSubmit={handleAuthSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-white/80">
              Email
            </label>

            <Input
              value={email}
              onChange={(e) => {
                clearNotices();
                setEmail(e.target.value);
              }}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              placeholder="admin@example.com"
              autoComplete="username"
              inputMode="email"
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
              aria-invalid={showEmailErr}
            />

            {showEmailErr ? (
              <div className="text-[12px] text-red-200">{emailError}</div>
            ) : (
              <div className="text-[12px] text-white/45">
                Use your admin email (no spaces).
              </div>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-white/80">
              Password
            </label>

            <div className="relative">
              <Input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  clearNotices();
                  setPassword(e.target.value);
                }}
                onBlur={() => setTouched((t) => ({ ...t, password: true }))}
                onKeyUp={handleCapsCheck}
                placeholder="••••••••"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
                aria-invalid={showPassErr}
              />

              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className={cx(
                  "absolute right-2 top-1/2 -translate-y-1/2",
                  "h-8 rounded-lg px-3 text-[12px] font-extrabold",
                  "border border-white/10 bg-white/5 text-white/80",
                  "hover:bg-white/10 transition"
                )}>
                {showPass ? "Hide" : "Show"}
              </button>
            </div>

            {capsOn ? (
              <div className="text-[12px] text-amber-200">Caps Lock is ON.</div>
            ) : null}

            {showPassErr ? (
              <div className="text-[12px] text-red-200">{passwordError}</div>
            ) : mode === "register" ? (
              <div className="text-[12px] text-white/55">
                Minimum 8 characters. Use a strong password.
              </div>
            ) : (
              <div className="text-[12px] text-white/45">
                Enter your admin password.
              </div>
            )}
          </div>

          {/* Confirm Password */}
          {mode === "register" ? (
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-white/80">
                Confirm Password
              </label>

              <div className="relative">
                <Input
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    clearNotices();
                    setConfirmPassword(e.target.value);
                  }}
                  onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
                  onKeyUp={handleCapsCheck}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  aria-invalid={showConfirmErr}
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className={cx(
                    "absolute right-2 top-1/2 -translate-y-1/2",
                    "h-8 rounded-lg px-3 text-[12px] font-extrabold",
                    "border border-white/10 bg-white/5 text-white/80",
                    "hover:bg-white/10 transition"
                  )}>
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>

              {showConfirmErr ? (
                <div className="text-[12px] text-red-200">{confirmError}</div>
              ) : (
                <div className="text-[12px] text-white/45">
                  Re-enter the same password.
                </div>
              )}
            </div>
          ) : null}

          {/* Submit */}
          <button
            type="submit"
            disabled={!canSubmit}
            className={cx(
              "h-11 w-full rounded-xl font-extrabold",
              "text-[#041018]",
              "bg-gradient-to-r from-cyan-400 to-sky-400",
              "shadow-[0_10px_25px_rgba(0,234,255,0.15)]",
              "transition active:scale-[0.99]",
              (!canSubmit || submitting) && "opacity-60 cursor-not-allowed"
            )}>
            {submitting ? (
              <span className="inline-flex items-center justify-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none">
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="3"
                    opacity="0.25"
                  />
                  <path
                    d="M21 12a9 9 0 0 0-9-9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                {mode === "login" ? "Signing in..." : "Creating..."}
              </span>
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Admin"
            )}
          </button>

          {/* Notices */}
          <div aria-live="polite" className="space-y-2">
            {ok ? (
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-[13px] leading-relaxed text-emerald-100">
                {ok}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-3 py-2 text-[13px] leading-relaxed text-red-100">
                {error}
              </div>
            ) : null}
          </div>
        </form>

        {/* quick hint */}
        <div className="mt-4 text-center text-[12px] text-white/55">
          {mode === "login" ? (
            <>
              Don’t have an admin yet?{" "}
              <button
                type="button"
                onClick={() => switchMode("register")}
                className="font-semibold text-cyan-200 hover:text-cyan-100">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an admin?{" "}
              <button
                type="button"
                onClick={() => switchMode("login")}
                className="font-semibold text-cyan-200 hover:text-cyan-100">
                Sign in
              </button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
