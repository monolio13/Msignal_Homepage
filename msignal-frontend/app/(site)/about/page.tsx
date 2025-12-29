/** @format */
"use client";

import InfoCard from "@/app/(site)/components/aboutSections/infoCard";
import MSignalSolidSection from "@/app/(site)/components/aboutSections/solidSection";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ProfitSection() {
  return (
    <div>
      <section className="w-full flex justify-center mt-32 ">
        <div className="relative w-[1440px] h-[695px] flex flex-col items-center">
          {/* Top Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "-550px",
            }}>
            <p className="text-[40px] font-bold leading-tight mb-6 text-black">
              매일매일 같은 리듬으로 쌓이는 수익,
              <br />
              꾸준함을 프로그래밍하다
            </p>

            <p className="text-[26px] text-black">
              변동성에도 흔들리지 않는, M시그널의 자동매매 시스템.
            </p>
          </div>

          {/* Black stats box */}
          <div className="w-[1342px] h-[245px] bg-[#1B1B1B] rounded-[18px] mt-24 flex items-center justify-between px-24">
            {/* 1 */}
            <div className="text-center flex flex-col gap-3">
              <span className="text-[28px] text-white opacity-80">
                평균 승률
              </span>
              <span className="text-[48px] font-bold text-white">55%이상</span>
            </div>

            {/* 2 */}
            <div className="text-center flex flex-col gap-3">
              <span className="text-[28px] text-white opacity-80">
                한 달 거래량
              </span>
              <span className="text-[48px] font-bold text-white">약 170건</span>
            </div>

            {/* 3 */}
            <div className="text-center flex flex-col gap-3">
              <span className="text-[28px] text-white opacity-80">
                1달 수익률
              </span>
              <span className="text-[48px] font-bold text-white">9.4%</span>
            </div>
          </div>

          {/* Date label */}
          <p className="text-[20px] text-[#8D8D8D] mt-6 self-start pl-[60px]">
            2025년 10월 기준
          </p>
        </div>
      </section>
      {/* second section */}
      <section className="w-[1440px] mx-auto  mb-20">
        <div className="relative h-[695px] overflow-hidden ">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/aboutsecond.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>
      </section>
      <InfoCard />

      <section className=" w-[1440px] mx-auto mb-20 ">
        {/* 상단 이미지 영역 */}
        <div className="relative h-[631px]  flex items-center justify-center">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/aboutSignal.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>

        {/* 🔽 여기부터 카드 두 개 */}
        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            gap: "32px",
            bottom: "100px",
          }}
          className="">
          {/* 카드 1: 24시간 라이브 거래 방송 */}
          <div
            style={{}}
            className=" w-[616px] relative bg-white rounded-[12px] shadow-[0_14px_32px_rgba(0,0,0,0.08)] px-10 py-10 flex items-center justify-between overflow-hidden">
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
                href={"https://www.youtube.com/@M-%EC%8B%9C%EA%B7%B8%EB%84%90"}
                className="inline-flex items-center justify-center px-6 py-2 rounded-full
                         bg-[#3F3F3F] text-white text-[14px] font-medium
                         shadow-[0_4px_10px_rgba(0,0,0,0.2)]
                         hover:bg-black transition">
                유튜브 바로가기
              </Link>
            </div>

            {/* 오른쪽 폰 이미지 (파일명은 프로젝트에 맞게 수정해서 사용) */}
            <div
              style={{
                marginBottom: "-150px",
              }}
              className="relative z-[1] flex-shrink-0 mt-6">
              <img
                src="/images/lastphone.svg"
                alt="YouTube live trading"
                className="w-[220px] h-auto "
              />
            </div>
          </div>

          {/* 카드 2: 전체 거래 내역 공개 */}
          <div className="w-[616px] relative bg-white rounded-[12px] shadow-[0_14px_32px_rgba(0,0,0,0.08)] px-10 py-10 flex items-center justify-between overflow-hidden">
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
                }
                className="inline-flex items-center justify-center px-6 py-2 rounded-full
                         bg-[#3F3F3F] text-white text-[14px] font-medium
                         shadow-[0_4px_10px_rgba(0,0,0,0.2)]
                         hover:bg:black transition">
                MQL 바로가기
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
      </section>

      <MSignalSolidSection />
    </div>
  );
}
