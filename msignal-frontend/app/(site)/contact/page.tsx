/** @format */
"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Download } from "lucide-react";
import { HiDownload } from "react-icons/hi";
import { desc } from "framer-motion/client";

const slides = [
  {
    id: 1,
    image: "/images/hero1.svg",
    headline: "경제적 자유를 위해\nM시그널이 힘쓰겠습니다",
    profit: "10.4%",
    direction: "▲",
    timestamp: "25.11.01 16:45:44",
  },
  {
    id: 2,
    image: "/images/hero2.svg",
    headline: "트레이더들의 강력한 전략,\nM시그널이라면 자동으로 가능합니다.",
    profit: "10.4%",
    direction: "▲",
    timestamp: "25.11.01 16:45:44",
    desc: "*2025년 10월 기준",
    desc2: "*과거 수익률과 전략을 투명하게 확인할 수 있습니다.",
    desc3: "과거 수익률은 미래의 수익을 보장하지 않습니다.",
    size: "18px",
  },
  {
    id: 3,
    image: "/images/hero3.svg",
    headline: "일하는 동안에도, 휴식 중에도\n전략은 움직입니다.",
    profit: "10.4%",
    direction: "▲",
    timestamp: "25.11.01 16:45:44",
  },
  {
    id: 4,
    image: "/images/hero4.svg",
    headline: "투자는 모르겠고\n시작은 해야겠고....",
    profit: "10.4%",
    direction: "▲",
    timestamp: "25.11.01 16:45:44",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const current = slides[index];

  const goTo = (i: number) => setIndex(i);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="w-full ">
      <div className="w-full   ">
        <div className="relative h-[711px]  overflow-hidden shadow-lg">
          {/* Slide image */}
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0">
              <Image
                src={current.image}
                alt="M Signal hero background"
                fill
                style={{ objectFit: "cover", background: "white" }}
                priority
              />
              {/* Dark gradient for text readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
            </motion.div>
          </AnimatePresence>

          {/* Carousel dots (top center) */}
          <div className="absolute top-6 inset-x-0 flex justify-center gap-2 z-20">
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

          {/* Right side info panels */}
          <div className="absolute inset-y-0 right-0  z-20 flex flex-col gap-5 ">
            {/* top: 실시간 손익 */}
            <div className="h-[225px] w-[384px]  bg-black/45 backdrop-blur-sm text-white p-6 flex flex-col justify-between">
              <div className="flex items-center justify-between text-[20px] text-[#ffffff]">
                <span>실시간 손익</span>
                <span>{current.timestamp}</span>
              </div>
              <div className=" flex items-center justify-center flex-1">
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

            {/* middle: 이용 가이드 + PDF */}
            <div className=" h-[225px] w-[384px]  bg-black/35 backdrop-blur-sm text-white px-6 py-6 flex flex-col justify-between border-t border-white/10">
              <span className="text-[20px]">이용 가이드</span>
              <button className="self-end inline-flex items-center gap-1 text-[20px]">
                <span>PDF</span>
                <HiDownload size={20} />
              </button>
            </div>

            <div className=" h-[225px] w-[384px]  bg-black/35 backdrop-blur-sm text-white px-6 py-6 flex flex-col justify-between border-t border-white/10">
              <span className="text-[20px]">내 수익 계산하기</span>
              <button className="self-end inline-flex items-center gap-1 text-[20px]">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Left headline & CTA */}
          <div
            style={{}}
            className="absolute left-0 bottom-0 z-20 px-12 pb-12 max-w-[70%]">
            <p className="text-white text-[63px] leading-[1.3] font-semibold whitespace-pre-line">
              {current.headline}
            </p>

            {/* white bottom-left panel like design */}
            <div
              style={{
                display: "flex",
                marginTop: "40px",
                alignItems: "center",
              }}>
              <div className="relative top-10 inline-flex items-center bg-white text-black px-6 py-3 rounded-tr-[24px] rounded-tl-[4px] rounded-b-[24px] shadow-md gap-3">
                <span onClick={nextSlide} className="text-[15px]">
                  빠른 사용하기
                </span>
                <span className="h-7 w-7 rounded-full border border-black/15 flex items-center justify-center">
                  <ChevronRight size={16} />
                </span>
              </div>{" "}
              <div
                style={{
                  marginLeft: "100px",
                }}
                className="relative top-10 inline-flex text-[#BCBCBC] flex-col">
                <div className="text-[14px]">{current.desc}</div>
                <div className="text-[14px]">{current.desc2}</div>
                <div className="text-[14px]">{current.desc3}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
