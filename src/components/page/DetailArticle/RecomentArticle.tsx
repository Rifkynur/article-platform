"use clent";
import React from "react";
import ContentArticleCard from "../listArticel/contentArticel/ContentArticleCard";
import { Article } from "@/utils/interface";
import ContentArticleCardSkeleton from "../listArticel/contentArticel/ContentArticleCardSkeleton";

type RecomentArticle = {
  articles: Article[];
  isLoading: boolean;
  link: string;
};
const RecomentArticle = ({ articles, isLoading, link }: RecomentArticle) => {
  return (
    <>
      <div className="container pb-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 conatainer">
          {!isLoading
            ? articles.map((article) => {
                return <ContentArticleCard key={article.id} content={article.content} createdArticle={article.updatedAt} title={article.title} category={article.category} link={link} id={article.id} image={article.imageUrl} />;
              })
            : [...Array(3).keys()].map((_, index) => {
                return <ContentArticleCardSkeleton key={index} />;
              })}
        </div>
      </div>
    </>
  );
};

export default RecomentArticle;
