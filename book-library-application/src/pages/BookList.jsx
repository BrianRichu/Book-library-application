// src/pages/BookList.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchBooks } from "../services/bookService";
import SearchBar from "../components/SearchBar";
import { Link } from "react-router-dom";

/* 🧠 POINTER NOTES:
   - Displays all books fetched from the Google Books API.
   - Includes a search bar for filtering books by query.
   - Removes "Harry Potter" as the default query.
   - Handles both search and display logic in one page.
*/

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // 🧩 Extract query parameter from the URL if available
  const searchQuery = new URLSearchParams(location.search).get("search");

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);

        // 🪄 If there's a search query, use it — otherwise load general books
        const searchTerm = searchQuery || query || "bestseller";
        const data = await fetchBooks(searchTerm);
        setBooks(data);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [searchQuery, query]);

  // 🔍 Handle manual search input
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      const data = await fetchBooks(query);
      setBooks(data);
    } catch (err) {
      setError("Error fetching search results.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading books...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* 🔍 Top Search Bar */}
      <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-6">
        <div className="flex items-center bg-gray-100 rounded-md p-2 shadow-sm">
          <input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none px-2 text-sm"
          />
          <button
            type="submit"
            className="text-gray-500 hover:text-gray-800 font-medium"
          >
            🔍
          </button>
        </div>
      </form>

      {/* 📚 Book List Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {books.map((book) => (
          <Link
            key={book.id}
            to={`/book/${book.id}`}
            className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3"
          >
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
              alt={book.volumeInfo.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-sm font-medium mt-2 truncate">
              {book.volumeInfo.title}
            </h3>
            <p className="text-xs text-gray-500">
              {book.volumeInfo.authors?.join(", ")}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
