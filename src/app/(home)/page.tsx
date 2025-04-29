"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthstore";
import HeroSection from "@/components/page/listArticel/HeroSection/HeroSection";
import ContentArticle from "@/components/page/listArticel/contentArticel/ContentArticle";
import { useGetUser } from "@/hook/useGetUser";
import { useHandleArticle } from "@/hook/useHandleArticle";
import { Article } from "@/utils/interface";
import axios from "axios";

export default function Home() {
  const { getUser } = useGetUser();
  const router = useRouter();
  const { setLogout, user, setUser, clearUser } = useAuthStore();
  const [isClient, setIsClient] = useState(false);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1, limit: 10 });

  const getAllArticle = async () => {
    try {
      const response = await axios.get("https://test-fe.mysellerpintar.com/api/articles/", {
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
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }
    getUser(token);
  }, []);

  useEffect(() => {
    getAllArticle();
  }, [pagination.page]);

  useEffect(() => {
    getFilterArticle();
    console.log(filteredArticles);
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <HeroSection searchQuery={searchQuery} setSelectedCategory={setSelectedCategory} setSearchQuery={setSearchQuery} />

      <ContentArticle filteredArticles={filteredArticles} handlePageChange={handlePageChange} pagination={pagination} />
    </>
  );
}
