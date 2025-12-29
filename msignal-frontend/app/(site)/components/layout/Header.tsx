/** @format */

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const menu = [
  { label: "소개", href: "/about" },
  { label: "이용방법", href: "/how" },
  { label: "이벤트", href: "/event" },
  { label: "커뮤니티", href: "/community" },
  { label: "파트너사", href: "/partner" },
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

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuEnter = (label: string) => {
    setActiveMenu(label);
    setIsOpen(true);
  };

  const handleHeaderLeave = () => {
    setIsOpen(false);
    setActiveMenu(null);
  };

  return (
    <header
      className=" w-full fixed top-0 left-0 right-0 bg-white border-b border-[#f3f3f3] z-40 "
      onMouseLeave={handleHeaderLeave}>
      {/* Top bar */}
      <div className="container-1440 flex items-center justify-between h-[80px] md:h-[100px] px-3 md:px-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.svg"
            alt="M Signal Logo"
            width={120}
            height={30}
          />
        </Link>

        {/* Desktop Menu */}
        <nav
          style={{ marginTop: "15px" }}
          className="hidden md:flex items-center gap-[88px]">
          {menu.map((item) => {
            const isActive = activeMenu === item.label;
            return (
              <div
                key={item.href}
                onMouseEnter={() => handleMenuEnter(item.label)}>
                <Link
                  href={""}
                  className={`text-[18px] transition font-medium ${
                    isActive ? "text-black font-bold" : "text-[#303030]"
                  } hover:text-black`}>
                  {item.label}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* CTA Button (visible on all breakpoints) */}
        <Link
          href="/start"
          className=" flex items-center justify-center bg-[#DB0101] text-white rounded-full text-[14px] md:text-[16px] font-semibold w-[80px] mt-6 md:mt-0 h-[32px] md:w-[110px] md:h-[36px] hover:bg-[#b62818] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer ">
          이용하기
        </Link>
      </div>

      {/* Desktop Dropdown mega menu - HIDDEN on mobile */}
      {isOpen && (
        <div className="hidden md:flex absolute left-0 right-0 top-full z-30 items-center justify-center bg-[#EFEFEF]">
          <div
            style={{
              padding: "18px 0 24px 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 1100,
            }}>
            <div
              style={{ textAlign: "center" }}
              className="container-1440 flex justify-center">
              {menu.map((item) => {
                const subs = subMenu[item.label] || [];
                return (
                  <div
                    key={item.label}
                    style={{ minWidth: 145 }}
                    onMouseEnter={() => handleMenuEnter(item.label)}>
                    {subs.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        className="block text-[15px] text-[#303030] mb-3 hover:text-black">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
