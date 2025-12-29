/** @format */
"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useInView } from "framer-motion";
import FullWidth from "@/app/(site)/components/layout/FullWidth";

export default function StrategyPage() {
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

  const TARGET_AMOUNT = 12152960000; // 12,152,960,000
  const formatKRW = (value: number) => value.toLocaleString("ko-KR") + "원";

  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000; // ms
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setDisplayValue(Math.floor(TARGET_AMOUNT * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView]);

  const childFade: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <>
      <section className="w-full ">
        <div className="w-full mx-auto">
          {/* 데스크탑용 이미지 */}
          <div className="hidden md:block relative overflow-hidden  h-[600px]">
            <AnimatePresence initial={false} mode="wait">
              <Image
                src={"/images/strategyMain.svg"}
                alt="M Signal hero background"
                fill
                className="object-cover bg-white"
                priority
              />
            </AnimatePresence>
          </div>

          {/* 모바일용 이미지 */}
          <div className="md:hidden relative overflow-hidden h-[180px] -mx-4">
            <AnimatePresence initial={false} mode="wait">
              <Image
                src={"/images/strategy.svg"}
                alt="M Signal hero background"
                fill
                className="object-cover bg-white"
                priority
              />
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* //////// */}
      <motion.section
        className="w-full bg-white "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* ===== DESKTOP / TABLET (기존 레이아웃 그대로) ===== */}
        <div className="hidden md:flex w-[1100px] h-[403px] mx-auto items-center justify-between mb-70 mt-50">
          {/* LEFT: text block */}
          <motion.div
            className="flex-1 max-w-[520px] pl-6"
            variants={childFade}>
            {/* top dots */}
            <motion.div
              className="flex items-center gap-2 mb-10"
              variants={childFade}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
            </motion.div>

            <motion.h2
              className="text-[30px] leading-[1.3] font-semibold mb-6 text-black"
              variants={childFade}>
              단기 수익률이 높은 인디케이터 조합
            </motion.h2>

            <motion.p
              className="text-[18px] leading-[1.8] text-[#444444]"
              variants={childFade}>
              전 세계에서 단기 수익률이 가장 높은 유료 인디케이터
              <br />
              234개 이상을 분석하여 M시그널에 적용했습니다.
            </motion.p>
          </motion.div>

          {/* RIGHT: dots image */}
          <motion.div className="flex-1 flex justify-end" variants={childFade}>
            <div className="w-[620px] h-[300px] relative">
              <Image
                src="/images/dots.svg"
                alt="단기 수익률 인디케이터 비주얼"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* ===== MOBILE 전용 레이아웃 ===== */}
        <div className="md:hidden w-full px-4 pt-20 pb-12 relative overflow-hidden">
          {/* LEFT TEXT (top) */}
          <motion.div className="max-w-[90%]" variants={childFade}>
            {/* top dots */}
            <motion.div
              className="flex items-center gap-2 mb-6"
              variants={childFade}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
            </motion.div>

            <motion.h2
              className="text-[18px] leading-[1.35] font-bold mb-4 text-black"
              variants={childFade}>
              단기 수익률이 높은 인디케이터 조합
            </motion.h2>

            <motion.p
              className="text-[12px] font-semibold leading-[1.7] text-[#444444]"
              variants={childFade}>
              전 세계에서 단기 수익률이 가장 높은 <br /> 유료 인디케이터 234개
              이상을 분석하여
              <br /> M시그널에 적용했습니다.
            </motion.p>
          </motion.div>

          {/* RIGHT DOTS IMAGE (배경처럼 우측 아래) */}
          <motion.div
            className="absolute right-[-40px] bottom-[-10px] w-[200px] h-[260px]"
            variants={childFade}>
            <Image
              src="/images/dots.svg"
              alt="단기 수익률 인디케이터 비주얼"
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </div>
      </motion.section>
      {/* /////////// */}
      <motion.section
        className="w-full bg-white flex items-center "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* ===== DESKTOP / TABLET (original layout, untouched) ===== */}
        <div className="hidden md:flex w-[1100px] h-[403px] mx-auto items-center justify-between mb-20 mt-40">
          {/* RIGHT: video block (visually on the left in code order) */}
          <motion.div
            className="flex-1 max-w-[520px] pl-6"
            variants={childFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}>
            <div className="w-[620px] h-[300px] relative">
              <video
                src="/images/martinmotion1.mp4"
                className="object-contain w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </motion.div>

          {/* LEFT: text block */}
          <motion.div
            className="flex-1 w-[520px] pr-20"
            style={{ textAlign: "right" }}
            variants={childFade}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}>
            {/* top dots */}
            <div
              className="flex items-center gap-2 mb-10"
              style={{ justifyContent: "flex-end" }}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
            </div>

            <h2 className="text-[30px] leading-[1.3] font-semibold mb-6 text-black">
              원금 손실 최소화 마틴 전략
            </h2>

            <p className="text-[18px] leading-[1.8] text-[#444444]">
              거래에서 손실 발생 시 다음 회차 진입 계약수를 2배로 체결하여
              <br />
              이전 손실을 모두 복구, 추가 수익을 창출합니다.
              <br />
              단단한 프로그램과 M시그널이 제안하는 증거금 보유 시
              <br />
              리스크 감소로 매우 안전하게 M시그널 이용 가능합니다.
            </p>
          </motion.div>
        </div>

        {/* ===== MOBILE ONLY LAYOUT ===== */}
        <div className="md:hidden w-full px-4 pt-40 pb-12">
          {/* Text block */}
          <motion.div className="w-full text-right" variants={childFade}>
            {/* top dots */}
            <div className="flex items-center gap-2 mb-6 justify-end">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
            </div>

            <h2 className="text-[22px] leading-[1.35] font-bold mb-4 text-black">
              원금 손실 최소화 마틴 전략
            </h2>

            <p className="text-[12px] font-semibold  leading-[1.7] text-[#444444]">
              거래에서 손실 발생 시 다음 회차 진입 계약수를 <br /> 2배로
              체결하여 이전 손실을 모두 복구, 추가 수익을 <br /> 창출합니다.
              단단한 프로그램과 M시그널이 제안하는 <br /> 증거금 보유 시 리스크
              감소로 매우 안전하게 <br />
              M시그널 이용 가능합니다.
            </p>
          </motion.div>

          {/* Video block */}
          <motion.div
            style={{
              width: "200px",
            }}
            className="mt-2 w-full flex justify-start"
            variants={childFade}>
            <div className="w-[210px] h-[200px] relative">
              <video
                src="/images/martinmotion1.mp4"
                className="object-contain w-full h-full"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ////////// */}
      <motion.section
        className="w-full bg-white "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* ===================== DESKTOP (UNCHANGED) ===================== */}
        <div className="hidden md:flex w-[1100px] h-[403px] mx-auto items-center justify-between mb-70 mt-40">
          {/* LEFT TEXT */}
          <motion.div
            className="flex-1 max-w-[520px] pl-6"
            variants={childFade}>
            {/* top dots */}
            <motion.div
              className="flex items-center gap-2 mb-10"
              variants={childFade}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
            </motion.div>

            <motion.h2
              className="text-[30px] leading-[1.3] font-semibold mb-6 text-black"
              variants={childFade}>
              단계별 3M 시스템
            </motion.h2>

            <motion.p
              className="text-[18px] leading-[1.8] text-[#444444]"
              variants={childFade}>
              연속 손실 발생 시 3단계마다 각 단계별 전략이 발동합니다.
            </motion.p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            className="flex-1 max-w-[520px] mr-30 mt-130"
            variants={childFade}>
            <div className="w-[620px] h-[300px] relative">
              <img
                src="/images/steps.svg"
                className="object-contain w-full h-full"
                alt="3M Step Visual"
              />
            </div>
          </motion.div>
        </div>

        {/* ===================== MOBILE VERSION ===================== */}
        <div className="md:hidden w-full px-4 pt-40 pb-14">
          {/* TEXT */}
          <motion.div variants={childFade}>
            {/* top dots */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#E3E3E3]" />
            </div>

            <h2 className="text-[22px] leading-[1.35] font-bold mb-3 text-black">
              단계별 3M 시스템
            </h2>

            <p className="text-[12px] font-semibold leading-[1.7] text-[#444444]">
              연속 손실 발생 시 3단계마다 각 단계별 전략이 발동합니다.
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div className="mt-8 flex justify-center" variants={childFade}>
            <div className="w-[260px] h-[350px] relative">
              <img
                src="/images/strategyways.svg"
                className="object-contain w-full h-full"
                alt="3M Step Visual"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* /////// */}
      <motion.section
        className="w-full bg-white flex items-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* ================ DESKTOP / TABLET (unchanged layout) ================ */}
        <div className="hidden md:flex w-[1100px] h-[403px] mx-auto items-center justify-between gap-15  mb-20 mt-60">
          <motion.div className="flex-1 flex" variants={childFade}>
            <div className="w-[393px] h-[300px] relative">
              <Image
                src="/images/chart.svg"
                alt="단기 수익률 인디케이터 비주얼"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>

          <motion.div
            style={{ textAlign: "right" }}
            className="w-[620px] pl-6"
            variants={childFade}>
            {/* top dots */}
            <motion.div
              style={{ justifyContent: "flex-end" }}
              className="flex items-center gap-2 mb-10"
              variants={childFade}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
            </motion.div>

            <motion.h2
              className="text-[30px] leading-[1.3] font-semibold mb-6 text-black"
              variants={childFade}>
              변동 제어 시스템
            </motion.h2>

            <motion.p
              className="text-[18px] leading-[1.8] text-[#444444]"
              variants={childFade}>
              외환 시장의 변동성을 파악하며 주말과 휴일 거래를 줄이고
              <br />
              컨트롤이 힘든 시장 상황에서는 거래를 미진입하여 보다 안전한 거래가
              가능합니다.
            </motion.p>
          </motion.div>
        </div>

        {/* ================ MOBILE LAYOUT ================ */}
        <div className="md:hidden w-full px-4  pb-16 mt-40">
          {/* top dots + text */}
          <motion.div style={{ textAlign: "right" }} variants={childFade}>
            <div className="flex items-center gap-2 mb-6 justify-end">
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#DB0101]" />
            </div>

            <h2 className="text-[22px] leading-[1.35] font-bold mb-1 text-black">
              변동 제어 시스템
            </h2>

            <p className="text-[12px] font-semibold leading-[1.7] text-[#444444]">
              외환 시장의 변동성을 <br /> 파악하며주말과 휴일 거래를 줄이고{" "}
              <br /> 컨트롤이 힘든 시장 상황에서는 거래를 <br /> 미진입하여
              보다안전한 거래가 가능합니다.
            </p>
          </motion.div>

          {/* image under text */}
          <motion.div
            style={{
              width: "250px",
            }}
            className=" flex justify-start"
            variants={childFade}>
            <div className="w-[260px] h-[180px]  relative">
              <Image
                src="/images/chart.svg"
                alt="단기 수익률 인디케이터 비주얼"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* //////// */}
      <motion.section
        className="w-full bg-white flex items-center"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* ============ DESKTOP / TABLET (unchanged layout) ============ */}
        <div className="hidden md:flex w-[1100px] h-[403px] mx-auto gap-30  mb-20 mt-60">
          {/* RIGHT: video */}
          <motion.div className="flex-1 flex justify-end" variants={childFade}>
            <div className="w-[560px] h-[344px] relative overflow-hidden rounded-xl shadow-md">
              <iframe
                src="https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1"
                title="Martin strategy video"
                className="w-full h-full"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>

          {/* LEFT: text block */}
          <motion.div
            className="flex-1 max-w-[420px] pl-6"
            variants={childFade}>
            {/* top line */}
            <div
              style={{ borderTop: "4px solid black" }}
              className="flex items-center gap-2 mb-10"
            />

            <div className="flex items-center justify-around">
              <div style={{ width: "50px", height: "50px" }}>
                <img src="/images/leftarrow.svg" alt="" />
              </div>
              <div className="flex flex-col">
                <p className="text-black text-[34px] font-bold flex justify-end">
                  M시그널의 전략,
                </p>
                <p className="text-black text-[34px] font-bold">
                  영상으로 확인하세요!
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ============ MOBILE LAYOUT ============ */}
        <div className="md:hidden w-full mt-20   flex items-center justify-between">
          {/* Video below, full-width-ish */}
          <motion.div className="mt-6" variants={childFade}>
            <div className="w-full max-w-[180px] mx-auto h-[110px] sm:h-[240px] relative overflow-hidden rounded-[5px] shadow-md">
              <iframe
                src="https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1"
                title="Martin strategy video"
                className="w-full h-full"
                frameBorder="0"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </motion.div>
          {/* Text first */}
          <motion.div variants={childFade}>
            <div
              style={{ borderTop: "2px solid black" }}
              className="flex items-center gap-2 mb-6"
            />

            <div className="flex items-center gap-4">
              <div style={{ width: "20px", height: "20px" }}>
                <img src="/images/leftarrow.svg" alt="" />
              </div>
              <div className="flex flex-col">
                <p className="text-black text-[12px] flex justify-end font-bold">
                  M시그널의 전략,
                </p>
                <p className="text-black text-[10px] font-bold">
                  영상으로 확인하세요!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ////// */}
      <motion.section
        ref={sectionRef}
        className="  w-full bg-white flex items-center "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* ===== DESKTOP / TABLET (original layout) ===== */}
        <div className="hidden md:flex w-full mb-20 mt-70">
          <div
            style={{
              border: "4px solid black",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="w-[1100px] h-[403px] mx-auto flex">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <h2 className="text-[#474747] font-bold text-[50px] text-center">
                지금까지 M시그널에 입금한 예치금
              </h2>

              {/* animated number */}
              <h1 className="text-black font-bold text-[55px]">
                {formatKRW(displayValue)}
              </h1>

              <Link href={"/start"}>
                <button
                  className="hover:-translate-y-[2px]
             active:scale-95 active:translate-y-0 active:shadow-md
             transition-transform transition-shadow duration-150 ease-out
             cursor-pointer"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #D9D9D9",
                    width: "333px",
                    height: "70px",
                    justifyContent: "space-between",
                    background: "#EFEFEF",
                    borderRadius: "15px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}>
                  <p className="text-black font-bold text-[31px] ml-5">
                    지금 투자하러 가기
                  </p>
                  <img
                    className="mr-1"
                    style={{ width: "60px" }}
                    src="/images/rightarrow.svg"
                    alt=""
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* ===== MOBILE VERSION ===== */}
        <div className="md:hidden w-full mt-30 mb-10 ">
          <div
            style={{
              border: "2px solid black",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 16px",
            }}
            className="w-full mx-auto flex">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}>
              <h2 className="text-[#474747] font-bold text-[16px] leading-[1.4] text-center">
                지금까지 M시그널에 입금한 예치금
              </h2>

              <h1 className="text-black font-bold text-[16px] mt-3 mb-2">
                {formatKRW(displayValue)}
              </h1>

              <Link href={"/start"}>
                <button
                  className="hover:-translate-y-[2px]
             active:scale-95 active:translate-y-0 active:shadow-md
             transition-transform transition-shadow duration-150 ease-out
             cursor-pointer"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    border: "1px solid #D9D9D9",
                    width: "100%",
                    maxWidth: "333px",
                    height: "35px",
                    justifyContent: "space-between",
                    background: "#EFEFEF",
                    borderRadius: "8px",
                    marginTop: "12px",
                    cursor: "pointer",
                    gap: 5,
                  }}>
                  <p className="text-black font-bold text-[14px] ml-4">
                    지금 투자하러 가기
                  </p>
                  <img
                    className="mr-1 "
                    style={{ width: "30px" }}
                    src="/images/rightarrow.svg"
                    alt=""
                  />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
