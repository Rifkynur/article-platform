"use client";
import React, { useEffect, useState } from "react";
import DetailArticle from "@/components/page/DetailArticle/DetailArticle";
import { Article } from "@/utils/interface";
import RecomentArticle from "@/components/page/DetailArticle/RecomentArticle";
import { useHandleArticle } from "@/hook/useHandleArticle";
import { useParams } from "next/navigation";
import axios from "axios";

const Page = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const [recommendArticles, setRecommendArticles] = useState<Article[]>([]);
  const { id } = useParams();
  const { articleById, getArticleById, isLoading } = useHandleArticle();

  const getRecomendArticle = async () => {
    if (!articleById) return;

    try {
      const response = await axios.get(`${apiUrl}articles`);
      const data: Article[] = response.data.data;
      const filtered = data.filter((article) => article.category.name === articleById.category.name && article.id !== articleById.id).slice(0, 3);

      setRecommendArticles(filtered);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    }
  };
  useEffect(() => {
    if (id) {
      getArticleById(id as string);
    }
  }, [id]);

  useEffect(() => {
    getRecomendArticle();
  }, [articleById]);
  return (
    <section className="min-h-screen">
      {articleById && <DetailArticle isLoading={isLoading} article={articleById} />}
      <RecomentArticle articles={recommendArticles} isLoading={isLoading} />
    </section>
  );
};

export default Page;
