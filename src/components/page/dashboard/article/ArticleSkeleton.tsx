import React from "react";

const ArticleSkeleton = () => {
  return (
    <div className="mt-8 p-4 border flex justify-center items-center gap-3 rounded-md">
      <div className="h-8 bg-slate-300 animate-pulse w-full md:h-10 rounded-md"></div>
      <div className="h-8 bg-slate-300 animate-pulse w-full md:h-10 rounded-md"></div>
      <div className="h-8 bg-slate-300 animate-pulse w-full md:h-10 rounded-md"></div>
      <div className="h-8 bg-slate-300 animate-pulse w-full md:h-10 rounded-md"></div>
      <div className="h-8 bg-slate-300 animate-pulse w-full md:h-10 rounded-md"></div>
    </div>
  );
};

export default ArticleSkeleton;
