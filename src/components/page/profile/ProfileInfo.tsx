import React from "react";

type ProfileInfoProps = {
  title?: string;
  desc?: string;
};
const ProfileInfo = ({ title, desc }: ProfileInfoProps) => {
  return (
    <div className="bg-slate-200 rounded-md p-4 flex items-center w-[303px]">
      <span className="font-semibold w-32 text-gray-900 inline-block">{title}</span>
      <span className="text-slate-900">:</span>
      <span className="text-slate-900 text-center inline-block w-full">{desc}</span>
    </div>
  );
};

export default ProfileInfo;
