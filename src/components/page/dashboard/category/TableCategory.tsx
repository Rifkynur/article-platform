"use client";
import React, { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useHandleCategory } from "@/hook/useHandeCategory";
import DeleteCatagoryModal from "./DeleteCatagoryModal";
import EditCategoryModal from "./EditCategoryModal";

const TableCategory = () => {
  const { allCategory, getAllCategory } = useHandleCategory();
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
      <Table className="border-slate-200 bg-gray-50 relative">
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="text-center w-[225px]">Category</TableHead>
            <TableHead className="text-center w-[225px]">Created at</TableHead>
            <TableHead className="text-center w-[225px]">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allCategory.map((data) => {
            return (
              <TableRow key={data.id}>
                <TableCell className="w-[225px] text-sm  text-center text-slate-600">{data.name}</TableCell>
                <TableCell className="w-[225px] text-sm  text-center text-slate-600">April 13, 2025 10:55:12</TableCell>
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
          })}
        </TableBody>
      </Table>
      <DeleteCatagoryModal categoryId={selectedCategoryId} categoryName={selectedCategoryName} open={deleteModalOpen} onOpenChange={setDeleteModalOpen} onDeleteSuccess={handleOnSuccess} />
      <EditCategoryModal categoryId={selectedCategoryId} categoryName={selectedCategoryName} open={editModalOpen} onOpenChange={setEditModalOpen} onEditSuccess={handleOnSuccess} />
    </>
  );
};

export default TableCategory;
