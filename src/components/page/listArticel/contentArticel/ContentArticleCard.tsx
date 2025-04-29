import React from "react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Category } from "@/utils/interface";
import { dateFormater, cleanTextAndLimitWords } from "@/utils/utils";

type ContentArticleProps = {
  id?: String;
  image?: string;
  createdArticle: Date | string;
  category?: Category;
  title: string;
  content: string;
};
const ContentArticleCard = ({ image, id, createdArticle, category, title, content }: ContentArticleProps) => {
  return (
    <Link href={`/article/${id}`} className="flex flex-col gap-4 justify-between">
      <div>
        <img src={image || "/asset/articleImage/imageNotFound.webp"} alt="article image" className="rounded-xl" />
      </div>
      <div className="flex flex-col gap-1.5 lg:gap-2">
        <span className="text-slate-600 text-xs lg:text-sm">{dateFormater(createdArticle)}</span>
        <h3 className="text-900 font-semibold lg:text-lg">{title}</h3>
        <p className="text-slate-600">{cleanTextAndLimitWords(content)}</p>
        <div className="flex items-center gap-2 lg:text-sm">
          <Badge variant="outline" className="rounded-full bg-blue-200 text-blue-900 lg:px-3 py-1 text-sm">
            {category?.name}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default ContentArticleCard;
