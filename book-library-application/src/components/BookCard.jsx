// src/components/BookCard.jsx
export default function BookCard({ title }) {
  return (
    <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center text-sm font-medium">
      {title}
    </div>
  );
}
