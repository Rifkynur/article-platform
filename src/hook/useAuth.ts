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

  const { setLogin, setLogout } = useAuthStore();
  const router = useRouter();

  const logout = () => {
    try {
      localStorage.removeItem("token");
      setLogout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (data: loginPayload) => {
    try {
      const response = await axios.post(`${apiUrl}auth/login`, data);
      const token = response.data.token;
      setLogin(token);
      toast.success("Login Berhasil", {
        style: {
          backgroundColor: "#34D399",
          color: "#fff",
        },
      });
      router.push("/");
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
      router.push("/login");
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
  return {
    logout,
    login,
    register,
  };
};
