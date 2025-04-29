"use client";
import React from "react";
import ContentArticleCard from "./ContentArticleCard";
import { Article } from "@/utils/interface";

interface ContentArticleProps {
  filteredArticles: Article[];
  handlePageChange: (newPage: number) => void;
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
  };
}
const ContentArticle = ({ filteredArticles, handlePageChange, pagination }: ContentArticleProps) => {
  return (
    <section className="py-5 md:py-10 min-h-screen">
      <div className="container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => <ContentArticleCard key={article.id} category={article.category} createdArticle={article.updatedAt} title={article.title} id={article.id} content={article.content} image={article.imageUrl} />)
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      </div>
      {filteredArticles.length > 0 && (
        <div className="flex justify-center mt-8 py-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1}>
                  Previous
                </button>
              </li>

              {[...Array(pagination.totalPages).keys()].map((pageNum) => (
                <li key={pageNum + 1}>
                  <button onClick={() => handlePageChange(pageNum + 1)} className={`${pagination.page === pageNum + 1 ? "font-bold bg-gray-200" : ""} px-2`}>
                    {pageNum + 1}
                  </button>
                </li>
              ))}

              <li>
                <button onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}>
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
