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
      <section className=" w-full mx-auto">
        <div className=" hidden md:block relative h-[220px] sm:h-[260px] md:h-[450px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/subMain.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>{" "}
        <div className=" md:hidden relative h-[150px] -mx-4 sm:h-[260px] md:h-[400px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/copymobile.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>
      </section>

      <motion.section
        className="w-full bg-white flex items-center md:mt-40 "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* desktop */}
        <div className="hidden md:block w-[1100px] mx-auto flex flex-col gap-16 mt-40 mb-40">
          {/* 1. MT5 전용 계좌 개설 방법 */}
          <Link href={"https://blog.naver.com/msignal_/224096790252"}>
            <div className="flex items-stretch w-full border border-black rounded-[15px] overflow-hidden shadow-sm    hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
              {/* Left icon area */}
              <div className=" md:w-[180px]  bg-black flex items-center justify-center">
                <Image
                  src="/images/account.svg" // ← 아이콘 경로만 바꿔주세요
                  alt="MT5 전용 계좌 개설 아이콘"
                  width={90}
                  height={90}
                />
              </div>{" "}
              {/* Right content area */}
              <div className="flex-1 flex items-center justify-between px-10 py-8 bg-white">
                <div>
                  <h3 className="text-[14px] md:text-[24px] font-semibold mb-3 text-[#000000]">
                    MT5 전용 계좌 개설 방법
                  </h3>
                  <p className="text-[12px] md:text-[18px] font-semibold  leading-relaxed text-[#000000]">
                    안전한 브로커사를 통해 MT5 전용 계좌, 지금 개설해 보세요!
                  </p>
                </div>
                <ChevronRight className="w-7 h-7 text-black" />
              </div>
            </div>
          </Link>

          {/* 2. 입금 방법 */}
          <Link href={"https://blog.naver.com/msignal_/224096790252"}>
            <div
              className="mt-10 flex items-stretch w-full border border-black rounded-[20px] overflow-hidden shadow-sm    hover:shadow-xl hover:-translate-y-[2px]
            active:scale-95 active:translate-y-0 active:shadow-md
            transition-transform transition-shadow duration-150 ease-out
            cursor-pointer">
              <div className="w-[180px] bg-black flex items-center justify-center">
                <Image
                  src="/images/deposit.svg" // ← 동전 아이콘
                  alt="입금 방법 아이콘"
                  width={90}
                  height={90}
                />
              </div>
              <div className="flex-1 flex items-center justify-between px-10 py-8 bg-white">
                <div>
                  <h3 className="text-[24px] font-semibold mb-3 text-[#000000]">
                    입금 방법
                  </h3>
                  <p className="text-[18px]  font-semibold  text-[#000000] leading-relaxed text-black">
                    자동매매 트레이딩에 필요한 운용금을 입금해 주세요. <br />
                    M시그널은 자동매매 신호를 본인의 계좌에 그대로 붙여 사용하는
                    방식입니다.
                  </p>
                </div>
                <ChevronRight className="w-7 h-7 text-black" />
              </div>
            </div>
          </Link>

          {/* 3. 카피트레이딩 방법 */}
          <Link href={"https://blog.naver.com/msignal_/224096790252"}>
            <div
              className="mt-10 flex items-stretch w-full border border-black rounded-[20px] overflow-hidden shadow-sm    hover:shadow-xl hover:-translate-y-[2px]
            active:scale-95 active:translate-y-0 active:shadow-md
            transition-transform transition-shadow duration-150 ease-out
            cursor-pointer">
              <div className="w-[180px] bg-black flex items-center justify-center">
                <Image
                  src="/images/copytrading.svg" // ← 사람 아이콘
                  alt="카피트레이딩 방법 아이콘"
                  width={90}
                  height={90}
                />
              </div>
              <div className="flex-1 flex items-center justify-between px-10 py-8 bg-white">
                <div>
                  <h3 className="text-[24px] font-semibold mb-3 text-[#000000]">
                    카피트레이딩 방법
                  </h3>
                  <p className="text-[18px] font-semibold text-[#000000] leading-relaxed text-black">
                    M시그널 EA는 사전에 설정된 알고리즘이 사용자의 계좌에서
                    자동으로 매매되도록 돕는 프로그램입니다. <br />
                    모든 설정은 사용자가 직접 조정합니다.
                  </p>
                </div>
                <ChevronRight className="w-7 h-7 text-black" />
              </div>
            </div>
          </Link>
          <div className="text-[#A2A2A2] text-[12px] mt-2">
            <p>
              *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로,{" "}
              <span className="text-[#444444]">
                원금 및 수익을 보장하지 않습니다.
              </span>
            </p>
            <p>
              *시장 상황에 따라 손실이 발생할 수 있으며, 투자 결정의 책임은
              이용사 본인에게 있습니다.
            </p>
          </div>
        </div>
        {/* mobile  */}
        <div className="md:hidden w-[1100px] mx-auto flex flex-col gap-6 mt-20 ">
          <Link href={"https://blog.naver.com/msignal_/224096790252"}>
            <div className=" h-18 px-2 flex items-stretch  w-full border border-black rounded-[10px] overflow-hidden shadow-sm    hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
              <div className=" md:w-[180px]  bg-white flex items-center justify-center">
                <Image
                  src="/images/mobileaccount.svg"
                  alt="MT5 전용 계좌 개설 아이콘"
                  width={40}
                  height={40}
                />
              </div>{" "}
              <div className="flex-1 flex items-center justify-between px-2 py-3 bg-white">
                <div>
                  <h3 className="text-[12px] md:text-[24px] font-semibold  text-[#000000]">
                    MT5 전용 계좌 개설 방법
                  </h3>
                  <p className="text-[10px] md:text-[18px]  leading-relaxed text-[#000000]">
                    안전한 브로커사를 통해 MT5 전용 계좌, <br /> 지금 개설해
                    보세요!
                  </p>
                </div>
                <ChevronRight className="w-7 h-7 text-black" />
              </div>
            </div>
          </Link>

          <Link href={"https://blog.naver.com/msignal_/224096790252"}>
            <div className=" h-24  px-2 flex items-stretch  w-full border border-black rounded-[10px] overflow-hidden shadow-sm    hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
              <div className=" md:w-[180px]  bg-white flex items-center justify-center">
                <Image
                  src="/images/mobilecoin.svg"
                  alt="MT5 전용 계좌 개설 아이콘"
                  width={40}
                  height={40}
                />
              </div>{" "}
              <div className="flex-1 flex items-center justify-between px-2 py-3 bg-white">
                <div>
                  <h3 className="text-[12px] md:text-[24px] font-semibold  text-[#000000]">
                    입금 방법
                  </h3>
                  <p className="text-[10px] md:text-[18px]  leading-relaxed text-[#000000]">
                    자동매매 트레이딩에 필요한 운용금을 입금해 주세요. <br />{" "}
                    M시그널은 자동매매 신호를 본인의 계좌에 그대로 <br /> 붙여
                    사용하는데 방식입니다
                  </p>
                </div>
                <ChevronRight className="w-7 h-7 text-black" />
              </div>
            </div>
          </Link>

          <Link href={"https://blog.naver.com/msignal_/224096790252"}>
            <div className=" h-24  px-2 flex items-stretch  w-full border border-black rounded-[10px] overflow-hidden shadow-sm    hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer">
              <div className=" md:w-[180px]  bg-white flex items-center justify-center">
                <Image
                  src="/images/mobileuser.svg"
                  alt="MT5 전용 계좌 개설 아이콘"
                  width={40}
                  height={40}
                />
              </div>{" "}
              <div className="flex-1 flex items-center justify-between px-2 py-3 bg-white">
                <div>
                  <h3 className="text-[12px] md:text-[24px] font-semibold  text-[#000000]">
                    카피트레이딩 방법
                  </h3>
                  <p className="text-[10px] md:text-[18px]  leading-relaxed text-[#000000]">
                    M시그널 EA는 사전에 설정된 알고리즘이 사용자의 <br />{" "}
                    계좌에서 자동으로 매매되도록 돕는 프로그램입니다. <br />{" "}
                    모든 설정은 사용자가 직접 조정합니다.
                  </p>
                </div>
                <ChevronRight className="w-7 h-7 text-black" />
              </div>
            </div>
          </Link>
          <div className="text-[#A2A2A2] text-[8px] -mt-5">
            <p>
              *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로,{" "}
              <span className="text-[#444444]">
                원금 및 수익을 보장하지 않습니다.
              </span>
            </p>
            <p>
              *시장 상황에 따라 손실이 발생할 수 있으며, 투자 결정의 책임은
              이용사 본인에게 있습니다.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="w-full bg-white flex items-center "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className=" hidden md:block w-[1100px] h-[403px] mx-auto flex items-center   mb-50 mt-40 ">
          <img src="/images/subimg1.svg" alt="" />
        </div>{" "}
        <div className="md:hidden w-[1100px] h-[180px] mx-auto flex items-center  mt-30    ">
          <img src="/images/copymobile2.svg" alt="" />
        </div>
      </motion.section>

      {/* //////// */}
      <motion.section
        className="w-full bg-white flex flex-col items-center mb-70 mt-40 px-2"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* 상단 이미지 */}
        <div className="w-full max-w-[1100px] mx-auto flex items-center justify-center">
          <img
            src="/images/signal.png"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 텍스트 */}
        <div className="mt-10 sm:mt-16 flex flex-col items-center text-center">
          <h1 className="text-black font-semibold text-[18px] sm:text-[22px] md:text-[24px] md:mb-2">
            배수 설정으로 거래량 조절
          </h1>
          <h3 className="text-black font-medium text-[12px] sm:text-[18px] md:text-[20px]">
            거래량 조절로 계약 금액을 사용자가 직접 조절 가능합니다.
          </h3>
        </div>

        {/* 하단 이미지 */}
        <div className="mt-10 sm:mt-14 w-full max-w-[1100px] mx-auto flex items-center justify-center">
          <img
            src="/images/subimg3.svg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </motion.section>

      <FaqSection />
    </>
  );
};

export default Subscription;
