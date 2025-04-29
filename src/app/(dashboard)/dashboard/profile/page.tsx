import React from "react";
import Profile from "@/components/page/profile/Profile";

const Page = () => {
  return (
    <div className="bg-gray-50 rounded-xl">
      <Profile goTo={"dashbaord"} link={"/dashboard/article"} />
    </div>
  );
};

export default Page;
