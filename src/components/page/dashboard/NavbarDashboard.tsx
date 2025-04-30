"use client";
import React, { useState } from "react";
import { Menu, LogOut } from "lucide-react";
import { useSidebarDashboard } from "@/app/store/useSidebarDashboardStore";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { useAuth } from "@/hook/useAuth";
import { getInitial } from "@/utils/utils";
import { useAuthStore } from "@/app/store/useAuthstore";
import { Button } from "@/components/ui/button";

const NavbarDashboard = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState(false);
  const section = pathname.split("/")["2"];
  const { setIsOpen } = useSidebarDashboard();
  const { user } = useAuthStore();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    setOpenDialog(false);
  };

  return (
    <>
      <div className="w-full bg-gray-50 p-4 flex justify-between items-center">
        <div className="flex gap-2">
          <Menu onClick={setIsOpen} className="lg:hidden" />
          <h2 className="capitalize font-bold">{section}</h2>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className=" size-8 rounded-full bg-[#BFDBFE] flex items-center justify-center font-medium text-[#1E3A8A]">{getInitial(user?.username)}</div>
              <span className="hidden capitalize lg:inline">{user?.username}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => router.push("/dashboard/profile")}>My Account</DropdownMenuItem>

            <DropdownMenuItem onClick={() => setOpenDialog(true)} className="text-red-500">
              <LogOut className="text-red-500" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="flex items-center gap-2"></DialogTrigger>
        <DialogContent className="w-[300px]">
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

export default NavbarDashboard;
