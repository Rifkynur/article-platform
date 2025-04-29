"use clent";
import React from "react";
import ContentArticleCard from "../listArticel/contentArticel/ContentArticleCard";
import { Article } from "@/utils/interface";

type RecomentArticle = {
  articles: Article[];
};
const RecomentArticle = ({ articles }: RecomentArticle) => {
  return (
    <div className="container pb-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 conatainer">
        {articles.map((article) => {
          return <ContentArticleCard key={article.id} content={article.content} createdArticle={article.updatedAt} title={article.title} category={article.category} />;
        })}
      </div>
    </div>
  );
};

export default RecomentArticle;
