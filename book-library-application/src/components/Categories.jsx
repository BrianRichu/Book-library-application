// src/components/Categories.jsx
import BookCard from "./BookCard";

const categories = ["Fiction", "Science", "Fantasy", "Business"];

export default function Categories() {
  return (
    <section>
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-semibold text-lg">Categories</h2>
        <span className="text-sm text-gray-500">see more...</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {categories.map((category) => (
          <BookCard key={category} title={category} />
        ))}
      </div>
    </section>
  );
}
