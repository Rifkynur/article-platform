"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useHandleCategory } from "@/hook/useHandeCategory";

interface FilterArticle {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const FilterArticle = ({ searchQuery, setSearchQuery, setSelectedCategory }: FilterArticle) => {
  const { allCategory } = useHandleCategory();
  return (
    <div className="p-2 bg-gray-50 border-t border-slate-200 flex items-center justify-between gap-3">
      <div className="flex items-center gap-0.5">
        <Select onValueChange={(value) => setSelectedCategory(value)}>
          <SelectTrigger className="w-[80px] md:w-28">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {allCategory.map((data) => {
              return (
                <SelectItem value={data.name} key={data.id}>
                  {data.name}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <div className="flex items-center border rounded-lg px-2 md:w-56">
          <Search className="size-3.5" />
          <Input className="border-none outline-none bg-transparent shadow-none text-sm" placeholder="search by title" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-900 text-xs" asChild>
        <Link href={"/dashboard/article/add"}>
          <Plus />
          Add Article
        </Link>
      </Button>
    </div>
  );
};

export default FilterArticle;
