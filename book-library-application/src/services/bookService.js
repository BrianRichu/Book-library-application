export const fetchBooks = async (query) => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}`
  );
  if (!response.ok) throw new Error("Failed to fetch books");
  const data = await response.json();
  return data.items || [];
};
