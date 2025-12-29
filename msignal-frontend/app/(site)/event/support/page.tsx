/** @format */

"use client";
import FullWidth from "@/app/(site)/components/layout/FullWidth";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

const Support = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);
  const [allAgree, setAllAgree] = useState(false);
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showMarketingModal, setShowMarketingModal] = useState(false);
  const formSectionRef = useRef<HTMLElement | null>(null);
  const formAnchorRef = useRef<HTMLDivElement | null>(null);

  const [submitting, setSubmitting] = useState(false);
  const normalizePhone = (v: string) => v.replace(/\s/g, "").trim();
  const validateForm = () => {
    const _name = name.trim();
    const _phone = normalizePhone(phone);

    if (!_name) return "이름을 입력해주세요.";
    if (!_phone) return "전화번호를 입력해주세요.";
    if (!age) return "연령대를 선택해주세요.";
    if (!amount) return "투자 희망금액을 선택해주세요.";
    if (!agreePersonal) return "개인정보 수집 · 이용 동의는 필수입니다.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const errorMsg = validateForm();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    const toastId = toast.loading("신청 처리중...");
    try {
      setSubmitting(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim(),
            phone: normalizePhone(phone),
            ageRange: age,
            investAmount: amount,
            agreePersonal,
            agreeMarketing,
          }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(
          data?.message || "신청에 실패했습니다. 다시 시도해주세요.",
          {
            id: toastId,
          }
        );
        return;
      }

      toast.success("신청이 완료되었습니다 ✅", { id: toastId });

      // optional reset
      setName("");
      setPhone("");
      setAge(null);
      setAmount(null);
      setAllAgree(false);
      setAgreePersonal(false);
      setAgreeMarketing(false);
    } catch (err) {
      console.error(err);
      toast.error("네트워크 오류입니다. 잠시 후 다시 시도해주세요.", {
        id: toastId,
      });
    } finally {
      setSubmitting(false);
    }
  };

  const scrollToForm = () => {
    const el = formAnchorRef.current;
    if (!el) return;

    const HEADER_OFFSET = 90; // adjust (ex: 70~120)
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;

    window.scrollTo({ top, behavior: "smooth" });
  };

  // 모바일: "60이상" (공백 없음), PC: "60 이상" (공백 있음)
  const ageOptions = ["20", "30", "40", "50", "60이상"];
  const ageOptionsPC = ["20", "30", "40", "50", "60 이상"];

  const amountOptions = [
    "100만원 이하",
    "100~200만원",
    "300~500만원",
    "600~1,000만원",
    "1,000만원 이상",
  ];

  const creditRows = [
    {
      lot: "0.01",
      need: "3,000,000",
      deposit: "2,000,000",
      credit: "1,000,000",
      profit: "188,000",
    },
    {
      lot: "0.02",
      need: "6,000,000",
      deposit: "4,000,000",
      credit: "2,000,000",
      profit: "376,000",
    },
    {
      lot: "0.03",
      need: "9,000,000",
      deposit: "6,000,000",
      credit: "3,000,000",
      profit: "564,000",
    },
    {
      lot: "0.04",
      need: "12,000,000",
      deposit: "8,000,000",
      credit: "4,000,000",
      profit: "752,000",
    },
    {
      lot: "0.05",
      need: "15,000,000",
      deposit: "10,000,000",
      credit: "5,000,000",
      profit: "940,000",
    },
    {
      lot: "0.1",
      need: "30,000,000",
      deposit: "20,000,000",
      credit: "10,000,000",
      profit: "1,880,000",
    },
    {
      lot: "0.2",
      need: "60,000,000",
      deposit: "40,000,000",
      credit: "20,000,000",
      profit: "3,760,000",
    },
    {
      lot: "0.3",
      need: "90,000,000",
      deposit: "60,000,000",
      credit: "30,000,000",
      profit: "5,640,000",
    },
    {
      lot: "0.4",
      need: "120,000,000",
      deposit: "80,000,000",
      credit: "40,000,000",
      profit: "7,520,000",
    },
    {
      lot: "0.5",
      need: "150,000,000",
      deposit: "100,000,000",
      credit: "50,000,000",
      profit: "9,400,000",
    },
  ];

  const handleAllAgree = () => {
    const next = !allAgree;
    setAllAgree(next);
    setAgreePersonal(next);
    setAgreeMarketing(next);
  };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log({ name, phone, age, amount, agreePersonal, agreeMarketing });
  // };

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
      <section className=" w-full  mb-10 lg:mb-20 ">
        <div className="hidden md:block relative h-[500px] lg:h-[1600px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/eventMain.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>{" "}
        <div className=" md:hidden relative h-[480px] lg:h-[1292px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/supportmobile.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>
      </section>
      {/* 섹션 2: 크레딧이란? */}
      <motion.section
        className="w-full bg-white flex items-center mb-10 mt-30 lg:mb-40 mt-5 lg:mt-60 "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* 모바일: 세로 배치, PC: 가로 배치 */}
        <div className="w-full  lg:max-w-[1100px] lg:w-[1100px] lg:h-[403px] mx-auto  lg:px-0 flex flex-col lg:flex-row items-start lg:items-center justify-between">
          {/* 텍스트 블록 */}
          <motion.div
            className="flex-1 lg:w-[520px] lg:pl-6"
            variants={childFade}>
            <motion.h2
              className="text-[20px] lg:text-[30px] leading-[1.3] font-semibold mb-3 lg:mb-6 text-black"
              variants={childFade}>
              크레딧이란?
            </motion.h2>
            <motion.p
              className=" hidden md:block text-[13px] lg:text-[18px] leading-[1.8] text-[#444444]"
              variants={childFade}>
              크레딧은{" "}
              <strong>추가적인 거래 여력을 제공하는 가상의 지원 자금</strong>
              입니다. <br className="hidden lg:block" />
              수익 발생 시 실수익으로 전환되며, 이벤트 기간 동안{" "}
              <br className="hidden lg:block" />
              입금액의 50%를 제공해 드립니다.{" "}
              <strong>크레딧을 통해 더 큰 거래가 가능합니다.</strong>
            </motion.p>{" "}
            <motion.p
              className="md:hidden text-[11px] lg:text-[18px] leading-[1.8] text-[#444444]"
              variants={childFade}>
              크레딧은{" "}
              <strong>추가적인 거래 여력을 제공하는 가상의 지원 자금</strong>
              입니다. <br />
              수익 발생 시 실수익으로 전환되며, 이벤트 기간 동안 입금액의 50%를{" "}
              <br />
              제공해 드립니다.{" "}
              <strong>크레딧을 통해 더 큰 거래가 가능합니다.</strong>
            </motion.p>
          </motion.div>

          {/* 이미지/비디오 블록 */}
          <motion.div
            className="flex-1 w-full lg:max-w-[420px] mt-6 lg:mt-0 flex flex-col items-end"
            variants={childFade}>
            {/* 수익률 라벨 */}

            <div className="w-full lg:w-[620px] h-[150px] lg:h-[300px] relative">
              <video
                src="/images/event.mp4"
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

      <div ref={formAnchorRef} className="scroll-mt-[90px]" />

      {/* 섹션 3: 신청서 폼 */}
      <motion.section
        ref={formSectionRef as any}
        className="w-full bg-white flex flex-col items-center mb-10 mt-40 lg:mb-40 mt-8 lg:mt-80"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[390px] lg:max-w-[1100px] lg:w-[1100px] mx-auto  lg:px-0 flex flex-col gap-4 lg:gap-8">
          <div className="w-full flex justify-center">
            {/* 어두운 외부 카드 */}
            <div className="w-full bg-[#14151D] rounded-[20px] lg:rounded-[32px] px-3 py-3 lg:px-8 lg:py-8 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
              {/* 타이틀 바 */}
              <div className="flex items-center justify-center mb-3 lg:mb-6">
                <div className="relative flex -mt-1 lg:-mt-5 items-center gap-2 lg:gap-3 text-white text-[14px] lg:text-xl font-semibold">
                  <span>
                    <img
                      src="/images/gift.svg"
                      alt="gift"
                      className="w-[18px] lg:w-[24px]"
                    />
                  </span>
                  <span>자동매매 무료 체험 신청서</span>
                  <span>
                    <img
                      src="/images/gift.svg"
                      alt="gift"
                      className="w-[18px] lg:w-[24px]"
                    />
                  </span>
                </div>
              </div>

              {/* 흰색 내부 폼 카드 */}
              <div className="bg-white rounded-[16px] lg:rounded-[24px] px-4 py-2 lg:px-8 lg:py-10">
                <form
                  className="space-y-4 lg:space-y-8"
                  onSubmit={handleSubmit}>
                  {/* ========== 이름 / 전화번호 ========== */}
                  {/* 모바일: 세로 배치, PC: 가로 2열 */}
                  <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3 lg:gap-6">
                    {/* 이름 */}
                    <div className="flex items-center  lg:flex-row lg:items-center gap-7.5 lg:gap-5">
                      <label className="block text-[12px] lg:text-[18px] font-bold text-black">
                        이름
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="text-black text-sm focus:outline-none w-[250px] lg:w-[380px] h-[40px] lg:h-[44px] rounded-[8px] lg:rounded-[10px] bg-[#F5F5F7] px-3 lg:px-[14px]"
                        style={{
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 4px 4px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.12)",
                        }}
                      />
                    </div>
                    {/* 전화번호 */}
                    <div className="flex items-center lg:flex-row lg:items-center gap-2 lg:gap-5">
                      <label className="block text-[12px] lg:text-[18px] font-bold text-black">
                        전화번호
                      </label>
                      <input
                        type="text"
                        placeholder="01012345678"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="text-black text-sm focus:outline-none w-[250px] lg:w-[380px] h-[40px] lg:h-[44px] rounded-[8px] lg:rounded-[10px] bg-[#F5F5F7] px-3 lg:px-[14px]"
                        style={{
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 4px 4px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.12)",
                        }}
                      />
                    </div>
                  </div>

                  {/* 구분선 - PC만 표시 */}
                  <div className="hidden lg:block h-1 bg-gray-200" />

                  {/* ========== 연령대 ========== */}
                  <div className="space-y-2 lg:space-y-3">
                    <p className="text-[12px] lg:text-xl font-bold text-black">
                      연령대
                    </p>
                    <div className="grid grid-cols-5 gap-[6px] lg:flex lg:flex-row lg:items-center lg:justify-between lg:gap-0">
                      {ageOptions.map((option, idx) => {
                        const selected =
                          age === option || age === ageOptionsPC[idx];
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setAge(option)}
                            className={`h-[30px] lg:h-10 lg:w-46 rounded-[5px] text-[12px] lg:text-xl font-semibold border-0 transition-all cursor-pointer ${
                              selected
                                ? "bg-[#14151D] text-white"
                                : "bg-[#E4E4E4] text-[#87888F] hover:bg-[#e4e4e8]"
                            }`}>
                            {/* 모바일에서는 "60이상", PC에서는 "60 이상" */}
                            <span className="lg:hidden">{option}</span>
                            <span className="hidden lg:inline">
                              {ageOptionsPC[idx]}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ========== 투자 희망금액 ========== */}
                  <div className="space-y-2 lg:space-y-3">
                    <p className="text-[12px] lg:text-xl font-bold text-black">
                      투자 희망금액
                    </p>

                    {/* 모바일 레이아웃: 3개 + 2개 */}
                    <div className="lg:hidden">
                      {/* 첫째 줄: 3개 */}
                      <div className="grid grid-cols-3 gap-[6px] mb-[6px]">
                        {amountOptions.slice(0, 3).map((option) => {
                          const selected = amount === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setAmount(option)}
                              className={`h-[30px] rounded-[5px] text-[11px] font-semibold border-0 transition-all cursor-pointer ${
                                selected
                                  ? "bg-[#14151D] text-white"
                                  : "bg-[#E4E4E4] text-[#87888F]"
                              }`}>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                      {/* 둘째 줄: 2개 */}
                      <div className="grid grid-cols-2 gap-[6px]">
                        {amountOptions.slice(3).map((option) => {
                          const selected = amount === option;
                          return (
                            <button
                              key={option}
                              type="button"
                              onClick={() => setAmount(option)}
                              className={`h-[30px] rounded-[5px] text-[11px] font-semibold border-0 transition-all cursor-pointer ${
                                selected
                                  ? "bg-[#14151D] text-white"
                                  : "bg-[#E4E4E4] text-[#87888F]"
                              }`}>
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* PC 레이아웃: 5개 한 줄 */}
                    <div className="hidden lg:flex flex-row items-center justify-between">
                      {amountOptions.map((option) => {
                        const selected = amount === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            onClick={() => setAmount(option)}
                            className={`h-10 w-46 rounded-[5px] text-xs sm:text-xl font-semibold border-0 transition-all cursor-pointer ${
                              selected
                                ? "bg-[#14151D] text-white"
                                : "bg-[#E4E4E4] text-[#87888F] hover:bg-[#e4e4e8]"
                            }`}>
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* ========== 체크박스 영역 ========== */}
                  <div className="space-y-2 text-xs sm:text-sm text-gray-800 flex flex-col items-center">
                    {/* 전체동의 */}
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={allAgree}
                        onChange={handleAllAgree}
                        className="h-[14px] w-[14px] lg:h-3 lg:w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                      />
                      <span className="text-[#515151] text-[13px] lg:text-[18px] font-semibold">
                        전체동의
                      </span>
                    </label>

                    <div className="flex flex-row items-center gap-4 lg:gap-6">
                      <label className="flex items-center gap-1.5 lg:gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreePersonal}
                          onChange={(e) => setAgreePersonal(e.target.checked)}
                          className="h-[12px] w-[12px] lg:h-3 lg:w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                        />
                        <span
                          className="text-[#515151] text-[8px] lg:text-[14px] font-semibold cursor-pointer underline"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShowPersonalModal(true);
                          }}>
                          개인정보 수집 · 이용 동의
                        </span>
                      </label>

                      {/* 마케팅 활용 동의 */}
                      <label className="flex items-center gap-1.5 lg:gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={agreeMarketing}
                          onChange={(e) => setAgreeMarketing(e.target.checked)}
                          className="h-[12px] w-[12px] lg:h-3 lg:w-3 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                        />
                        <span
                          className="text-[#515151] text-[8px] lg:text-[14px] font-semibold cursor-pointer underline"
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

                  {/* ========== 제출 버튼 ========== */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="-mt-2 lg:mt-4 w-full h-[44px] lg:h-14 rounded-[8px] lg:rounded-[10px] text-white text-[13px] lg:text-base font-semibold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{
                      background:
                        "linear-gradient(90deg, #2A303B 20%, #735857 60%, #C38476 100%)",
                    }}>
                    {submitting ? "처리중..." : "크레딧 지급받기 ▶"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[7px] lg:text-xs leading-relaxed text-[#A5A5A5]  lg:px-0 md:-mt-5 -mt-1">
            * 본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로,{" "}
            <strong>원금 및 수익을 보장하지 않습니다.</strong> <br />* 시장
            상황에 따라 손실이 발생할 수 있으며, 투자 결정의 책임은 이용자
            본인에게 있습니다.
          </p>
        </div>
      </motion.section>

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
            className="w-full max-w-[390px] lg:max-w-[550px] bg-white rounded-[16px] lg:rounded-[20px] px-5 py-3 lg:px-7 lg:py-3 shadow-xl  max-h-[60vh]   overflow-y-auto"
            onClick={(e) => e.stopPropagation()}>
            {showPersonalModal && (
              <>
                <h2 className="text-center text-black text-[16px] lg:text-[20px] font-bold  lg:mb-1">
                  [개인정보 수집·이용 동의]
                </h2>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  M시그널은 아래 목적을 위해 개인정보를 수집·이용합니다.
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  1. 수집 항목:
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  이름, 연락처(전화번호/카카오톡/이메일), 문의 내용
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  2. 수집 목적:
                </p>
                <ul className="text-[11px] lg:text-sm text-black leading-6 lg:leading-6 lg:mb-2  list-disc pl-4 lg:pl-5">
                  <li>서비스 상담 및 고객 응대</li>
                  <li>본인 확인 및 문의 처리</li>
                  <li>이용자 문의 내역 관리</li>
                </ul>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  3. 보유 및 이용 기간:
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-5  lg:mb-2 ">
                  수집일로부터 1년 후 파기 (단, 관련 법령에 따라 보관해야 하는
                  경우 해당 기간 준수)
                </p>
                <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7 ">
                  4. 동의 거부권:
                </p>
                <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7 mb-2 lg:mb-4">
                  동의를 거부할 수 있으나, 거부 시 상담 및 서비스 안내가 제한될
                  수 있습니다.
                </p>
              </>
            )}

            {showMarketingModal && (
              <>
                <h2 className="text-center text-black text-[16px] lg:text-[20px] font-bold  lg:mb-2">
                  [마케팅 정보 수신 동의]
                </h2>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  본인은 M시그널이 제공하는 아래 사항에 대해 광고성 정보 수신에
                  동의합니다.
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  1. 수신 항목:
                </p>
                <ul className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-3 list-disc pl-4 lg:pl-5">
                  <li>이벤트, 프로모션, 신규 서비스 안내</li>
                  <li>혜택 제공 및 맞춤형 광고 정보</li>
                  <li>운영 관련 공지 및 안내 메시지</li>
                </ul>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  2. 수신 방식:
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  lg:mb-3">
                  문자(SMS), 카카오톡, 이메일 등 다양한 채널
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 ">
                  3. 보유 및 이용 기간:
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7 lg:mb-3">
                  동의 철회 시 또는 목적 달성 시까지
                </p>
                <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  4. 동의 거부권:
                </p>
                <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7  ">
                  동의를 거부할 수 있으며, 거부 시 마케팅 관련 정보는 제공되지
                  않습니다.
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

      <motion.section
        className="w-full bg-white flex flex-col items-center mb-10 lg:mb-5 mt-8 lg:mt-40"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[390px] lg:max-w-[1100px] lg:w-[1100px] mx-auto  lg:px-0 flex flex-col items-center">
          {/* 그라데이션 카드 */}
          <div
            className="w-full rounded-[12px] lg:rounded-[20px] px-3 py-3 lg:px-6 lg:py-7 shadow-[0_24px_60px_rgba(0,0,0,0.35)]"
            style={{
              background:
                "linear-gradient(90deg, #2A303B 0%, #2A303B 50%, #C38476 100%)",
            }}>
            {/* 토글 버튼 */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="w-full h-10 lg:h-14 rounded-[10px] bg-transparent text-white text-[13px] lg:text-3xl font-semibold tracking-wide flex items-center justify-center cursor-pointer">
              {open
                ? "크레딧과 수익을 확인해보세요! ▲"
                : "크레딧과 수익을 확인해보세요! ▼"}
            </button>

            {/* 펼쳐지는 테이블 */}
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="credit-box"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden">
                  {/* 흰색 테이블 카드 */}
                  <div className="mt-3 lg:mt-4 bg-white rounded-[5px] lg:rounded-[22px] overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-center text-[9px] lg:text-sm bg-white">
                        <thead className="bg-white text-gray-800">
                          <tr>
                            <th className="py-3 lg:py-8 px-1 lg:px-3 font-semibold">
                              계약수(랏)
                            </th>
                            <th className="py-3 lg:py-8 px-1 lg:px-3 font-semibold">
                              10단계 필요금
                            </th>
                            <th className="py-3 lg:py-8 px-1 lg:px-3 font-semibold">
                              회원 입금액
                            </th>
                            <th className="py-3 lg:py-8 px-1 lg:px-3 font-semibold">
                              크레딧 지급액
                            </th>
                            <th className="py-3 lg:py-8 px-1 lg:px-3 font-semibold border-b border-gray-200">
                              25년 10월 기준 수익
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {creditRows.map((row) => (
                            <tr key={row.lot}>
                              <td className="bg-[#EFEFEF] py-2 lg:py-3 px-1 lg:px-3 border-t border-gray-100 text-gray-800">
                                {row.lot}
                              </td>
                              <td className="bg-[#EFEFEF] py-2 lg:py-3 px-1 lg:px-3 border-t border-gray-100 text-gray-800">
                                {row.need}
                              </td>
                              <td className="bg-white py-2 lg:py-3 px-1 lg:px-3 border-t border-gray-100 text-gray-800">
                                {row.deposit}
                              </td>
                              <td className="bg-[#FFF5F5] py-2 lg:py-3 px-1 lg:px-3 border-t border-gray-100 text-gray-800">
                                {row.credit}
                              </td>
                              <td className="bg-[#FFEAE5] py-2 lg:py-3 px-1 lg:px-3 border-t border-gray-100 text-gray-800">
                                {row.profit}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 하단 버튼 */}
                  <button
                    type="button"
                    onClick={scrollToForm}
                    className="mt-4 w-full h-[44px] lg:h-14 rounded-[8px] lg:rounded-[10px] bg-[#14151D] text-white text-[13px] lg:text-base font-semibold flex items-center justify-center shadow-lg cursor-pointer">
                    크레딧 지급받기 ▶
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default Support;
