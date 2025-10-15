// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";

/* 🧠 POINTER NOTES:
   - Displays a hero section with a title + search bar.
   - Shows "Top Books" (fetched from Google Books API).
   - Shows "Categories" with books under each category.
   - Keeps layout clean and matches the Figma feel.
*/

export default function Home() {
  const [topBooks, setTopBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const categories = ["Fiction", "Science", "Fantasy", "Business"];

  // 🧩 Fetch top books and books per category
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // Fetch Top Books
        const topRes = await fetch("https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=8");
        const topData = await topRes.json();
        setTopBooks(topData.items || []);

        // Fetch books by category
        const categoryResults = {};
        for (const category of categories) {
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=subject:${category}&maxResults=4`);
          const data = await res.json();
          categoryResults[category] = data.items || [];
        }
        setCategoryBooks(categoryResults);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) return <p className="text-center py-10">Loading content...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Navbar />

      {/* Hero Section */}
      <div className="mt-6 text-center">
        <h1 className="text-3xl font-bold leading-tight text-gray-800">
          Discover Your Next <span className="text-indigo-600">Favorite Book</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Search, explore, and read thousands of books from around the world.
        </p>
        <div className="mt-4 max-w-lg mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Top Books Section */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">🔥 Top Books</h2>
          <span className="text-sm text-gray-500 hover:underline cursor-pointer">
            see more...
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {topBooks.map((book) => (
            <BookCard
              key={book.id}
              title={book.volumeInfo.title}
              author={book.volumeInfo.authors?.join(", ")}
              thumbnail={book.volumeInfo.imageLinks?.thumbnail}
              id={book.id}
            />
          ))}
        </div>
      </section>

      {/* Category Sections */}
      {categories.map((category) => (
        <section key={category} className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">{category}</h2>
            <span className="text-sm text-gray-500 hover:underline cursor-pointer">
              see more...
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryBooks[category]?.map((book) => (
              <BookCard
                key={book.id}
                title={book.volumeInfo.title}
                author={book.volumeInfo.authors?.join(", ")}
                thumbnail={book.volumeInfo.imageLinks?.thumbnail}
                id={book.id}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
