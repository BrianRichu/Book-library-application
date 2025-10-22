// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import axios from "axios";

/* POINTERS:
   - Home uses SearchBar in inline mode: pass onSearch to fetch results without navigating.
   - TopBooks & categories use initial fetch on mount.
*/

export default function Home() {
  const [topBooks, setTopBooks] = useState([]);
  const [categoryBooks, setCategoryBooks] = useState({});
  const [loading, setLoading] = useState(true);
  const categories = ["Fiction", "Science", "Fantasy", "Business"];
  const [searchResults, setSearchResults] = useState([]); // results from inline search
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        setLoading(true);
        // top books
        const topRes = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=bestseller&maxResults=8`
        );
        setTopBooks(topRes.data.items || []);

        // categories
        const categoryResults = {};
        await Promise.all(categories.map(async (category) => {
          const res = await axios.get(
            `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(category)}&maxResults=4`
          );
          categoryResults[category] = res.data.items || [];
        }));
        setCategoryBooks(categoryResults);
      } catch (err) {
        console.error("Home initial fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInitial();
  }, []);

  // Inline search handler passed to SearchBar
  const handleInlineSearch = async (term) => {
    try {
      setSearching(true);
      setSearchResults([]);
      const res = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(term)}&maxResults=16`
      );
      const items = res.data.items || [];
      setSearchResults(items);
      // optional: show searchResults in a separate section or override TopBooks view
    } catch (err) {
      console.error("Home search error:", err);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  if (loading) return <p className="text-center py-10">Loading content...</p>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Navbar />

      <div className="mt-6 text-center">
        <h1 className="text-3xl font-bold leading-tight text-gray-800">
          Discover Your Next <span className="text-indigo-600">Favorite Book</span>
        </h1>
        <p className="text-gray-500 mt-2 text-sm">Search, explore, and read thousands of books.</p>

        {/* Inline Search: pass handler so Home fetches results without navigating */}
        <div className="mt-4 max-w-lg mx-auto">
          <SearchBar onSearch={handleInlineSearch} />
        </div>
      </div>

      {/* If an inline search was made, show these results first */}
      {searchResults.length > 0 && (
        <section className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">Search Results</h2>
            <span className="text-sm text-gray-500">showing {searchResults.length} results</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {searchResults.map((b) => (
              <BookCard
                key={b.id}
                title={b.volumeInfo.title}
                author={b.volumeInfo.authors?.join(", ")}
                thumbnail={b.volumeInfo.imageLinks?.thumbnail}
                id={b.id}
              />
            ))}
          </div>
        </section>
      )}

      {/* Top Books */}
      <section className="mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-xl">🔥 Top Books</h2>
          <span className="text-sm text-gray-500 hover:underline cursor-pointer">see more...</span>
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

      {/* Categories */}
      {categories.map((category) => (
        <section key={category} className="mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-xl">{category}</h2>
            <span className="text-sm text-gray-500 hover:underline cursor-pointer">see more...</span>
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
