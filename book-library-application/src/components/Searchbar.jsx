// src/components/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim() !== "") {
      navigate(`/books?search=${query}`);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-md p-2 shadow-sm">
      <input
        type="text"
        placeholder="search by title, author, or keyword..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 bg-transparent outline-none px-2 text-sm"
      />
      <button onClick={handleSearch} className="text-gray-500 hover:text-gray-800">
        <Search size={18} />
      </button>
    </div>
  );
}
