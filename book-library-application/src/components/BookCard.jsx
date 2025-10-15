// src/components/BookCard.jsx
import { Link } from "react-router-dom";

/* 🧠 POINTER NOTES:
   - Displays a single book card.
   - Shows thumbnail, title, and author.
   - Links to the BookDetails page.
*/

export default function BookCard({ title, author, thumbnail, id }) {
  return (
    <Link
      to={`/book/${id}`}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-3"
    >
      <img
        src={thumbnail || "https://via.placeholder.com/150"}
        alt={title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-sm font-medium mt-2 truncate">{title}</h3>
      <p className="text-xs text-gray-500">{author}</p>
    </Link>
  );
}
