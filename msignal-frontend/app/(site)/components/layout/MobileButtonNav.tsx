/** @format */
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const bottomTabs = [
  {
    label: "소개",
    href: "/about/msignal",
    icon: "/images/about.svg",
    iconActive: "/images/aboutActive.svg",
    size: 32,
  },
  {
    label: "이용방법",
    href: "/how",
    icon: "/images/how.svg",
    iconActive: "/images/mobilenavhow.svg",
    size: 22,
  },
  {
    label: "이벤트",
    href: "/event",
    icon: "/images/event.svg",
    iconActive: "/images/eventActive.svg",
    size: 29,
  },
  {
    label: "커뮤니티",
    href: "/community",
    icon: "/images/community.svg",
    iconActive: "/images/communityActive.svg",
    size: 29,
  },
  {
    label: "파트너사",
    href: "/partner",
    icon: "/images/partner.svg",
    iconActive: "/images/partnerActive.svg",
    size: 27,
  },
];

const subMenu: Record<string, { label: string; href: string }[]> = {
  소개: [
    { label: "M시그널이란?", href: "/about/msignal" },
    { label: "전략", href: "/about/strategy" },
    { label: "수익창출", href: "/about/profit" },
  ],
  이용방법: [
    { label: "유료구독", href: "/how/subscription" },
    { label: "카피트레이딩", href: "/how/copytrading" },
  ],
  이벤트: [
    { label: "지원금 지급", href: "/event/support" },
    { label: "수수료 인하", href: "/event/fee-discount" },
    { label: "동반 가입", href: "/event/join" },
  ],
  커뮤니티: [{ label: "M시그널 소식", href: "/community/news" }],
  파트너사: [{ label: "헷지후드", href: "/partner/hedgehood" }],
};

// ✅ Tabs that should NOT show submenu; they should navigate directly
const directTabs = new Set(["커뮤니티", "파트너사"]);

export default function MobileBottomNav() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeMainLabel, setActiveMainLabel] = useState<string | null>(null);
  const [showSubmenu, setShowSubmenu] = useState(false);

  useEffect(() => {
    const fromPath =
      Object.keys(subMenu).find((mainLabel) =>
        subMenu[mainLabel].some(
          (item) =>
            pathname === item.href || pathname.startsWith(item.href + "/")
        )
      ) ??
      bottomTabs.find(
        (tab) => pathname === tab.href || pathname.startsWith(tab.href + "/")
      )?.label ??
      null;

    setActiveMainLabel(fromPath);

    // ✅ never show submenu for direct tabs
    if (!fromPath || pathname === "/" || pathname === "") {
      setShowSubmenu(false);
    } else {
      setShowSubmenu(!directTabs.has(fromPath));
    }
  }, [pathname]);

  const topTabs =
    showSubmenu && activeMainLabel ? subMenu[activeMainLabel] ?? [] : [];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex justify-center pointer-events-none">
      <div
        className="w-full max-w-[1440px]"
        style={{
          paddingBottom: "calc(env(safe-area-inset-bottom, 0px))",
        }}>
        <div className="pointer-events-auto bg-white rounded-t-[24px] shadow-[0_-4px_20px_rgba(0,0,0,0.18)] overflow-hidden">
          {/* TOP PILLS */}
          {topTabs.length > 0 && (
            <div className="flex justify-between gap-2 px-3 pt-3 pb-2 border-b border-[#F0F0F0]">
              {topTabs.map((tab) => {
                const active =
                  pathname === tab.href || pathname.startsWith(tab.href + "/");
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex-1 h-9 flex items-center justify-center rounded-full text-[12px] font-semibold transition-colors ${
                      active
                        ? "bg-[#D6332A] text-white"
                        : "bg-[#F3F3F3] text-[#555555]"
                    }`}>
                    {tab.label}
                  </Link>
                );
              })}
            </div>
          )}

          {/* BOTTOM ICON ROW */}
          <div className="flex items-center justify-between px-8 py-7">
            {bottomTabs.map((tab) => {
              const active = activeMainLabel === tab.label;

              return (
                <button
                  key={tab.href}
                  type="button"
                  onClick={() => {
                    // ✅ Direct navigation tabs (no submenu)
                    if (directTabs.has(tab.label)) {
                      const first = subMenu[tab.label]?.[0]?.href ?? tab.href;
                      setActiveMainLabel(tab.label);
                      setShowSubmenu(false);
                      router.push(first);
                      return;
                    }

                    // ✅ Normal tabs: toggle submenu, but also navigate to base if needed
                    if (active) {
                      setShowSubmenu((prev) => !prev);
                    } else {
                      setActiveMainLabel(tab.label);
                      setShowSubmenu(true);

                      // Optional: navigate to the first submenu item immediately
                      const first = subMenu[tab.label]?.[0]?.href ?? tab.href;
                      router.push(first);
                    }
                  }}
                  className="flex flex-col items-center gap-1 text-[11px]">
                  <div className="h-8 flex items-center justify-center">
                    <Image
                      src={active ? tab.iconActive : tab.icon}
                      alt={tab.label}
                      width={tab.size}
                      height={tab.size}
                    />
                  </div>
                  <span
                    className={
                      active ? "text-[#D6332A] font-semibold" : "text-[#777777]"
                    }>
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
