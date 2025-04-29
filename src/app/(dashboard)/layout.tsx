"use client";
import SidebarDashboard from "@/components/page/dashboard/SidebarDashboard";
import NavbarDashboard from "@/components/page/dashboard/NavbarDashboard";
import "../globals.css";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
      return;
    }
    if (userData) {
      const parsedData = JSON.parse(userData);
      const userRole = parsedData?.state?.user?.role;
      if (userRole !== "Admin") {
        router.push("/");
      }
    }
  }, []);

  return (
    <html>
      <Head>
        <title>Article | Dashboard</title>
      </Head>
      <body className=" mx-auto ">
        <div className="flex relative">
          <SidebarDashboard />
          <div className=" w-full min-h-screen">
            <NavbarDashboard />
            <div className="p-2 lg:p-6 bg-[#f3f4f6]">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
};

export default DashboardLayout;
