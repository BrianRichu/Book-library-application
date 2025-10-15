// src/services/bookService.js
import axios from "axios";

const API_BASE_URL = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = import.meta.env.VITE_GOOGLE_BOOKS_API_KEY;

export const fetchBooks = async (query) => {
  if (!query) throw new Error("Search query is required");

  try {
    const response = await axios.get(API_BASE_URL, {
      params: {
        q: query,
        key: API_KEY,
        maxResults: 20,
      },
    },[]);

    return response.data.items || [];
  } catch (error) {
    if (error.response) {
      if (error.response.status === 429) {
        throw new Error("Too many requests — please try again later.");
      }
      throw new Error(`Error ${error.response.status}: ${error.response.statusText}`);
    } else if (error.request) {
      throw new Error("Network error — please check your connection.");
    } else {
      throw new Error("Unexpected error occurred while fetching books.");
    }
  }
};
