import { useEffect } from "react";
import { fetchBooks } from "./services/bookService";

function App() {
  useEffect(() => {
    fetchBooks("harry potter").then(console.log);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-blue-600">Book Library App</h1>
    </div>
  );
}

export default App;
