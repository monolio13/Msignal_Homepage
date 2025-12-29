/** @format */
"use client";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function HeroThird() {
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
      className="w-full flex justify-center  md:mt-80  mb-40"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}>
      <div className=" container-1440 flex justify-center px-4 md:px-0">
        <div className=" hidden md:block relative w-full max-w-[1037px] h-[420px]  md:h-[700px]    lg:h-[925px]    ">
          <Image
            src="/images/herothird.svg"
            alt="M Signal hero"
            fill
            style={{ objectFit: "contain" }} // keep full artwork visible
            priority
          />
        </div>
        <div className="md:hidden container-1440 flex-col justify-center px-4 md:px-0">
          <div className=" md:hidden relative w-full max-w-[1037px] h-[145px]       md:h-[700px]    lg:h-[925px]    ">
            <Image
              src="/images/herothirdmobile.svg"
              alt="M Signal hero"
              fill
              style={{ objectFit: "contain" }} // keep full artwork visible
              priority
            />
          </div>
          <div className=" md:hidden relative w-full max-w-[1037px] h-[145px]      md:h-[700px]    lg:h-[925px]   mt-40 ">
            <Image
              src="/images/mainthirdmobile3.svg"
              alt="M Signal hero"
              fill
              style={{ objectFit: "contain" }} // keep full artwork visible
              priority
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
