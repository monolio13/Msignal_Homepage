/** @format */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const POPUP_STORAGE_KEY = "msignal_home_popup_hide_date";
const POPUP_EVENT = "msignal:homepopup"; // ✅ global event

const slides = [
  {
    id: 1,
    image: "/images/popup1.svg",
    alt: "수수료 최저가 도전",
    button: "빠른 계산하기",
    bg: "linear-gradient(180deg, #2CFFB1 0%, #008654 50%, #008654 100%)",
    link: "/selferral",
  },
  {
    id: 2,
    image: "/images/popup2.svg",
    alt: "크레딧 5,000만원 지급",
    button: "지금 신청하기",
    bg: "linear-gradient(180deg, #FFC4B7 0%, #945557 50%, #945557 100%)",
    link: "/event/support",
  },
  {
    id: 3,
    image: "/images/popup3.svg",
    alt: "EA 수수료 부담",
    button: "1분만에 신청하기",
    bg: "linear-gradient(180deg, #FFC184 0%, #FF930F 50%, #FF930F 100%)",
    link: "/event/fee-discount",
  },
  {
    id: 4,
    image: "/images/popup4.svg",
    alt: "친구 초대 이벤트",
    button: "자세히 알아보기",
    bg: "linear-gradient(180deg, #B1FFD0 0%, #00963C 50%, #00963C 100%)",
    link: "/event/join",
  },
];

function getTodayString() {
  const d = new Date();
  return d.toISOString().slice(0, 10); // yyyy-mm-dd
}

export default function HomePopupCarousel() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dontShowToday, setDontShowToday] = useState(false);

  // ✅ helper: tell the whole app "popup open/closed"
  const broadcastPopupState = (open: boolean) => {
    try {
      document.documentElement.dataset.homePopupOpen = open ? "1" : "0";
      window.dispatchEvent(new CustomEvent(POPUP_EVENT, { detail: { open } }));
    } catch {
      // ignore
    }
  };

  // ✅ On mount: decide whether to open (FIXED)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(POPUP_STORAGE_KEY);
      const today = getTodayString();

      if (stored === today) {
        // ✅ already hidden today -> do NOT open
        setDontShowToday(true); // true
        setIsOpen(false); ///false
        broadcastPopupState(false); // false
      } else {
        setDontShowToday(false);
        setIsOpen(true);
        broadcastPopupState(true);
      }
    } catch {
      setIsOpen(true);
      broadcastPopupState(true);
    }

    // cleanup flag if component unmounts
    return () => {
      broadcastPopupState(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ Auto slide
  useEffect(() => {
    if (!isOpen) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [isOpen]);

  const handleToggleToday = () => {
    const today = getTodayString();

    if (dontShowToday) {
      // toggle off (rare)
      try {
        localStorage.removeItem(POPUP_STORAGE_KEY);
      } catch {}
      setDontShowToday(false);
    } else {
      // toggle on
      try {
        localStorage.setItem(POPUP_STORAGE_KEY, today);
      } catch {}
      setDontShowToday(true);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    broadcastPopupState(false); // ✅ IMPORTANT (B option)
  };

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setCurrentIndex((prev) => (prev + 1) % slides.length);

  if (!isOpen) return null;

  const slide = slides[currentIndex];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.55)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 999, // ✅ keep it on top of everything
      }}>
      <div
        style={{
          width: 420,
          height: 520,
          maxWidth: "90vw",
          borderRadius: 10,
          overflow: "hidden",
          backgroundColor: "#f5f5f5",
          boxShadow: "0 18px 40px rgba(0,0,0,0.45)",
          display: "flex",
          flexDirection: "column",
        }}>
        <div style={{ position: "relative" }}>
          <img
            src={slide.image}
            alt={slide.alt}
            style={{
              width: "100%",
              height: 480,
              objectFit: "cover",
              display: "block",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 10,
              left: 12,
              padding: "4px 10px",
              borderRadius: 999,
              backgroundColor: "rgba(0,0,0,0.45)",
              color: "#fff",
              fontSize: 12,
            }}>
            {currentIndex + 1}/{slides.length}
          </div>

          <button
            onClick={handleClose}
            style={{
              position: "absolute",
              top: 10,
              right: 12,
              width: 26,
              height: 26,
              color: "#fff",
              fontSize: 30,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
              border: "none",
            }}>
            ×
          </button>

          <button
            onClick={goPrev}
            style={{
              position: "absolute",
              top: "50%",
              left: 8,
              transform: "translateY(-50%)",
              color: "#A3A3A3",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              background: "transparent",
              border: "none",
            }}>
            ‹
          </button>

          <button
            onClick={goNext}
            style={{
              position: "absolute",
              top: "50%",
              right: 8,
              transform: "translateY(-50%)",
              color: "#A3A3A3",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 40,
              background: "transparent",
              border: "none",
            }}>
            ›
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#EFEFEF",
            padding: "10px 16px",
            fontSize: 13,
            color: "#555",
          }}>
          <button
            onClick={handleToggleToday}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              color: "#555",
            }}>
            <span
              style={{
                width: 16,
                height: 16,
                borderRadius: 4,
                border: "1px solid #C7C7C7",
                backgroundColor: dontShowToday ? "#4CAF50" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                color: "#fff",
              }}>
              {dontShowToday ? "✓" : ""}
            </span>
            <span>오늘 하루 그만 보기</span>
          </button>

          <button
            onClick={handleClose}
            style={{
              border: "none",
              background: "transparent",
              padding: 0,
              cursor: "pointer",
              color: "#555",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}>
            <span>닫기</span>
            <span>✕</span>
          </button>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Link href={slide.link}>
            <button
              type="button"
              className="relative mt-4 bottom-35 w-[250px] h-12 sm:h-14 rounded-[50px] text-white text-xl font-semibold tracking-wide flex items-center justify-center shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer"
              style={{ background: slide.bg }}>
              {slide.button}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
