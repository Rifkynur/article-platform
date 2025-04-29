"use client";
import React, { useState } from "react";
import Link from "next/link";
import { LogOut, Newspaper, Tag, CircleX } from "lucide-react";
import { usePathname } from "next/navigation";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hook/useAuth";
import { useSidebarDashboard } from "@/app/store/useSidebarDashboardStore";
import { useRouter } from "next/navigation";

const SidebarDashboard = () => {
  const pathname = usePathname();
  const [openDialog, setOpenDialog] = useState(false);
  const { isOpen, setIsOpen } = useSidebarDashboard();
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setOpenDialog(false);
  };

  return (
    <>
      <div className={`bg-blue-600 z-30 top-0 bottom-0  py-4 px-3 absolute transition-all duration-200 lg:min-h-screen  lg:static   ${isOpen ? "left-0" : "-left-full"}`}>
        <CircleX className="ms-auto mb-2 text-white lg:hidden" onClick={() => setIsOpen()} />
        <div className="cursor-pointer" onClick={() => router.push("/dashboard/article")}>
          <img src="/asset/Logo.png" alt="logo" />
        </div>
        <ul className="text-white flex flex-col gap-4 mt-10">
          <li className="font-medium lg:gap-3">
            <Link href={"/dashboard/article"} className={`${pathname === "/dashboard/article" ? "bg-blue-500" : ""} flex items-center gap-2 rounded-md p-2 lg:px-4 lg:py-2.5`}>
              <Newspaper className="size-4 lg:size-5" />
              <span>Articles</span>
            </Link>
          </li>
          <li className="font-medium lg:gap-3">
            <Link href={"/dashboard/category"} className={`${pathname === "/dashboard/category" ? "bg-blue-500" : ""} flex items-center gap-2 rounded-md p-2 lg:px-4 lg:py-2.5`}>
              <Tag className="size-4 lg:size-5" />
              <span>Category</span>
            </Link>
          </li>
          <li className="rounded-md p-2 font-medium lg:gap-3 lg:px-4 lg:py-2.5">
            <button className="flex items-center gap-2" onClick={() => setOpenDialog(true)}>
              <LogOut className="size-4 lg:size-5" />
              <span>Logout</span>
            </button>
          </li>
        </ul>
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
    </>
  );
};

export default SidebarDashboard;
