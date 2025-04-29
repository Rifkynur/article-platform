"use clent";
import React from "react";
import ContentArticleCard from "../listArticel/contentArticel/ContentArticleCard";
import { useHandleArticle } from "@/hook/useHandleArticle";

type OtherArticle = {
  articleCategory: string;
};
const OtherArticle = ({ articleCategory }: OtherArticle) => {
  const { recomentArticles, getRecomentArticle } = useHandleArticle();
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 conatainer">
      bisa
      {/* <ContentArticleCard />
      <ContentArticleCard />
      <ContentArticleCard /> */}
    </div>
  );
};

export default OtherArticle;
