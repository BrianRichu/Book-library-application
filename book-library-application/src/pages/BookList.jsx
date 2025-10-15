// src/pages/BookList.jsx
import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { fetchBooks } from "../services/bookService";

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract query parameter from URL
  const query = new URLSearchParams(location.search).get("search") || "harry potter";

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(query);
        setBooks(data);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [query]);

  if (loading) return <p className="text-center py-10">Loading books...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-semibold mb-4">
        Search Results for "<span className="text-indigo-600">{query}</span>"
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className="bg-white rounded-lg shadow-md p-3 hover:shadow-lg transition"
          >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
              alt={book.volumeInfo.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-sm font-medium mt-2 truncate">{book.volumeInfo.title}</h3>
            <p className="text-xs text-gray-500">{book.volumeInfo.authors?.join(", ")}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
