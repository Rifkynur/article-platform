import React from "react";

const ContentArticleCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 justify-between w-full">
      <div className="w-full rounded-xl bg-slate-300 h-24 animate-pulse lg:h-64"></div>
      <div className="flex flex-col gap-2">
        <div className="w-full h-5 rounded-lg bg-slate-300 animate-pulse lg:h-8"></div>
        <div className="w-full h-5 rounded-lg bg-slate-300 animate-pulse lg:h-8"></div>
        <div className="w-full h-5 rounded-lg bg-slate-300 animate-pulse lg:h-8"></div>
      </div>
    </div>
  );
};

export default ContentArticleCardSkeleton;
