"use client";
import React, { useEffect, useState } from "react";
import FilterCategory from "@/components/page/dashboard/category/FilterCategory";
import TableCategory from "@/components/page/dashboard/category/TableCategory";
import { Category } from "@/utils/interface";
import axios from "axios";
import { useDebounce } from "use-debounce";

const Page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, limit: 10 });
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  const [totalCategory, setTotalCategory] = useState<number>(0);
  const [searchDebounce] = useDebounce(searchQuery, 500);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  interface categoryParams {
    page: string | number;
    limit: string | number;
    search?: string;
  }
  const getAllCategory = async () => {
    try {
      const params: categoryParams = {
        page: pagination.page,
        limit: pagination.limit,
      };

      if (searchQuery) {
        params.search = searchDebounce;
        console.log(params);
      }

      const response = await axios.get(`${apiUrl}categories`, { params });

      const totalPages = Math.ceil(response.data.totalData / pagination.limit);
      setTotalCategory(response.data.totalData);

      setPagination({
        ...pagination,
        totalPages: totalPages,
      });

      setFilteredCategory(response.data.data);
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
    getAllCategory();
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [pagination.page, searchDebounce]);
  return (
    <div className="min-h-screen">
      <div className="bg-gray-50 p-2 rounded-t-xl border-slate-200">
        <h2 className="text-sm font-medium">Total Category : {totalCategory}</h2>
      </div>
      <FilterCategory searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TableCategory handlePageChange={handlePageChange} pagination={pagination} filteredCategory={filteredCategory} isLoading={isLoading} totalCategory={totalCategory} />
    </div>
  );
};

export default Page;
