// src/components/TopBooks.jsx
import BookCard from "./BookCard";

export default function TopBooks() {
  return (
    <section className="mt-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Top Books</h2>
        <span className="text-sm text-gray-500">see more...</span>
      </div>

      <div className="flex space-x-2 mb-4">
        {["This Week", "This Month", "This Year"].map((label) => (
          <button
            key={label}
            className="px-3 py-1 text-xs bg-gray-200 rounded-full hover:bg-gray-300"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <BookCard title="Book 1" />
        <BookCard title="Book 2" />
      </div>
    </section>
  );
}
