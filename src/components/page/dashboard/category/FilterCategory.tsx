"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import React, { useState } from "react";
import AddCategoryModal from "./AddCategoryModal";

const FilterCategory = () => {
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  return (
    <div className="p-2 w-full bg-gray-50 border-t border-slate-200 flex items-center justify-between gap-3 lg:p-4">
      <div className="flex items-center  border rounded-lg px-2 md:w-56">
        <Search className="size-3.5" />
        <Input className="border-none outline-none bg-transparent shadow-none text-sm" placeholder="search Category" />
      </div>
      <Button className="bg-blue-600 hover:bg-blue-900 text-xs ml-auto" onClick={() => setAddCategoryModal(true)}>
        <Plus />
        <span>Add Category</span>
      </Button>
      <AddCategoryModal open={addCategoryModal} onOpenChange={setAddCategoryModal} />
    </div>
  );
};

export default FilterCategory;
