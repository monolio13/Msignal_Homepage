/** @format */

"use client";
import FullWidth from "@/app/(site)/components/layout/FullWidth";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const Discount = () => {
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

  const row1 = ["100만원 이하", "100~200만원", "300~500만원"];
  const row2 = ["600~1,000만원", "1,000만원 이상"];

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
  const handleAllAgree = () => {
    const next = !allAgree;
    setAllAgree(next);
    setAgreePersonal(next);
    setAgreeMarketing(next);
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
      setShowEventFormModal(false);

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
      <section className=" md:mx-0 -mx-4 ">
        <div className="hidden md:block relative h-[500px] lg:h-[1292px] overflow-hidden  -mt-4">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/event1.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>{" "}
        <div className="md:hidden relative h-[300px]  overflow-hidden mb-40">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src="/images/discountmainmobile.svg"
              alt="M Signal 이벤트 배너"
              fill
              className="object-cover"
              priority
            />
          </AnimatePresence>{" "}
        </div>
      </section>
      {/* ////// */}
      <motion.section
        className="w-full bg-white flex flex-col items-center mb-20 mt-40 px-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-8">
          <img
            src="/images/event2.svg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </motion.section>
      {/* ///// */}
      <motion.section
        className="w-full bg-white flex flex-col items-center  px-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className=" hidden md:block w-full max-w-[1000px] mx-auto flex flex-col gap-8 mb-20 mt-80">
          <img
            src="/images/event3.svg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>{" "}
        <div className="md:hidden w-full max-w-[1000px] mx-auto flex flex-col gap-8 mt-20">
          <img
            src="/images/discountmobile3.svg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </motion.section>
      {/* ////// */}
      <motion.section
        className=" md:mx-0 mt-20 lg:mb-20 -mx-4"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full  mx-auto flex flex-col gap-8">
          <img
            src="/images/event4.svg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>{" "}
      </motion.section>

      {/* ///// */}
      <motion.section
        className="w-full bg-white flex flex-col items-center mb-20 md:mt-80 mt-40 "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1000px] mx-auto flex flex-col gap-8">
          <img
            src="/images/event5.svg"
            alt=""
            className="w-full h-auto object-contain"
          />
        </div>
      </motion.section>

      {/* /////// */}
      <motion.section
        className="-mx-4 md:mx-0 mt-20 md:mt-60 lg:mb-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1400px] mx-auto flex flex-col gap-8 items-center">
          <img
            src="/images/event6.svg"
            alt=""
            className="w-full h-auto object-contain"
          />
          <button
            type="button"
            onClick={() => setShowEventFormModal(true)}
            className=" hidden md:block relative bottom-6 sm:bottom-10 md:bottom-80 mt-4  w-full max-w-[1200px] h-12 sm:h-16 md:h-20 rounded-[50px]  text-white  text-[18px] sm:text-[24px] md:text-[35px] font-bold tracking-wide  flex items-center justify-center  shadow-[0_10px_25px_rgba(0,0,0,0.25)]  cursor-pointer   active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out "
            style={{
              background:
                "linear-gradient(10deg, #FFBB00 0% , #FF7D00 100%, #C38476 100%)",
            }}>
            이벤트 신청하기 ▶
          </button>{" "}
          <button
            type="button"
            onClick={() => setShowEventFormModal(true)}
            className=" md:hidden relative bottom-30  mt-4  w-full max-w-[290px] h-8 sm:h-16  rounded-[50px]  text-white  text-[18px] sm:text-[24px] md:text-[35px] font-bold tracking-wide  flex items-center justify-center  shadow-[0_10px_25px_rgba(0,0,0,0.25)]  cursor-pointer   active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out "
            style={{
              background:
                "linear-gradient(10deg, #FFBB00 0% , #FF7D00 100%, #C38476 100%)",
            }}>
            이벤트 신청하기 ▶
          </button>
        </div>
      </motion.section>

      {/* ///////// */}
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
              <div className="w-full bg-[#FF8635] rounded-[32px] px-6 py-8 sm:px-8 sm:py-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                {/* Title bar */}
                <div className="flex justify-center mb-6 sm:mb-8 items-center">
                  <div className="inline-flex items-center gap-3 text-white text-lg sm:text-xl font-semibold">
                    <span className="text-[30px]">이벤트 신청서</span>
                    <span>
                      <img src="/images/spoon.svg" alt="" />
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
                                  ? "bg-[#FF6600] text-white "
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
                                  ? "bg-[#FF6600] text-white "
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
                      disabled={submitting}
                      className="mt-4 w-full h-12 sm:h-14 rounded-[10px] text-white text-sm sm:text-base font-semibold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(90deg, #FFBF94 20% , #FF6600 60%)",
                      }}>
                      이용료 할인 받기 ▶
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
                          수집일로부터 1년 후 파기 (단, 관련 법령에 따라
                          보관해야 하는 경우 해당 기간 준수)
                        </p>
                        <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7 ">
                          4. 동의 거부권:
                        </p>
                        <p className="text-[10px] lg:text-sm text-black leading-6 lg:leading-7 mb-2 lg:mb-4">
                          동의를 거부할 수 있으나, 거부 시 상담 및 서비스 안내가
                          제한될 수 있습니다.
                        </p>
                      </>
                    )}

                    {showMarketingModal && (
                      <>
                        <h2 className="text-center text-black text-[16px] lg:text-[20px] font-bold  lg:mb-2">
                          [마케팅 정보 수신 동의]
                        </h2>
                        <p className="text-[11px] lg:text-sm text-black leading-6 lg:leading-7  ">
                          본인은 M시그널이 제공하는 아래 사항에 대해 광고성 정보
                          수신에 동의합니다.
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
                          동의를 거부할 수 있으며, 거부 시 마케팅 관련 정보는
                          제공되지 않습니다.
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
            </motion.div>{" "}
            {/* mobile */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.25 }}
              className="w-full max-w-[1100px] md:hidden"
              onClick={(e) => e.stopPropagation()}>
              <div className="w-full bg-[#FF8635] rounded-[10px] px-2 py-2 sm:px-8 sm:py-10 shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                {/* Title bar */}
                <div className="flex justify-center mb-2 sm:mb-8 items-center">
                  <div className="inline-flex items-center gap-3 text-white text-lg sm:text-xl font-semibold">
                    <span className="text-[16px]">이벤트 신청서</span>
                    <span
                      style={{
                        width: "25px",
                      }}>
                      <img src="/images/spoon.svg" alt="" />
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
                                  ? "bg-[#FF6600] text-white "
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
              ? "bg-[#FF6600] text-white border-[#FF7A1A]"
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
              ? "bg-[#FF6600] text-white border-[#FF7A1A]"
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
                      disabled={submitting}
                      className="mt-4 w-full h-12 sm:h-14 rounded-[50px] text-white text-sm sm:text-base font-semibold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer"
                      style={{
                        background:
                          "linear-gradient(180deg, #FFBF94 20% , #FF6600 60%)",
                      }}>
                      이용료 할인 받기 ▶
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
    </>
  );
};

export default Discount;
