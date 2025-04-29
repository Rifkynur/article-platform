"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Article } from "@/utils/interface";
import { toast } from "sonner";

interface AddArticle {
  title: string;
  userId?: string;
  content: string;
  imageUrl?: string;
  image?: File;
  category: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useHandleArticle = () => {
  const [articleById, setArticleById] = useState<Article>();
  const [token, setToken] = useState<string | null>(null);

  const getArticleById = async (id: string) => {
    try {
      const response = await axios.get(`${apiUrl}articles/${id}`);
      setArticleById(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addArticle = async (data: AddArticle) => {
    try {
      let imageUrl = "";

      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image);

        const upload = await axios.post(`https://test-fe.mysellerpintar.com/api/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = upload.data.imageUrl;
      }

      const articlePayload = {
        title: data.title,
        userId: data.userId,
        categoryId: data.category,
        content: data.content,
        imageUrl: imageUrl,
      };

      await axios.post(`https://test-fe.mysellerpintar.com/api/articles`, articlePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Berhasil Menghapus Article", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Gagal Membuat Article", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const editArticle = async (data: AddArticle, id: string) => {
    try {
      let imageUrl = data.imageUrl;

      if (data.image) {
        const formData = new FormData();
        formData.append("image", data.image);

        const upload = await axios.post(`https://test-fe.mysellerpintar.com/api/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        imageUrl = upload.data.imageUrl;
      }

      const articlePayload = {
        title: data.title,
        userId: data.userId,
        categoryId: data.category,
        content: data.content,
        imageUrl: imageUrl,
      };
      await axios.put(`https://test-fe.mysellerpintar.com/api/articles/${id}`, articlePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Berhasil Mengupdate Article", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Gagal Mengupdate Article", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await axios.delete(`https://test-fe.mysellerpintar.com/api/articles/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Berhasil Menghapus Article", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Gagal Menghapus Article", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  return {
    getArticleById,
    articleById,
    addArticle,
    deleteArticle,
    editArticle,
  };
};
