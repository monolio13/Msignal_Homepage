/** @format */
"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdOutlineCancel } from "react-icons/md";
type InquiryKey = "AUTO_TRADING" | "PROFIT_COUNSEL" | "SELF_REFERRAL";
const amounts = [100, 150, 200, 300, 1000, 5000];

function AmountSelect({
  amount,
  setAmount,
}: {
  amount: number;
  setAmount: (v: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) window.addEventListener("mousedown", handleClick);
    return () => window.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="flex items-center gap-5 md:px-2 px-1 bg-[#2D2D2D] border-[4px] border-[#2B2B2B] rounded-[12px] md:h-[56px] h-[35px]">
      <div
        className="relative bg-white md:rounded-[12px] rounded-[5px] md:h-[44px] h-[25px] flex items-center md:px-4 px-1 cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}>
        <span className="text-black md:text-[24px] text-[15px] font-bold leading-none">
          {amount.toLocaleString("ko-KR")}
        </span>
        <span
          className={`ml-2 text-[18px] text-black transition-transform ${
            open ? "rotate-180" : ""
          }`}>
          ▼
        </span>

        {open && (
          <div
            className="absolute -left-3 top-[0px] z-50 rounded-[12px] bg-[#F1F1F1] shadow-[0_12px_25px_rgba(0,0,0,0.18)] overflow-hidden"
            style={{ minWidth: "120px" }}>
            {amounts.map((v, idx) => (
              <button
                key={v}
                type="button"
                onClick={(e) => {
                  e.stopPropagation(); // 🔥 prevent parent toggle
                  setAmount(v);
                  setOpen(false); // close after select
                }}
                className="relative w-full text-left px-8 py-3 flex items-center hover:bg-[#EDEDED]">
                <span
                  className={`text-[22px] leading-none ${
                    v === amount ? "font-bold text-black" : "text-[#666666]"
                  }`}>
                  {v.toLocaleString("ko-KR")}
                </span>
                {idx < amounts.length - 1 && (
                  <span className="pointer-events-none absolute left-4 right-4 bottom-0 h-[1px] bg-[#D6D6D6]" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <span className="md:text-[20px] text-[14px] font-semibold text-white">
        만원
      </span>
    </div>
  );
}

const Start = () => {
  const [amount, setAmount] = useState(100); // 100 / 200 / 500 / 1000
  const [step, setStep] = useState(8); // 1 ~ 10 (default 9단계)
  // const profitRate = 5.4; // 예: 계산된 수익률
  // const profitAmount = 297278; // 예: 계산된 수익금
  const [showEventFormModal, setShowEventFormModal] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState<string | null>(null);
  const [amount1, setAmount1] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const ageOptions = ["20", "30", "40", "50", "60 이상"];
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showMarketingModal, setShowMarketingModal] = useState(false);
  const [showMartingailModal, setShowMartingailModal] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const warningTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const amounts = [100, 150, 200, 300, 1000, 5000];

  // ✅ step별 고정 수익률(변경 X)
  const PROFIT_RATE_BY_STEP: Record<number, number> = {
    8: 0.282,
    9: 0.188,
    10: 0.094,
  };

  const profitRate = PROFIT_RATE_BY_STEP[step] ?? PROFIT_RATE_BY_STEP[8];

  // ✅ match your examples (100 * 28.2% = 2,820원)
  const profitRatePercent = profitRate * 100;
  const profitAmount = Math.round(amount * profitRatePercent * 100);
  // ✅ agreement state (reusing your modal triggers)
  const [allAgree, setAllAgree] = useState(false);
  const [agreePersonal, setAgreePersonal] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [consultName, setConsultName] = useState("");
  const [consultPhone, setConsultPhone] = useState("");

  const [inquiries, setInquiries] = useState<Record<InquiryKey, boolean>>({
    AUTO_TRADING: false,
    PROFIT_COUNSEL: false,
    SELF_REFERRAL: false,
  });

  const inquiryTypes = useMemo(
    () => (Object.keys(inquiries) as InquiryKey[]).filter((k) => inquiries[k]),
    [inquiries]
  );

  const normalizePhone = (v: string) => v.replace(/[^\d]/g, "").trim(); // keep digits only

  const toggleInquiry = (key: InquiryKey) => {
    setInquiries((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const handleAllAgree = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setAllAgree(checked);
    setAgreePersonal(checked);
    setAgreeMarketing(checked);
  };

  const validate = () => {
    if (!consultName.trim()) return "이름을 입력해주세요.";
    if (!consultPhone.trim()) return "전화번호를 입력해주세요.";

    const p = normalizePhone(consultPhone);
    if (p.length < 9 || p.length > 11) return "전화번호 형식을 확인해주세요.";

    if (inquiryTypes.length === 0) return "문의사항을 최소 1개 선택해주세요.";
    if (!agreePersonal) return "개인정보 수집 · 이용 동의는 필수입니다.";
    return null;
  };

  const submitConsult = async () => {
    if (submitting) return;

    const errorMsg = validate();
    if (errorMsg) {
      toast.error(errorMsg);
      return;
    }

    const toastId = toast.loading("상담 신청 처리중...");
    setSubmitting(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/consult`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: consultName.trim(),
            phone: normalizePhone(consultPhone),
            inquiryTypes,
            agreePersonal,
            agreeMarketing,
          }),
        }
      );

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.message || "상담 신청에 실패했습니다.", {
          id: toastId,
        });
        return;
      }

      toast.success("상담 신청이 완료되었습니다 ✅", { id: toastId });

      // ✅ reset (optional)
      setConsultName("");
      setConsultPhone("");
      setInquiries({
        AUTO_TRADING: false,
        PROFIT_COUNSEL: false,
        SELF_REFERRAL: false,
      });
      setAllAgree(false);
      setAgreePersonal(false);
      setAgreeMarketing(false);
    } catch (e) {
      console.error(e);
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

  const handleChangeStep = (value: number) => {
    // clear previous timer
    if (warningTimeoutRef.current) {
      clearTimeout(warningTimeoutRef.current);
      warningTimeoutRef.current = null;
    }

    if (value < 8) {
      // 1~7 단계: show popup, then bounce back to 9
      setStep(value);
      setShowWarning(true);

      warningTimeoutRef.current = setTimeout(() => {
        setShowWarning(false);
        setStep(8);
      }, 3000); // 3 seconds
    } else {
      // 8 or 9 or 10 단계: normal
      setShowWarning(false);
      setStep(value);
    }
  };

  useEffect(() => {
    return () => {
      if (warningTimeoutRef.current) {
        clearTimeout(warningTimeoutRef.current);
      }
    };
  }, []);
  return (
    <>
      <section className="w-full md:w-[1440px] mx-auto md:mt-20 mt-10 mb-20">
        <div className="relative overflow-hidden flex justify-center  md:px-0">
          {/* Outer calculation card */}
          <div
            style={{ border: "2px solid black" }}
            className="w-full max-w-[1263px] md:h-[600px] bg-white border border-black md:rounded-[26px] rounded-[10px] px-4 md:px-10 md:py-8 shadow-sm flex flex-col justify-center">
            <div className="flex flex-col mb-10 md:mb-20 mt-10 md:mt-20">
              {/* Title */}
              <h2 className="text-[18px] md:text-[40px] font-bold text-black mb-4 md:mb-5">
                내 수익 계산해 보기
              </h2>

              {/* Amount selector line */}
              <div className="flex md:flex-wrap items-center gap-2 md:gap-3 text-[16px] md:text-[20px]  md:mb-10">
                {/* ✅ custom dropdown */}
                <div>
                  <AmountSelect amount={amount} setAmount={setAmount} />
                </div>
                <div className="text-[10px] md:text-[20px] font-semibold text-[#555555]">
                  으로 한 달 동안 벌 수 있는 수익은?
                </div>
              </div>
            </div>
            {/* Top row over slider */}
            <div className=" hidden md:flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mb-8 md:mb-10">
              <button
                type="button"
                className="px-6 md:px-10 py-2 rounded-full bg-[#2B2B2B] text-white text-[16px] md:text-[18px] font-semibold">
                최대 마틴 단계 설정
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMartingailModal(true);
                }}
                type="button"
                className=" text-[12px] md:text-[18px] font-semibold text-[#3A3A3A] underline underline-offset-4 flex items-center gap-1 cursor-pointer">
                마틴게일이 뭔가요? <span>▶</span>
              </button>
            </div>{" "}
            {/* mobile */}
            <div className=" md:hidden flex flex-row items-center justify-between gap-3 md:gap-0 mb-8 md:mb-10">
              <button
                type="button"
                className="px-4 md:px-10 py-1 rounded-full bg-[#2B2B2B] text-white text-[12px] md:text-[18px] font-semibold">
                최대 마틴 단계 설정
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowMartingailModal(true);
                }}
                type="button"
                className="text-[14px] md:text-[18px] font-semibold text-[#3A3A3A] underline underline-offset-4 flex items-center gap-1 cursor-pointer">
                마틴게일이 뭔가요? <span>▶</span>
              </button>
            </div>
            {/* Slider area */}
            <div className="mt-2 md:mt-4 mb-10 md:mb-20">
              {/* Risk labels */}
              <div className="flex items-center justify-between text-[12px] md:text-[14px] font-semibold mb-2">
                <div className="flex flex-col items-start">
                  <span className="text-[#E1483F] mb-1">매우위험</span>
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "10px solid #E1483F",
                    }}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-[#F29B4C] mb-1">위험</span>
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "10px solid #F29B4C",
                    }}
                  />
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[#F4C93D] mb-1">안전</span>
                  <div
                    className="w-0 h-0"
                    style={{
                      borderLeft: "6px solid transparent",
                      borderRight: "6px solid transparent",
                      borderTop: "10px solid #F4C93D",
                    }}
                  />
                </div>
              </div>
              {/* Slider bar + knob */}
              <div className="relative mt-2 mb-3">
                <div
                  className="w-full h-5 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #FF2C2C 0%, #FF8C5B 50%, #FFE251 100%)",
                  }}
                />

                <div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{
                    left: `${((step - 1) / 9) * 100}%`,
                  }}>
                  <div className="w-7 h-7 md:w-9 md:h-9 bg-black rounded-full border-[3px] border-white shadow-md -translate-x-1/2" />
                </div>

                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={step}
                  onChange={(e) => handleChangeStep(Number(e.target.value))}
                  className="absolute inset-0 w-full h-5 opacity-0 cursor-pointer"
                />
              </div>
              {/* Step labels */}
              <div className="hidden md:flex mt-1  justify-between text-[11px] md:text-[13px] text-[#777777]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <span
                    key={s}
                    className={s === step ? "font-bold text-[#333333]" : ""}>
                    {s}단계
                  </span>
                ))}
              </div>{" "}
              <div className=" md:hidden mt-1 flex justify-between font-bold  text-[13px] md:text-[13px] text-[#777777]">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => (
                  <span
                    key={s}
                    className={s === step ? "font-bold text-[#333333]" : ""}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {showWarning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* dark overlay */}
          <div className="absolute inset-0 bg-black/60" />

          {/* popup box */}
          <div
            className="relative z-10 max-w-[900px] w-[90%] bg-black rounded-[26px]
                   px-8 py-6 flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.6)]">
            <div className="flex flex-col items-center gap-4">
              {/* ! icon circle */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white text-white text-[22px]">
                <img src="/images/warning.svg" alt="" />
              </div>

              {/* text */}
              <p className="text-white text-[18px] md:text-[25px] leading-relaxed text-center whitespace-pre-line">
                “ 마틴 최고 단계를 8단계 이하로 설정 시 원금손실의 위험이
                있습니다. ”
              </p>
            </div>
          </div>
        </div>
      )}

      {showMartingailModal && (
        <>
          <div
            className="hidden md:flex fixed inset-0 z-40 items-center justify-center bg-black/50"
            onClick={() => {
              setShowPersonalModal(false);
              setShowMarketingModal(false);
            }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[90%] max-w-[550px] bg-[white] rounded-[20px] px-7 py-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              {showMartingailModal && (
                <>
                  <div>
                    <div className="flex items-center justify-center">
                      <img
                        className="text-center"
                        src="/images/questionmark.svg"
                        alt=""
                      />
                    </div>
                    <div className="relative flex justify-end bottom-10">
                      <button
                        type="button"
                        className="text-[#676767] cursor-pointer text-[30px] font-bold flex items-center gap-1"
                        onClick={() => {
                          setShowMartingailModal(false);
                        }}>
                        ✕
                      </button>
                    </div>
                    <h2 className="text-center text-black text-[30px] font-bold mb-6">
                      마틴게일이 뭔가요?
                    </h2>
                    <p className="text-center text-[18px] text-black leading-7 mb-4">
                      마틴게일 전략은 연속 손실이 발생했을 때 다음 진입 금액을{" "}
                      <br />
                      순차적으로 늘려 손익을 조정하는 방식의 전략입니다.
                    </p>
                    <p className="text-center text-[18px] text-black leading-7 mb-4">
                      M시그널 또한 특정 조건에서 이 전략이 적용되며, <br /> 이
                      과정에서 필요한 증거금(마진)이 증가할 수 있습니다. <br />{" "}
                      안정적인 운영을 위해 전략 구조를 충분히 이해한 후 <br />{" "}
                      상담을 통해 이용을 권장 드립니다.
                    </p>

                    <p className="text-[12px] text-[#9E9E9E]">
                      *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로,
                      원금 및 수익을 보장하지 않습니다. <br /> 시장 상황에 따라
                      손실이 발생할 수 있으며, 투자 결정의 책임은 이용자
                      본인에게 있습니다. <br /> 전략 성과는 트레이더에 따라
                      다르며, 과거 성과는 미래를 보장하지 않습니다.
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          </div>

          {/* mobile  */}
          <div
            className="md:hidden fixed inset-0 z-40 flex items-center justify-center bg-black/50"
            onClick={() => {
              setShowPersonalModal(false);
              setShowMarketingModal(false);
            }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-[90%] max-w-[550px] bg-[white] rounded-[20px] px-3 py-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}>
              {showMartingailModal && (
                <>
                  <div>
                    <div className="flex items-center justify-center  ">
                      <div className=" flex items-center justify-center">
                        <img
                          className="text-center"
                          src="/images/questionmark.svg"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="flex justify-end relative bottom-8">
                      <button
                        type="button"
                        className=" text-[#676767] cursor-pointer text-[25px] font-bold flex items-center "
                        onClick={() => {
                          setShowMartingailModal(false);
                        }}>
                        <MdOutlineCancel />
                      </button>
                    </div>
                    <h2 className="text-center text-black text-[20px] font-bold mb-2 ">
                      마틴게일이 뭔가요?
                    </h2>
                    <p className="text-center text-[13px] font-semibold text-black leading-7 mb-4">
                      마틴게일 전략은 연속 손실이 발생했을 때 다음 진입 금액을{" "}
                      <br />
                      순차적으로 늘려 손익을 조정하는 방식의 전략입니다.
                    </p>
                    <p className="text-center  text-[13px] font-semibold text-black leading-7 mb-4">
                      M시그널 또한 특정 조건에서 이 전략이 적용되며, <br /> 이
                      과정에서 필요한 증거금(마진)이 증가할 수 있습니다. <br />{" "}
                      안정적인 운영을 위해 전략 구조를 충분히 이해한 후 <br />{" "}
                      상담을 통해 이용을 권장 드립니다.
                    </p>

                    <p className="text-[7px] text-[#9E9E9E]  ">
                      *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로,
                      원금 및 수익을 보장하지 않습니다. <br /> 시장 상황에 따라
                      손실이 발생할 수 있으며, 투자 결정의 책임은 이용자
                      본인에게 있습니다. <br /> 전략 성과는 트레이더에 따라
                      다르며, 과거 성과는 미래를 보장하지 않습니다.
                    </p>
                  </div>
                </>
              )}

              {/* Close button */}
            </motion.div>
          </div>
        </>
      )}

      <div className=" hidden md:flex items-center justify-center">
        <img src="/images/underarrow.svg" alt="" />
      </div>

      <motion.section
        className="w-full bg-white flex flex-col items-center mb-20 md:mt-20 mt-10"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-4 md:px-0">
          {/* 결과 박스 */}
          <div
            style={{
              border: "2px solid #111111",
              padding: "22px 20px",
              backgroundColor: "#FFFFFF",
            }}
            className="w-full md:px-[60px] md:py-[40px] md:rounded-[20px] rounded-[10px] ">
            {/* 제목 */}
            <h2
              style={{
                fontWeight: 800,
                color: "#000000",
                marginBottom: 24,
              }}
              className="text-[18px] md:text-[32px]">
              고객님의 한 달
            </h2>

            {/* 내용 영역 */}
            <div className="flex flex-col gap-4 md:gap-8">
              {/* 수익률 / 수익금 라인 */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-center gap-4 md:gap-8 text-[16px] md:text-[22px] font-semibold text-[#333333]">
                {/* 수익률 */}
                <div className="flex items-center gap-3 md:gap-4 justify-between md:justify-center w-full">
                  <span className="shrink-0">수익률은</span>
                  <div
                    style={{
                      minWidth: 0,
                      background: "#F3F3F3",
                      border: "1px solid #D0D0D0",
                      boxShadow: "inset 0 0 6px rgba(0,0,0,0.15)",
                    }}
                    className="flex-1 max-w-[700px] px-4 md:px-8  md:rounded-[12px] rounded-[2px] flex items-center justify-center">
                    <span
                      style={{ fontWeight: 700, color: "#444444" }}
                      className="text-[18px] md:text-[44px]">
                      {profitRatePercent.toFixed(1)}
                    </span>
                  </div>
                  <span className="shrink-0 ml-1">%</span>
                </div>

                {/* 수익금 */}
                <div className="flex items-center gap-3 md:gap-4 justify-between md:justify-center w-full">
                  <span className="shrink-0">수익금은</span>
                  <div
                    style={{
                      minWidth: 0,
                      background: "#F3F3F3",
                      border: "1px solid #D0D0D0",
                      boxShadow: "inset 0 0 6px rgba(0,0,0,0.15)",
                    }}
                    className="flex-1 max-w-[700px] px-4 md:px-8 md:rounded-[12px] rounded-[2px] flex items-center justify-center">
                    <span
                      style={{ fontWeight: 700, color: "#444444" }}
                      className="text-[18px] md:text-[44px]">
                      {profitAmount.toLocaleString("ko-KR")}
                    </span>
                  </div>
                  <span className="shrink-0 ml-1">원</span>
                </div>
              </div>

              {/* "으로 예상됩니다." */}
              <div className="flex justify-end md:justify-end">
                <span className="text-[16px] md:text-[28px] font-bold text-[#000000]">
                  으로 예상됩니다.
                </span>
              </div>

              {/* ✅ Calculation method (NEW) */}
              {/* <div
                className="mt-4 md:mt-6 md:rounded-[14px] rounded-[10px]"
                style={{
                  background: "#FAFAFA",
                  border: "1px solid #E5E5E5",
                  padding: "14px 14px",
                }}>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[12px] md:text-[14px] font-bold text-[#222]">
                    계산 방식
                  </p>
                  <p className="text-[11px] md:text-[13px] font-semibold text-[#666]">
                    수익률은 고정 / 수익금만 변경
                  </p>
                </div>

                <div className="text-[12px] md:text-[14px] text-[#333] leading-6">
                  <p>선택 금액(만원) × 고정 수익률(%) = 예상 수익금(원)</p>
                  <p className="mt-1 font-semibold">
                    {amount.toLocaleString("ko-KR")} ×{" "}
                    {profitRatePercent.toFixed(1)}% ={" "}
                    {profitAmount.toLocaleString("ko-KR")}원
                  </p>

                  <div className="mt-3 text-[11px] md:text-[13px] text-[#666]">
                    <p>· 8단계: 28.2%</p>
                    <p>· 9단계: 18.8%</p>
                    <p>· 10단계: 9.4%</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end md:justify-end">
                <span className="text-[16px] md:text-[28px] font-bold text-[#000000]">
                  으로 예상됩니다.
                </span>
              </div> */}
            </div>
          </div>

          {/* 하단 안내 문구 */}
          <div
            style={{
              lineHeight: 1.8,
              color: "#A5A5A5",
            }}
            className="text-[10px] md:text-[11px]">
            <p>
              * 실제 25년 10월 한 달간의 수익을 통해 예상 금액이 계산이 됩니다
            </p>
            <p>
              * 전략 성과는 트레이더에 따라 다르며, 과거 성과는 미래를 보장하지
              않습니다.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="w-full bg-white flex flex-col mb-20 mt-[30px] md:mt-80"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-6 px-4 sm:px-6 md:px-0">
          {/* Title */}
          <div
            className="mb-8 md:mb-10 text-center"
            style={{
              fontSize: 26,
              fontWeight: 700,
              lineHeight: 1.6,
              color: "#333333",
            }}>
            <p className="text-[15px] md:text-[26px]">
              “이 수익을 실제로 경험하고 싶으신가요?
            </p>
            <p className="text-[15px] md:text-[26px]">
              담당자가 무료로 계좌 개설과 연동을 도와드립니다.”
            </p>
          </div>

          {/* Outer black box */}
          <div
            style={{
              width: "100%",
              backgroundColor: "#222222",
              borderRadius: 26,
            }}
            className="px-4 py-2 sm:px-6 md:px-[56px] md:pt-[36px] md:pb-[40px] overflow-hidden">
            <h3
              style={{
                fontWeight: 800,
                color: "#FFFFFF",
                marginBottom: 8,
                textAlign: "center",
              }}
              className="text-[20px] md:text-[28px]">
              상담 신청 하기
            </h3>

            {/* Inner white box */}
            <div
              style={{ backgroundColor: "#FFFFFF", borderRadius: 22 }}
              className="px-4 py-6 sm:px-6 md:px-[60px] md:pt-[36px] md:pb-[40px]">
              {/* Name / Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 mb-6 md:mb-8">
                {/* Name */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0 text-[16px]  md:text-[18px] text-black font-bold w-[72px]">
                    이름
                  </div>
                  <input
                    type="text"
                    value={consultName}
                    onChange={(e) => setConsultName(e.target.value)}
                    className="w-full md:max-w-[300px] h-[36px] md:h-[44px] md:rounded-[10px] rounded-[6px]"
                    style={{
                      color: "black",
                      background: "#F5F5F7",
                      padding: "0 14px",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 4px 4px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.12)",
                    }}
                    placeholder=""
                  />
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3">
                  <div className="shrink-0 text-[16px] md:text-[18px] text-black font-bold w-[72px]">
                    전화번호
                  </div>
                  <input
                    type="text"
                    value={consultPhone}
                    onChange={(e) => setConsultPhone(e.target.value)}
                    className="w-full md:max-w-[300px] h-[36px] md:h-[44px] md:rounded-[10px] rounded-[6px]"
                    style={{
                      color: "black",
                      background: "#F5F5F7",
                      padding: "0 14px",
                      boxShadow:
                        "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 4px 4px rgba(0,0,0,0.25), 0 4px 10px rgba(0,0,0,0.12)",
                    }}
                    placeholder=""
                  />
                </div>
              </div>

              {/* Inquiry + checkboxes */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-10 mb-6">
                <div className="shrink-0 w-full md:w-[110px]">
                  <span className="text-[16px] md:text-[18px] font-bold text-black">
                    문의사항
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 md:gap-10">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inquiries.AUTO_TRADING}
                      onChange={() => toggleInquiry("AUTO_TRADING")}
                    />
                    <span className="text-[11px] md:text-[16px] font-semibold text-[#333]">
                      자동매매 참여
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inquiries.PROFIT_COUNSEL}
                      onChange={() => toggleInquiry("PROFIT_COUNSEL")}
                    />
                    <span className="text-[11px] md:text-[16px] font-semibold text-[#333]">
                      수익 계산 상담
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={inquiries.SELF_REFERRAL}
                      onChange={() => toggleInquiry("SELF_REFERRAL")}
                    />
                    <span className="text-[11px] md:text-[16px] font-semibold text-[#333]">
                      셀퍼럴 파트너
                    </span>
                  </label>
                </div>
              </div>

              {/* Agree */}
              <div className="space-y-3 flex flex-col items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allAgree}
                    onChange={handleAllAgree}
                    className="h-4 w-4 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                  />
                  <span className="text-black text-[16px] md:text-[18px] font-bold">
                    전체동의
                  </span>
                </label>

                <div className="flex flex-row sm:flex-row sm:items-center gap-3 sm:gap-6 text-center">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreePersonal}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setAgreePersonal(v);
                        if (!v) setAllAgree(false);
                        if (v && agreeMarketing) setAllAgree(true);
                      }}
                      className="h-3 w-3 md:h-4 md:w-4 border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                    />
                    <span
                      className="text-[#515151] text-[8px] md:text-[14px] font-semibold cursor-pointer underline"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowPersonalModal(true);
                      }}>
                      개인정보 수집 · 이용 동의
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={agreeMarketing}
                      onChange={(e) => {
                        const v = e.target.checked;
                        setAgreeMarketing(v);
                        if (!v) setAllAgree(false);
                        if (v && agreePersonal) setAllAgree(true);
                      }}
                      className="h-3 w-3 md:h-4 md:w-4  border-gray-300 text-[#FF9472] focus:ring-[#FF9472]"
                    />
                    <span
                      className="text-[#515151] text-[8px] md:text-[14px] font-semibold cursor-pointer underline"
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

              {/* Button */}
              <button
                type="button"
                onClick={submitConsult}
                disabled={submitting}
                className="w-full md:h-[72px] h-[48px] mt-10 rounded-full bg-black text-white text-[18px] md:text-[22px] font-bold cursor-pointer
                     hover:shadow-xl hover:-translate-y-[2px]
                     active:scale-95 active:translate-y-0 active:shadow-md
                     transition-transform transition-shadow duration-150 ease-out disabled:opacity-60 disabled:cursor-not-allowed">
                {submitting ? "신청중..." : "상담 신청하기"}
              </button>
            </div>
          </div>

          {/* Bottom note */}
          <div
            style={{ color: "#A5A5A5", marginTop: "-10px" }}
            className="text-[10px] md:text-[14px] px-1">
            <p>
              *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로, 원금 및
              수익을 보장하지 않습니다. 시장 상황에 따라 손실이 발생할 수
              있으며, 투자 결정의 책임은 이용자 본인에게 있습니다. <br />
              전략 성과는 트레이더에 따라 다르며, 과거 성과는 미래를 보장하지
              않습니다.
            </p>
          </div>
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
    </>
  );
};

export default Start;
