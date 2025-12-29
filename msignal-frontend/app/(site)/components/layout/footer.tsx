/** @format */

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* 전체 배경 (이미지처럼 연한 회색 박스) */}
      <div className="bg-[#F4F4F4]">
        <div className="container-1440 mx-auto px-2 md:px-0 py-3 md:py-10">
          {/* 안내 문구 */}
          <p className="hidden md:block text-[10px] md:text-[14px] leading-relaxed md:leading-[26px] text-[#8D8D8D]">
            M-시그널은 자동매매 프로그램(EA)을 제공하는 소프트웨어 개발사입니다.
            <br className="hidden md:block" />
            모든 투자 결정 및 계좌 운용의 책임은 사용자에게 있으며 당사는 투자
            자문, 투자 일임, 금융상품 판매를 제공하지 않습니다. 자동매매
            사용에는 위험이 있으며 원금 손실이 발생할 수 있습니다.
          </p>{" "}
          <p className="md:hidden text-[8px] md:text-[14px] leading-relaxed md:leading-[26px] text-[#8D8D8D]">
            M-시그널은 자동매매 프로그램(EA)을 제공하는 소프트웨어 개발사입니다.
            <br className="hidden md:block" />
            모든 투자 결정 및 계좌 운용의 <br /> 책임은 사용자에게 있으며 당사는
            투자 자문, 투자 일임, 금융상품 판매를 제공하지 않습니다. 자동매매
            사용
            <br />
            에는 위험이 있으며 원금 손실이 발생할 수 있습니다.
          </p>
          {/* 링크들 */}
          <div
            className="
              flex flex-wrap gap-2 md:gap-4 mt-4 md:mt-8
              text-[10px] md:text-[14px] text-[#8D8D8D]
            ">
            <Link
              href={"/terms/termsofUse"}
              className="cursor-pointer hover:underline">
              이용약관
            </Link>
            <span className="hidden md:inline">|</span>

            <Link
              href={"/terms/privacy"}
              className="cursor-pointer hover:underline">
              개인정보처리방침
            </Link>
            <span className="hidden md:inline">|</span>

            <span className="cursor-pointer hover:underline">
              마케팅 수신동의 안내
            </span>
          </div>
          {/* 사업자 정보 */}
          <p className="text-[10px] md:text-[14px] text-[#8D8D8D] mt-1 md:mt-6">
            사업자등록번호 183-36-01415 | 대표자명 : 이민우
          </p>
        </div>
      </div>
    </footer>
  );
}
