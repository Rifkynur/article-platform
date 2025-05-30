"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useHandleArticle } from "@/hook/useHandleArticle";
import { Toaster } from "@/components/ui/sonner";
import { Article } from "@/utils/interface";
import { detailDateFormatter } from "@/utils/utils";
import ArticleSkeleton from "./ArticleSkeleton";

interface TableArticle {
  filteredArticles: Article[];
  handlePageChange: (newPage: number) => void;
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
  };
  isLoading: boolean;
  totalData: number;
}
const TableArticle = ({ filteredArticles, handlePageChange, pagination, isLoading, totalData }: TableArticle) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [articleId, setArticleId] = useState<string>("");
  const { deleteArticle } = useHandleArticle();

  const handleOpenModal = (id: string) => {
    setOpenDialog(true);
    setArticleId(id);
  };

  const hanldeDeleteArticle = (id: string) => {
    setOpenDialog(false);
    deleteArticle(id);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
  return (
    <>
      <Toaster position="top-right" />
      {!isLoading ? (
        <Table className="border-slate-200 bg-gray-50 relative">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center w-[225px]">Thumbnails</TableHead>
              <TableHead className="text-center w-[225px]">Title</TableHead>
              <TableHead className="text-center w-[225px]">Category</TableHead>
              <TableHead className="text-center w-[225px]">Created at</TableHead>
              <TableHead className="text-center w-[225px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell className="flex items-center justify-center w-[225px] text-slate-600">
                      <img src={data.imageUrl || "/asset/articleImage/imageNotFound.webp"} alt="article image" className="object-contain rounded-xl size-[60px]" />
                    </TableCell>
                    <TableCell className="whitespace-normal w-[225px] text-sm text-center text-slate-600">{data.title}</TableCell>
                    <TableCell className="w-[225px] text-sm  text-center text-slate-600">{data.category?.name}</TableCell>
                    <TableCell className="w-[225px] text-sm  text-center text-slate-600">{detailDateFormatter(data.updatedAt)}</TableCell>
                    <TableCell className="flex items-center justify-center w-full h-full">
                      <Button asChild variant={"link"} className="text-blue-600">
                        <Link href={`/dashboard/article/${data.id}`}>Preview</Link>
                      </Button>
                      <Button asChild variant={"link"} className="text-blue-600 ">
                        <Link href={`/dashboard/article/edit/${data.id}`}>Edit</Link>
                      </Button>
                      <Button variant={"link"} className="text-red-500" onClick={() => handleOpenModal(data.id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center font-semibold text-2xl py-10">
                  <img src="/asset/notFound.webp" alt="not found" className="md:w-80 mx-auto object-cover" />
                  Artilce Not Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        [...Array(4).keys()].map((_, index) => <ArticleSkeleton key={index} />)
      )}

      {totalData > 10 && (
        <div className="flex justify-center mt-8 py-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <button onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page === 1}>
                  Previous
                </button>
              </li>

              {[...Array(pagination.totalPages).keys()].map((pageNum) => (
                <li key={pageNum + 1}>
                  <button onClick={() => handlePageChange(pageNum + 1)} className={`${pagination.page === pageNum + 1 ? "font-bold bg-gray-200" : ""} px-2`}>
                    {pageNum + 1}
                  </button>
                </li>
              ))}

              <li>
                <button onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page === pagination.totalPages}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger className="flex items-center gap-2"></DialogTrigger>
        <DialogContent className="lg:w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Articles</DialogTitle>
            <DialogDescription>Deleting this article is permanent and cannot be undone. All related content will be removed.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setOpenDialog(false)} variant={"outline"}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-800" onClick={() => hanldeDeleteArticle(articleId)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TableArticle;
