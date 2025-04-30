"use client";
import React, { useEffect, useState } from "react";
import FilterArticle from "@/components/page/dashboard/article/FilterArticle";
import TableArticle from "@/components/page/dashboard/article/TableArticle";
import axios from "axios";
import { Article } from "@/utils/interface";
import { useDebounce } from "use-debounce";

const Page = () => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, limit: 10 });
  const [totalArticle, setTotalArticle] = useState<number>(0);
  const [searchDebounce] = useDebounce(searchQuery, 500);
  const [selectDebounce] = useDebounce(selectedCategory, 500);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const getAllArticle = async () => {
    try {
      const params: any = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (searchQuery) {
        params.title = searchDebounce;
      }

      if (selectedCategory) {
        params.category = selectedCategory;
      }

      const response = await axios.get(`${apiUrl}articles/`, { params });

      const totalPages = Math.ceil(response.data.total / pagination.limit);
      setTotalArticle(response.data.total);

      setPagination({
        ...pagination,
        totalPages: totalPages,
      });

      setFilteredArticles(response.data.data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  useEffect(() => {
    setIsLoading(true);
    getAllArticle();
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [pagination.page, searchDebounce, selectDebounce]);

  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 p-2 rounded-t-xl border-slate-200">
        <h2 className="text-sm font-medium">Total Article : {totalArticle}</h2>
      </div>
      <FilterArticle searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} />
      <TableArticle filteredArticles={filteredArticles} handlePageChange={handlePageChange} pagination={pagination} isLoading={isLoading} totalData={totalArticle} />
    </div>
  );
};

export default Page;
