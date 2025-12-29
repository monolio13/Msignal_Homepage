/** @format */

import type { Metadata, Viewport } from "next";
import Header from "./components/layout/Header";
import FloatingSideBar from "./components/layout/FloatingSideBar";
import MobileFloatingSideBar from "./components/layout/MobileFloatingSidebar";
import Footer from "./components/layout/footer";
import MobileBottomNav from "./components/layout/MobileButtonNav";
import ToastProvider from "./components/prividers/ToastProvider";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "M signal",
  description: "M signal main page",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <FloatingSideBar />
      <MobileFloatingSideBar />

      {/* ✅ Toast UI (client only, does not affect layout) */}
      <ToastProvider />

      <main className="pt-[81px] md:pt-[100px] pb-[110px] md:pb-0">
        <div className="container-1440 px-4 md:px-0">{children}</div>
        <Footer />
      </main>

      <MobileBottomNav />
    </>
  );
}
