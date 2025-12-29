/** @format */
"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

type Card = {
  id: number;
  title: string;
  short: string;
  long: string;
  longMobile: string;
  shortMobile: string;
  Icon: React.ComponentType<{ className?: string }>;
};

const cards: Card[] = [
  {
    id: 1,
    title: "M시그널이 무엇인가요?",
    short: `자동으로 매수, 매도 시점을 분석해 <br/> 수익을 내는 자동매매 프로그램입니다.`,
    shortMobile: `자동으로 매수, 매도 시점을 분석해  수익을 내는 <br/> 자동매매 프로그램입니다.`,
    long: `CFDs(차액거래) 중 외환 거래를 프로그램을 <br/> 통해 자동으로 매수, 매도 시점을 계산해 <br/> 수익을 내주는 자동매매 프로그램입니다. <br/> 
    일반인이 구현하기 힘든 전문 트레이더의 전략을 <br/> M시그널이 직접 구현해 줍니다. 로봇이기 <br/> 때문에 24시간 쉬지 않고 최적의 전략을 찾아 <br/> 매매가 이루어져 인간의 한계를 뛰어넘어 <br/> 수익을 창출할 수 있습니다.`,
    longMobile: `CFDs(차액거래) 중 외환 거래를 프로그램을  통해 자동으로 매수,<br/> 매도 시점을 계산해  수익을 내주는 자동매매 프로그램입니다. <br/> 
    일반인이 구현하기 힘든 전문 트레이더의 전략을  M시그널이 직접 <br/> 구현해 줍니다. 로봇이기  때문에 24시간 쉬지 않고 최적의 전략을<br/> 찾아  매매가 이루어져 인간의 한계를 뛰어넘어  수익을 창출할 수 <br/> 있습니다.`,
    Icon: (props) => (
      <img
        src="/images/ask.svg"
        alt="Ask Icon"
        className={props.className}
        style={{ width: "100px", height: "100px" }}
      />
    ),
  },
  {
    id: 2,
    title: "어떻게 이용하나요?",
    short:
      "M시그널 EA 신호 발생 시,<br/> 본인 계좌로 직접 주문을 내는 방식입니다.",
    shortMobile:
      "M시그널 EA 신호 발생 시, 본인 계좌로 직접 주문을 <br/> 내는 방식입니다.",
    long: `M시그널은 카피 트레이딩 방식으로 매매를 전혀 <br/>모르셔도 연동만 해두시면 신호를 받아 쉽게 <br/> 이용하실 수 있습니다. <br/>
      한국에서 CFDs 거래를 유일하게 할 수 있는 거래 <br/> 플랫폼 MT5에서 사용할 수 있는 본인 명의의 <br/> 계좌를 개설하시고, M시그널의 신호에 <br/> 카피 트레이딩을 연동해 주시면 됩니다.`,
    longMobile: `M시그널은 카피 트레이딩 방식으로 매매를 전혀 모르셔도 연동만 <br/> 해두시면 신호를 받아 쉽게  이용하실 수 있습니다. <br/>
      한국에서 CFDs 거래를 유일하게 할 수 있는 거래  플랫폼 MT5에서 <br/> 사용할 수 있는 본인 명의의  계좌를 개설하시고, M시그널의  <br/> 신호에 카피 트레이딩을 연동해 주시면 됩니다.`,
    Icon: (props) => (
      <img
        src="/images/phone.svg"
        alt="Phone Icon"
        className={props.className}
        style={{ width: "100px", height: "100px" }}
      />
    ),
  },
  {
    id: 3,
    title: "안전한가요?",
    short: "위기로직 프로그램, <br/> 입증된 브로커사로 안전하게 운영합니다.",
    shortMobile:
      "위기로직 프로그램, 입증된 브로커사로 안전하게 <br/> 운영합니다.",
    long: `M시그널은 변동성이 급격히 높아지는 특정 시간대 <br/>의 거래를 자동으로 회피하고, 평균 55% 이상의 <br/> 승률을 안정적으로 유지하는 것을 목표로 설계되었<br/>습니다. 만약 손실이 발생한 경우에는 마틴게일<br/> 기반 복구 로직을 적용하여 이전 손실을 단계적<br/>으로 회복하도록 구성되어 있습니다.<br/> 즉, 불필요한 리스크를 최소화하고 손실을 관리하<br/>는 구조로 운영됩니다.<br/>
     안전 + 빠른 브로커사
     안전성과 빠른 체결·입출금을 위해 ASIC(호주 금<br/>융감독원) 라이선스를 보유한 브로커 헷지후드를<br/> 선택했습니다. 특히 CFDs 거래에서 중요한 요소<br/>인 슬리피지(예상 가격과 실제 체결가의 차이)가<br/> 매우 낮아 복구 전략과 자동매매 효율성이 높아지<br/>는 장점이 있습니다. 또한 한국어 CS팀이 상주하<br/>고 있어 입출금 처리 속도가 빠르고 안정적입니다.`,
    longMobile: `M시그널의 위기 관리 로직
     M시그널은 변동성이 급격히 높아지는 특정 시간대 의 거래를 자동<br/>으로 회피하고, 평균 55% 이상의 승률을 안정적으로 유지하는 것<br/> 을 목표로 설계되었습니다. 만약 손실이 발생한 경우에는 마틴게일<br/> 기반 복구 로직을 적용하여 이전 손실을 단계적 으로 회복하도록 <br/> 구성되어 있습니다. 즉, 불필요한 리스크를 최소화하고 손실을 관리<br/>하는 구조로 운영됩니다.<br/>
     안전 + 빠른 브로커사
     안전성과 빠른 체결·입출금을 위해 ASIC(호주 금융감독원)<br/> 라이선스를 보유한 브로커 헷지후드를 선택했습니다. 특히 CFDs<br/> 거래에서 중요한 요소인 슬리피지(예상 가격과 실제 체결가의 차<br/>이)가 매우 낮아 복구 전략과 자동매매 효율성이 높아지는 장점이 <br/> 있습니다. 또한 한국어 CS팀이 상주하고 있어 입출금 처리 속도가 <br/> 빠르고 안정적입니다.`,
    Icon: (props) => (
      <img
        src="/images/shield.svg"
        alt="Shield Icon"
        className={props.className}
        style={{ width: "100px", height: "100px" }}
      />
    ),
  },
  {
    id: 4,
    title: "얼마나 투명하게 운영하나요?",
    short:
      "조작이 불가능한 메타플랫폼과 <br/> 안전한 브로커사 제휴로 100% 신뢰 가능합니다.",
    shortMobile:
      "조작이 불가능한 메타플랫폼과  안전한 브로커사 <br/> 제휴로 100% 신뢰 가능합니다.",
    long: `MetaTrader는 서버 기반 구조와 암호화된 로그<br/> 시스템을 통해 거래 내역·시세 조작이 기술적으로<br/> 불가능한 구조로 설계되어 있습니다. 모든 거래 데<br/>이터는 규제기관의 감사 기준에 맞춰 기록되며<br/> 외부 유동성 공급자의 시세와 실시간 교차 검증이<br/> 이루어집니다.<br/>
      헷지후드 또한 ASIC의 감독을 받는 브로커로,<br/> M시그널은 거래 내역·수익 조작이 사실상 불가능<br/>한 매우 투명한 구조에서 운영됩니다.`,
    longMobile: `MetaTrader는 서버 기반 구조와 암호화된 로그 시스템을 통해 <br/> 거래 내역·시세 조작이 기술적으로 불가능한 구조로 설계되어 <br/> 있습니다. 모든 거래 데이터는 규제기관의 감사 기준에 맞춰 <br/>기록되며 외부 유동성 공급자의 시세와 실시간 교차 검증이<br/> 이루어집니다.<br/>
      헷지후드 또한 ASIC의 감독을 받는 브로커로, M시그널은 <br/>거래 내역·수익 조작이 사실상 불가능한 매우 투명한 구조에서 <br/> 운영됩니다.`,
    Icon: (props) => (
      <img
        src="/images/hand.svg"
        alt="Hand Icon"
        className={props.className}
        style={{ width: "100px", height: "100px" }}
      />
    ),
  },
];

