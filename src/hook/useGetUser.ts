"use client";
import axios from "axios";
import { useAuthStore } from "@/app/store/useAuthstore";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useGetUser = () => {
  const router = useRouter();
  const { setLogout, setUser } = useAuthStore();

  const getUser = async (token: string) => {
    try {
      const response = await axios.get(`${apiUrl}auth/profile`, {
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
