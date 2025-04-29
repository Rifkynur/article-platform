"use client";
import React from "react";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return;
  }
  return (
    <footer className="bg-[#2563EBDB]  flex items-center justify-center flex-col py-6 gap-2 lg:gap-4 md:flex-row">
      <div className="w-[122px]">
        <img src="/asset/Logo.png" alt="logo" className="object-cover" />
      </div>
      <p className="text-white text-sm">&copy; 2025 Blog genzet. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
