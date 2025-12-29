/** @format */
"use client";
import { AnimatePresence, motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const Hedgehood = () => {
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
      <section className=" -mx-4 md:mx-0 ">
        {/* Image wrapper */}
        <div className=" hidden md:block relative h-[300px] md:h-[513px] w-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src="/images/hedgehood.svg"
              alt="M Signal hero background"
              fill
              className="object-cover bg-white"
              priority
            />
          </AnimatePresence>
        </div>{" "}
        <div className=" md:hidden relative h-[260px] md:h-[513px] w-full overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src="/images/hedgehood.svg"
              alt="M Signal hero background"
              fill
              className="object-cover bg-white"
              priority
            />
          </AnimatePresence>
        </div>
        {/* desktop */}
        <div className="  hidden md:flex items-center justify-center relative bottom-30 ">
          {/* Button */}
          <Link href="https://www.hedgehood.com/ko">
            <button
              type="submit"
              className="w-[360px] cursor-pointer  md:h-[60px] rounded-[50px] text-white text-xl md:text-3xl font-semibold tracking-wide  mx-auto md:mx-0  shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out "
              style={{
                background:
                  "linear-gradient(180deg, #9831E4 0%, #35005A 50%, #35005A 100%)",
              }}>
              헷지후드 바로가기
            </button>
          </Link>
        </div>
        {/* mobile */}
        <div className=" md:hidden flex items-center justify-center relative bottom-17 ">
          {/* Button */}
          <Link href="https://www.hedgehood.com/ko">
            <button
              type="submit"
              className="w-[200px]  h-10  rounded-[50px] text-white text-[16px] font-semibold tracking-wide  mx-auto md:mx-0          md:relative   shadow-[0_10px_25px_rgba(0,0,0,0.25)] hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out "
              style={{
                background:
                  "linear-gradient(180deg, #9831E4 0%, #35005A 50%, #35005A 100%)",
              }}>
              헷지후드 바로가기
            </button>
          </Link>
        </div>
      </section>

      <motion.section
        className=" -mx-4 md:mx-0  md:mt-70 mt-20 "
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 px-4 md:px-0">
          <img src="/images/hedgehood2.svg" alt="" className="w-full h-auto" />
        </div>
      </motion.section>

      <motion.section
        className="w-full bg-white flex flex-col items-center  md:mt-80 mb-20 mt-30"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 px-4 md:px-0">
          <img src="/images/hedgehood3.svg" alt="" className="w-full h-auto" />
        </div>
      </motion.section>

      <motion.section
        className="w-full bg-white flex flex-col items-center  md:mt-100 mb-20 mt-30"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 px-4 md:px-0">
          <img src="/images/hedgehood4.svg" alt="" className="w-full h-auto" />
        </div>
      </motion.section>
      <motion.section
        className="-mx-4 md:mx-0  md:mt-80 mb-20 mt-30"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}>
        {/* Responsive container */}
        <div className="w-full max-w-[1100px] mx-auto flex flex-col gap-8 px-4 md:px-0">
          <img src="/images/hedgehood5.svg" alt="" className="w-full h-auto" />
        </div>

        {/* Button */}
        <button
          type="submit"
          className=" mt-4  w-[200px] md:w-[301px] h-10 md:h-[60px] rounded-[50px] text-white text-[16px] md:text-xl font-semibold tracking-wide flex items-center justify-center mx-auto      /* center on mobile */ shadow-[0_10px_25px_rgba(0,0,0,0.25)] cursor-pointer hover:shadow-xl hover:-translate-y-[2px] active:scale-95 active:translate-y-0 active:shadow-md transition-transform transition-shadow duration-150 ease-out "
          style={{
            background:
              "linear-gradient(180deg, #9831E4 0%, #35005A 50%, #35005A 100%)",
          }}>
          헷지후드 바로가기
        </button>
      </motion.section>
    </>
  );
};

export default Hedgehood;
