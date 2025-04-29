export const getDetailArticle = async (id: string) => {
  const res = await fetch(`https://test-fe.mysellerpintar.com/api/articles/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }

  const data = await res.json();
  return data;
};
