/** @format */
"use client";

import InfoCard from "@/app/(site)/components/aboutSections/infoCard";
import MSignalSolidSection from "@/app/(site)/components/aboutSections/solidSection";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProfitSection() {
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
    <div>
      <motion.section
        className="w-screen -ml-4 md:w-full md:ml-0 flex justify-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full md:container-1440 md:px-0 flex justify-center">
          <div className="relative w-full max-w-[1440px] flex flex-col items-center px-4 md:px-0 pb-10 md:pb-0">
            {/* Top Title */}
            <div className=" hidden md:flex mt-10 md:mt-30 w-full flex flex-col ml-25  ">
              <p className=" text-[22px] md:text-[40px] font-bold leading-tight md:leading-tight mb-4 md:mb-6 text-black text-center md:text-left">
                매일매일 같은 리듬으로 쌓이는 수익,
                <br className="hidden md:block" />
                꾸준함을 프로그래밍하다
              </p>

              <p className=" text-[16px] md:text-[26px] text-black text-center md:text-left">
                변동성에도 흔들리지 않는, M시그널의 자동매매 시스템.
              </p>
            </div>{" "}
            {/* mobile */}
            <div className=" md:hidden mt-10 md:mt-30 w-full flex flex-col items-center md:items-start">
              <p className=" text-[22px] md:text-[40px] font-bold leading-tight md:leading-tight mb-4 md:mb-6 text-black  md:text-left">
                매일매일 같은 리듬으로 쌓이는 수익,
                <br />
                꾸준함을 프로그래밍하다
              </p>

              <p className=" text-[14px] md:text-[26px] text-black text-center md:text-left">
                변동성에도 흔들리지 않는, M시그널의 자동매매 시스템.
              </p>
            </div>
            {/* Black stats box */}
            <div className=" hidden md:flex w-full  justify-between max-w-[1342px] bg-[#1B1B1B] rounded-[18px] mt-8 md:mt-24   md:px-30 py-6 md:py-15 gap-6 md:gap-0">
              {/* 1 */}
              <div className="text-center flex flex-col gap-2 md:gap-3">
                <span className="text-[14px] md:text-[28px] text-white opacity-80">
                  평균 승률
                </span>
                <span className="text-[22px] md:text-[48px] font-bold text-white">
                  55%이상
                </span>
              </div>

              {/* 2 */}
              <div className="text-center flex flex-col gap-2 md:gap-3">
                <span className="text-[14px] md:text-[28px] text-white opacity-80">
                  한 달 거래량
                </span>
                <span className="text-[22px] md:text-[48px] font-bold text-white">
                  약 170건
                </span>
              </div>

              {/* 3 */}
              <div className="text-center flex flex-col gap-2 md:gap-3">
                <span className="text-[14px] md:text-[28px] text-white opacity-80">
                  1달 수익률
                </span>
                <span className="text-[22px] md:text-[48px] font-bold text-white">
                  9.4%
                </span>
              </div>
            </div>
            {/* mobile */}
            <div className=" md:hidden w-full max-w-[1342px] bg-[#1B1B1B] rounded-[10px] mt-8 md:mt-24 flex flex-row  items-center justify-between px-6 md:px-30 py-4 md:py-0 gap-6 md:gap-0">
              {/* 1 */}
              <div className="text-center flex flex-col gap-2 md:gap-3">
                <span className="text-[14px] md:text-[28px] text-white opacity-80">
                  평균 승률
                </span>
                <span className="text-[22px] md:text-[48px] font-bold text-white">
                  55%이상
                </span>
              </div>

              {/* 2 */}
              <div className="text-center flex flex-col gap-2 md:gap-3">
                <span className="text-[14px] md:text-[28px] text-white opacity-80">
                  한 달 거래량
                </span>
                <span className="text-[22px] md:text-[48px] font-bold text-white">
                  약 170건
                </span>
              </div>

              {/* 3 */}
              <div className="text-center flex flex-col gap-2 md:gap-3">
                <span className="text-[14px] md:text-[28px] text-white opacity-80">
                  1달 수익률
                </span>
                <span className="text-[22px] md:text-[48px] font-bold text-white">
                  9.4%
                </span>
              </div>
            </div>
            {/* Date label */}
            <p
              className="
          text-[12px] md:text-[20px]
          text-[#8D8D8D]
          mt-2 md:mt-6
          text-left md:text-left
          self-start md:self-start
          md:pl-[60px]
        ">
              2025년 10월 기준
            </p>
          </div>
        </div>
      </motion.section>

      {/* second section */}
      <motion.section
        className="w-screen -ml-4 md:w-full md:ml-0 flex justify-center mb-20 md:mt-80"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full md:container-1440 md:px-0">
          <div className=" hidden md:block relative w-full h-[360px] md:h-[695px] overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <Image
                src={"/images/aboutsecond.svg"}
                alt="M Signal hero background"
                fill
                style={{ objectFit: "cover", background: "white" }}
                priority
              />
            </AnimatePresence>
          </div>{" "}
          <div className=" md:hidden relative w-full h-[200px] md:h-[695px] overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <Image
                src={"/images/msignal2.svg"}
                alt="M Signal hero background"
                fill
                style={{ objectFit: "cover", background: "white" }}
                priority
              />
            </AnimatePresence>
          </div>
        </div>
      </motion.section>

      <InfoCard />

      <motion.section
        className="w-screen -ml-4 md:w-[1440px] md:ml-auto md:mr-auto mb-20 md:mt-70"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* 상단 이미지 영역 */}
        <div className=" hidden md:block relative h-[360px] md:h-[631px] flex items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/aboutSignal.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>{" "}
        <div className=" md:hidden relative h-[180px] md:h-[631px] flex items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/msignal3.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>
        {/* 🔽 데스크톱: 이미지에 겹쳐지는 카드 두 개 (원래 그대로) */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            bottom: "100px",
          }}
          className="hidden  md:block md:flex">
          {/* 카드 1: 24시간 라이브 거래 방송 */}
          <div className="hidden  md:block md:flex w-[616px] relative bg-white rounded-[12px] shadow-[0_14px_32px_rgba(0,0,0,0.08)] px-8 py-10 flex items-center justify-between overflow-hidden">
            {/* 붉은 코너 장식 */}
            <div
              className="absolute left-0 top-0 w-[70px] h-[70px]
                   bg-[#B42525] rounded-tl-[12px]
                   [clip-path:polygon(0_0,100%_0,0_100%)]"
            />

            {/* 텍스트 영역 */}
            <div className="relative z-[1] max-w-[60%]">
              <h3 className="text-[24px] lg:text-[26px] font-bold text-black mb-4">
                24시간 라이브 거래 방송
              </h3>
              <p className="text-[16px] lg:text-[18px] leading-relaxed text-[#333] mb-4">
                유튜브를 통한 조작 없는 24시간 라이브를
                <br />
                통해 어디서든 M시그널의 거래 내역을
                <br />
                확인할 수 있습니다.
              </p>
              <p className="text-[14px] lg:text-[15px] text-[#555] mb-6">
                ▶ 실시간 O, 이전 거래내역 확인 X
              </p>

              <Link
                href={"https://www.youtube.com/@M-%EC%8B%9C%EA%B7%B8%EB%84%90"}>
                <button
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full
                       bg-[#3F3F3F] text-white text-[14px] font-medium
                       shadow-[0_4px_10px_rgba(0,0,0,0.2)]
                       hover:bg-black transition  hover:shadow-xl hover:-translate-y-[2px]
                       active:scale-95 active:translate-y-0 active:shadow-md
                       transition-transform transition-shadow duration-150 ease-out
                       cursor-pointer">
                  유튜브 바로가기
                </button>
              </Link>
            </div>

            {/* 오른쪽 폰 이미지 */}
            <div
              style={{
                marginBottom: "-150px",
              }}
              className="relative z-[1] flex-shrink-0 mt-6">
              <img
                src="/images/lastphone.svg"
                alt="YouTube live trading"
                className="w-[220px] h-auto"
              />
            </div>
          </div>

          {/* 카드 2: 전체 거래 내역 공개 */}
          <div className="hidden  md:block md:flex w-[616px] relative bg-white rounded-[12px] shadow-[0_14px_32px_rgba(0,0,0,0.08)] px-8 py-10 flex items-center justify-between overflow-hidden">
            {/* 붉은 코너 장식 */}
            <div
              className="absolute left-0 top-0 w-[70px] h-[70px]
                   bg-[#B42525] rounded-tl-[12px]
                   [clip-path:polygon(0_0,100%_0,0_100%)]"
            />

            {/* 텍스트 영역 */}
            <div className="relative z-[1] max-w-[60%]">
              <h3 className="text-[24px] lg:text-[26px] font-bold text-black mb-4">
                전체 거래 내역 공개
              </h3>
              <p className="text-[16px] lg:text-[18px] leading-relaxed text-[#333] mb-4">
                MQL에서 M시그널 자동매매를 직접 구입할
                <br />
                수 있으며 과거 M시그널의 거래내역을
                <br />
                모두 확인할 수 있습니다.
              </p>
              <p className="text-[14px] lg:text-[15px] text-[#555] mb-6">
                ▶ 실시간 X, 이전 거래내역 확인 O
              </p>
              <Link
                href={
                  "https://www.mql5.com/ko/signals/2339203?source=Site+Signals+MT5+Tile+All+Search%3aMsignal"
                }>
                <button
                  className="inline-flex items-center justify-center px-6 py-2 rounded-full
                       bg-[#3F3F3F] text-white text-[14px] font-medium
                       shadow-[0_4px_10px_rgba(0,0,0,0.2)]
                       hover:bg-black transition  hover:shadow-xl hover:-translate-y-[2px]
                       active:scale-95 active:translate-y-0 active:shadow-md
                       transition-transform transition-shadow duration-150 ease-out
                       cursor-pointer">
                  MQL 바로가기
                </button>
              </Link>
            </div>

            {/* 오른쪽 폰 이미지 */}
            <div
              style={{
                marginBottom: "-170px",
              }}
              className="relative z-[1] flex-shrink-0">
              <img
                src="/images/lastphone2.svg"
                alt="MQL trade history"
                className="w-[180px] h-auto"
              />
            </div>
          </div>
        </div>
        {/* 🔽 모바일: 세로로 쌓이는 카드 두 개 (전체 폭 꽉 채움) */}
        <div className="md:hidden px-4 -mt-10 flex flex-col gap-4">
          {/* 카드 1: 24시간 라이브 거래 방송 */}
          <div className="w-full relative bg-white rounded-[2px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] px-6 py-2 flex items-center justify-between overflow-hidden">
            {/* 붉은 코너 장식 */}
            <div
              className="absolute left-0 top-0 w-[25px] h-[25px]
                   bg-[#B42525] rounded-tl-[2px]
                   [clip-path:polygon(0_0,100%_0,0_100%)]"
            />

            <div className="relative z-[1] ">
              <h3 className="text-[14px] font-bold text-black mb-2">
                24시간 라이브 거래 방송
              </h3>
              <p className="text-[11px] font-semibold leading-relaxed text-[#333] mb-2">
                유튜브를 통한 조작 없는 24시간 라이브를 통해 어디서든 <br />{" "}
                M시그널의 거래 내역을 확인할 수 있습니다.
              </p>
              <p className="text-[11px] font-semibold text-[#555] ">
                ▶ 실시간 O, 이전 거래내역 확인 X
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "-8px",
                }}
                className=" w-70 flex items-center">
                <Link
                  href={
                    "https://www.youtube.com/@M-%EC%8B%9C%EA%B7%B8%EB%84%90"
                  }>
                  <button
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full
                  bg-[#3F3F3F] text-white text-[12px] font-medium
                  shadow-[0_3px_8px_rgba(0,0,0,0.18)]
                  hover:bg-black transition hover:-translate-y-[1px]
                  active:scale-95 active:translate-y-0 active:shadow-md
                  transition-transform transition-shadow duration-150 ease-out
                  cursor-pointer">
                    유튜브 바로가기
                  </button>
                </Link>

                <div className="z-[1] flex-shrink-0 ">
                  <img
                    src="/images/blackphone.svg"
                    alt="YouTube live trading"
                    className="w-[120px] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 카드 2: 전체 거래 내역 공개 */}
          <div className="w-full relative bg-white rounded-[2px] shadow-[0_10px_24px_rgba(0,0,0,0.08)] px-6 py-2 flex items-center justify-between overflow-hidden">
            {/* 붉은 코너 장식 */}
            <div
              className="absolute left-0 top-0 w-[25px] h-[25px]
                   bg-[#B42525] rounded-tl-[2px]
                   [clip-path:polygon(0_0,100%_0,0_100%)]"
            />

            <div className="relative z-[1]">
              <h3 className="text-[12px] font-bold text-black mb-2">
                전체 거래 내역 공개
              </h3>
              <p className="text-[11px] font-semibold leading-relaxed text-[#333] mb-2">
                MQL에서 M시그널 자동매매를 직접 구입할 수 있으며 <br /> 과거
                M시그널의 거래내역을 모두 확인할 수 있습니다.
              </p>
              <p className="text-[11px] font-semibold text-[#555] ">
                ▶ 실시간 X, 이전 거래내역 확인 O
              </p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "-12px",
                }}
                className=" w-70 flex items-center">
                <Link
                  href={
                    "https://www.mql5.com/ko/signals/2339203?source=Site+Signals+MT5+Tile+All+Search%3aMsignal"
                  }>
                  <button
                    className="inline-flex items-center justify-center px-4 py-1.5 rounded-full
                       bg-[#3F3F3F] text-white text-[12px] font-medium
                       shadow-[0_3px_8px_rgba(0,0,0,0.18)]
                       hover:bg-black transition hover:-translate-y-[1px]
                       active:scale-95 active:translate-y-0 active:shadow-md
                       transition-transform transition-shadow duration-150 ease-out
                       cursor-pointer">
                    MQL 바로가기
                  </button>
                </Link>

                <div className="relative z-[1] flex-shrink-0 ">
                  <img
                    src="/images/whitephone.svg"
                    alt="MQL trade history"
                    className="w-[119px] h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <MSignalSolidSection />
    </div>
  );
}
