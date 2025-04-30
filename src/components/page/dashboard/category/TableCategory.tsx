"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import DeleteCatagoryModal from "./DeleteCatagoryModal";
import EditCategoryModal from "./EditCategoryModal";
import { Category } from "@/utils/interface";
import { detailDateFormatter } from "@/utils/utils";
import CategorySkeleton from "./CategorySkeleton";

interface TableCategory {
  filteredCategory: Category[];
  handlePageChange: (newPage: number) => void;
  pagination: {
    page: number;
    totalPages: number;
    limit: number;
  };
  isLoading: boolean;
  totalCategory: number;
}
const TableCategory = ({ filteredCategory, handlePageChange, pagination, isLoading, totalCategory }: TableCategory) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
  const [selectedCategoryName, setSelectedCategoryName] = useState<string>();

  const openDeleteModal = (categoryId: string, categoryname: string | undefined) => {
    setSelectedCategoryId(categoryId);
    setDeleteModalOpen(true);
    setSelectedCategoryName(categoryname);
  };
  const openEditModal = (categoryId: string, categoryname: string | undefined) => {
    setSelectedCategoryId(categoryId);
    setEditModalOpen(true);
    setSelectedCategoryName(categoryname);
  };

  const handleOnSuccess = () => {
    window.location.reload();
  };

  return (
    <>
      {!isLoading ? (
        <Table className="border-slate-200 bg-gray-50 relative">
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead className="text-center w-[225px]">Category</TableHead>
              <TableHead className="text-center w-[225px]">Created at</TableHead>
              <TableHead className="text-center w-[225px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategory.length > 0 ? (
              filteredCategory.map((data) => {
                return (
                  <TableRow key={data.id}>
                    <TableCell className="w-[225px] text-sm  text-center text-slate-600">{data.name}</TableCell>
                    <TableCell className="w-[225px] text-sm  text-center text-slate-600">{data.updatedAt && detailDateFormatter(data.updatedAt)}</TableCell>
                    <TableCell className="flex items-center justify-center w-full h-full">
                      <div>
                        <Button variant={"link"} className="text-blue-600" onClick={() => openEditModal(data.id, data.name)}>
                          Edit
                        </Button>
                        <Button variant={"link"} className="text-red-600" onClick={() => openDeleteModal(data.id, data.name)}>
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center font-semibold text-2xl py-10">
                  <img src="/asset/notFound.webp" alt="not found" className="md:w-80 mx-auto object-cover" />
                  Category Not Found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        [...Array(4).keys()].map((_, index) => <CategorySkeleton key={index} />)
      )}

      {totalCategory > 10 && (
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
      <DeleteCatagoryModal categoryId={selectedCategoryId} categoryName={selectedCategoryName} open={deleteModalOpen} onOpenChange={setDeleteModalOpen} onDeleteSuccess={handleOnSuccess} />
      <EditCategoryModal categoryId={selectedCategoryId} categoryName={selectedCategoryName} open={editModalOpen} onOpenChange={setEditModalOpen} onEditSuccess={handleOnSuccess} />
    </>
  );
};

export default TableCategory;
