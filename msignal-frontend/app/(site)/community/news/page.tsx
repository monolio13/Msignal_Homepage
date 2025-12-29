/** @format */
"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
const News = () => {
  const notices = [
    {
      id: 1,
      type: "공지",
      title: "11월 19일! 중요 소식 입니다.",
      date: "2025.11.19",
    },
    { id: 2, type: "소식", title: "이벤트 시작합니다!", date: "2025.11.18" },
    { id: 3, type: "소식", title: "200만원 드립니다", date: "2025.11.18" },
    { id: 4, type: "소식", title: "500원 드립니다", date: "2025.11.18" },
    { id: 5, type: "소식", title: "10원 주웠어요", date: "2025.11.18" },
    // 다음 페이지용 더미 데이터
    {
      id: 6,
      type: "소식",
      title: "두 번째 페이지 1번 소식",
      date: "2025.11.17",
    },
    {
      id: 7,
      type: "소식",
      title: "두 번째 페이지 2번 소식",
      date: "2025.11.17",
    },
    {
      id: 8,
      type: "소식",
      title: "두 번째 페이지 3번 소식",
      date: "2025.11.16",
    },
    {
      id: 9,
      type: "소식",
      title: "두 번째 페이지 4번 소식",
      date: "2025.11.16",
    },
    {
      id: 10,
      type: "소식",
      title: "두 번째 페이지 5번 소식",
      date: "2025.11.15",
    },
    {
      id: 11,
      type: "소식",
      title: "두 번째 페이지 1번 소식",
      date: "2025.11.17",
    },
    {
      id: 12,
      type: "소식",
      title: "두 번째 페이지 2번 소식",
      date: "2025.11.17",
    },
    {
      id: 13,
      type: "소식",
      title: "두 번째 페이지 3번 소식",
      date: "2025.11.16",
    },
    {
      id: 14,
      type: "소식",
      title: "두 번째 페이지 4번 소식",
      date: "2025.11.16",
    },
    {
      id: 15,
      type: "소식",
      title: "두 번째 페이지 5번 소식",
      date: "2025.11.15",
    },
  ];

  const ECON_EVENTS = [
    {
      id: 1,
      image: "/images/eventeco1.svg",
      tags: ["세무상식", "상속세"],
      title: "물려받은 땅 팔려면, ‘상속세 신고가격’ 챙기세요!",
    },
    {
      id: 2,
      image: "/images/eventeco2.svg",
      tags: ["상속 · 증여", "리빙트러스트"],
      title: "전세보증금 상속은 어떻게 하면 될까요?",
    },
    {
      id: 3,
      image: "/images/eventeco3.svg",
      tags: ["세무상식", "증여세"],
      title: "손주 유학비 대주면 과세 대상이 될까요?",
    },
    // 더 많은 카드가 생기면 여기 계속 추가
    {
      id: 4,
      image: "/images/eventeco1.svg",

      tags: ["부동산", "절세"],
      title: "부동산 매도 전 알아두면 좋은 절세 팁",
    },
    {
      id: 5,
      image: "/images/eventeco2.svg",

      tags: ["노후준비"],
      title: "연금저축, 어떻게 시작해야 할까요?",
    },
    {
      id: 6,
      image: "/images/eventeco3.svg",

      tags: ["세무상식"],
      title: "프리랜서 종합소득세 신고 기본 가이드",
    },
  ];
  const [startIndex1, setStartIndex] = useState(0);
  const VISIBLE = 3;

  const canPrev = startIndex1 > 0;
  const canNext = startIndex1 + VISIBLE < ECON_EVENTS.length;

  const visibleItems = ECON_EVENTS.slice(startIndex1, startIndex1 + VISIBLE);

  const handlePrev = () => {
    if (!canPrev) return;
    setStartIndex((prev) => Math.max(0, prev - VISIBLE));
  };

  const handleNext = () => {
    if (!canNext) return;
    setStartIndex((prev) =>
      Math.min(ECON_EVENTS.length - VISIBLE, prev + VISIBLE)
    );
  };

  // At top of the component
  const youtubeVideos = [
    {
      id: 1,
      url: "https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1",
      title: "[M시그널] 일하지 않고 또 버는 자동매매 프로그램", // optional, can come from backend
    },
    {
      id: 2,
      url: "https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1",
      title: "[M시그널] 자동매매프로그램(EA) 개발, 쉬울까?",
    },
    {
      id: 3,
      url: "https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1",
      title: "[M시그널] 투자운용금 크레딧 5천만원 지원 이벤트!",
    },
    {
      id: 4,
      url: "https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1",
      title: "[M시그널] 브로커사(거래소) 선택하는 가장 정석의 방법",
    },
    {
      id: 5,
      url: "https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1",
      title: "[M시그널] 트레이딩, 자동으로 해주는 프로그램 만들 수 있을까?",
    },
    {
      id: 6,
      url: "https://www.youtube-nocookie.com/embed/ZDjdtICC0Hc?controls=1&rel=0&modestbranding=1",
      title: "[M시그널] 지난달 100만원 부수입 벌었습니다. 진짜입니다.",
    },
  ];

  const [currentPage, setCurrentsPage] = useState(1);
  const perPage = 5;
  const totalPages = Math.ceil(notices.length / perPage);

  const startIndex = (currentPage - 1) * perPage;
  const currentNotices = notices.slice(startIndex, startIndex + perPage);
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
      <section className="  -mx-4 md:mx-0 ">
        <div className="hidden md:block relative h-[400px] md:h-[513px] w-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src="/images/news1.svg"
              alt="M Signal hero background"
              fill
              className="object-cover bg-white"
              priority
            />
          </AnimatePresence>
        </div>{" "}
        <div className=" md:hidden  relative h-[200px] md:h-[513px] w-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src="/images/communitymobile.svg"
              alt="M Signal hero background"
              fill
              className="object-cover bg-white"
              priority
            />
          </AnimatePresence>
        </div>
      </section>

      <motion.section
        className="w-full bg-white flex flex-col items-center mt-30 md:mt-70"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-2 px-4 md:px-0">
          {/* Title */}
          <h2 className="text-[22px] md:text-[32px] font-bold text-black">
            Notice
          </h2>
          {/* Notice list */}
          {/* desktop */}
          <div className=" hidden md:block space-y-4">
            {currentNotices.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-0 text-[14px] md:text-[18px] text-black">
                <div className="flex items-center gap-3 md:gap-5">
                  <span className="font-bold text-[12px] md:text-[16px]">
                    [{item.type}]
                  </span>
                  <span className="leading-snug">{item.title}</span>
                </div>
                <span className="text-[12px] md:text-[16px] text-black md:text-right">
                  {item.date}
                </span>
              </div>
            ))}
          </div>{" "}
          {/* mobile  */}
          <div className=" md:hidden space-y-4">
            {currentNotices.map((item) => (
              <div
                key={item.id}
                className="flex flex-row  justify-between gap-1 md:gap-0 text-[14px] md:text-[18px] text-black">
                <div className="flex items-center gap-3 md:gap-5">
                  <span className="font-bold text-[12px] md:text-[16px]">
                    [{item.type}]
                  </span>
                  <span className=" font-semibold leading-snug">
                    {item.title}
                  </span>
                </div>
                <span className="text-[12px] md:text-[16px] text-[#6F6F6F] md:text-right">
                  {item.date}
                </span>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-3 text-[12px] md:text-[14px] text-gray-500">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentsPage(page)}
                    className={`px-1 ${
                      page === currentPage
                        ? "text-black font-semibold"
                        : "text-gray-400"
                    }`}>
                    {page}
                  </button>
                )
              )}

              {/* Right arrow */}
              <button
                type="button"
                onClick={() =>
                  setCurrentsPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`ml-1 ${
                  currentPage === totalPages
                    ? "text-gray-300 cursor-default"
                    : "text-gray-500 cursor-pointer"
                }`}>
                &gt;
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="w-full md:mt-80"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-4 px-4 sm:px-6 md:px-0 mt-16 md:mt-60">
          <h2 className="text-[24px] md:text-[32px] font-bold text-black">
            M시그널 유튜브 영상
          </h2>

          {/* ✅ Desktop / Tablet: always stable grid */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-3">
            {youtubeVideos.map((video) => (
              <div key={video.id} className="flex flex-col">
                <div className="w-full aspect-video relative overflow-hidden rounded-2xl shadow-md">
                  <iframe
                    src={video.url}
                    title={video.title}
                    className="absolute inset-0 w-full h-full"
                    frameBorder="0"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>

                <div className="mt-2 bg-[#F2F2F3] rounded-[10px] px-3 py-3">
                  <p className="text-[12px] leading-5 text-black font-medium">
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Mobile: 2 rows + horizontal slide (responsive width via clamp) */}
          <div className="md:hidden overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory">
            <div className="grid grid-rows-2 grid-flow-col auto-cols-[clamp(220px,65vw,320px)] gap-3">
              {youtubeVideos.map((video) => (
                <div key={video.id} className="flex flex-col snap-start">
                  <div className="w-full aspect-video relative overflow-hidden rounded-[10px] shadow-md">
                    <iframe
                      src={video.url}
                      title={video.title}
                      className="absolute inset-0 w-full h-full"
                      frameBorder="0"
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>

                  <div className="mt-2 bg-[#F2F2F3] rounded-[8px] px-2 py-2">
                    <p className="text-[11px] leading-4 text-black font-medium line-clamp-2">
                      {video.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="w-full bg-white flex flex-col items-center md:mb-20 md:mt-80 mt-20 mb-20"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 px-4 md:px-0">
          {/* Title */}
          <h2 className="text-[24px] md:text-[32px] font-bold text-black">
            경제상식
          </h2>

          {/* Carousel wrapper */}
          <div className="relative">
            {/* 🔹 Left arrow: desktop only */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={!canPrev}
              className={`hidden md:flex items-center justify-center absolute -left-15 top-32 -translate-y-1/2 w-8 h-8 ${
                canPrev
                  ? "text-gray-500 hover:bg-gray-100 cursor-pointer"
                  : "text-gray-300 cursor-default"
              }`}>
              <img src="/images/eventleftarrow.svg" alt="" />
            </button>

            {/* 🔹 Desktop / Tablet: 3-column grid (기존 그대로) */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              {visibleItems.map((item) => (
                <div key={item.id} className="flex flex-col">
                  {/* Image */}
                  <div className="rounded-[24px] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[260px] object-cover"
                    />
                  </div>

                  {/* Tags */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-[#FFFFDB] text-[13px] text-[#87888F] font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <p className="mt-3 text-[16px] font-semibold text-black leading-7">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>

            {/* 🔹 Mobile: same cards, smaller, horizontal scroll */}
            <div className="md:hidden overflow-x-auto pb-2">
              <div className="flex gap-4">
                {visibleItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex-shrink-0 min-w-[260px] max-w-[260px] flex flex-col">
                    {/* Image */}
                    <div className="rounded-[24px] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-[180px] object-cover"
                      />
                    </div>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-[#FFFFDB] text-[12px] text-[#87888F] font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <p className="mt-2 text-[12px] font-semibold text-black leading-6">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔹 Right arrow: desktop only */}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canNext}
              className={`hidden md:flex items-center justify-center absolute -right-15 top-32 -translate-y-1/2 w-8 h-8 ${
                canNext
                  ? "text-gray-500 hover:bg-gray-100 cursor-pointer"
                  : "text-gray-300 cursor-default"
              }`}>
              <img src="/images/eventarrow.svg" alt="" />
            </button>
          </div>
        </div>
      </motion.section>
    </>
  );
};

export default News;
