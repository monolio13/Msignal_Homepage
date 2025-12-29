/** @format */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";

const faqs = [
  {
    question: "혼자서 계좌를 만들고 카피라이팅 연동해도 되나요?",
    answer:
      "본인 명의의 계좌로 운용하는 방식이기 때문에 카피트레이딩을 신청하실 수 있습니다.\n다만 전략에 대한 이해 없이 투자를 시작하면 위험할 수 있으니, 꼭 신청과 상담 후에 진행해 주세요.\n이벤트 지급 크레딧의 경우 신청 없이 가입하시면 받을 수 없습니다.",
  },
  {
    question: "제 원래 브로커사 계좌로 연동 가능한가요?",
    answer:
      "M시그널의 프로그램이 헤지후드의 수수료, 슬리피지 등에 맞추어 있어 타 브로커사 이용이 불가능합니다.\n당일 계좌 개설이 가능합니다. 자세한 사항은 헤지후드 홈페이지에서 확인해 주세요.",
  },
  {
    question: "수익률 5~10%, 매달 보장되는 건가요?",
    answer:
      "지금까지 M시그널의 평균 수익률은 5~10% 정도였습니다.\n다만 미래의 수익률을 보장하기는 어렵고, 시장 상황에 따라 수익률에 차이가 발생할 수 있습니다.",
  },
  {
    question: "안전한가요?",
    answer:
      "제안드린 단계별 증거금에 따라 자금을 10단계 이상 여유 있게 예치해 둘 경우 비교적 안정적으로 운용이 가능합니다.\n만약 원금 손실의 위험이 예상되는 경우 M시그널을 통해 회원가입하신 분들에게 사전에 안내드릴 예정입니다.\n계좌 예치금에 대한 보호는 국제증권기구 ASIC(호주 증권투자위원회)의 관리·감독을 받고 있습니다.",
  },
];
const faqsMobile = [
  {
    question: "혼자서 계좌를 만들고 카피라이팅 연동해도 되나요?",
    answer:
      "본인 명의의 계좌로 운용하는 방식이기 때문에 카피트레이딩을 \n 신청하실 수 있습니다. 다만 전략에 대한 이해 없이 투자를 시작하면 \n 위험할 수 있으니, 꼭 신청과 상담 후에 진행해 주세요. 이벤트 \n 지급 크레딧의 경우 신청 없이 가입하시면 받을 수 없습니다.",
  },
  {
    question: "제 원래 브로커사 계좌로 연동 가능한가요?",
    answer:
      "M시그널의 프로그램이 헤지후드의 수수료, 슬리피지 등에 \n 맞추어 있어 타 브로커사 이용이 불가능합니다. 당일 계좌 개설이 \n 가능합니다. 자세한 사항은 헤지후드 홈페이지에서 확인해 주세요.",
  },
  {
    question: "수익률 5~10%, 매달 보장되는 건가요?",
    answer:
      "지금까지 M시그널의 평균 수익률은 5~10% 정도였습니다.\n다만 미래의 수익률을 보장하기는 어렵고, 시장 상황에 따라 \n 수익률에 차이가 발생할 수 있습니다.",
  },
  {
    question: "안전한가요?",
    answer:
      "저희가 제안 드린 단계별 증거금에 따라 자금을 10단계 이상 여유 \n 있게 예치해놓을 경우 매우 안전합니다. 만일 원금 손실의 위험이 \n 예견되는 경우 M시그널을 통해 회원가입해 주신 분들에 한에서 \n 안심문자 발송 예정입니다. 계좌에 예치금의 관한 보호는 국제금융 \n 기구 ASIC (호주 증권투자위원회)의 관리 감독을 받고 있습니다.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.section
      className="w-full bg-white flex items-center "
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      <div className="w-[1100px] mx-auto flex flex-col  ">
        {/* Title */}
        <h2 className=" hidden md:block text-center text-[32px] font-bold mb-4 text-black mt-40 ">
          자주 묻는 질문
        </h2>{" "}
        <h2 className=" md:hidden text-center text-[32px] font-bold mb-4 text-black -mt-40  ">
          자주 묻는 질문
        </h2>
        {/* FAQ list */}
        <div className="hidden md:block flex flex-col gap-4 mb-20">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                style={{
                  border: isOpen ? "2px solid #E9E9E9" : "",
                  background: isOpen ? "" : "#f7f7f7",
                  borderRadius: isOpen ? 30 : 99,
                }}
                key={index}
                className="w-full   px-2 py-3 shadow-sm mt-5 ">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between md:gap-6 gap-2 text-left cursor-pointer">
                  <span className="md:text-[24px] text-[12px] font-semibold text-black flex ml-2  md:ml-8 ">
                    {item.question}
                  </span>
                  {/* Icon wrapper with rotation */}
                  <motion.div
                    style={{
                      background: isOpen ? "#f7f7f7" : "white",
                    }}
                    className="flex items-center  justify-center md:w-15 md:h-15 w-10 h-10 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.05)] cursor-pointer"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}>
                    <Plus className="w-5 h-5 text-black" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden  flex ml-8   ">
                      <div className=" text-[20px]  leading-relaxed text-[#353535] whitespace-pre-line">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        {/* mobile */}
        <div className=" md:hidden flex flex-col gap-4 mb-10 ">
          {faqsMobile.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                style={{
                  border: isOpen ? "2px solid #E9E9E9" : "",
                  background: isOpen ? "" : "#f7f7f7",
                  borderRadius: isOpen ? 30 : 99,
                }}
                key={index}
                className="w-full   px-2 py-3 shadow-sm ">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between md:gap-6 gap-2 text-left cursor-pointer">
                  <span className="md:text-[24px] text-[12px] font-semibold text-black flex ml-2  md:ml-8 ">
                    {item.question}
                  </span>
                  {/* Icon wrapper with rotation */}
                  <motion.div
                    style={{
                      background: isOpen ? "#f7f7f7" : "white",
                    }}
                    className="flex items-center  justify-center md:w-15 md:h-15 w-10 h-10 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.05)] cursor-pointer"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}>
                    <Plus className="w-5 h-5 text-black" />
                  </motion.div>
                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden  flex mx-2  ">
                      <div className=" text-[11px]  leading-relaxed text-[#353535] whitespace-pre-line">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
