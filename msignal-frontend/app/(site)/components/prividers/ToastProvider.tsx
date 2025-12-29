/** @format */
"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 2500,
        style: {
          background: "rgba(20,21,29,0.92)",
          color: "#fff",
          border: "1px solid rgba(0,234,255,0.18)",
          borderRadius: "14px",
          padding: "12px 14px",
          fontWeight: 600,
          boxShadow: "0 18px 55px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
        },
        success: {
          iconTheme: {
            primary: "#00eaff",
            secondary: "#041018",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff4d6d",
            secondary: "#1a0b10",
          },
        },
      }}
    />
  );
}
