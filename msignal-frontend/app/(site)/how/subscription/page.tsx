/** @format */
"use client";

import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import FaqSection from "@/app/(site)/components/howSections/Faq";
import Link from "next/link";
import FullWidth from "@/app/(site)/components/layout/FullWidth";
const Subscription = () => {
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
    <>
      <section className="w-full mx-auto ">
        {/* ================= Desktop Hero (image + button anchored) ================= */}
        <div className="hidden md:block relative h-[240px]  sm:h-[300px] md:h-[400px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/subscriptionMain.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>

          {/* ✅ Desktop Button: fixed position relative to hero, always centered */}
          <div className="absolute left-1/2 bottom-20 -translate-x-1/2 w-full px-4 flex justify-center">
            <Link
              href="https://www.mql5.com/ko/signals/2339203?source=Site+Signals+MT5+Tile+All+Search%3aMsignal"
              className="w-full flex justify-center">
              <button
                type="button"
                className="w-full max-w-[450px] h-12 sm:h-14 md:h-[72px] rounded-[10px] text-white text-[18px] sm:text-[20px] md:text-[25px] font-bold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out gap-3"
                style={{
                  background:
                    "linear-gradient(180deg, #222222 0% , #000000 100%, #000000 100%)",
                  border: "2px solid #C3C3C3",
                }}>
                <span>
                  <img src="/images/search.svg" alt="" />
                </span>
                MQL에서 <span className="text-[#FF3434]">M시그널</span>을
                찾아보세요
              </button>
            </Link>
          </div>
        </div>

        {/* ================= Mobile Hero (image + button anchored) ================= */}
        <div className="md:hidden relative h-[180px] sm:h-[300px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/submobile.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>

          {/* ✅ Mobile Button: fixed position relative to hero, always centered */}
          <div className="absolute left-1/2 bottom-6 -translate-x-1/2 w-[200px] px-2 flex justify-center">
            <Link
              href="https://www.mql5.com/ko/signals/2339203?source=Site+Signals+MT5+Tile+All+Search%3aMsignal"
              className="w-full flex justify-center">
              <button
                type="button"
                className="w-full max-w-[280px] h-11 rounded-[7px] text-white text-[10px] font-bold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out gap-2"
                style={{
                  background:
                    "linear-gradient(180deg, #222222 0% , #000000 100%, #000000 100%)",
                  border: "2px solid #C3C3C3",
                }}>
                <span>
                  <img
                    style={{ width: "12px" }}
                    src="/images/search.svg"
                    alt=""
                  />
                </span>
                MQL에서 <span className="text-[#FF3434] ">M시그널</span>을
                찾아보세요
              </button>
            </Link>
          </div>
        </div>
      </section>

      <motion.section
        className="w-full bg-white flex  items-center px-4 md:px-0 md:mt-42 "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className=" mt-40 mb-40 hidden md:block   items-center justify-center mx-auto flex flex-col gap-6">
          <img src="/images/subs2.svg" alt="" />
          <div className=" relative flex items-center justify-center bottom-80">
            <Link href={"/how/copytrading"}>
              <div
                className=" hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #C00000",
                  width: "346px",
                  height: "56px",
                  justifyContent: "space-between",
                  gap: "10px",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}>
                <p className=" relative text-black font-bold text-[22px] left-5 ">
                  카피트레이딩 방식 이용하기
                </p>
                <span className="relative right-0.5">
                  <img
                    style={{
                      width: "50px",
                    }}
                    src="/images/redarrow.svg"
                    alt=""
                  />
                </span>
              </div>
            </Link>
          </div>
        </div>{" "}
        {/* mobile  */}
        <div className=" mt-20 md:hidden w-[1100px] mx-auto flex flex-col gap-6">
          <div>
            <img src="/images/submobile2.svg" alt="" />
          </div>
          <div className=" relative flex items-center justify-center ">
            <Link href={"/how/copytrading"}>
              <div
                className=" hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer"
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  border: "1px solid #C00000",
                  width: "250px",
                  height: "40px",
                  justifyContent: "space-between",
                  gap: "10px",
                  borderRadius: "50px",
                  cursor: "pointer",
                }}>
                <p className=" relative text-black font-bold text-[14px] left-5 ">
                  카피트레이딩 방식 이용하기
                </p>
                <span className="relative right-0.5">
                  <img
                    style={{
                      width: "34px",
                    }}
                    src="/images/redarrow.svg"
                    alt=""
                  />
                </span>
              </div>
            </Link>
          </div>{" "}
          <div className=" relative flex items-center justify-center ">
            <div>
              <img src="/images/submobile3.svg" alt="" />
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="w-full bg-white flex flex-col items-center  px-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="  mb-70 mt-40 hidden md:block w-full max-w-[1100px] mx-auto flex flex-col gap-8">
          {/* Title */}
          <h2 className="text-[24px] sm:text-[28px] md:text-[32px] font-bold text-center mb-2 text-black">
            이용방법
          </h2>

          {/* Steps */}
          <div className="flex flex-col gap-4">
            {/* 1 */}
            <div className="flex flex-col flex-1 items-start gap-4">
              <div className="flex items-center gap-5 mb-2">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span className="font-semibold text-black text-[15px] sm:text-[16px]">
                  MQL 들어가기
                </span>
              </div>
              <div className="w-full bg-[#f7f7f7] rounded-[10px] px-4 sm:px-6 py-3 sm:py-4">
                <p className="text-[13px] sm:text-[14px] md:text-sm text-gray-700 leading-relaxed">
                  MT5를 이용하는 트레이더들의 전략과 언어를 공유하고 구매하는
                  사이트입니다. 홈페이지에 들어가주세요.
                </p>
              </div>
            </div>

            {/* 2 */}
            <div className="flex flex-col flex-1 items-start gap-4">
              <div className="flex items-center gap-5 mb-2">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span className="font-semibold text-black text-[15px] sm:text-[16px]">
                  시그널 마켓 입장
                </span>
              </div>
              <div className="w-full bg-[#f7f7f7] rounded-[10px] px-4 sm:px-6 py-3 sm:py-4">
                <p className="text-[13px] sm:text-[14px] md:text-sm text-gray-700 leading-relaxed">
                  다양한 EA, 인디케이터 등을 구매할 수 있는 창구입니다. 상단
                  메뉴바에서 시그널을 클릭하여 Msignal을 검색해주세요.
                </p>
              </div>
            </div>

            {/* 3 */}
            <div className="flex flex-col flex-1 items-start gap-4">
              <div className="flex items-center mb-2 gap-5">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <p className="font-semibold text-black text-[15px] sm:text-[16px]">
                  M시그널을 검색해주세요
                </p>
              </div>
              <div className="w-full bg-[#f7f7f7] rounded-[10px] px-4 sm:px-6 py-3 sm:py-4">
                <p className="text-[13px] sm:text-[14px] md:text-sm text-gray-700 leading-relaxed">
                  M시그널은 MQL에 정식 승인을 받아 다운 및 설치 가능합니다.
                </p>
              </div>
            </div>

            {/* 4 */}
            <div className="flex flex-col flex-1 items-start gap-4">
              <div className="flex items-center mb-2 gap-5">
                <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span className="font-semibold text-black text-[15px] sm:text-[16px]">
                  본인의 MT5에 설치하면 끝!
                </span>
              </div>
              <div className="w-full bg-[#f7f7f7] rounded-[10px] px-4 sm:px-6 py-3 sm:py-4">
                <p className="text-[13px] sm:text-[14px] md:text-sm text-gray-700 leading-relaxed">
                  *주의 M시그널은 헤지후드사의 정책을 따르고 있기 때문에
                  헤지후드의 계좌가 필요합니다. 헤지후드에 계좌를 개설 후 가입이
                  가능합니다. <br />
                  가입을 원하시는 분들은 카피트레이딩란을 참고해주세요.
                </p>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            type="button"
            className="mt-4 w-full h-[72px] bg-black text-white text-[18px] font-semibold rounded-[4px] flex items-center justify-center tracking-wide    hover:shadow-xl hover:-translate-y-[2px]
             active:scale-95 active:translate-y-0 active:shadow-md
             transition-transform transition-shadow duration-150 ease-out
             cursor-pointer">
            설치 바로가기 ▶
          </button>
        </div>

        <div className="md:hidden mb-20 mt-40">
          <img src="/images/submobile4.svg" alt="" />
          {/* Button */}
          <button
            type="button"
            className="mt-4 w-full h-[40px] bg-black text-white text-[16px] font-semibold rounded-[99px] flex items-center justify-center tracking-wide    hover:shadow-xl hover:-translate-y-[2px]
             active:scale-95 active:translate-y-0 active:shadow-md
             transition-transform transition-shadow duration-150 ease-out
             cursor-pointer">
            설치 바로가기 ▶
          </button>
        </div>
      </motion.section>
    </>
  );
};

export default Subscription;
