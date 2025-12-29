/** @format */

"use client";

export default function FullWidth({ children }: { children: React.ReactNode }) {
  return (
    <div className=" md:mx-0 w-screen relative left-1/2 right-1/2 -translate-x-1/2">
      {children}
    </div>
  );
}
