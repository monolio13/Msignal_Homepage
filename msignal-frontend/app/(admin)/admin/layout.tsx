/** @format */

import Footer from "@/app/(site)/components/layout/footer";
import Header from "@/app/(site)/components/layout/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* admin usually needs full width */}
      <main className=" ">{children}</main>
    </>
  );
}
