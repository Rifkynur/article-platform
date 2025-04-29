"use client";
import axios from "axios";
import { useAuthStore } from "@/app/store/useAuthstore";
import { useRouter } from "next/navigation";

export const useGetUser = () => {
  const router = useRouter();
  const { setLogout, setUser } = useAuthStore();

  const getUser = async (token: string) => {
    try {
      const response = await axios.get("https://test-fe.mysellerpintar.com/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.log(token);
      setLogout();
      router.push("/login");
    }
  };

  return {
    getUser,
  };
};
