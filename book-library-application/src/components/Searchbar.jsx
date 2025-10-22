// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

/* POINTERS:
   - If `onSearch` prop exists, call it with the term (used by Home).
   - Otherwise navigate to /books?search=term (used when SearchBar is global).
*/

export default function SearchBar({ onSearch, initial = "" }) {
  const [input, setInput] = useState(initial);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const term = input.trim();
    if (!term) return;

    if (typeof onSearch === "function") {
      // Inline search: parent component will handle fetching
      onSearch(term);
      return;
    }

    // No onSearch provided -> navigate to main BookList page with query param
    navigate(`/books?search=${encodeURIComponent(term)}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center bg-white p-3 rounded-lg shadow-md w-full max-w-md">
      <input
        type="text"
        placeholder="Search books..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow outline-none px-2 text-gray-700"
      />
      <button type="submit" className="text-gray-600 hover:text-blue-500 transition">
        <Search size={20} />
      </button>
    </form>
  );
}
