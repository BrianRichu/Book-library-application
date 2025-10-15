// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />           {/* Figma landing page */}
        <Route path="/books" element={<BookList />} />   {/* Existing list */}
        <Route path="/book/:id" element={<BookDetails />} /> {/* Details page */}
      </Routes>
    </Router>
  );
}

export default App;
