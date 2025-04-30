import React from "react";

const DetailArticleSkeleton = () => {
  return (
    <div className="mb-10 flex flex-col justify-start items-center gap-2.5 md:mt-24">
      <div className="w-1/2 h-5 rounded-lg bg-slate-300 animate-pulse md:h-7"></div>
      <div className="w-2/3 h-9 rounded-lg bg-slate-300 animate-pulse"></div>
      <div className="w-3/4 h-48 rounded-lg bg-slate-300 animate-pulse md:h-80"></div>
    </div>
  );
};

export default DetailArticleSkeleton;
