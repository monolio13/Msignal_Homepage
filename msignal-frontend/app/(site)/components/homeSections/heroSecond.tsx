/** @format */
"use client";
import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

export default function HeroSecond() {
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
    <motion.section
      className="w-screen -ml-4 md:w-full md:ml-0 flex justify-center mt-0 md:mt-80  md:mb-40 mb-35"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      {/* mobile: full width / desktop: 1440 container */}
      <div className="w-full md:container-1440 md:px-0">
        {/* ================= DESKTOP ONLY ================= */}
        <div className="hidden md:block">
          {/* TOP IMAGE BLOCK (desktop) */}
          <div className="relative h-[675px] overflow-hidden">
            <AnimatePresence initial={false} mode="wait">
              <Image
                src={"/images/heroseconddesktop.svg"}
                alt="M Signal hero background"
                fill
                style={{ objectFit: "cover", background: "white" }}
                priority
              />
            </AnimatePresence>
          </div>

          {/* BOTTOM IMAGE BLOCK (desktop) */}
          <div className="relative h-[500px] overflow-hidden mt-10">
            <AnimatePresence initial={false} mode="wait">
              <Image
                src={"/images/mainfix.svg"}
                alt="M Signal hero background"
                fill
                style={{ objectFit: "cover", background: "white" }}
                priority
              />
            </AnimatePresence>
          </div>
        </div>

        {/* ================= MOBILE ONLY ================= */}
        <div className="md:hidden relative h-[392px] overflow-hidden">
          <AnimatePresence initial={false} mode="wait">
            <Image
              src={"/images/mainmobile2.svg"}
              alt="M Signal hero background"
              fill
              style={{ objectFit: "cover", background: "white" }}
              priority
            />
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
}
