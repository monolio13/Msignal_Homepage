/** @format */
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiPieChart, FiUser, FiEdit3 } from "react-icons/fi";

export default function FloatingSideBar() {
  const router = useRouter();
  const handleCalcClick = () => {
    router.push("/start");
  };

  const handleConsultClick = () => {
    const el = document.getElementById("consult-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelferralClick = () => {
    const el = document.getElementById("selferral-section");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const wrapperStyle = {
    position: "fixed" as const,
    right: "32px",
    top: "70%",
    transform: "translateY(-50%)",
    zIndex: 50,
  };

  // ✅ gradient border (outer capsule) + 90% opacity
  const gradientOuterStyle = {
    padding: "2px",
    borderRadius: "999px",
    background: "linear-gradient(180deg, #CDCDCD 0%, #454545 100%)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.7)",
    opacity: 0.9, // 🔥 90% opacity
  };

  // ✅ inner black box (actual UI)
  const innerBoxStyle = {
    width: "112px",
    padding: "18px 0",
    borderRadius: "999px",
    backgroundColor: "#000000",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "stretch",
    justifyContent: "center",
  };

  const itemStyle = {
    padding: "10px 20px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  };

  const textStyle = {
    fontSize: "14px",
    color: "#FFFFFF",
    textAlign: "center" as const,
    lineHeight: 1.4,
    whiteSpace: "pre-line" as const,
  };

  const dividerStyle = {
    width: "100%",
    height: "1px",
    backgroundColor: "#5A5A5A",
    opacity: 0.7,
  };

  return (
    <div style={wrapperStyle} className="hidden md:block">
      <div style={gradientOuterStyle}>
        <div style={innerBoxStyle}>
          {/* 1. 한달 수익 계산하기 */}
          <Link
            href={"/start"}
            className="active:scale-95 active:translate-y-0 active:shadow-md
                       transition-transform transition-shadow duration-150 ease-out
                       cursor-pointer"
            style={itemStyle}
            aria-label="한달 수익 계산하기">
            <img src="/images/calculator.svg" alt="" />
            <span style={textStyle}>한달 수익{"\n"}계산하기</span>
          </Link>

          <div style={dividerStyle} />

          {/* 2. 상담 신청 */}
          <Link
            href={"https://open.kakao.com/o/sG8NyOVh"}
            className="active:scale-95 active:translate-y-0 active:shadow-md
                       transition-transform transition-shadow duration-150 ease-out
                       cursor-pointer"
            style={itemStyle}
            aria-label="상담 신청">
            <img src="/images/person.svg" alt="" />
            <span style={textStyle}>상담 신청</span>
          </Link>

          <div style={dividerStyle} />

          {/* 3. 국내 최저 거래 수수료 셀퍼럴 신청 */}
          <Link
            href={"/selferral"}
            className="active:scale-95 active:translate-y-0 active:shadow-md
                       transition-transform transition-shadow duration-150 ease-out
                       cursor-pointer"
            style={itemStyle}
            aria-label="국내 최저 거래 수수료 셀퍼럴 신청">
            <img src="/images/note1.svg" alt="" />
            <span style={textStyle}>
              국내 최저{"\n"}거래 수수료{"\n"}셀퍼럴 신청
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
