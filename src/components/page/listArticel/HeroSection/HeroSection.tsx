"use client";
import React, { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search } from "lucide-react";
import { useHandleCategory } from "@/hook/useHandeCategory";
import { useDebounce } from "use-debounce";

interface HeroSection {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  searchQuery: string;
}

const HeroSection = ({ searchQuery, setSearchQuery, setSelectedCategory }: HeroSection) => {
  const { allCategory } = useHandleCategory();
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  useEffect(() => {
    setSearchQuery(debouncedSearchQuery);
  }, [debouncedSearchQuery, setSearchQuery]);

  return (
    <section
      className="relative bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/asset/bg.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-[#2563EBDB] opacity-[86%] z-[0]"></div>
      <div className="container py-44 relative z-[1]">
        <div className="flex flex-col justify-center items-center  text-white gap-3">
          <span className="font-bold text-sm lg:text-base">Blog genzet</span>
          <h1 className="text-4xl font-medium text-center lg:text-5xl max-w-[730px]">The Journal : Design Resources, Interviews, and Industry News</h1>
          <p className="text-xl lg:text-2xl">Your daily dose of design insights!</p>
        </div>
        <form className="flex flex-col mt-10 w-[337px] mx-auto gap-1 lg:mt-12 lg:flex-row lg:w-[608px]">
          <Select onValueChange={(value) => setSelectedCategory(value)}>
            <SelectTrigger className="bg-white ring-4 ring-blue-500  w-full p-2.5 lg:flex-1">
              <SelectValue placeholder="Select category" />
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
          <div className="flex ring-4 ring-blue-500 rounded-md items-center gap-1.5 px-3 bg-white lg:flex-2">
            <Search className="text-slate-400" />
            <Input
              placeholder="Search articles"
              className="border-none !focus-visible:outline-none !focus-visible:border-none focus:ring-none placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
