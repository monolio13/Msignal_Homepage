/** @format */
"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

export default function MSignalSolidSection() {
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
  return (
    <motion.section
      className=" sw-full sbg-gradient-to-b from-[#f5f5f5] via-[#e4e4e4] to-[#141414] spy-16 md:py-20 lg:py-24"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-0 flex flex-col items-center">
        {/* 제목 + 양쪽 코너 라인 */}
        <div className=" hidden md:block flex items-center justify-center gap-4 md:gap-6 mb-10 md:mb-14">
          <p className=" text-[20px] md:text-[26px] lg:text-[48px] font-bold text-black text-center leading-snug">
            지금도 M시그널은 더욱 단단해지고 있습니다
          </p>
        </div>
        {/* 🔥 This block now goes full-bleed on mobile */}
        <div className=" hidden md:block w-full -mx-4 md:mx-0">
          <img
            src="/images/solidSection.svg"
            alt="Monitor Icon"
            className="w-full h-auto"
          />
        </div>{" "}
        <div className="md:hidden w-full -mx-4 md:mx-0">
          <img
            src="/images/msignal4.svg"
            alt="Monitor Icon"
            className="w-full h-auto"
          />
        </div>
        {/* CTA 영역 */}
        <div className=" hidden md:block w-full max-w-[1276px] mt-14 md:mt-30 mb-20 ">
          <Link
            href="https://www.youtube.com/@M-%EC%8B%9C%EA%B7%B8%EB%84%90"
            className="
          flex items-center justify-between
          bg-[#111111]
          text-white
          rounded-[22px]
          px-6 md:px-9
          py-5 md:py-6
          shadow-[0_18px_40px_rgba(0,0,0,0.45)]
          hover:shadow-xl hover:-translate-y-[2px]
          active:scale-95 active:translate-y-0 active:shadow-md
          transition-transform transition-shadow duration-150 ease-out
          cursor-pointer">
            <span className="text-[15px] md:text-[18px] lg:text-[44px] font-semibold">
              M시그널의 개발 비하인드 영상으로 확인하세요! ↘
            </span>
            <div className="flex items-center justify-center">
              <img src="/images/youtubeee.svg" alt="YouTube Icon" />
            </div>
          </Link>
        </div>{" "}
        <div className="md:hidden w-full max-w-[1276px] mt-14 md:mt-30 mb-20 ">
          <Link
            href="https://www.youtube.com/@M-%EC%8B%9C%EA%B7%B8%EB%84%90"
            className="
          flex items-center justify-between
          bg-[#111111]
          text-white
          rounded-[22px]
          px-3 md:px-9
          py-1 md:py-6
          shadow-[0_18px_40px_rgba(0,0,0,0.45)]
          hover:shadow-xl hover:-translate-y-[2px]
          active:scale-95 active:translate-y-0 active:shadow-md
          transition-transform transition-shadow duration-150 ease-out
          cursor-pointer
        ">
            <span className="text-[11px] md:text-[18px] lg:text-[44px] font-semibold">
              M시그널의 개발 비하인드 영상으로 확인하세요!
            </span>
            <span>
              <img src="/images/downicon.svg" alt="" />
            </span>
            <div className="flex items-center justify-center ">
              <img src="/images/youtubeMobile.svg" alt="YouTube Icon" />
            </div>
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
