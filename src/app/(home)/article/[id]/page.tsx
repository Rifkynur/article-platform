import React from "react";
import DetailArticle from "@/components/page/DetailArticle/DetailArticle";
import { Article } from "@/utils/interface";
import { getDetailArticle } from "@/hook/useGetDetailArticle";
import { notFound } from "next/navigation";
import OtherArticle from "@/components/page/DetailArticle/OtherArticle";

interface DetailArticleProps {
  params: { id: string };
}
export default async function Page(props: DetailArticleProps) {
  const { params } = props;

  if (!params?.id) {
    notFound();
  }

  try {
    const article: Article = await getDetailArticle(params.id);
    return (
      <>
        <DetailArticle article={article} />
        {/* <OtherArticle articleCategory={article.category.name} /> */}
      </>
    );
  } catch (error) {
    notFound();
  }
}

// export default Page;
