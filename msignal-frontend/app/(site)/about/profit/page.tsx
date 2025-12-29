/** @format */
"use client";
import FullWidth from "@/app/(site)/components/layout/FullWidth";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const Profit = () => {
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

  const cardsContainer: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        when: "beforeChildren",
        staggerChildren: 0.12,
      },
    },
  };

  const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -180 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 180 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };
  return (
    <>
      <section className="w-full">
        {/* 📱 Mobile hero (full screen width) */}
        <div className=" md:hidden relative w-screen h-[170px]       /* mobile default height */ sm:h-[260px] overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src="/images/profitmobile.svg"
              alt="M Signal hero background"
              fill
              priority
              style={{ objectFit: "cover", background: "white" }}
              sizes="100vw"
            />
          </AnimatePresence>
        </div>

        {/* 💻 Desktop hero (기존 디자인 유지) */}
        <div className=" hidden md:block relative mx-auto w-full h-[600px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src="/images/profitMain.svg"
              alt="M Signal hero background"
              fill
              priority
              style={{ objectFit: "cover", background: "white" }}
              sizes="(max-width: 768px) 100vw, 1440px"
            />
          </AnimatePresence>
        </div>
      </section>
      <motion.section
        className="w-full bg-white flex items-center  "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className=" hidden  md:block w-[1100px] h-[403px] mx-auto flex items-center justify-between mb-70 mt-60 ">
          <img src="/images/1.svg" alt="" />
        </div>{" "}
        <div className=" md:hidden w-[1100px] h-[103px] mx-4 flex items-center justify-between mt-30  ">
          <img src="/images/profitmobile2.svg" alt="" />
        </div>
      </motion.section>{" "}
      {/* ///// */}
      <motion.section
        className="w-full bg-white"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* 💻 Desktop version (기존 1440px 정중앙) */}
        <div className="hidden md:flex w-full  h-[403px] mx-auto items-center justify-center mb-100 mt-40">
          <img src="/images/profitThird.svg" alt="" className="w-full h-auto" />
        </div>

        {/* 📱 Mobile version (양옆 여백 없이 풀 스크린 가로) */}
        <div className=" md:hidden relative w-screen h-[100px]  overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-60 mb-16">
          <img
            src="/images/profitmobile3.svg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>
      {/* ////// */}
      <motion.section
        className="w-full bg-white "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* 💻 Desktop 버전 (기존 1440 레이아웃 유지) */}
        <div className="hidden md:flex w-full h-[403px] mx-auto items-center justify-center mb-70 mt-40">
          <img
            src="/images/profitFourth.svg"
            alt=""
            className="w-full h-auto"
          />
        </div>

        {/* 📱 Mobile 버전 (양옆 여백 없이 풀 스크린 가로) */}
        <div className=" md:hidden relative w-screen h-[280px] sm:h-[260px] overflow-hidden left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-50 flex items-center justify-center">
          <img
            src="/images/profitmobile4.svg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </motion.section>
      {/* ///////// */}
      <motion.section
        className="hidden md:flex w-full bg-white flex flex-col mt-80 md:mt-130 mb-30 md:mb-50"
        variants={cardsContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}>
        <h1
          style={{ marginBottom: "-40px" }} // 좀 덜 과하게 겹치게, 원하면 -60px 유지해도 됨
          className=" relative bottom-10 right-153 hidden md:block text-black font-bold text-[18px] md:text-[22px] text-center  mx-auto md:mx-0 md:ml-90">
          꾸준히 거래하니까 꾸준한 수익이 납니다
        </h1>{" "}
        <h1
          style={{ marginBottom: "-40px" }} // 좀 덜 과하게 겹치게, 원하면 -60px 유지해도 됨
          className=" relative md:hidden text-black font-bold text-[12px] md:text-[22px] bottom-12 right-13   mx-auto ">
          꾸준히 거래하니까 꾸준한 수익이 납니다
        </h1>
        <div className=" w-full max-w-[1440px] mx-auto flex items-center justify-center gap-2 md:gap-3 px-4 ">
          <motion.div
            className="flex w-1/2 max-w-[600px] h-auto"
            variants={slideFromLeft}>
            <img
              src="/images/qora.svg"
              alt="일반 트레이더 일 평균 거래"
              className="w-full h-auto"
            />
          </motion.div>

          <motion.div
            className="flex w-1/2 max-w-[600px] h-auto items-center justify-center"
            variants={slideFromRight}>
            <img
              src="/images/signalright.svg"
              alt="M시그널 일 평균 거래"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </motion.section>
      {/* //////// */}
      <motion.section
        className="w-full bg-white flex items-center "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className=" hidden  md:block w-[1100px] mb-70 mt-60  h-[403px] mx-auto flex items-center  justify-center  ">
          <img src="/images/profitsixth.svg" alt="" />
        </div>{" "}
        <div className=" md:hidden  w-[1100px] h-[403px] mx-4 mt-30 flex items-center  justify-center  ">
          <img src="/images/profitmobile5.svg" alt="" />
        </div>
      </motion.section>{" "}
      <motion.section
        className="w-full bg-white flex items-center "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className=" hidden md:block w-[1100px] h-[403px] mx-auto flex items-center  justify-center mb-40 mt-40   ">
          <img src="/images/profitseventh.svg" alt="" />
        </div>{" "}
        <div className=" md:hidden w-[1100px] h-[403px] mx-4 flex items-center  justify-center    ">
          <img src="/images/profitmobile6.svg" alt="" />
        </div>
      </motion.section>{" "}
      <motion.section
        className="w-full bg-white flex items-center "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="hidden md:block w-[1100px] h-[403px] mx-auto flex items-center  justify-center mt-60  ">
          <img src="/images/profiteighth.svg" alt="" />
        </div>{" "}
        <div className=" md:hidden w-[1100px] h-[403px] mx-4 flex items-center  justify-center -mt-20  ">
          <img src="/images/profitmobile7.svg" alt="" />
        </div>
      </motion.section>
      <motion.section
        className="w-full bg-white flex flex-col mt-40"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className=" hidden md:block w-full  max-w-[1100px]  mx-auto  flex  flex-col  items-center  justify-center  mt-40 px-4">
          {/* Background / decorative image */}
          <img src="/images/profitlast.svg" alt="" className="w-full h-auto" />

          {/* Text + Button */}
          <div className=" relative  w-full  flex  flex-col md:flex-row  items-center  justify-center  gap-6 md:gap-40 -mt-16 md:-mt-28">
            <p className=" text-[24px] md:text-[40px] font-semibold text-center md:text-left ">
              M시그널의 전략 바로 탑승하기
            </p>

            <Link href="/start" className="w-full md:w-auto">
              <button className=" cursor-pointer w-full md:w-[333px] h-[60px] md:h-[70px] hover:-translate-y-[2px] active:scale-95  active:translate-y-0  active:shadow-md transition-all duration-150 ease-out flex items-center justify-between px-4 bg-[#EFEFEF] border border-[#D9D9D9] rounded-[15px] ">
                <p className="text-black font-bold text-[20px] md:text-[31px]">
                  지금 투자하러 가기
                </p>
                <img
                  src="/images/rightarrow.svg"
                  alt=""
                  className="w-[36px] md:w-[60px]"
                />
              </button>
            </Link>
          </div>
        </div>{" "}
        {/* mobile */}
        <div className=" md:hidden max-w-[1100px]  mx-2  flex  flex-col  items-center  justify-center  -mt-40 px-2">
          {/* Background / decorative image */}
          <img
            src="/images/profitmobile8.svg"
            alt=""
            className="w-full h-auto"
          />

          {/* Text + Button */}
          <div className=" relartive flex ml-40 -mt-10 ">
            <Link href="/start" className="w-full md:w-auto">
              <button className=" cursor-pointer w-[120px]  h-[27px]  hover:-translate-y-[2px] active:scale-95  active:translate-y-0  active:shadow-md transition-all duration-150 ease-out flex items-center justify-between px-1 bg-[#EFEFEF] border border-[#D9D9D9] rounded-[5px] ">
                <p className="text-black font-bold text-[9px] ">
                  지금 투자하러 가기
                </p>
                <img
                  src="/images/rightarrow.svg"
                  alt=""
                  className="w-[18px] "
                />
              </button>
            </Link>
          </div>
        </div>
        <div className=" hidden md:block w-full  max-w-[1100px]  mx-auto  flex  flex-col  mt-12 mb-20 px-4 text-center md:text-left">
          <p className="text-[#C0C0C0] text-[12px] md:text-[16px] leading-relaxed">
            *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로, 원금 및
            수익을 보장하지 않습니다.
          </p>
          <p className="text-[#C0C0C0] text-[12px] md:text-[16px] leading-relaxed">
            *시장 상황에 따라 손실이 발생할 수 있으며, 투자 결정의 책임은 이용사
            본인에게 있습니다.
          </p>
        </div>{" "}
        <div className=" md:hidden w-full  max-w-[1100px]  mx-auto  flex  flex-col  mt-4 mb-20 px-4 md:text-left">
          <p className="text-[#C0C0C0] text-[7px] md:text-[16px] ">
            *본 자동매매 프로그램은 투자 판단을 보조하기 위한 도구로, 원금 및
            수익을 보장하지 않습니다.
          </p>
          <p className="text-[#C0C0C0] text-[7px] md:text-[16px] ">
            *시장 상황에 따라 손실이 발생할 수 있으며, 투자 결정의 책임은 이용사
            본인에게 있습니다.
          </p>
        </div>
      </motion.section>
    </>
  );
};

export default Profit;
