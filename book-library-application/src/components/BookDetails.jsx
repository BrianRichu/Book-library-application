// src/components/BookDetails.jsx

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

const BookDetails = () => {
  const { id } = useParams(); // 📘 Extract book ID from URL
  const [book, setBook] = useState(null); // Book details
  const [loading, setLoading] = useState(true); // Loading state

  // 🚀 Fetch book details when component mounts
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `https://www.googleapis.com/books/v1/volumes/${id}`
        );
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <Loader />;

  if (!book) return <p className="text-center text-red-500">Book not found.</p>;

  const info = book.volumeInfo;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6 bg-white rounded-lg shadow-lg p-4">
        {/* 🖼️ Book cover image */}
        <img
          src={info.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
          alt={info.title}
          className="w-48 h-auto mx-auto md:mx-0 rounded"
        />

        {/* 📄 Book details */}
        <div>
          <h2 className="text-2xl font-bold mb-2">{info.title}</h2>
          <p className="text-gray-700 mb-2">
            <strong>Author(s):</strong> {info.authors?.join(", ")}
          </p>
          <p className="text-gray-700 mb-2">
            <strong>Published:</strong> {info.publishedDate}
          </p>
          <p className="text-gray-600 mt-4">
            {info.description || "No description available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
