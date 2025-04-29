"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { useAuth } from "@/hook/useAuth";
import { getInitial } from "@/utils/utils";
import { useAuthStore } from "@/app/store/useAuthstore";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [isScroll, setIsScroll] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setOpenDialog(false);
  };

  if (pathname.startsWith("/login") || pathname.startsWith("/register")) {
    return;
  }
  return (
    <>
      <nav className={clsx("py-5 bg-white sticky top-0 lg:fixed  lg:left-0 lg:right-0 z-20 ", isScroll ? "lg:white lg:shadow-md" : "lg:bg-transparent")}>
        <div className="container flex justify-between items-center">
          <Link href={"/"} className="w-[122px]">
            <img src="/asset/frame.png" alt="icon" className="object-cover" />
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer">
                <div className=" size-8 rounded-full bg-[#BFDBFE] flex items-center justify-center font-medium text-[#1E3A8A]">{getInitial(user?.username)}</div>
                <span className="hidden capitalize lg:inline">{user?.username}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => router.push("/profile")}>My Account</DropdownMenuItem>
              {user?.role === "Admin" && <DropdownMenuItem onClick={() => router.push("/dashboard/article")}>Dashboard</DropdownMenuItem>}
              <DropdownMenuItem onClick={() => setOpenDialog(true)} className="text-red-500">
                <LogOut className="text-red-500" /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger className="flex items-center gap-2"></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Logout</DialogTitle>
              <DialogDescription>Are you sure want to logout? </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => setOpenDialog(false)} variant={"outline"}>
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-800" onClick={handleLogout}>
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </nav>
    </>
  );
};

export default Navbar;
