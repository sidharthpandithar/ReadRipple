import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_BASE_URL;

export default function BookGrid() {
  const navigate = useNavigate();
  const [sortOption, setSortOption] = useState("recent");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await axios.get(`${API}/api/books`);
      let data = res.data;

      if (sortOption === "recent") {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortOption === "rating") {
        data.sort((a, b) => b.averageRating - a.averageRating);
      } else if (sortOption === "reviewed") {
        data.sort((a, b) => {
          const lastA = a.reviews?.[a.reviews.length - 1]?.createdAt || 0;
          const lastB = b.reviews?.[b.reviews.length - 1]?.createdAt || 0;
          return new Date(lastB) - new Date(lastA);
        });
      }

      setBooks(data);
    };

    fetchBooks();
  }, [sortOption]);

  return (
    <div className="px-6 mt-6 md:h-full min-h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-zinc-200">Explore Books</h2>
        <select
          className="bg-zinc-700/30 text-zinc-200 text-sm border-1  px-3 py-1 rounded-md shadow-sm"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option className="bg-zinc-800 " value="recent">
            Recently Added
          </option>
          <option className="bg-zinc-800" value="rating">
            Highest Rated
          </option>
          <option className="bg-zinc-800" value="reviewed">
            Recently Reviewed
          </option>
        </select>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
        {books.map((book) => (
          <div
            key={book._id}
            onClick={() => navigate(`/book/${book._id}`)}
            className=" bg-zinc-800 shadow-md rounded-xl overflow-hidden transition hover:scale-[1.02] cursor-pointer"
          >
            <div className=" object-cover">
              <img
                src={book.coverImage}
                alt={book.title}
                className="w-full h-70 object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-zinc-200">
                {book.title}
              </h3>
              <p className="text-sm text-sky-500">by {book.author}</p>
              <p className="mt-2 text-sm text-yellow-600">
                {book.averageRating
                  ? `⭐ ${book.averageRating}/5`
                  : "No ratings yet"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
