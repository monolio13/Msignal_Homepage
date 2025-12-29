/** @format */
"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "친구 인원에 제한이 있나요?",
    answer:
      "인원 제한은 없습니다. 2명이 오셔도 10명이 오셔도 모두 동일하게 커피쿠폰을 지급합니다.",
  },
  {
    question: "지급은 어떻게 받나요?",
    answer:
      "가입과 입금, 거래 운용 기록이 확인되면 제출 주신 연락처로 5,000원 상당의 상품권이 지급됩니다.",
  },
  {
    question: "친구가 나중에 가입했어요.",
    answer:
      "동시에 가입을 못한 친구도 추가로 쿠폰 지급이 가능합니다! 단, 가입 전 이벤트 참여 확인 문의 부탁드립니다.",
  },
  {
    question: "이벤트급을 지급받지 못했어요.",
    answer:
      "[가입 → 본인 계좌에 예치금 입금 → 거래 운용]이 확인되어야 지급이 가능합니다. 상황에 따라 1~2주 정도의 딜레이가발생할 수 \n 있으며 조건 충족 이후에 지급이 이루어지지 않은 고객님은 문의 남겨주시기 바랍니다.",
  },
  {
    question: "제 계좌로 여러 개 만들어도 받을 수 있나요?",
    answer:
      "원칙상으로는 가능하나 시스템 적으로 동일한 명의로 계좌를 2개 이상 개설이 불가능합니다. 2개 이상의 계좌 운용을원하시는\n 분은 헷지후드사에 문의해 주세요. 추후 이벤트 참여 문의는 M 시그널에게 해주시면 됩니다.",
  },
];
const faqsMobile = [
  {
    question: "친구 인원에 제한이 있나요?",
    answer:
      "인원 제한은 없습니다. 2명이 오셔도 10명이 오셔도 모두 동일\n하게 커피쿠폰을 지급합니다.",
  },
  {
    question: "지급은 어떻게 받나요?",
    answer:
      "가입과 입금, 거래 운용 기록이 확인되면 제출 주신 연락처로\n 5,000원 상당의 상품권이 지급됩니다.",
  },
  {
    question: "친구가 나중에 가입했어요.",
    answer:
      "동시에 가입을 못한 친구도 추가로 쿠폰 지급이 가능합니다!\n 단, 가입 전 이벤트 참여 확인 문의 부탁드립니다.",
  },
  {
    question: "이벤트급을 지급받지 못했어요.",
    answer:
      "[가입 → 본인 계좌에 예치금 입금 → 거래 운용]이 확인되어야\n 지급이 가능합니다. 상황에 따라 1~2주 정도의 딜레이가발생\n할 수 있으며 조건 충족 이후에 지급이 이루어지지 않은 고객님은\n 문의 남겨주시기 바랍니다.",
  },
  {
    question: "제 계좌로 여러 개 만들어도 받을 수 있나요?",
    answer:
      "원칙상으로는 가능하나 시스템 적으로 동일한 명의로 계좌를 2개 \n 이상 개설이 불가능합니다. 2개 이상의 계좌 운용을원하시는 \n 분은 헷지후드사에 문의해 주세요. 추후 이벤트 참여 문의는 \n M 시그널에게 해주시면 됩니다.",
  },
];

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function JoinFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section
      className="w-full flex items-center justify-center px-4  md:mt-50"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      <div className="w-[1100px] mx-auto flex flex-col gap-6 md:mb-20   ">
        {/* Title */}
        <h2 className="text-center text-[32px] md:mt-40 font-bold mb-4 text-black">
          자주 묻는 질문
        </h2>
        {/* FAQ list */}
        <div className=" hidden md:block flex flex-col gap-4   ">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={{
                  background: isOpen ? "white" : "#D8EDD5",
                  borderRadius: isOpen ? 30 : 99,
                }}
                className="w-full  px-2 py-3 shadow-sm mt-5">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-6 text-left cursor-pointer">
                  <span className="text-[24px] font-semibold text-black flex ml-8">
                    {item.question}
                  </span>

                  {/* Icon wrapper with rotation */}
                  <motion.div
                    style={{
                      background: isOpen ? "#D8EDD5" : "white",
                    }}
                    className="flex items-center justify-center w-15 h-15 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.05)] cursor-pointer"
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
                      className="overflow-hidden  flex  mx-8">
                      <div className=" text-[20px] leading-relaxed text-[#353535] whitespace-pre-line">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>{" "}
        {/* mobile  */}
        <div className="md:hidden flex flex-col gap-4 mb-10">
          {faqsMobile.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={{
                  background: isOpen ? "white" : "#D8EDD5",
                  borderRadius: isOpen ? 20 : 99,
                }}
                className="w-full  px-2 py-2 shadow-sm">
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between gap-6 text-left cursor-pointer">
                  <span className="text-[14px] font-semibold text-black flex ml-2">
                    {item.question}
                  </span>

                  {/* Icon wrapper with rotation */}
                  <motion.div
                    style={{
                      background: isOpen ? "#D8EDD5" : "white",
                    }}
                    className="flex items-center justify-center w-9 h-9 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.05)] cursor-pointer"
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
                      className="overflow-hidden  flex ml-2 ">
                      <div className=" text-[12px] leading-relaxed text-[#353535] whitespace-pre-line">
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
