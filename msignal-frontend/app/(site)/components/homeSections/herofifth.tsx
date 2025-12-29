/** @format */
"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DropPos = { top: number; left: number; width: number };

export default function HeroFifth() {
  const options = useMemo(
    () => ["100", "150", "200", "300", "1,000", "5,000"],
    []
  );
  const [selected, setSelected] = useState("200");
  const [open, setOpen] = useState(false);

  // ✅ separate refs for desktop + mobile triggers
  const triggerDesktopRef = useRef<HTMLButtonElement | null>(null);
  const triggerMobileRef = useRef<HTMLButtonElement | null>(null);

  // portal dropdown ref
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [dropPos, setDropPos] = useState<DropPos | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => setMounted(true), []);

  // ✅ detect desktop breakpoint (matches your md:)
  useEffect(() => {
    const update = () => setIsDesktop(window.innerWidth >= 768);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 140 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.18,
      },
    },
  };

  const nf = useMemo(() => new Intl.NumberFormat("ko-KR"), []);
  const selectedNum = useMemo(
    () => Number(selected.replace(/,/g, "")),
    [selected]
  );

  // profit in "만원"
  const profit = useMemo(() => Math.round(selectedNum * 0.05), [selectedNum]);
  const profitText = useMemo(() => nf.format(profit), [profit, nf]);

  const getActiveTrigger = () =>
    isDesktop ? triggerDesktopRef.current : triggerMobileRef.current;

  const recalcPosition = () => {
    const el = getActiveTrigger();
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const gap = 10;

    // ✅ dropdown width: looks best when slightly wider than trigger
    const width = isDesktop ? 180 : 100;

    // ✅ align: center under trigger
    let left = rect.left + rect.width / 3 - width / 2;

    // keep inside viewport
    left = Math.max(12, Math.min(left, window.innerWidth - width - 12));

    setDropPos({
      top: rect.bottom + gap,
      left,
      width,
    });
  };

  const openDropdown = () => {
    setOpen(true);

    // ✅ layout-safe positioning: do it after render, and once more (fonts/images may shift)
    requestAnimationFrame(() => {
      recalcPosition();
      setTimeout(recalcPosition, 30);
    });
  };

  const closeDropdown = () => setOpen(false);

  const toggleOpen = () => {
    setOpen((prev) => {
      const next = !prev;
      if (next) openDropdown();
      else closeDropdown();
      return next;
    });
  };

  const handleSelect = (value: string) => {
    setSelected(value);
    closeDropdown();
  };

  // ✅ Close dropdown when clicking outside (portal-safe)
  useEffect(() => {
    if (!open) return;

    const handleDown = (e: MouseEvent) => {
      const t = e.target as Node;

      const desk = triggerDesktopRef.current;
      const mob = triggerMobileRef.current;
      const drop = dropdownRef.current;

      if (desk && desk.contains(t)) return;
      if (mob && mob.contains(t)) return;
      if (drop && drop.contains(t)) return;

      closeDropdown();
    };

    const handleResizeOrScroll = () => recalcPosition();

    document.addEventListener("mousedown", handleDown);
    window.addEventListener("resize", handleResizeOrScroll);
    window.addEventListener("scroll", handleResizeOrScroll, true);

    return () => {
      document.removeEventListener("mousedown", handleDown);
      window.removeEventListener("resize", handleResizeOrScroll);
      window.removeEventListener("scroll", handleResizeOrScroll, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, isDesktop]);

  // ✅ if breakpoint changes while open, reposition
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(recalcPosition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  const DropdownPortal =
    mounted && open && dropPos
      ? createPortal(
          <div
            ref={dropdownRef}
            className="bg-black/95 text-white md:rounded-2xl rounded-[5px] shadow-2xl backdrop-blur-md py-3 md:py-2"
            style={{
              position: "fixed",
              top: dropPos.top,
              left: dropPos.left,
              width: dropPos.width,
              zIndex: 9999,
            }}>
            {options.map((opt, i) => (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className="w-full text-center text-[18px] md:text-[40px] font-bold hover:text-gray-300"
                type="button">
                {opt}
                {i < options.length - 1 && (
                  <div className="w-[85%] mx-auto border-b border-white/20 mt-1 md:mt-2" />
                )}
              </button>
            ))}
          </div>,
          document.body
        )
      : null;

  return (
    <motion.section
      className="w-screen -ml-4 md:w-full md:ml-0 flex justify-center mt-20 md:mt-90 mb-10 md:mb-10"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      <div className="w-full md:container-1440 md:px-0 flex flex-col items-center">
        {/* ================= Desktop ================= */}
        <div className="hidden md:block relative w-full h-[496px] rounded-[26px] overflow-hidden">
          <Image
            src="/images/herofifth.svg"
            alt="M Signal hero"
            fill
            style={{ objectFit: "cover" }}
            priority
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <p className="text-[50px] font-bold leading-tight mb-10 text-center">
              지난 한달동안 M시그널로
            </p>

            {/* Middle row */}
            <div className="relative flex flex-row items-end gap-5 text-center mb-12">
              {/* Trigger */}
              <button
                onClick={toggleOpen}
                ref={triggerDesktopRef}
                type="button"
                className="text-[50px] font-bold border-b-2 pb-2 flex items-center gap-3 cursor-pointer">
                {selected}만원
                <span
                  className={`text-[32px] transition duration-200 ${
                    open ? "rotate-180" : ""
                  }`}>
                  ▼
                </span>
              </button>

              <span className="text-[50px] font-medium mt-1">투자했다면</span>

              <span className="text-[60px] font-bold text-[#FF1D1D] mt-[-6px] drop-shadow-lg">
                +{profitText}만원
              </span>
            </div>

            <div className="flex flex-row items-center gap-4 mt-2">
              <Link href={"/start"}>
                <button
                  type="button"
                  className="flex items-center justify-between gap-3 bg-white text-black rounded-[99px] px-4 py-1.5 text-[30px] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
                  <span>지금 투자하러 가기</span>
                  <span className="text-[32px] font-bold">
                    <img
                      style={{ marginLeft: "20px" }}
                      width={40}
                      className="md:w-[50px]"
                      src="/images/button.svg"
                      alt=""
                    />
                  </span>
                </button>
              </Link>

              <Link href={"/about/strategy"}>
                <button
                  type="button"
                  className="text-[30px] font-semibold text-gray-300 hover:text-white transition active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
                  전략 확인하기 〉
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ================= Mobile ================= */}
        <div className="md:hidden relative w-full h-[180px] overflow-hidden">
          <Image
            src="/images/mainlastmobile.svg"
            alt="M Signal hero"
            fill
            style={{ objectFit: "cover" }}
            priority
          />

          <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-4">
            <div className="relative flex items-center gap-3 text-center mt-10">
              <button
                onClick={toggleOpen}
                ref={triggerMobileRef}
                type="button"
                className="text-[18px] font-bold border-b-2 pb-1 flex items-center gap-2">
                {selected}만원
                <span
                  className={`text-[15px] transition duration-200 ${
                    open ? "rotate-180" : ""
                  }`}>
                  ▼
                </span>
              </button>

              <span className="text-[15px] font-medium">투자했다면</span>

              <span className="text-[18px] font-bold text-[#FF1D1D] drop-shadow-lg">
                +{profitText}만원
              </span>
            </div>

            <div className="flex items-center gap-4 mt-5">
              <Link href={"/start"}>
                <button
                  type="button"
                  className="flex items-center justify-between gap-3 bg-white text-black rounded-[18px] px-2 py-1 text-[13px] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
                  <span>지금 투자하러 가기</span>
                  <span className="text-[24px] font-bold">
                    <img
                      style={{ marginLeft: "10px" }}
                      width={20}
                      src="/images/button.svg"
                      alt=""
                    />
                  </span>
                </button>
              </Link>

              <Link href={"/about/strategy"}>
                <button
                  type="button"
                  className="text-[12px] font-semibold text-gray-300 hover:text-white transition active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
                  전략 확인하기 〉
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ✅ Portal dropdown (always under active trigger) */}
        {DropdownPortal}

        {/* Disclaimer (no weird positioning) */}
        <p className="hidden md:block mt-4 text-[12px] text-[#C0C0C0] leading-relaxed px-4 md:px-0">
          *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로, 원금 및
          수익을 보장하지 않습니다. 시장 상황에 따라 손실이 발생할 수 있으며,
          투자 결정의 책임은 이용자 본인에게 있습니다. 전략 성과는 트레이더에
          따라 다르며, 과거 성과는 미래를 보장하지 않습니다.
        </p>

        <p className="md:hidden  mt-2 text-[6px] text-[#C0C0C0] leading-relaxed px-2">
          *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로, 원금 및
          수익을 보장하지 않습니다. 시장 상황에 따라 손실이 발생할 수 있으며,
          투자 결정의 책임은 이용자 본인에게 있습니다. 전략 성과는 트레이더에
          따라 다르며, 과거 성과는 미래를 보장하지 않습니다.
        </p>
      </div>
    </motion.section>
  );
}
