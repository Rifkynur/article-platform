"use client";
import { useEffect } from "react";
import { Archivo } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { useRouter } from "next/navigation";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      if (userRole !== "User") {
        router.push("/dashboard/article");
      }
    }
  }, []);
  return (
    <html lang="en" className={archivo.className}>
      <Head>
        <title>Article</title>
      </Head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
