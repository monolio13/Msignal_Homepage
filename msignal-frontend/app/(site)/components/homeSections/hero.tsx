/** @format */
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HiDownload } from "react-icons/hi";
import Link from "next/link";

function formatDateTime(date: Date) {
  const yy = String(date.getFullYear()).slice(2);
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mi = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${yy}.${mm}.${dd} ${hh}:${mi}:${ss}`;
}

const slides = [
  {
    id: 1,
    image: "/images/hero1.svg",
    imageMobile: "/images/hero1-mobile.svg",
    headline: "경제적 자유를 위해\nM시그널이 힘쓰겠습니다",
    profit: "10.4%",
    direction: "▲",
    subHeadline: "",
  },
  {
    id: 2,
    image: "/images/hero2.svg",
    imageMobile: "/images/hero1-mobile.svg",
    headline: "트레이더들의 강력한 전략,\nM시그널이라면 자동으로 가능합니다.",
    profit: "10.4%",
    direction: "▲",
    subHeadline: "",
    desc: "* 2025년 10월 기준",
    desc2: "* 과거 수익률과 전략을 투명하게 확인할 수 있습니다.",
    desc3: "* 과거 수익률은 미래의 수익을 보장하지 않습니다.",
  },
  {
    id: 3,
    image: "/images/hero3.svg",
    imageMobile: "/images/hero1-mobile.svg",
    headline: "일하는 동안에도, 휴식 중에도\n전략은 움직입니다.",
    profit: "10.4%",
    direction: "▲",
    subHeadline:
      "24시간 시장 분석 · 전략 자동 실행 · 위험 관리까지\nEA가 스스로 판단하도록 설계되었습니다",
  },
  {
    id: 4,
    image: "/images/hero4.svg",
    imageMobile: "/images/hero1-mobile.svg",
    headline: "투자는 모르겠고\n시작은 해야겠고....",
    profit: "10.4%",
    direction: "▲",
    subHeadline:
      "직접 매매하기 어려운 분들을 위해 전략 선택 → 자동 실행까지 한 번에.\n실전 성과를 투명하게 확인하세요.",
  },
];
const slidesMobile = [
  {
    id: 1,
    image: "/images/hero1.svg",
    imageMobile: "/images/main.svg",
    headline: "경제적 자유를 위해\nM시그널이 힘쓰겠습니다",
    profit: "10.4%",
    direction: "▲",
    subHeadline: "",
  },
  {
    id: 2,
    image: "/images/hero2.svg",
    imageMobile: "/images/main2.svg",
    headline:
      "트레이더들의 강력한 전략,\nM시그널이라면 자동으로 \n 가능합니다.",
    profit: "10.4%",
    direction: "▲",
    subHeadline: "",
    desc: "* 2025년 10월 기준",
    desc2: "* 과거 수익률과 전략을 투명하게 확인할 수 있습니다.",
    desc3: "* 과거 수익률은 미래의 수익을 보장하지 않습니다.",
  },
  {
    id: 3,
    image: "/images/hero3.svg",
    imageMobile: "/images/main3.svg",
    headline: "일하는 동안에도,\n 휴식 중에도전략은 \n 움직입니다.",
    profit: "10.4%",
    direction: "▲",
    subHeadline:
      "24시간 시장 분석 · 전략 자동 실행 · 위험 관리까지\nEA가 스스로 판단하도록 설계되었습니다",
  },
  {
    id: 4,
    image: "/images/hero4.svg",
    imageMobile: "/images/main4.svg",
    headline: "투자는 모르겠고\n시작은 해야겠고....",
    profit: "10.4%",
    direction: "▲",
    subHeadline:
      "직접 매매하기 어려운 분들을 위해 전략 선택  →  자동 실행까지 한 번에.\n실전 성과를 투명하게 확인하세요.",
  },
];

// 슬라이드 애니메이션
const slideVariants: Variants = {
  enter: {
    x: 80,
    opacity: 0,
  },
  center: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: -80,
    opacity: 0,
  },
};

export default function Hero() {
  const [index, setIndex] = useState(0);
  const currentMobile = slidesMobile[index];
  const current = slides[index];
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const update = () => {
      setTimestamp(formatDateTime(new Date()));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const goTo = (i: number) => setIndex(i);

  // 자동 롤링
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const desktopMarginBottom =
    current.id === 3 || current.id === 4 ? "200px" : "0px";

  return (
    <section className="w-screen -ml-4 md:w-full md:ml-0 flex justify-center">
      <div className="w-full md:container-1440 md:px-0">
        {/* height is a bit smaller on mobile so it feels like the mock */}
        <div className=" relative w-full aspect-[430/300]   /* mobile height */ md:h-[711px] md:aspect-auto overflow-hidden ">
          {/* 배경 이미지 */}
          <AnimatePresence initial={false}>
            <motion.div
              key={current.id}
              className="absolute inset-0 z-10"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}>
              {/* Mobile background */}
              <Image
                src={currentMobile.imageMobile}
                alt="M Signal hero background"
                fill
                className="md:hidden"
                style={{ objectFit: "cover", background: "white" }}
                priority
              />

              {/* Desktop / tablet background */}
              <Image
                src={current.image}
                alt="M Signal hero background"
                fill
                className="hidden md:block"
                style={{ objectFit: "cover", background: "white" }}
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* 상단 도트 */}
          <div className="absolute top-4 md:top-6 inset-x-0 flex justify-center gap-2 z-20">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-black" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* ===== 오른쪽 정보 패널 - 데스크톱 (그대로) ===== */}
          <div className="hidden md:flex absolute inset-y-0 right-0 z-20 flex-col gap-5">
            {/* 실시간 손익 */}
            <div
              className="h-[225px] w-[384px] text-white p-6 flex flex-col justify-between"
              style={{ backgroundColor: "rgba(0,0,0,0.64)" }}>
              <div className="flex items-center justify-between text-[20px] text-[#ffffff]">
                <span>실시간 손익</span>
                <span>{timestamp}</span>
              </div>
              <div className="flex items-center justify-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#D20000] text-[30px]">
                    {current.direction}
                  </span>
                  <span className="text-[70px] font-semibold">
                    {current.profit}
                  </span>
                </div>
              </div>
            </div>

            {/* 이용 가이드 + PDF */}
            <div
              className="h-[225px] w-[384px] text-white px-6 py-6 flex flex-col justify-between"
              style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
              <span className="text-[20px]">이용 가이드</span>
              <button className="self-end inline-flex items-center gap-1 text-[20px]">
                <span>PDF</span>
                <HiDownload size={20} />
              </button>
            </div>

            {/* 내 수익 계산하기 */}
            <Link href={"/start"}>
              <div
                className="h-[225px] w-[384px] text-white px-6 py-6 flex flex-col justify-between"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                <span className="text-[20px]">내 수익 계산하기</span>
                <button className="self-end inline-flex items-center gap-1 text-[20px]">
                  <ChevronRight size={20} />
                </button>
              </div>
            </Link>
          </div>

          {/* ===== 오른쪽 정보 패널 - 모바일 (디자인 그대로) ===== */}
          <div className="gap-0.5 md:hidden absolute inset-y-0 -right-3 z-20   text-white px-3  flex flex-col">
            {/* 실시간 손익 */}
            <div
              className="h-[89px] w-[145px] text-white p-2 flex flex-col justify-between"
              style={{
                backgroundColor: "rgba(0,0,0,0.64)",
                borderRadius: "0px 0px  0 10px",
              }}>
              <div className="flex items-center justify-between text-[12px] text-[#ffffff]">
                <span>실시간 손익</span>
                <span className="text-[8px]">{timestamp}</span>
              </div>
              <div className="flex items-center justify-center flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[#D20000] text-[15px]">
                    {current.direction}
                  </span>
                  <span className="text-[25px] font-semibold">
                    {current.profit}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 왼쪽 헤드라인 + 버튼 */}
          <div className="absolute left-0 bottom-0 z-20 px-4 md:px-8 pb-0 md:pb-10 w-full md:max-w-[70%] flex flex-col justify-end">
            {/* =========================
      Desktop Headline (same)
  ========================== */}
            <div
              className="hidden md:block w-full"
              style={{
                marginBottom: desktopMarginBottom,
              }}>
              <p className="text-white text-[40px] md:text-[58px] leading-[1.3] font-semibold whitespace-pre-line">
                {current.headline}
              </p>

              {current.subHeadline && (
                <p className="text-white/85 text-[16px] md:text-[20px] leading-[1.6] whitespace-pre-line">
                  {current.subHeadline}
                </p>
              )}
            </div>

            {/* =========================
      Mobile Stage (FIXED)
      - headline pinned top
      - CTA pinned bottom
  ========================== */}
            <div className="md:hidden relative w-full h-[190px]">
              {/* Mobile headline pinned to top */}
              <div className="absolute left-0 right-0 top-0">
                <p className="text-white text-[18px] leading-[1.3] font-semibold whitespace-pre-line">
                  {currentMobile.headline}
                </p>

                {currentMobile.subHeadline && (
                  <p className="mt-2 text-white/85 text-[11px] leading-[1.6] whitespace-pre-line">
                    {currentMobile.subHeadline}
                  </p>
                )}
              </div>

              {/* Mobile CTA pinned to bottom */}
              <div className="absolute left-0 right-0 bottom-0 ml-0">
                <div className="flex gap-8 items-center">
                  <Link href="/start" className="shrink-0">
                    <div className="flex items-center py-3 gap-1 text-black">
                      <span className="text-[12px] font-semibold">
                        빠른 사용하기
                      </span>
                      <span className="h-4 w-4 rounded-full border border-black/15 flex items-center justify-center">
                        <img src="/images/fastbutton.svg" alt="" />
                      </span>
                    </div>
                  </Link>

                  {(current.desc || current.desc2 || current.desc3) && (
                    <div className="text-[#BCBCBC] flex flex-col text-[8px] leading-[1.35]">
                      {current.desc2 && <div>{current.desc2}</div>}
                      {current.desc3 && <div>{current.desc3}</div>}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =========================
      Desktop CTA (same)
  ========================== */}
            <div className="hidden md:flex md:flex-row md:items-start gap-6 -mb-6 mt-10">
              <Link href={"/start"}>
                <button className="inline-flex items-center text-black md:px-8 py-2 md:py-3 gap-3 cursor-pointer">
                  <span className="text-[16px] md:text-[25px] font-semibold">
                    빠른 사용하기
                  </span>
                  <span className="h-7 w-7 rounded-full border border-black/15 flex items-center justify-center">
                    <img src="/images/fastbutton.svg" alt="" />
                  </span>
                </button>
              </Link>

              {(current.desc || current.desc2 || current.desc3) && (
                <div className="text-[#BCBCBC] flex flex-col text-[10px] md:text-[14px]">
                  {current.desc && <div>{current.desc}</div>}
                  {current.desc2 && <div>{current.desc2}</div>}
                  {current.desc3 && <div>{current.desc3}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
