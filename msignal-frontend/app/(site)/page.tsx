/** @format */

import Hero from "@/app/(site)/components/homeSections/hero";
import HeroFifth from "@/app/(site)/components/homeSections/herofifth";
import HeroFourth from "@/app/(site)/components/homeSections/heroFourth";
import HeroSecond from "@/app/(site)/components/homeSections/heroSecond";
import HeroThird from "@/app/(site)/components/homeSections/heroThird";
import HomePopupCarousel from "@/app/(site)/components/homeSections/HomePopupCarousel";

export default function Page() {
  return (
    <>
      <HomePopupCarousel />
      <Hero />
      <HeroSecond />
      <HeroThird />
      <HeroFourth />
      <HeroFifth />
    </>
  );
}
