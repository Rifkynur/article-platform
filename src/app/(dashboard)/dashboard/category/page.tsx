"use client";
import React, { useEffect, useState } from "react";
import FilterCategory from "@/components/page/dashboard/category/FilterCategory";
import TableCategory from "@/components/page/dashboard/category/TableCategory";
import { Category } from "@/utils/interface";
import axios from "axios";

const Page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, limit: 10 });
  const [filteredCategory, setFilteredCategory] = useState<Category[]>([]);
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [totalCategory, setTotalCategory] = useState<number>();
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`${apiUrl}categories`);
      setAllCategory(response.data.data);
      setTotalCategory(response.data.totalData);
      setFilteredCategory(response.data.data);
      const totalPages = Math.ceil(response.data.totalData / pagination.limit);
      setPagination({
        ...pagination,
        totalPages: totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getFiltercategory = () => {
    let filtered = allCategory;

    if (searchQuery) {
      filtered = filtered.filter((category) => {
        return category.name.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredCategory(filtered);

    setPagination((prev) => ({
      ...prev,
      totalPages: Math.ceil(filtered.length / pagination.limit),
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPagination({ ...pagination, page: newPage });
  };

  useEffect(() => {
    getAllCategory();
  }, [pagination.page]);

  useEffect(() => {
    getFiltercategory();
  }, [searchQuery]);
  return (
    <div>
      <div className="bg-gray-50 p-2 rounded-t-xl border-slate-200">
        <h2 className="text-sm font-medium">Total Category : {totalCategory}</h2>
      </div>
      <FilterCategory searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <TableCategory handlePageChange={handlePageChange} pagination={pagination} filteredCategory={filteredCategory} />
    </div>
  );
};

export default Page;
