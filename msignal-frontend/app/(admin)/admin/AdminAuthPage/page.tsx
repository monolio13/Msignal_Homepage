/** @format */
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type AuthMode = "login" | "register";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

type AdminMe = {
  sub: string;
  email: string;
  role: "admin";
};

export default function AdminAuthPage() {
  const router = useRouter();

 const API_BASE =
    process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:3001";
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

  const authTokenKey = "adminToken";

  const gradientBg = useMemo(
    () =>
      "bg-[#060A0F] [background-image:radial-gradient(1200px_600px_at_10%_10%,rgba(0,234,255,0.14),transparent_60%),radial-gradient(900px_500px_at_90%_20%,rgba(255,100,180,0.12),transparent_55%)]",
    []
  );

  async function api<T>(path: string, init?: RequestInit): Promise<T> {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(authTokenKey) : null;

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
  }

  async function loadMe() {
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
  }

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem(authTokenKey) : null;
    if (!token) {
      setLoading(false);
      return;
    }
    loadMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function clearNotices() {
    setError(null);
    setOk(null);
  }

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    clearNotices();
    setSubmitting(true);

    try {
      const data = await api<{
        access_token: string;
        admin: { email: string };
      }>("/admin/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      localStorage.setItem(authTokenKey, data.access_token);
      await loadMe();

      // ✅ redirect to admin dashboard page
      // change this to your real admin dashboard route later
      router.push("/admin");
    } catch (e: any) {
      setError(e?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onRegister(e: React.FormEvent) {
    e.preventDefault();
    clearNotices();

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    try {
      // ✅ register endpoint
      await api<{ admin: { email: string } }>("/admin/auth/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });

      // Option A: force user to login after register (recommended)
      setOk("Admin created successfully. Please sign in.");
      setMode("login");
    } catch (e: any) {
      setError(e?.message || "Register failed");
    } finally {
      setSubmitting(false);
    }
  }

  function onLogout() {
    localStorage.removeItem(authTokenKey);
    setMe(null);
    setError(null);
    setOk(null);
    setMode("login");
  }

  const Card = ({ children }: { children: React.ReactNode }) => (
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

  const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input
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

  if (loading) {
    return (
      <div
        className={cx(
          "min-h-screen w-full text-white",
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

  // If already logged in, show a small "continue" card
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
              onClick={() => router.push("/admin/dashboard")}
              className={cx(
                "h-11 w-full rounded-xl font-extrabold",
                "text-[#041018]",
                "bg-gradient-to-r from-cyan-400 to-sky-400",
                "shadow-[0_10px_25px_rgba(0,234,255,0.15)]",
                "transition active:scale-[0.99]"
              )}>
              Go to Dashboard
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

  // Auth form (login/register)
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
            onClick={() => {
              clearNotices();
              setMode("login");
            }}
            className={cx(
              "h-10 rounded-xl text-sm font-extrabold transition",
              mode === "login"
                ? "bg-black/30 border border-white/10"
                : "hover:bg-white/5"
            )}>
            Login
          </button>
          <button
            type="button"
            onClick={() => {
              clearNotices();
              setMode("register");
            }}
            className={cx(
              "h-10 rounded-xl text-sm font-extrabold transition",
              mode === "register"
                ? "bg-black/30 border border-white/10"
                : "hover:bg-white/5"
            )}>
            Register
          </button>
        </div>

        <form
          onSubmit={mode === "login" ? onLogin : onRegister}
          className="space-y-4">
          <div className="space-y-2">
            <label className="text-[12px] font-medium text-white/80">
              Email
            </label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[12px] font-medium text-white/80">
              Password
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
            />
          </div>

          {mode === "register" ? (
            <div className="space-y-2">
              <label className="text-[12px] font-medium text-white/80">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
              />
              <div className="text-[12px] text-white/55">
                Minimum 8 characters. Use a strong password.
              </div>
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className={cx(
              "h-11 w-full rounded-xl font-extrabold",
              "text-[#041018]",
              "bg-gradient-to-r from-cyan-400 to-sky-400",
              "shadow-[0_10px_25px_rgba(0,234,255,0.15)]",
              "transition active:scale-[0.99]",
              submitting && "opacity-80"
            )}>
            {submitting
              ? mode === "login"
                ? "Signing in..."
                : "Creating..."
              : mode === "login"
              ? "Sign In"
              : "Create Admin"}
          </button>

          <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12px] text-white/70">
            {mode === "login" ? (
              <>
                Login endpoint:{" "}
                <code className="rounded-lg border border-white/10 bg-black/30 px-2 py-0.5 text-white/85">
                  {API_BASE}/admin/auth/login
                </code>
              </>
            ) : (
              <>
                Register endpoint:{" "}
                <code className="rounded-lg border border-white/10 bg-black/30 px-2 py-0.5 text-white/85">
                  {API_BASE}/admin/auth/register
                </code>
              </>
            )}
          </div>

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
        </form>

        {/* quick hint */}
        <div className="mt-4 text-center text-[12px] text-white/55">
          {mode === "login" ? (
            <>
              Don’t have an admin yet?{" "}
              <button
                type="button"
                onClick={() => {
                  clearNotices();
                  setMode("register");
                }}
                className="font-semibold text-cyan-200 hover:text-cyan-100">
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an admin?{" "}
              <button
                type="button"
                onClick={() => {
                  clearNotices();
                  setMode("login");
                }}
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
