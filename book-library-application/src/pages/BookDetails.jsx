// src/pages/BookDetails.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if (!res.ok) throw new Error("Failed to fetch book details");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError("Unable to load book details.");
      }
    };
    fetchBookDetails();
  }, [id]);

  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!book) return <p className="text-center py-10">Loading...</p>;

  const { volumeInfo } = book;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Link to="/books" className="text-indigo-600 text-sm hover:underline">
        ← Back to list
      </Link>

      <div className="mt-4 flex flex-col md:flex-row gap-6">
        <img
          src={volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={volumeInfo.title}
          className="w-48 h-64 object-cover rounded shadow"
        />

        <div>
          <h1 className="text-2xl font-semibold">{volumeInfo.title}</h1>
          <p className="text-gray-600 mt-1">{volumeInfo.authors?.join(", ")}</p>

          <p className="mt-4 text-sm text-gray-700 leading-relaxed">
            {volumeInfo.description || "No description available."}
          </p>

          <a
            href={volumeInfo.previewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-sm text-white bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
          >
            Preview Book
          </a>
        </div>
      </div>
    </div>
  );
}
