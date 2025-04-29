import React from "react";
import { Article } from "@/utils/interface";
import { dateFormater } from "@/utils/utils";

interface DetailCard {
  article: Article;
}
const DetailArticle = ({ article }: DetailCard) => {
  return (
    <section className="container py-10 lg:py-28 min-h-screen">
      <div className="max-w-[1120px]">
        <div className="flex flex-col gap-6  lg:gap-10">
          <div className="text-center ">
            <p className="mb-4 text-slate-600 text-sm">
              {article.updatedAt ? dateFormater(article.updatedAt) : ""} &middot; Created by {article.user?.username}
            </p>
            <h1 className="text-slate-900 text-2xl font-semibold w-[335px] mx-auto md:w-[420px] lg:w-[642px] lg:text-3xl">{article.title}</h1>
          </div>
          <div className="w-[335px] h-[240px] mx-auto md:w-full md:h-[380px] lg:h-[480px] bg-secondary">
            <img src={article.imageUrl || "/asset/articleImage/imageNotFound.webp"} alt="articleImage" className="object-cover rounded-xl h-full w-full" />
          </div>
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl" dangerouslySetInnerHTML={{ __html: article.content }}></div>
        </div>
      </div>
    </section>
  );
};

export default DetailArticle;
