"use client";
import React from "react";
import ContentArticleCard from "./ContentArticleCard";
import { Article } from "@/utils/interface";
import ContentArticleCardSkeleton from "./ContentArticleCardSkeleton";

interface ContentArticleProps {
  filteredArticles: Article[];
  handlePageChange: (newPage: number) => void;
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
  };
  totalData: number;
  isLoading: boolean;
  link: string;
}
const ContentArticle = ({ filteredArticles, handlePageChange, pagination, totalData, isLoading, link }: ContentArticleProps) => {
  return (
    <section className="py-5 md:py-10 min-h-screen">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            [...Array(6).keys()].map((_, index) => {
              return <ContentArticleCardSkeleton key={index} />;
            })
          ) : filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ContentArticleCard key={article.id} category={article.category} createdArticle={article.updatedAt} title={article.title} id={article.id} content={article.content} image={article.imageUrl} link={link} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center col-span-1 md:col-span-2 lg:col-span-3 w-full">
              <div className="md:w-[500px]">
                <img src="/asset/notFound.webp" alt="notFound" className="object-cover" />
              </div>
              <h2 className="font-bold text-2xl lg:text-4xl">Article Not Found</h2>
            </div>
          )}
        </div>
      </div>
      {totalData > 10 && (
        <div className="flex justify-center mt-8 py-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1} className="cursor-pointer">
                  Previous
                </button>
              </li>

              {[...Array(pagination.totalPages).keys()].map((pageNum) => (
                <li key={pageNum + 1}>
                  <button onClick={() => handlePageChange(pageNum + 1)} className={`${pagination.page === pageNum + 1 ? "font-bold bg-gray-200" : ""} px-2 cursor-pointer`}>
                    {pageNum + 1}
                  </button>
                </li>
              ))}

              <li>
                <button onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page === pagination.totalPages} className="cursor-pointer">
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </section>
  );
};

export default ContentArticle;
