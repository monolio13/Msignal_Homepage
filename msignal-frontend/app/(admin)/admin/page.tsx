/** @format */
"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

type LeadType = "FREE_TRIAL" | "CONSULT";

type AdminLeadItem = {
  type: LeadType;
  id: string;
  name: string;
  phone: string;
  createdAt: string; // ISO from backend
  agreePersonal: boolean;
  agreeMarketing: boolean;

  ageRange?: string;
  investAmount?: string;

  inquiryTypes?: string[];
};

type LeadsResponse = {
  items: AdminLeadItem[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type AdminMe = {
  sub: string;
  email: string;
  role: "admin";
};

type TabKey = "customers" | "board" | "ea_ui";

type CustomerRow = {
  id: string; // Prisma cuid
  joinedAt: string;
  source: string; // FREE_TRIAL or CONSULT (or label)
  name: string;
  ageGroup: string;
  phone: string;
  collected: string;
  managed: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function IconUsers({ active }: { active?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={cx(active ? "text-cyan-300" : "text-white/70")}>
      <path
        d="M16 11a4 4 0 10-8 0 4 4 0 008 0z"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IconBoard({ active }: { active?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={cx(active ? "text-cyan-300" : "text-white/70")}>
      <path
        d="M7 7h10M7 12h10M7 17h6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

function IconTool({ active }: { active?: boolean }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      className={cx(active ? "text-cyan-300" : "text-white/70")}>
      <path
        d="M14 7l3 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M10 4a4 4 0 015.657 5.657l-8.9 8.9a2 2 0 01-2.828 0l-.1-.1a2 2 0 010-2.828l8.9-8.9A3.98 3.98 0 0010 4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={cx(
        "relative inline-flex h-7 w-14 items-center rounded-full transition",
        checked
          ? "bg-emerald-400 shadow-[0_0_0_4px_rgba(16,185,129,0.12)]"
          : "bg-white/10"
      )}>
      <span
        className={cx(
          "inline-block h-6 w-6 rounded-full bg-white shadow transition",
          checked ? "translate-x-7" : "translate-x-1"
        )}
      />
    </button>
  );
}

function StatPill({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
      <div className="text-[11px] font-semibold text-white/60">{label}</div>
      <div className="text-sm font-extrabold text-white">{value}</div>
    </div>
  );
}

export default function Admin() {
  const router = useRouter();
  const API_BASE =
    process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
    "http://localhost:3001";
  const authTokenKey = "adminToken";

  const [loading, setLoading] = useState(true);
  const [me, setMe] = useState<AdminMe | null>(null);
  const [error, setError] = useState<string | null>(null);

  // login form
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // UI state
  const [tab, setTab] = useState<TabKey>("customers");
  const [q, setQ] = useState("");
  const [rowsLoading, setRowsLoading] = useState(false);
  const [rowsError, setRowsError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const limit = 50; // you can change later
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // demo data (replace with API later)
  const [rows, setRows] = useState<CustomerRow[]>([
    {
      id: "2",
      joinedAt: "25.12.22 11:30",
      source: "셀퍼럴",
      name: "김레오",
      ageGroup: "50대",
      phone: "010-1234-5678",
      collected: "300만원",
      managed: false,
    },
    {
      id: "1",
      joinedAt: "25.12.22 11:30",
      source: "동반가입",
      name: "김레오",
      ageGroup: "30대",
      phone: "010-1234-5678",
      collected: "100~200만원",
      managed: true,
    },
  ]);

  // sort
  const [sortKey, setSortKey] = useState<"id" | "joinedAt" | "source">("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

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

  function formatKST(iso: string) {
    const d = new Date(iso);
    const yy = String(d.getFullYear()).slice(-2);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${yy}.${mm}.${dd} ${hh}:${mi}`;
  }

  function inquiryLabel(types?: string[]) {
    if (!types?.length) return "-";
    const map: Record<string, string> = {
      AUTO_TRADING: "자동매매 참여",
      PROFIT_COUNSEL: "수익 계산 상담",
      SELF_REFERRAL: "셀퍼럴 파트너",
    };
    return types.map((t) => map[t] ?? t).join(", ");
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

  function leadToRow(lead: AdminLeadItem): CustomerRow {
    if (lead.type === "FREE_TRIAL") {
      return {
        id: lead.id,
        joinedAt: formatKST(lead.createdAt),
        source: "무료체험", // your “유입경로” column
        name: lead.name,
        ageGroup: lead.ageRange ?? "-",
        phone: lead.phone,
        collected: lead.investAmount ?? "-",
        managed: false, // local-only for now
      };
    }

    // CONSULT
    return {
      id: lead.id,
      joinedAt: formatKST(lead.createdAt),
      source: "상담신청",
      name: lead.name,
      ageGroup: "-", // no age on consult
      phone: lead.phone,
      collected: inquiryLabel(lead.inquiryTypes),
      managed: false,
    };
  }

  async function loadLeads(nextPage = page, keyword = q) {
    setRowsLoading(true);
    setRowsError(null);

    try {
      const params = new URLSearchParams();
      params.set("type", "all");
      params.set("page", String(nextPage));
      params.set("limit", String(limit));
      if (keyword.trim()) params.set("search", keyword.trim());

      const data = await api<LeadsResponse>(
        `/admin/auth/leads?${params.toString()}`
      );

      setRows(data.items.map(leadToRow));
      setPage(data.page);
      setTotalPages(data.totalPages);
      setTotal(data.total);
    } catch (e: any) {
      setRowsError(e?.message || "Failed to load leads");
      setRows([]);
    } finally {
      setRowsLoading(false);
    }
  }

  useEffect(() => {
    if (loading) return;
    if (!me) router.replace("/admin/AdminAuthPage"); // replace = more professional than push
  }, [loading, me, router]);

  useEffect(() => {
    if (!me) return;
    if (tab !== "customers") return;
    loadLeads(1, q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me, tab]);

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

  async function onLogin(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

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
    } catch (e: any) {
      setError(e?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  function onLogout() {
    localStorage.removeItem(authTokenKey);
    setMe(null);
    setError(null);
  }

  const filteredSorted = useMemo(() => {
    const query = q.trim().toLowerCase();
    const filtered = !query
      ? rows
      : rows.filter((r) => {
          const hay =
            `${r.id} ${r.joinedAt} ${r.source} ${r.name} ${r.ageGroup} ${r.phone} ${r.collected}`.toLowerCase();
          return hay.includes(query);
        });

    const dir = sortDir === "asc" ? 1 : -1;

    const sorted = [...filtered].sort((a, b) => {
      const va = (a as any)[sortKey];
      const vb = (b as any)[sortKey];
      if (sortKey === "id") return (va - vb) * dir;
      return String(va).localeCompare(String(vb)) * dir;
    });

    return sorted;
  }, [q, rows, sortKey, sortDir]);

  function toggleSort(key: typeof sortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  const SortArrow = ({ k }: { k: typeof sortKey }) => {
    const active = sortKey === k;
    const arrow = !active ? "↕" : sortDir === "asc" ? "↑" : "↓";
    return (
      <span
        className={cx(
          "ml-1 text-[12px]",
          active ? "text-white" : "text-white/50"
        )}>
        {arrow}
      </span>
    );
  };

  // Stats (demo)
  const stats = useMemo(() => {
    const total = rows.length;
    const managed = rows.filter((r) => r.managed).length;
    const unmanaged = total - managed;
    return { total, managed, unmanaged };
  }, [rows]);

  // ---------------------------
  // 1) Loading
  // ---------------------------
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B0F14] p-6">
        <div className="mx-auto h-[86vh] max-w-[1500px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl" />
      </div>
    );
  }

  // ---------------------------
  // 2) Logged out (Modern Admin Login)
  // ---------------------------
  if (!me) {
    return (
      <div className="min-h-screen bg-[#0B0F14] p-6 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <div className="text-lg font-extrabold text-white">Redirecting…</div>
          <div className="mt-2 text-sm text-white/60">
            You’re not logged in. Moving to Admin Login.
          </div>

          <button
            onClick={() => router.replace("/admin/AdminAuthPage")}
            className="mt-5 h-10 w-full rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 text-sm font-extrabold text-[#041018]">
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // ---------------------------
  // 3) Logged in (Modern Admin Panel)
  // ---------------------------
  const sidebarItems: {
    key: TabKey;
    label: string;
    icon: React.ReactNode;
  }[] = [
    {
      key: "customers",
      label: "고객 관리",
      icon: <IconUsers active={tab === "customers"} />,
    },
    {
      key: "board",
      label: "게시판 관리",
      icon: <IconBoard active={tab === "board"} />,
    },
    {
      key: "ea_ui",
      label: "EA 및 UI 관리",
      icon: <IconTool active={tab === "ea_ui"} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F14] p-6">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute left-1/2 top-24 h-44 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute right-10 top-28 h-44 w-80 rounded-full bg-fuchsia-400/10 blur-3xl" />
      </div>

      {/* panel */}
      <div className="mx-auto flex h-[88vh] max-w-[1500px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_16px_55px_rgba(0,0,0,0.45)] backdrop-blur-xl">
        {/* left sidebar */}
        <aside className="flex w-[270px] flex-col border-r border-white/10 bg-[#0A0F15]/70">
          {/* brand */}
          <div className="px-6 py-6">
            <div className="text-[13px] font-extrabold tracking-[0.16em] text-white/70">
              M SIGNAL
            </div>
            <div className="mt-1 text-[20px] font-extrabold text-white">
              Admin Panel
            </div>
          </div>

          {/* nav */}
          <nav className="px-3">
            {sidebarItems.map((it) => {
              const active = tab === it.key;
              return (
                <button
                  key={it.key}
                  onClick={() => setTab(it.key)}
                  className={cx(
                    "mb-2 flex h-12 w-full items-center gap-3 rounded-xl px-4 text-left transition",
                    active
                      ? "bg-white/10 ring-1 ring-cyan-300/25"
                      : "hover:bg-white/5"
                  )}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                    {it.icon}
                  </span>
                  <span
                    className={cx(
                      "text-[14px] font-extrabold",
                      active ? "text-white" : "text-white/75"
                    )}>
                    {it.label}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* footer user */}
          <div className="mt-auto border-t border-white/10 px-6 py-5">
            <div className="text-xs font-semibold text-white/60">Logged in</div>
            {/* <div className="mt-1 text-sm font-bold text-white">{me.email}</div> */}

            <button
              onClick={onLogout}
              className="mt-4 h-10 w-full rounded-xl border border-white/10 bg-white/5 text-sm font-extrabold text-white/90 transition hover:bg-white/10">
              Logout
            </button>
          </div>
        </aside>

        {/* right content */}
        <section className="flex flex-1 flex-col overflow-hidden">
          {/* top bar */}
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-8 py-5">
            <div>
              <div className="text-lg font-extrabold text-white">
                {tab === "customers"
                  ? "고객 관리"
                  : tab === "board"
                  ? "게시판 관리"
                  : "EA 및 UI 관리"}
              </div>
              <div className="mt-1 text-xs text-white/60">
                UI only for now — we will connect backend APIs later.
              </div>
            </div>

            {/* stats */}
            {tab === "customers" ? (
              <div className="hidden gap-2 md:flex">
                <StatPill label="Total" value={stats.total} />
                <StatPill label="Managed" value={stats.managed} />
                <StatPill label="Unmanaged" value={stats.unmanaged} />
              </div>
            ) : (
              <div className="hidden gap-2 md:flex">
                <StatPill label="Status" value="Preparing" />
                <StatPill label="Mode" value="UI" />
              </div>
            )}
          </div>

          {/* content scroll area */}
          <div className="flex-1 overflow-auto p-8">
            {tab === "customers" ? (
              <>
                {/* search row */}
                <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex w-full items-center gap-3">
                    <div className="text-sm font-extrabold text-white/80">
                      검색
                    </div>
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") loadLeads(1, q);
                      }}
                      className={cx(
                        "h-10 w-full md:w-[520px] rounded-xl",
                        "border border-white/10 bg-white/5 px-3 text-sm text-white",
                        "outline-none placeholder:text-white/30",
                        "focus:border-cyan-300/30 focus:ring-2 focus:ring-cyan-300/15"
                      )}
                      placeholder="이름/전화번호/유입경로 검색"
                    />
                    <button
                      type="button"
                      onClick={() => loadLeads(1, q)}
                      className={cx(
                        "hidden md:inline-flex h-10 items-center justify-center rounded-xl px-4",
                        "border border-white/10 bg-white/5 text-sm font-extrabold text-white/90",
                        "transition hover:bg-white/10"
                      )}>
                      검색하기
                    </button>
                  </div>

                  {/* quick actions (placeholders) */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="h-10 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-extrabold text-white/85 transition hover:bg-white/10">
                      Export
                    </button>
                    <button
                      type="button"
                      className="h-10 rounded-xl bg-gradient-to-r from-cyan-400 to-sky-400 px-4 text-sm font-extrabold text-[#041018] shadow-[0_10px_25px_rgba(0,234,255,0.15)] transition active:scale-[0.99]">
                      Add
                    </button>
                  </div>
                </div>

                {/* table card */}
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                  {/* grouped header */}
                  <div className="border-b border-white/10 bg-white/5 px-6 py-4">
                    <div className="text-sm font-extrabold text-white/90">
                      Customer List
                    </div>
                    <div className="mt-1 text-xs text-white/55">
                      Click headers to sort (가입일 / 유입경로).
                    </div>
                  </div>

                  {/* table */}
                  <div className="overflow-auto">
                    <table className="min-w-[1050px] w-full border-collapse">
                      <thead>
                        <tr className="bg-black/20 text-white">
                          <th className="w-[70px] px-5 py-4 text-left text-xs font-extrabold text-white/85">
                            NO
                          </th>

                          <th
                            className="w-[190px] cursor-pointer px-5 py-4 text-left text-xs font-extrabold text-white/85"
                            onClick={() => toggleSort("joinedAt")}>
                            가입일 <SortArrow k="joinedAt" />
                          </th>

                          <th
                            className="w-[180px] cursor-pointer px-5 py-4 text-left text-xs font-extrabold text-white/85"
                            onClick={() => toggleSort("source")}>
                            유입경로 <SortArrow k="source" />
                          </th>

                          <th
                            colSpan={3}
                            className="px-5 py-4 text-center text-xs font-extrabold text-white/85">
                            개인정보
                          </th>

                          <th className="w-[190px] px-5 py-4 text-left text-xs font-extrabold text-white/85">
                            수집 사항
                          </th>

                          <th className="w-[170px] px-5 py-4 text-center text-xs font-extrabold text-white/85">
                            고객관리여부
                          </th>
                        </tr>

                        <tr className="bg-black/20 text-white">
                          <th className="px-5 pb-4" />
                          <th className="px-5 pb-4" />
                          <th className="px-5 pb-4" />
                          <th className="w-[170px] px-5 pb-4 text-left text-xs font-extrabold text-white/80">
                            이름
                          </th>
                          <th className="w-[120px] px-5 pb-4 text-left text-xs font-extrabold text-white/80">
                            나이
                          </th>
                          <th className="w-[220px] px-5 pb-4 text-left text-xs font-extrabold text-white/80">
                            전화번호
                          </th>
                          <th className="px-5 pb-4" />
                          <th className="px-5 pb-4" />
                        </tr>
                      </thead>

                      <tbody>
                        {filteredSorted.map((r) => (
                          <tr
                            key={r.id}
                            className="border-b border-white/10 hover:bg-white/5">
                            <td className="px-5 py-5 text-sm text-white/85">
                              {r.id}
                            </td>
                            <td className="px-5 py-5 text-sm text-white/85">
                              {r.joinedAt}
                            </td>
                            <td className="px-5 py-5 text-sm text-white/85">
                              <span className="rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-xs font-bold text-white/80">
                                {r.source}
                              </span>
                            </td>
                            <td className="px-5 py-5 text-sm font-semibold text-white">
                              {r.name}
                            </td>
                            <td className="px-5 py-5 text-sm text-white/85">
                              {r.ageGroup}
                            </td>
                            <td className="px-5 py-5 text-sm text-white/85">
                              {r.phone}
                            </td>
                            <td className="px-5 py-5 text-sm text-white/85">
                              {r.collected}
                            </td>
                            <td className="px-5 py-5 text-center">
                              <Toggle
                                checked={r.managed}
                                onChange={(next) =>
                                  setRows((prev) =>
                                    prev.map((x) =>
                                      x.id === r.id
                                        ? { ...x, managed: next }
                                        : x
                                    )
                                  )
                                }
                              />
                            </td>
                          </tr>
                        ))}

                        {filteredSorted.length === 0 ? (
                          <tr>
                            <td
                              colSpan={8}
                              className="px-5 py-10 text-center text-sm text-white/60">
                              No results.
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>

                  {/* bottom bar */}
                  <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-white/5 px-6 py-4">
                    <div className="text-xs text-white/55">
                      Showing{" "}
                      <span className="font-bold text-white/85">
                        {filteredSorted.length}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-white/85">{total}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={page <= 1 || rowsLoading}
                        onClick={() => loadLeads(page - 1, q)}
                        className={cx(
                          "h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-extrabold text-white/85 transition hover:bg-white/10",
                          (page <= 1 || rowsLoading) &&
                            "opacity-40 cursor-not-allowed"
                        )}>
                        Prev
                      </button>

                      <button
                        type="button"
                        disabled={page >= totalPages || rowsLoading}
                        onClick={() => loadLeads(page + 1, q)}
                        className={cx(
                          "h-9 rounded-xl border border-white/10 bg-white/5 px-3 text-xs font-extrabold text-white/85 transition hover:bg-white/10",
                          (page >= totalPages || rowsLoading) &&
                            "opacity-40 cursor-not-allowed"
                        )}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : tab === "board" ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-base font-extrabold text-white">
                  게시판 관리
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Placeholder UI. Next we will connect CRUD APIs.
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/60">
                      Features
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-white">
                      Posts / Categories
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/60">
                      Workflow
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-white">
                      Create / Edit / Delete
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/60">
                      Controls
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-white">
                      Search / Pin / Paging
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-base font-extrabold text-white">
                  EA 및 UI 관리
                </div>
                <div className="mt-2 text-sm text-white/70">
                  Placeholder UI. Next we will connect upload & version APIs.
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/60">
                      EA
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-white">
                      Upload / Versioning
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/60">
                      UI Assets
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-white">
                      Manage / Publish
                    </div>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-semibold text-white/60">
                      Access
                    </div>
                    <div className="mt-2 text-sm font-extrabold text-white">
                      Links / Permissions
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
