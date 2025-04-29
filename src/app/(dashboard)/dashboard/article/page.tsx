"use client";
import React, { useEffect, useState } from "react";
import FilterArticle from "@/components/page/dashboard/article/FilterArticle";
import TableArticle from "@/components/page/dashboard/article/TableArticle";
import axios from "axios";
import { Article } from "@/utils/interface";

const Page = () => {
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, limit: 10 });
  const [totalArticle, setTotalArticle] = useState<number>();

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const getAllArticle = async () => {
    try {
      const response = await axios.get(`${apiUrl}articles/`, {
        params: {
          page: pagination.page,
        },
      });
      const totalPages = Math.ceil(response.data.total / pagination.limit);
      setArticles(response.data.data);
      setPagination({
        ...pagination,
        totalPages: totalPages,
      });
      setTotalArticle(response.data.total);
      setFilteredArticles(response.data.data);
    } catch (err) {
      console.error(err);
    }
  };
  const getFilterArticle = () => {
    let filtered = articles;

    if (searchQuery) {
      filtered = filtered.filter((article) => article.title.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    if (selectedCategory) {
      filtered = filtered.filter((article) => article.category.name == selectedCategory);
    }

    setFilteredArticles(filtered);

    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(filtered.length / pagination.limit),
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  useEffect(() => {
    getAllArticle();
  }, [pagination.page]);

  useEffect(() => {
    getFilterArticle();
  }, [searchQuery, selectedCategory]);
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 p-2 rounded-t-xl border-slate-200">
        <h2 className="text-sm font-medium">Total Article : {totalArticle}</h2>
      </div>
      <FilterArticle searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSelectedCategory={setSelectedCategory} />
      <TableArticle filteredArticles={filteredArticles} handlePageChange={handlePageChange} pagination={pagination} />
    </div>
  );
};

export default Page;
