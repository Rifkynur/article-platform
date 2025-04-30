"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthstore";
import axios from "axios";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useAuth = () => {
  interface loginPayload {
    username: string;
    password: string;
  }
  interface registerPayload extends loginPayload {
    role: string;
  }
  const router = useRouter();

  const { setLogin, setLogout, setUser } = useAuthStore((state) => state);

  const login = async (data: loginPayload) => {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, data);
      const token = response.data.token;
      setLogin(token);

      const userDetail = await axios.get(`${apiUrl}auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(userDetail.data);

      toast.success(`Selamat datang ${userDetail.data.username} `, {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
      setTimeout(() => {
        if (userDetail.data.role == "Admin") {
          console.log(userDetail.data.role);
          router.push("/dashboard/article");
        } else {
          router.push("/");
        }
      }, 1000);
    } catch (error) {
      toast.error("Username atau Password salah", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const register = async (data: registerPayload) => {
    try {
      await axios.post(`${apiUrl}auth/register`, data);
      toast.success("Register Berhasil", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      toast.error("Terjadi Kesalahan, Coba Lagi", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      console.log(error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setLogout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return {
    logout,
    login,
    register,
  };
};
