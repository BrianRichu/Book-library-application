import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </div>
  );
}

export default App;
