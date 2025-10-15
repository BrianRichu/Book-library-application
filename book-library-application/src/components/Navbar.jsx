// src/components/Navbar.jsx

import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-blue-600 text-white py-4 shadow">
    <div className="max-w-5xl mx-auto flex justify-between items-center px-4">
      {/* 🏠 App name - links back to home */}
      <Link to="/" className="text-xl font-bold hover:text-gray-200">
        📚 Book Library
      </Link>
    </div>
  </nav>
);

export default Navbar;
