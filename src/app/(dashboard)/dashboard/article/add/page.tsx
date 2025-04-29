"use client";
import React, { useState, useRef, useEffect } from "react";
import { Editor } from "@/components/page/dashboard/article/Editor";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useHandleArticle } from "@/hook/useHandleArticle";
import { useHandleCategory } from "@/hook/useHandeCategory";
import { useAuthStore } from "@/app/store/useAuthstore";
import ArticlePreview from "@/components/page/dashboard/article/ArticlePreview";

const formSchema = z.object({
  title: z.string().min(1, { message: "Please enter title" }),
  category: z.string().min(1, { message: "Please enter category" }),
  content: z.string().min(1, { message: "Content field cannot be empty" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file || true, { message: "Image is required" }),
});

type FormSchema = z.infer<typeof formSchema>;

type formData = {
  title: string;
  image?: File;
  content: string;
};

const Page = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<formData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { allCategory } = useHandleCategory();
  const { addArticle } = useHandleArticle();
  const { user } = useAuthStore((state) => state);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      content: "",
      image: undefined,
    },
  });
  const handlePreview = async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      toast.error("Form is Required", {
        style: {
          backgroundColor: "#DC2626",
          color: "#fff",
        },
      });
      return;
    }
    const data = form.getValues();
    const { title, image, content } = data;
    setFormData({ title, image, content });
    setIsModalOpen(true);
  };

  const onSubmit = (data: FormSchema) => {
    const completeData = { ...data, userId: user?.id };
    addArticle(completeData);
    form.reset();
    setTimeout(() => {
      router.push("/dashboard/article");
    }, 100);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="mx-auto p-6 w-full bg-gray-50 rounded-xl ">
      <ArticlePreview open={isModalOpen} onOpenChange={setIsModalOpen} title={formData?.title} image={formData?.image} content={formData?.content} />
      <Toaster position="top-right" />
      <div className="flex items-center text-sm mb-6 gap-3 font-medium cursor-pointer" onClick={() => router.push("/dashboard/article")}>
        <ArrowLeft />
        <span>Create Articles</span>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Image</FormLabel>
                <FormControl>
                  <div className="relative px-3 bg-white w-48 h-36 border border-dashed border-gray-400 rounded-md lg:h-40 lg:w-52">
                    {imagePreview && <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded-md cursor-pointer" onClick={handleImageClick} />}

                    <input
                      type="file"
                      accept="image/jpeg, image/png,"
                      onChange={(e) => {
                        const file = e.target.files ? e.target.files[0] : null;
                        if (file) {
                          field.onChange(file);
                          const objectUrl = URL.createObjectURL(file);
                          setImagePreview(objectUrl);
                        }
                      }}
                      id="file-input"
                      ref={fileInputRef}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />

                    {!imagePreview && (
                      <div className="flex items-center justify-center flex-col h-full w-40">
                        <ImagePlus size={24} className="text-gray-500 mx-auto" />
                        <span className="text-gray-500">Click to select files</span>
                        <span className="text-gray-500 text-center">Suport File Type : jpg or png</span>
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter title..." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <div>
                    <Select {...field} value={field.value} onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Category" />
                      </SelectTrigger>
                      <small className="text-slate-500">
                        The existing category list can be seen in the
                        <Link className="text-blue-600 mx-1" href={"/dashboard/category"}>
                          Category
                        </Link>
                        menu
                      </small>
                      <SelectContent>
                        {allCategory.map((data) => {
                          return (
                            <SelectItem value={data.id} key={data.id}>
                              {data.name}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Editor value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex w-full gap-2 justify-end">
            <Button type="button" variant={"outline"}>
              Cancel
            </Button>
            <Button type="button" variant={"secondary"} onClick={handlePreview}>
              Preview
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-800">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Page;
