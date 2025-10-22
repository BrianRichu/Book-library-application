// src/pages/BookList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";

/* POINTERS:
   - If URL has ?search=term, use that.
   - Else keep local query state (from SearchBar when used without onSearch).
   - Handle empty API responses (res.data.items may be undefined).
*/

export default function BookList() {
  const location = useLocation();
  const urlQuery = new URLSearchParams(location.search).get("search") || "";
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState(urlQuery || "books");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Keep query in sync with URL param when it changes
  useEffect(() => {
    if (urlQuery) setQuery(urlQuery);
  }, [urlQuery]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        // Use encodeURIComponent and limit results
        const res = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
        );

        // Google Books returns no items if nothing found — handle that
        const items = res.data?.items || [];
        setBooks(items);
        console.log("Fetched", items.length, "books for query:", query);
      } catch (err) {
        console.error("BookList fetch error:", err);
        setError("Failed to fetch books. Try again later.");
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    if (query && query.trim() !== "") fetchBooks();
    else {
      // If query empty, clear list
      setBooks([]);
      setLoading(false);
    }
  }, [query]);

  const handleSearch = (term) => {
    setQuery(term);
    // Note: since this SearchBar is used without onSearch on this page, the SearchBar will navigate
    // only if onSearch not provided; but we're passing onSearch below to avoid navigation.
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <Link to="/" className="text-blue-600 font-semibold hover:underline transition">
          ← Back to Home
        </Link>
      </div>

      {/* Use SearchBar in inline mode on BookList so it sets query directly */}
      <div className="max-w-lg mx-auto mb-6">
        <SearchBar onSearch={(term) => setQuery(term)} initial={query} />
      </div>

      {loading && <p className="text-center py-10">Loading books...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && books.length === 0 && (
        <p className="text-center text-gray-500 py-6">No results found for "{query}"</p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <img
              src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
              alt={book.volumeInfo.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h3 className="font-semibold text-gray-800 text-sm truncate">{book.volumeInfo.title}</h3>
            <p className="text-gray-600 text-xs">{book.volumeInfo.authors?.join(", ") || "Unknown Author"}</p>
            <Link to={`/book/${book.id}`} className="block mt-2 text-sm text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
