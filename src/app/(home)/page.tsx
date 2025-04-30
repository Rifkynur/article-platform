"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/page/listArticel/HeroSection/HeroSection";
import ContentArticle from "@/components/page/listArticel/contentArticel/ContentArticle";
import { Article } from "@/utils/interface";
import axios from "axios";
import { useDebounce } from "use-debounce";

export default function Home() {
  const router = useRouter();
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, limit: 10 });
  const [totalData, setTotalData] = useState<number>(0);
  const [searchDebounce] = useDebounce(searchQuery, 500);
  const [selectDebounce] = useDebounce(selectedCategory, 500);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  interface articleParams {
    page: string | number;
    limit: string | number;
    title?: string;
    category?: string;
  }
  const getAllArticle = async () => {
    try {
      const params: articleParams = {
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
      setTotalData(response.data.total);

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
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (!token) {
      router.push("/login");
      return;
    }
    if (userData) {
      const parsedData = JSON.parse(userData);
      const userRole = parsedData?.state?.user?.role;
      if (userRole !== "User") {
        router.push("/dashboard/article");
      }
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getAllArticle();
    window.scrollTo({ top: 100, behavior: "smooth" });
  }, [pagination.page, searchDebounce, selectDebounce]);

  return (
    <>
      <HeroSection searchQuery={searchQuery} setSelectedCategory={setSelectedCategory} setSearchQuery={setSearchQuery} />

      <ContentArticle filteredArticles={filteredArticles} handlePageChange={handlePageChange} pagination={pagination} totalData={totalData} isLoading={isLoading} link="article" />
    </>
  );
}
