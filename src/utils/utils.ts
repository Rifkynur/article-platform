export const getInitial = (name: string | undefined) => {
  if (!name) return;

  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const dateFormater = (date: string | Date) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(parsedDate);
};

export const cleanTextAndLimitWords = (htmlString: string, wordLimit = 20) => {
  const textWithoutTags = htmlString.replace(/<[^>]*>/g, "");

  const words = textWithoutTags.split(/\s+/);

  const limitedWords = words.slice(0, wordLimit);

  return limitedWords.join(" ") + (words.length > wordLimit ? "..." : "");
};