function InfoCard({
  card,
  isOpen,
  onToggle,
}: {
  card: Card;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const { title, short, long, longMobile, shortMobile, Icon } = card;

  return (
    <>
      <div className=" hidden md:block relative bg-white rounded-[18px] shadow-[0_14px_30px_rgba(0,0,0,0.08)] px-6 md:px-4 pt-8 md:pt-10 pb-6 flex flex-col gap-4 transition-all duration-300 w-full md:w-[550px] self-start   /* ✅ full width on mobile, 550px on desktop */">
        {/* 코너 장식 */}
        <div className="absolute left-0 top-0 w-[50px] h-[50px] bg-gradient-to-br from-[#3f3f3f] to-[#2b2b2b] rounded-tl-[24px] [clip-path:polygon(0_0,100%_0,0_100%)]" />

        <div className="flex justify-between items-start">
          <div className="pr-1 w-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-4 text-black text-xl md:text-2xl lg:text-[26px] xl:text-[30px]">
                  {title}
                </h3>
                <p
                  className=" leading-relaxed whitespace-pre-line text-[#333] text-sm md:text-base font-semibold lg:text-lg xl:text-[20px] "
                  dangerouslySetInnerHTML={{ __html: short }}
                />
              </div>
              <div
                className="flex justify-end"
                style={{
                  width: "90px",
                }}>
                <Icon />
              </div>
            </div>
            {isOpen && (
              <p
                className="mt-4  leading-relaxed whitespace-pre-line text-[#444] text-sm md:text-base lg:text-[15px] xl:text-[20px]"
                dangerouslySetInnerHTML={{ __html: long }}
              />
            )}
          </div>
        </div>

        <div className="mt-2 flex justify-end">
          <button
            onClick={onToggle}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F3F3F3] text-[14px] text-[#777] hover:bg-[#e5e5e5] transition cursor-pointer">
            {isOpen ? (
              <div className="flex items-center gap-2">
                <span className="text-[#707070]"> 닫기</span>
                <span>
                  <img
                    style={{
                      width: "15px",
                    }}
                    src="/images/up.svg"
                    alt=""
                  />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-[#707070]">자세히 보기</span>
                <span>
                  <img
                    style={{
                      width: "15px",
                    }}
                    src="/images/down.svg"
                    alt=""
                  />
                </span>
              </div>
            )}
          </button>
        </div>
      </div>{" "}
      {/* mobile */}
      <div className=" md:hidden  relative bg-white rounded-[8px] shadow-[0_14px_30px_rgba(0,0,0,0.08)] px-4 md:px-8  md:pt-10 pb-2 flex flex-col gap-2 transition-all duration-300 w-full md:w-[550px] self-start   /* ✅ full width on mobile, 550px on desktop */">
        {/* 코너 장식 */}
        <div className="absolute left-0 top-0 w-[22px] h-[22px] bg-gradient-to-br from-[#3f3f3f] to-[#2b2b2b] rounded-tl-[8px] [clip-path:polygon(0_0,100%_0,0_100%)]" />

        <div className="flex justify-between items-start">
          <div className="pr-1 w-full">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2 text-black text-l ">
                  {title}
                </h3>
                <p
                  className=" leading-relaxed whitespace-pre-line   text-[#333] text-[12px] font-bold"
                  dangerouslySetInnerHTML={{ __html: shortMobile }}
                />
              </div>
              <div
                className="flex justify-end"
                style={{
                  width: "30px",
                }}>
                <Icon />
              </div>
            </div>
            {isOpen && (
              <p
                className="mt-4 leading-relaxed whitespace-pre-line text-[#444] text-[11px] font-semibold"
                dangerouslySetInnerHTML={{ __html: longMobile }}
              />
            )}
          </div>
        </div>

        <div className=" flex justify-end">
          <button
            onClick={onToggle}
            className="inline-flex  relative items-center gap-2 px-4 bottom-2  text-[14px] text-[#777] hover:bg-[#e5e5e5]
                     transition cursor-pointer">
            {isOpen ? (
              <div className="flex items-center">
                <span>
                  <img
                    style={{
                      width: "15px",
                    }}
                    src="/images/up.svg"
                    alt=""
                  />
                </span>
              </div>
            ) : (
              <div className="flex items-center ">
                <span>
                  <img
                    style={{
                      width: "15px",
                    }}
                    src="/images/down.svg"
                    alt=""
                  />
                </span>
              </div>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default function StrategyFaqSection() {
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
  const [openId, setOpenId] = useState<number | null>(null);

  const toggleCard = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    // ✅ full-width on mobile, original centered layout on desktop
    <motion.section
      className="w-screen -ml-4 md:w-full md:ml-0 flex justify-center mt-24 mb-32 md:mt-70"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      <div className="w-full md:w-[1440px] flex flex-col items-center">
        {/* TITLE ROW */}
        <div className=" flex items-center gap-5 mb-10 md:mb-12 px-4 md:px-0 justify-center md:justify-start md:-ml-[730px]   /* 🔥 same left-shift ONLY on desktop */ ">
          <img
            className="h-[64px] w-[64px] md:h-[84px] md:w-[84px] flex items-center justify-center"
            src="/images/globe.svg"
            alt="Strategy Icon"
          />
          <p
            className="
              font-bold leading-snug text-black
              text-base md:text-xl lg:text-2xl xl:text-[28px]
               md:text-left
            ">
            가장 안전하고 확실한 전략을 선별,
            <br />
            조합하여 프로그래밍 했습니다.
          </p>
        </div>

        {/* 카드 영역 */}
        <div
          className="
            grid
            grid-cols-1 md:grid-cols-2
            gap-x-6 md:gap-x-10
            gap-y-6 md:gap-y-10
            w-full md:w-[1208px]
            px-4 md:px-0
            md:min-h-[600px]
          ">
          {cards.map((card) => (
            <InfoCard
              key={card.id}
              card={card}
              isOpen={openId === card.id}
              onToggle={() => toggleCard(card.id)}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
