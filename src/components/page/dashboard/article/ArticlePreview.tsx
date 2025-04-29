"use client";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { dateFormater } from "@/utils/utils";
import { useAuthStore } from "@/app/store/useAuthstore";

interface ArticlePreview {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  content?: string;
  image?: File;
}
const ArticlePreview = ({ open, onOpenChange, content, image, title }: ArticlePreview) => {
  const { user } = useAuthStore((state) => state);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger className="flex items-center gap-2"></DialogTrigger>
        <DialogContent className=" w-[370px] md:w-[600px]  overflow-y-scroll h-[500px] lg:h-[700px] lg:w-[800px]">
          <DialogHeader>
            <DialogTitle>Review Article</DialogTitle>
            <div className="flex flex-col gap-6  lg:gap-10">
              <div className="text-center ">
                <p className="mb-4 text-slate-600 text-sm">
                  {dateFormater(new Date())} &middot; Created by {user?.username}
                </p>
                <h1 className="text-slate-900 text-2xl font-semibold w-[335px] mx-auto md:w-[420px] lg:w-[642px] lg:text-3xl">{title}</h1>
              </div>
              <div className="w-[300px] h-[240px] mx-auto md:w-full md:h-[380px] lg:h-[400px] lg:w-[480px]">
                <img src={image ? URL.createObjectURL(image) : "/asset/articleImage/imageNotFound.webp"} alt="articleImage" className="object-cover rounded-xl h-full w-full" />
              </div>

              <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl" dangerouslySetInnerHTML={{ __html: content ?? "" }}></div>
            </div>{" "}
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} variant={"outline"}>
              Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ArticlePreview;
