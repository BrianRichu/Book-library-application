// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center">
      <h1 className="text-lg font-semibold">📚 BookFinder</h1>
      <div className="flex space-x-4 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/books" className="hover:underline">Main</Link>
        <Link to="/book/1" className="hover:underline">Details</Link>
      </div>
    </nav>
  );
}
