// src/services/bookService.js

/* 🧠 POINTER NOTES:
   - Uses axios or fetch to get books from Google Books API.
   - Handles errors gracefully.
   - Supports custom queries for searching.
*/

export async function fetchBooks(query) {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`
    );
    if (!response.ok) throw new Error("Failed to fetch books");
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
}
