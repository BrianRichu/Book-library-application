// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar"
import TopBooks from "../components/TopBooks";
import Categories from "../components/Categories";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <Navbar />
      
      <div className="mt-6">
        <h1 className="text-2xl font-bold leading-tight">
          Find Your Next Favorite <span className="text-indigo-600">Book</span>.
        </h1>
      </div>

      <div className="mt-4">
        <SearchBar />
      </div>

      <div className="mt-6">
        <TopBooks />
      </div>

      <div className="mt-6">
        <Categories />
      </div>
    </div>
  );
}
