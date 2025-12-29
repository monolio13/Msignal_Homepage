/** @format */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function MobileFloatingSideBar() {
  const [open, setOpen] = useState(false);

  const OPEN_ICON = "/images/chatopen.svg";
  const CLOSE_ICON = "/images/chatclose.svg";
  const POPUP_EVENT = "msignal:homepopup";

  const [suppress, setSuppress] = useState(false);
  const [showPersonalModal, setShowPersonalModal] = useState(false);
  const [showMarketingModal, setShowMarketingModal] = useState(false);

  useEffect(() => {
    const init = document.documentElement.dataset.homePopupOpen === "1";
    setSuppress(init);

    const handler = (e: any) => setSuppress(!!e?.detail?.open);
    window.addEventListener(POPUP_EVENT, handler as any);

    return () => window.removeEventListener(POPUP_EVENT, handler as any);
  }, []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [age, setAge] = useState<string | null>(null);
  const [amount, setAmount] = useState<string | null>(null);

  const [agreePersonal, setAgreePersonal] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const allAgree = useMemo(
    () => agreePersonal && agreeMarketing,
    [agreePersonal, agreeMarketing]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const wrapperStyle = {
    position: "fixed" as const,
    right: "-15px",
    bottom: "calc(150px + env(safe-area-inset-bottom, 0px))",
    zIndex: 60,
  };

  const floatingBtnStyle = {
    width: "100px",
    height: "100px",
    borderRadius: "999px",
    background: "transparent",
    border: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const toggleAllAgree = () => {
    const next = !allAgree;
    setAgreePersonal(next);
    setAgreeMarketing(next);
  };

  const getSelectBtnClass = (selected: boolean, base: string) => {
    return `${base} ${
      selected ? "bg-[#D6332A] text-white" : "bg-[#EFEFEF] text-[#8A8A8A]"
    }`;
  };
  if (suppress) return null;
  return (
    <>
      <div style={wrapperStyle} className="md:hidden">
        <button
          type="button"
          aria-label={open ? "닫기" : "채팅/신청 열기"}
          onClick={() => setOpen((v) => !v)}
          className="active:scale-95 transition-transform duration-150"
          style={floatingBtnStyle}>
          <img src={open ? CLOSE_ICON : OPEN_ICON} alt="" />
        </button>
      </div>

      {open && (
        <div className="md:hidden fixed inset-0 z-[50]">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div
            className="
              absolute left-1/2 top-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[min(420px,86vw)]
            "
            style={{
              maxHeight:
                "calc(100dvh - 24px - env(safe-area-inset-top, 0px) - env(safe-area-inset-bottom, 0px))",
            }}>
            <div
              className="rounded-[22px] bg-[#D9D9D9] p-2 shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "100%",
              }}>
              <div
                style={{
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch",
                }}>
                <Link
                  href={"https://open.kakao.com/o/sG8NyOVh"}
                  className="bg-white rounded-[18px] px-2 py-2 flex items-center justify-between active:scale-95 transition">
                  <div className="flex items-center gap-3">
                    <img
                      src="/images/kakaoicon.svg"
                      alt=""
                      style={{ width: 44, height: 44 }}
                    />
                    <div className="flex flex-col">
                      <div className="text-[16px] font-extrabold text-black">
                        채팅으로 바로 물어보기
                      </div>
                      <div className="text-[12px] font-semibold text-[#6B6B6B]">
                        운영시간 평일 9:00~19:00
                      </div>
                    </div>
                  </div>

                  <img
                    src="/images/iconright.svg"
                    alt=""
                    style={{ width: 20, height: 20 }}
                  />
                </Link>

                <div className="mt-3 bg-white rounded-[18px] px-2 py-2">
                  <div className="text-center text-[16px] font-extrabold text-black mb-2">
                    자동매매 무료 체험 신청서
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-[70px] text-[12px] font-bold text-black">
                      이름
                    </div>
                    <input
                      className="flex-1 h-[32px] text-black rounded-[6px] bg-[#EFEFEF] px-3 text-[12px] outline-none"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type="text"
                    />
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-[70px] text-[12px] font-bold text-black">
                      전화번호
                    </div>
                    <input
                      className="flex-1 h-[32px] text-black rounded-[6px] bg-[#EFEFEF] px-3 text-[12px] outline-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      type="text"
                    />
                  </div>

                  <div className="h-[1px] bg-[#E7E7E7] my-2" />

                  <div className="text-[12px] font-bold text-black mb-2">
                    연령대
                  </div>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {["20", "30", "40", "50", "60이상"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAge(v)}
                        className={getSelectBtnClass(
                          age === v,
                          "h-[30px] rounded-[6px] text-[12px] font-extrabold active:scale-95 transition"
                        )}>
                        {v}
                      </button>
                    ))}
                  </div>

                  <div className="text-[12px] font-bold text-black mb-2">
                    투자 희망금액
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {["100만원 이하", "100~200만원", "300~500만원"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAmount(v)}
                        className={getSelectBtnClass(
                          amount === v,
                          "h-[30px] rounded-[6px] text-[12px] font-extrabold active:scale-95 transition"
                        )}>
                        {v}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    {["600~1,000만원", "1,000만원 이상"].map((v) => (
                      <button
                        key={v}
                        type="button"
                        onClick={() => setAmount(v)}
                        className={getSelectBtnClass(
                          amount === v,
                          "h-[30px] rounded-[6px] text-[12px] font-extrabold active:scale-95 transition"
                        )}>
                        {v}
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-center gap-2 mb-1">
                    <input
                      type="checkbox"
                      checked={allAgree}
                      onChange={toggleAllAgree}
                    />
                    <span className="text-[12px] font-bold text-[#4B4B4B]">
                      전체동의
                    </span>
                  </div>

                  <div className="flex justify-center gap-3 text-[9px] text-[#666] mb-4">
                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreePersonal}
                        onChange={(e) => setAgreePersonal(e.target.checked)}
                      />
                      <span
                        className="underline"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowPersonalModal(true);
                        }}>
                        개인정보 수집 · 이용 동의
                      </span>
                    </label>

                    <label className="flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeMarketing}
                        onChange={(e) => setAgreeMarketing(e.target.checked)}
                      />
                      <span
                        className=" underline"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowMarketingModal(true);
                        }}>
                        마케팅 활용 및 수신 동의(선택)
                      </span>
                    </label>
                  </div>

                  <button
                    type="button"
                    className="w-full h-[40px] rounded-[10px] bg-[#C51E1E] text-white text-[18px] font-extrabold active:scale-95 transition"
                    onClick={() => {
                      console.log({
                        name,
                        phone,
                        age,
                        amount,
                        agreePersonal,
                        agreeMarketing,
                      });
                    }}>
                    무료 체험 신청
                  </button>
                </div>

                <Link
                  href={"/selferral"}
                  onClick={() => setOpen(false)}
                  className="py-2 flex items-center justify-between active:scale-95 transition ">
                  <img
                    src="/images/chatimg.svg"
                    alt=""
                    className="w-full h-auto"
                  />
                </Link>

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
                            이름, 연락처(전화번호/카카오톡/이메일), 문의 내용
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
                            (단, 관련 법령에 따라 보관해야 하는 경우 해당 기간
                            준수)
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
                            본인은 M시그널이 제공하는 아래 사항에 대해 광고성
                            정보 수신에 동의합니다.
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
                            동의를 거부할 수 있으며, 거부 시 마케팅 관련 정보는
                            제공되지 않습니다.
                            <br />
                            (서비스 이용에는 제한이 없습니다.)
                          </p>
                        </>
                      )}

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
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
