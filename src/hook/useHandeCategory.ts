"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Category } from "@/utils/interface";
import { toast } from "sonner";

interface AddCategory {
  userId: string;
  name: string;
}
interface EditCategory {
  id: string;
  name: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useHandleCategory = () => {
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);
  const getAllCategory = async () => {
    try {
      const response = await axios.get(`${apiUrl}categories`);
      setAllCategory(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addCategory = async (data: AddCategory) => {
    try {
      const response = await axios.post(`${apiUrl}categories`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllCategory();
      toast.success("Berhasil Mambahkan Category", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Gagal Mambahkan Category", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const editCategory = async (data: EditCategory) => {
    try {
      const response = await axios.put(`${apiUrl}categories/${data.id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllCategory();
      toast.success("Berhasil Mengedit Category", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Gagal Mengedit Category", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const deteleCategory = async (id: string) => {
    try {
      const response = await axios.delete(`${apiUrl}categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllCategory();
      toast.success("Berhasil Menghapus Category", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
    } catch (error) {
      toast.error("Gagal Menghapus Category", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);

  return {
    allCategory,
    addCategory,
    deteleCategory,
    getAllCategory,
    editCategory,
  };
};
