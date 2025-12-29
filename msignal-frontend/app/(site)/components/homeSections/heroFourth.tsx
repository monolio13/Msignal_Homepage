/** @format */

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const testimonials = [
  {
    name: "김00 / 29세",
    title: "알아서 해주니 편하네요",
    desc: "직장 다니면서 차트 볼 시간이 없었는데 EA가 대신 분석해 줘서 마음이 훨씬 편해졌습니다.",
    income: "월평균 00만원 수입",
    color: "bg-[#C00000]",
  },
  {
    name: "김00 / 45세",
    title: "주식, 투자 하나도 모르던 제가 월 꾸준한 수입을 내고 있어요.",
    desc: "지인 추천으로 적은 돈으로 시작했는데, 꾸준하게 수익이 발생하네요. 거래내역을 매일 보게 됩니다",
    income: "월평균 00만원 수입",
    color: "bg-[#F6F6F6]",
  },
  {
    name: "김00 / 57세",
    title: "M시그널을 만나고 인생이 달라졌어요!",
    desc: "은퇴 후 별다른 소득이 없었는데, 따박따박 월급이 나오니 걱정을 덜었습니다.",
    income: "월평균 00만원 수입",
    color: "bg-[#C00000]",
  },
  {
    name: "김00 / 29세",
    title: "알아서 해주니 편하네요",
    desc: "직장 다니면서 차트 볼 시간이 없었는데 EA가 대신 분석해 줘서 마음이 훨씬 편해졌습니다.",
    income: "월평균 00만원 수입",
    color: "bg-[#F6F6F6]",
  },
  {
    name: "김00 / 45세",
    title: "주식, 투자 하나도 모르던 제가 월 꾸준한 수입을 내고 있어요.",
    desc: "지인 추천으로 적은 돈으로 시작했는데, 꾸준하게 수익이 발생하네요. 거래내역을 매일 보게 됩니다",
    income: "월평균 00만원 수입",
    color: "bg-[#C00000]",
  },
  {
    name: "김00 / 57세",
    title: "M시그널을 만나고 인생이 달라졌어요!",
    desc: "은퇴 후 별다른 소득이 없었는데, 따박따박 월급이 나오니 걱정을 덜었습니다.",
    income: "월평균 00만원 수입",
    color: "bg-[#F6F6F6]",
  },
];

const CARD_WIDTH = 417; // desktop card width
const GAP = 24; // px (gap-6)

export default function TestimonialSlider() {
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
  const cardsPerView = 3;
  const maxIndex = testimonials.length - cardsPerView;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // 🍱 breakpoints: treat >= 1024px as desktop for slider logic
  useEffect(() => {
    const handleResize = () => {
      if (typeof window === "undefined") return;
      setIsDesktop(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // 🔁 Auto-play (desktop only, pauses on hover)
  useEffect(() => {
    if (!isDesktop || isHovered) return;

    const id = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(id);
  }, [isDesktop, isHovered, maxIndex]);

  const offsetX = isDesktop ? index * (CARD_WIDTH + GAP) : 0;

  return (
    // 🔥 Full-width on mobile, normal on desktop
    <motion.section
      className="w-screen -ml-4 md:w-full md:ml-0 flex flex-col items-center mt-70 md:mt-100 mb-50"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      {/* mobile: full width / desktop: 1440 container */}
      <div className="w-full md:container-1440 flex flex-col items-center">
        {/* TITLE */}
        <h2 className="text-[20px] md:text-[50px] font-bold text-[#C00000] text-center mb-8 md:mb-12 leading-snug px-4 md:px-0">
          일찍 시작한 분들은 이미 앞서 있습니다.
        </h2>

        {/* SLIDER WRAPPER */}
        <div className="relative w-full flex flex-col items-center px-4 md:px-0">
          <div
            className="w-full md:w-[1310px] overflow-x-auto md:overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}>
            {/* TRACK */}
            <div
              className="flex gap-6"
              style={
                isDesktop
                  ? {
                      transform: `translateX(-${offsetX}px)`,
                      transition:
                        "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                    }
                  : {}
              }>
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className={`${t.color} 
                    flex-shrink-0 
                    w-[200px] md:w-[417px] 
                    h-[210px] md:h-[400px] 
                    text-white shadow-xl rounded-[4px] 
                    px-3 md:px-8 py-4 md:py-8 flex flex-col`}
                  style={
                    t.color === "bg-[#F6F6F6]" ? { color: "#C00000" } : {}
                  }>
                  {/* HEADER: name + line */}
                  <div>
                    <div className="text-[12px] md:text-[24px] font-semibold  mb-2">
                      {t.name}
                    </div>
                    <div className="w-full h-[2px] bg-current opacity-50" />
                  </div>

                  {/* BODY */}
                  <div className="mt-3 md:mt-8 flex-1">
                    <div className="text-[12px] md:text-[21px] font-bold leading-snug mb-4 md:mb-6 whitespace-pre-line">
                      {t.title}
                    </div>
                    <div className="text-[11px] md:text-[18px] leading-snug whitespace-pre-line">
                      {t.desc}
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-4 md:mt-6">
                    <div className="text-[12px] md:text-[22px] font-semibold">
                      {t.income}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP ARROWS */}
          {/* <button
            type="button"
            onClick={prevSlide}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 h-10 w-10 items-center justify-center rounded-full border border-[#C00000] bg-white/90 shadow-sm hover:bg-white">
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 h-10 w-10 items-center justify-center rounded-full border border-gray-300 bg-white/90 shadow-sm hover:bg-white">
            <ChevronRight size={20} />
          </button> */}
        </div>

        {/* DOTS (desktop only – because mobile is free scroll) */}
        <div className=" hidden md:flex gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-[#9C261C]" : "bg-gray-300"
              }`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
