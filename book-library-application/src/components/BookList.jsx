// src/components/BookList.jsx
import { useState, useEffect, useCallback } from "react";
import { fetchBooks } from "../services/bookService";
import debounce from "lodash.debounce";

const BookList = () => {
  const [query, setQuery] = useState("harry potter"); // default search
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Debounced function for fetching books
  const debouncedFetch = useCallback(
    debounce(async (searchTerm) => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchBooks(searchTerm);
        setBooks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 600), // waits 600ms after typing stops
    []
  );

  // When query changes, trigger debounced fetch
  useEffect(() => {
    if (query.trim() !== "") {
      debouncedFetch(query);
    }
  }, [query, debouncedFetch]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="w-full md:w-1/2 border rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Loading State */}
      {loading && <p className="text-center text-blue-500">Loading books...</p>}

      {/* Error Message */}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Books Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {!loading &&
          !error &&
          books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://via.placeholder.com/128x195?text=No+Cover"
                }
                alt={book.volumeInfo.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-3">
                <h2 className="font-semibold text-sm line-clamp-2">
                  {book.volumeInfo.title}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                </p>
              </div>
            </div>
          ))}
      </div>

      {!loading && !error && books.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No books found.</p>
      )}
    </div>
  );
};

export default BookList;
