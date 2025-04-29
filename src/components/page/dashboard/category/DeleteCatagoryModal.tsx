"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useHandleCategory } from "@/hook/useHandeCategory";

interface DeleteCategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
  categoryName?: string;
  onDeleteSuccess: () => void;
}
const DeleteCatagoryModal = ({ open, onOpenChange, categoryId, categoryName, onDeleteSuccess }: DeleteCategoryModalProps) => {
  const { deteleCategory } = useHandleCategory();

  const handleDeleteCategory = (categoryId: string) => {
    deteleCategory(categoryId);
    onOpenChange(false);
    onDeleteSuccess();
  };
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger className="flex items-center gap-2"></DialogTrigger>
        <DialogContent className="lg:w-[400px]">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription>Delete category “{categoryName}”? This will remove it from master data permanently. </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => onOpenChange(false)} variant={"outline"}>
              Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-800" onClick={() => handleDeleteCategory(categoryId)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DeleteCatagoryModal;
