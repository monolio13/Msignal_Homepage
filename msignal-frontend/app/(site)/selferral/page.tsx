/** @format */
"use client";

import FullWidth from "@/app/(site)/components/layout/FullWidth";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";

const Selferral = () => {
  const [contractValue, setContractValue] = useState("");
  const [refund, setRefund] = useState("");
  const [showEventFormModal, setShowEventFormModal] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [allAgree, setAllAgree] = useState(false);
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [open, setOpen] = useState(false);
  const ageOptions = ["20", "30", "40", "50", "60 이상"];
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showMarketingModal, setShowMarketingModal] = useState(false);

  const amountOptions = [
    "100만원 이하",
    "100~200만원",
    "300~500만원",
    "600~1,000만원",
    "1,000만원 이상",
  ];

  const row1 = ["100만원 이하", "100~200만원", "300~500만원"];
  const row2 = ["600~1,000만원", "1,000만원 이상"];

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

  const handleAllAgree = () => {
    const next = !allAgree;
    setAllAgree(next);
    setAgreePersonal(next);
    setAgreeMarketing(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // later: call backend API here
    console.log({ name, phone, age, amount, agreePersonal, agreeMarketing });
  };

  const handleCalculate = () => {
    const numeric = Number(contractValue.replace(/,/g, ""));
    if (isNaN(numeric) || numeric <= 0) {
      setRefund("");
      return;
    }

    const result = numeric * 3 * 1400;

    const formatted = new Intl.NumberFormat("ko-KR", {
      style: "currency",
      currency: "KRW",
    }).format(result);

    setRefund(formatted);
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") handleCalculate();
  };
  // bg-[linear-gradient(180deg,#131715_0%,#5D695D_35%,#C3E1C2_70%,#F9FFF9_100%)]
  return (
    <div className="min-h-screen w-full ">
      {/* ================= HERO ================= */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #131715 0%, #5F6B5F 50%, #5F6B5F 100%)",
        }}
        className="w-full flex justify-center ">
        <div className="w-full max-w-[1440px] mx-auto">
          {/* Desktop */}
          <div className="hidden md:block relative h-[700px] rounded-[32px] overflow-hidden">
            <Image
              src="/images/selferral1.svg"
              alt="M Signal hero background"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 1440px"
              className="object-cover"
            />
          </div>

          {/* Mobile */}
          <div className="md:hidden relative h-[180px] rounded-[18px] overflow-hidden">
            <Image
              src="/images/selferralMobile.svg"
              alt="M Signal hero background"
              fill
              priority
              sizes="(max-width: 767px) 100vw, 1440px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= SECTION 2 (Calculator) ================= */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #5D695D 0%, #C3E1C2 50%, #C3E1C2 100%)",
        }}
        className="w-full flex justify-center -mt-1">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="w-full max-w-[1100px] mx-auto py-5 ">
              {/* ✅ Desktop: image + overlays in ONE relative wrapper */}
              <div className="hidden md:block relative w-full">
                <img
                  src="/images/selferral2.svg"
                  alt=""
                  className="w-full h-auto"
                />

                {/* ✅ Desktop calculator overlay (stable, no bottom-*) */}
                <div className="absolute left-0 right-0 top-[52%] -translate-y-1/2">
                  <div className="ml-28 flex flex-col items-center justify-center gap-10">
                    {/* row1 */}
                    <div className="w-full flex flex-row items-center gap-4">
                      <span className="text-black font-bold text-xl self-start">
                        계약수 :
                      </span>

                      <div
                        className="w-[620px] rounded-[10px] p-[2px] shadow-[0_4px_8px_rgba(0,178,118,0.25)]"
                        style={{
                          background:
                            "linear-gradient(180deg, #00B276 0%, #00A060 100%)",
                        }}>
                        <input
                          className="w-full rounded-[8px] border-none bg-white text-black px-4 py-[14px] text-[16px] outline-none"
                          type="text"
                          inputMode="numeric"
                          placeholder="1달 평균 계약수를 입력해주세요."
                          value={contractValue}
                          onChange={(e) => setContractValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleCalculate}
                        className=" w-[140px] h-[56px] rounded-[12px] border-2 border-[#00DA6F] text-[#00BD60] font-bold text-[20px] shadow-[0_4px_10px_rgba(0,150,80,0.25)] hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer "
                        style={{
                          background:
                            "linear-gradient(180deg, #D6FFD5 0%, #A9F7A9 100%)",
                        }}>
                        계산하기
                      </button>
                    </div>

                    {/* row2 */}
                    <div className="w-full flex flex-row items-center gap-4">
                      <span className="text-black font-bold text-xl self-start">
                        환급금 :
                      </span>

                      <div
                        className="w-[780px] rounded-[10px] p-[2px] shadow-[0_4px_8px_rgba(0,178,118,0.25)]"
                        style={{
                          background:
                            "linear-gradient(180deg, #00B276 0%, #00A060 100%)",
                        }}>
                        <input
                          className="w-full rounded-[8px] border-none bg-white text-black px-4 py-[14px] text-[16px] outline-none"
                          type="text"
                          readOnly
                          value={refund}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ Desktop CTA overlay (stable, no bottom-*) */}
                <div className="absolute left-0 right-0 bottom-[10%] flex justify-center">
                  <Link href={""}>
                    <button
                      onClick={() => setShowEventFormModal(true)}
                      type="button"
                      className=" w-[380px] h-12 rounded-[50px] text-white text-xl font-semibold tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer "
                      style={{
                        background:
                          "linear-gradient(180deg, #00FFA9 0%, #007C52 50%, #007C52 100%)",
                      }}>
                      1분만에 셀퍼럴 신청하기
                    </button>
                  </Link>
                </div>
              </div>

              {/* ✅ Mobile: image + overlays in ONE relative wrapper (stable across devices) */}
              <div className="md:hidden relative w-full">
                <img
                  src="/images/selferral2mobile.svg"
                  alt=""
                  className="block w-full h-auto"
                />

                {/* ✅ Mobile calculator overlay (stable, no bottom-*) */}
                <div className="absolute left-0 right-0 top-[48%] -translate-y-1/2 px-4">
                  <div className="flex flex-col items-center w-full">
                    {/* Row 1 */}
                    <div className="flex items-center gap-3 w-full justify-center">
                      <span className="shrink-0 text-black font-extrabold text-[14px]">
                        계약수 :
                      </span>

                      <div className="rounded-[5px] border border-[#4AAE7C] bg-white px-1 py-1">
                        <input
                          className="w-[130px] bg-transparent text-[10px] font-semibold text-black placeholder:text-gray-400 outline-none"
                          type="text"
                          inputMode="numeric"
                          placeholder="1달 평균 계약수를 입력해주세요."
                          value={contractValue}
                          onChange={(e) => setContractValue(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={handleCalculate}
                        className="w-[60px] h-8 shrink-0 rounded-[8px] border border-[#4AAE7C] px-2 py-1 text-[10px] font-extrabold text-[#2E9A5C] shadow-[0_4px_10px_rgba(0,150,80,0.18)] active:scale-95 transition"
                        style={{
                          background:
                            "linear-gradient(180deg, #D6FFD5 0%, #A9F7A9 100%)",
                        }}>
                        계산하기
                      </button>
                    </div>

                    {/* Row 2 */}
                    <div className="mt-2 flex items-center gap-3 w-full justify-center">
                      <span className="shrink-0 text-black font-extrabold text-[14px]">
                        환급금 :
                      </span>

                      <div className="rounded-[5px] border border-[#4AAE7C] bg-white px-2 py-1">
                        <input
                          className="w-[195px] h-5 bg-transparent text-[18px] font-semibold text-black outline-none"
                          type="text"
                          readOnly
                          value={refund}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ✅ Mobile CTA overlay (stable, no bottom-*) */}
                <div className="absolute left-0 right-0 bottom-[5%] flex justify-center px-4">
                  <Link href={""} className="w-full flex justify-center">
                    <button
                      onClick={() => setShowEventFormModal(true)}
                      type="button"
                      className=" w-[180px] h-[36px] rounded-[50px] text-white text-[14px] font-semibold tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer "
                      style={{
                        background:
                          "linear-gradient(180deg, #00FFA9 0%, #007C52 50%, #007C52 100%)",
                      }}>
                      1분만에 셀퍼럴 신청하기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showEventFormModal && (
          <motion.div
            key="event-form-modal"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setShowEventFormModal(false)}>
            {/* Modal content wrapper */}
            {/* desktop */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className=" hidden md:block w-full max-w-[1100px] "
              onClick={(e) => e.stopPropagation()}>
              <div className="w-full bg-[#00D089] rounded-[32px] px-6 py-8 sm:px-8 sm:py-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                {/* Title bar */}
                <div className="flex justify-center mb-6 sm:mb-8 items-center">
                  <div className="inline-flex items-center gap-3 text-white text-lg sm:text-xl font-semibold">
                    <span className="text-[30px]">환급금 신청서</span>
                    <span>
                      <img src="/images/coin.svg" alt="" />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEventFormModal(false)}
                    className=" relative text-xl font-semibold flex left-90 cursor-pointer">
                    ✕
                  </button>
                </div>

                {/* Inner white form card */}
                <div className="bg-white rounded-[24px] px-6 py-8 sm:px-8 sm:py-10">
                  <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* 이름 / 전화번호 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex flex-row items-center gap-5">
                        <label className="block text-[18px] font-medium text-gray-800 mb-2">
                          이름
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-[380px] h-11 rounded-[6px] text-black border border-gray-200 bg-[#F5F5F7] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#87888F]"
                        />
                      </div>
                      <div className="flex flex-row items-center gap-5">
                        <label className="block text-[18px] font-medium text-gray-800 mb-2">
                          전화번호
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-[380px] h-11 rounded-[6px] text-black border border-gray-200 bg-[#F5F5F7] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#87888F]"
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200" />

                    {/* 연령대 */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-800">
                        연령대
                      </p>
                      <div className="flex flex-row items-center justify-between">
                        {ageOptions.map((option) => {
                          const selected = age === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setAge(option)}
                              className={`h-10 w-46 rounded-[8px] text-sm font-medium border transition-all cursor-pointer ${
                                selected
                                  ? "bg-[#00D089] text-white "
                                  : "bg-[#E4E4E4] text-[#87888F] border-transparent hover:bg-[#e4e4e8]"
                              }`}>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 투자 희망금액 */}
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-gray-800">
                        투자 희망금액
                      </p>
                      <div className="flex flex-row items-center justify-between">
                        {amountOptions.map((option) => {
                          const selected = amount === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setAmount(option)}
                              className={`h-10 w-46 rounded-[8px] text-xs sm:text-sm font-medium border transition-all cursor-pointer ${
                                selected
                                  ? "bg-[#00D089] text-white "
                                  : "bg-[#E4E4E4] text-[#87888F] border-transparent hover:bg-[#e4e4e8]"
                              }`}>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 체크박스 영역 */}
                    <div className="space-y-2 text-xs sm:text-sm text-gray-800 flex flex-col items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allAgree}
                          onChange={handleAllAgree}
                          className="h-3 w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                        />
                        <span className="text-[#515151] text-[18px] font-semibold">
                          전체동의
                        </span>
                      </label>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2">
                        {/* 개인정보 수집 모달 */}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreePersonal}
                            onChange={(e) => setAgreePersonal(e.target.checked)}
                            className="h-3 w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                          />
                          <span
                            className="text-[#515151] text-[14px] font-semibold cursor-pointer underline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowPersonalModal(true);
                            }}>
                            개인정보 수집 · 이용 동의
                          </span>
                        </label>

                        {/* 마케팅 정보 수신 모달 */}
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreeMarketing}
                            onChange={(e) =>
                              setAgreeMarketing(e.target.checked)
                            }
                            className="h-3 w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                          />
                          <span
                            className="text-[#515151] text-[14px] font-semibold cursor-pointer underline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowMarketingModal(true);
                            }}>
                            마케팅 활용 및 수신 동의(선택)
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="mt-4 w-full h-12 sm:h-14 rounded-[10px] text-white text-2xl font-semibold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #00FFA9 20% , #007C52 60%)",
                      }}>
                      환급금 신청하기 ▶
                    </button>
                  </form>
                </div>

                {/* Disclaimer + Close button row */}
                <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-[10px] sm:text-xs leading-relaxed text-[#000000]">
                    * 본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로,
                    <strong> 원금 및 수익을 보장하지 않습니다.</strong> <br />
                    시장 상황에 따라 손실이 발생할 수 있으며, 투자 결정의 책임은
                    이용자 본인에게 있습니다.
                  </p>
                </div>
              </div>
            </motion.div>{" "}
            {/* mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-[1100px] md:hidden"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-full bg-[#00D089] rounded-[10px] px-2 py-2 sm:px-8 sm:py-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                {/* Title bar */}
                <div className="flex justify-center mb-2 sm:mb-8 items-center">
                  <div className="inline-flex items-center gap-3 text-white text-lg sm:text-xl font-semibold">
                    <span className="text-[16px]">환급금 신청서</span>
                    <span
                      style={{
                        width: "25px",
                      }}>
                      <img src="/images/coin.svg" alt="" />
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEventFormModal(false)}
                    className=" relative text-[18px] text-white font-semibold flex left-18 cursor-pointer">
                    ✕
                  </button>
                </div>

                {/* Inner white form card */}
                <div className="bg-white rounded-[10px] px-4 py-3 sm:px-8 sm:py-10">
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    {/* 이름 / 전화번호 */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div className="flex flex-row items-center gap-4">
                        <label className="block text-[14px] font-bold text-gray-800 ">
                          이름
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-[200px] relative ml-6 h-10 rounded-[2px] text-black border border-gray-200 bg-[#F5F5F7] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#87888F]"
                        />
                      </div>
                      <div className="flex flex-row items-center gap-4">
                        <label className="block text-[14px] font-bold text-gray-800 mb-2">
                          전화번호
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-[200px] h-10 rounded-[2px] text-black border border-gray-200 bg-[#F5F5F7] px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#87888F]"
                        />
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="h-px bg-gray-200" />

                    {/* 연령대 */}
                    <div className="space-y-2">
                      <p className="text-[14px] font-bold text-gray-800">
                        연령대
                      </p>
                      <div className="flex flex-row items-center justify-between gap-1">
                        {ageOptions.map((option) => {
                          const selected = age === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setAge(option)}
                              className={`h-8 w-30  rounded-[2px] text-sm font-medium border transition-all cursor-pointer ${
                                selected
                                  ? "bg-[#00D089] text-white "
                                  : "bg-[#E4E4E4] text-[#87888F] border-transparent hover:bg-[#e4e4e8]"
                              }`}>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 투자 희망금액 */}
                    {/* row 1 — three equal boxes */}
                    <p className="text-[14px] font-bold  text-gray-800">
                      투자 희망금액
                    </p>
                    <div className="flex gap-2 mb-2 -mt-3">
                      {row1.map((option) => {
                        const selected = amount === option;
                        return (
                          <button
                            key={option}
                            onClick={() => setAmount(option)}
                            className={`h-10 flex-1 rounded-[4px] text-xs sm:text-sm font-medium border transition-all
          ${
            selected
              ? "bg-[#00D089] text-white border-[#00D089]"
              : "bg-[#E4E4E4] text-[#87888F] border-[#E4E4E4]"
          }`}>
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* row 2 — two bigger boxes */}
                    <div className="flex gap-2">
                      {row2.map((option) => {
                        const selected = amount === option;
                        return (
                          <button
                            key={option}
                            onClick={() => setAmount(option)}
                            className={`h-10 flex-1 rounded-[4px] text-xs sm:text-sm font-medium border transition-all
          ${
            selected
              ? "bg-[#00D089] text-white border-[#00D089]"
              : "bg-[#E4E4E4] text-[#87888F] border-[#E4E4E4]"
          }`}>
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {/* 체크박스 영역 */}
                    <div className="space-y-2 text-xs sm:text-sm text-gray-800 flex flex-col items-center">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={allAgree}
                          onChange={handleAllAgree}
                          className="h-3 w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                        />
                        <span className="text-[#515151] text-[14px] font-bold">
                          전체동의
                        </span>
                      </label>

                      <div className="flex flex-wor sm:flex-row sm:items-center sm:gap-6 gap-2">
                        {/* 개인정보 수집 모달 */}
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreePersonal}
                            onChange={(e) => setAgreePersonal(e.target.checked)}
                            className="h-3 w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                          />
                          <span
                            className="text-[#515151] text-[9px] font-semibold cursor-pointer underline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowPersonalModal(true);
                            }}>
                            개인정보 수집 · 이용 동의
                          </span>
                        </label>

                        {/* 마케팅 정보 수신 모달 */}
                        <label className="flex items-center gap-1 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={agreeMarketing}
                            onChange={(e) =>
                              setAgreeMarketing(e.target.checked)
                            }
                            className="h-3 w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                          />
                          <span
                            className="text-[#515151] text-[9px] font-semibold cursor-pointer underline"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setShowMarketingModal(true);
                            }}>
                            마케팅 활용 및 수신 동의(선택)
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* Submit button */}
                    <button
                      type="submit"
                      className="mt-4 w-full h-12 sm:h-14 rounded-[50px] text-white text-sm sm:text-base font-semibold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #00FFA9 20% , #007C52 60%)",
                      }}>
                      환급금 신청하기 ▶
                    </button>

                    {(showPersonalModal || showMarketingModal) && (
                      <div
                        className="fixed inset-0 z-40 flex items-center justify-center bg-black/50  lg:px-0"
                        onClick={() => {
                          setShowPersonalModal(false);
                          setShowMarketingModal(false);
                        }}>
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="w-full max-w-[390px] lg:max-w-[540px] bg-white rounded-[16px] lg:rounded-[20px] px-5 py-3 lg:px-7 lg:py-6 shadow-xl max-h-[50vh] overflow-y-auto"
                          onClick={(e) => e.stopPropagation()}>
                          {showPersonalModal && (
                            <>
                              <h2 className="text-center text-black text-[16px] lg:text-[20px] font-bold  lg:mb-6">
                                [개인정보 수집·이용 동의]
                              </h2>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-4">
                                M시그널은 아래 목적을 위해 개인정보를
                                수집·이용합니다.
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-2">
                                1. 수집 항목:
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-3">
                                이름, 연락처(전화번호/카카오톡/이메일), 문의
                                내용
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-2">
                                2. 수집 목적:
                              </p>
                              <ul className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-3 list-disc pl-4 lg:pl-5">
                                <li>서비스 상담 및 고객 응대</li>
                                <li>본인 확인 및 문의 처리</li>
                                <li>이용자 문의 내역 관리</li>
                              </ul>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-2">
                                3. 보유 및 이용 기간:
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-3">
                                수집일로부터 1년 후 파기
                                <br />
                                (단, 관련 법령에 따라 보관해야 하는 경우 해당
                                기간 준수)
                              </p>
                              <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-4">
                                4. 동의 거부권:
                              </p>
                              <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7 mb-2 lg:mb-6">
                                동의를 거부할 수 있으나, 거부 시 상담 및 서비스
                                안내가 제한될 수 있습니다.
                              </p>
                            </>
                          )}

                          {showMarketingModal && (
                            <>
                              <h2 className="text-center text-black text-[16px] lg:text-[20px] font-bold  lg:mb-6">
                                [마케팅 정보 수신 동의]
                              </h2>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-4">
                                본인은 M시그널이 제공하는 아래 사항에 대해
                                광고성 정보 수신에 동의합니다.
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-2">
                                1. 수신 항목:
                              </p>
                              <ul className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-3 list-disc pl-4 lg:pl-5">
                                <li>이벤트, 프로모션, 신규 서비스 안내</li>
                                <li>혜택 제공 및 맞춤형 광고 정보</li>
                                <li>운영 관련 공지 및 안내 메시지</li>
                              </ul>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-2">
                                2. 수신 방식:
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-3">
                                문자(SMS), 카카오톡, 이메일 등 다양한 채널
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-2">
                                3. 보유 및 이용 기간:
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-3">
                                동의 철회 시 또는 목적 달성 시까지
                              </p>
                              <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-2">
                                4. 동의 거부권:
                              </p>
                              <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-6">
                                동의를 거부할 수 있으며, 거부 시 마케팅 관련
                                정보는 제공되지 않습니다.
                                <br />
                                (서비스 이용에는 제한이 없습니다.)
                              </p>
                            </>
                          )}

                          {/* 닫기 버튼 */}
                          <div className="mt-2 flex justify-end">
                            <button
                              type="button"
                              className="px-5 lg:px-6 py-2 rounded-full bg-[#A6A3A2] text-white cursor-pointer text-[12px] lg:text-sm font-semibold flex items-center gap-1"
                              onClick={() => {
                                setShowPersonalModal(false);
                                setShowMarketingModal(false);
                              }}>
                              닫기 ✕
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= SECTION 3 ================= */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #C3E1C2 0%, #F9FFF9 50%, #F9FFF9 100%)",
        }}
        className="w-full flex justify-center ">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="w-full max-w-[1100px] mx-auto py-[0px] md:py-[60px] px-0">
              <div className=" hidden md:block overflow-hidden rounded-[18px] md:rounded-none md:overflow-visible md:p-0">
                <img
                  src="/images/selferral3.svg"
                  alt=""
                  className="block w-full h-auto"
                />
              </div>{" "}
              {/* mobile */}
              <div className="  overflow-hidden rounded-[18px] md:rounded-none md:overflow-visible md:p-0">
                <img
                  src="/images/selferral3mobile.svg"
                  alt=""
                  className=" md:hidden block w-full h-[370px]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4 ================= */}
      <section className="w-full flex justify-center ">
        <div className="w-full flex justify-center">
          <div className="w-full ">
            <div className="w-full   ">
              <div className="overflow-hidden rounded-[1px] md:rounded-none md:overflow-visible">
                <img
                  src="/images/selferral4.svg"
                  alt=""
                  className="block w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5 ================= */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #C7F4C6 0%, #F9FFF9 50%, #F9FFF9 100%)",
        }}
        className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="w-full max-w-[1100px] mx-auto md:mt-80 py-10">
              {/* ✅ Make this wrapper RELATIVE so button anchors to the image */}
              <div className="relative w-full overflow-hidden rounded-[18px] md:rounded-none md:overflow-visible">
                <img
                  src="/images/selferral5.svg"
                  alt=""
                  className="block w-full h-auto"
                />

                {/* ✅ Mobile button anchored to image (no moving) */}
                <div className="md:hidden absolute left-0 right-0 bottom-[46%] flex justify-center px-4">
                  <Link href={""} className="w-full flex justify-center">
                    <button
                      type="submit"
                      className="w-[160px] max-w-[440px] h-[30px] rounded-[50px]
                  text-white text-[12px] font-bold tracking-wide
                  shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #AB38FB 0%, #7416B6 50%, #7416B6 100%)",
                      }}>
                      1분만에 셀퍼럴 신청하기
                    </button>
                  </Link>
                </div>

                {/* ✅ Desktop button anchored to image (keeps your original position idea, but stable) */}
                <div className="hidden md:flex absolute left-0 right-0 bottom-[46%] justify-center">
                  <Link href={""} className="w-full flex justify-center">
                    <button
                      type="submit"
                      className="w-[445px] h-19 rounded-[50px] text-white text-3xl font-bold tracking-wide shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #AB38FB 0%, #7416B6 50%, #7416B6 100%)",
                      }}>
                      1분만에 셀퍼럴 신청하기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6 ================= */}
      <section
        style={{
          background:
            "linear-gradient(180deg, #F9FFF9 0%, #C7F4C6 50%, #C7F4C6 100%)",
        }}
        className="w-full flex justify-center">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="w-full max-w-[1100px] mx-auto py-[60px]">
              <div className="overflow-hidden rounded-[18px] md:rounded-none md:overflow-visible">
                <img
                  src="/images/selferral6.svg"
                  alt=""
                  className="block w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7 ================= */}
      <section
        style={{
          background: "#C9F4C8",
        }}
        className="w-full flex justify-center ">
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1440px] mx-auto">
            <div className="w-full max-w-[1100px] mx-auto ">
              <div className="overflow-hidden rounded-[18px] md:rounded-[32px]">
                <img
                  src="/images/selferral7.svg"
                  alt=""
                  className="block w-full "
                />

                <div className="relative flex flex-col items-center justify-center gap-4 px-4 py-4 bottom-24 md:bottom-70 md:gap-10 md:px-0 md:py-0">
                  <h1 className="text-black font-bold text-[18px] leading-[1.15] md:text-[56px]">
                    누적 230,981명
                  </h1>

                  <Link href={""} className="w-full flex justify-center">
                    <button
                      type="submit"
                      className="
                        -mt-2 w-[140px] max-w-[420px] h-[28px]
                        rounded-[50px] text-white text-[12px] font-semibold tracking-wide
                        shadow-[0_10px_25px_rgba(0,0,0,0.25)]
                        hover:shadow-xl hover:-translate-y-[2px]
                        active:scale-95 active:translate-y-0 active:shadow-md
                        transition-transform transition-shadow duration-150 ease-out
                        md:mt-4 md:w-[380px] md:h-12 md:text-xl
                      "
                      style={{
                        background:
                          "linear-gradient(180deg, #12FF10 0%, #00A956 50%, #00A956 100%)",
                      }}>
                      1분만에 셀퍼럴 신청하기
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Selferral;
