"use client";
import React from "react";
import { useFormReview } from "@/app/store/useReviewArticle";
import { useAuthStore } from "@/app/store/useAuthstore";
import { dateFormater } from "@/utils/utils";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import DOMPurify from "dompurify";

const Page = () => {
  const router = useRouter();
  const { formData } = useFormReview();
  const { user } = useAuthStore();

  const sanitizedContent = formData.content ? DOMPurify.sanitize(formData.content) : "";
  return (
    <section className="container py-10 lg:py-28 min-h-screen bg-gray-50 rounded-xl">
      <div className="flex items-center gap-2 font-semibold cursor-pointer" onClick={() => router.back()}>
        <ArrowLeft className="size-5" />
        <span>Back</span>
      </div>
      <div className="max-w-[1120px]">
        <div className="flex flex-col gap-6  lg:gap-10">
          <div className="text-center ">
            <p className="mb-4 text-slate-600 text-sm">
              {dateFormater(new Date())} &middot; Created by {user?.username}
            </p>
            <h1 className="text-slate-900 text-2xl font-semibold w-[335px] mx-auto md:w-[420px] lg:w-[642px] lg:text-3xl">{formData.title}</h1>
          </div>
          <div className="w-[335px] h-[240px] mx-auto md:w-full md:h-[380px] lg:h-[480px] bg-secondary">
            <img src={formData?.image ? URL.createObjectURL(formData.image) : "/asset/articleImage/imageNotFound.webp"} alt="articleImage" className="object-cover rounded-xl h-full w-full" />
          </div>
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl" dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </div>
      </div>
    </section>
  );
};

export default Page;
