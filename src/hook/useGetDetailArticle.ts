const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const getDetailArticle = async (id: string) => {
  const res = await fetch(`${apiUrl}articles/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch article");
  }

  const data = await res.json();
  return data;
};
