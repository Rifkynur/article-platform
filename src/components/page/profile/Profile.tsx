"use client";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuthStore } from "@/app/store/useAuthstore";
import { getInitial } from "@/utils/utils";

interface Profile {
  link: String;
  goTo: String;
}
const Profile = ({ link, goTo }: Profile) => {
  const { user } = useAuthStore();
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col gap-9  w-[335px] px-4 py-6">
        <h1 className="text-slate-900 font-semibold text-xl">User Profile</h1>
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center justify-center bg-blue-200 size-16 rounded-full">
            <span className="text-blue-900 font-medium text-2xl ">{getInitial(user?.username)}</span>
          </div>
          <div className=" flex items-center justify-center flex-col gap-3">
            <ProfileInfo title="Username" desc={user?.username} />
            <ProfileInfo title="Role" desc={user?.role} />
          </div>
        </div>
        <Button className="w-full bg-blue-600 hover:bg-blue-800 cursor-pointer">
          <Link href={`${link}`}>Back to {goTo}</Link>
        </Button>
      </div>
    </section>
  );
};

export default Profile;
