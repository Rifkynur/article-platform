"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hook/useAuth";

const schema = z.object({
  username: z.string().min(1, "Username field cannot be empty"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
});

type FormData = z.infer<typeof schema>;

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev); // Toggle visibility
  };

  const handleSubmit = async (data: FormData) => {
    await login(data);
    form.reset();
  };
  return (
    <section className="h-screen flex justify-center items-center bg-[#f3f4f6]">
      <Toaster position="top-right" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="rounded-md bg-white flex flex-col gap-2 px-2.5 py-6 shadow-md lg:py-10 lg:px-4 lg:w-[400px] lg:gap-3">
          <div className="mx-auto max-w-[134px] w-full mb-6">
            <img src="/asset/Frame.png" alt="logo" />
          </div>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <div>
                    <Input type="text" placeholder="Input Username" {...field} />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter your password" {...field} />
                    <button type="button" onClick={handleTogglePassword} className="absolute top-2 right-2 text-gray-500 cursor-pointer">
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-blue-600 w-full mt-4">
            Login
          </Button>
          <p className="text-center">
            Don’t have an account?
            <Button asChild variant={"link"} className="text-blue-600">
              <Link href={"/register"}>Register</Link>
            </Button>
          </p>
        </form>
      </Form>
    </section>
  );
};

export default Page;
