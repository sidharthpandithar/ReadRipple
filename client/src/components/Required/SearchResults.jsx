import { Link, useLocation } from "react-router-dom";
import Nav from "./Nav";

export default function SearchResults() {
  const location = useLocation();
  const results = location.state?.results || [];
  const query = location.state?.query || "";

  return (
    <div className="h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
      <Nav />
      <hr />
      <div className="text-white p-10 h-full w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
        <h2 className="text-xl mb-4">
          Found {results.length} Search Results for:{" "}
          <span className="text-sky-400">{query}</span>
        </h2>
        {results.length > 0 ? (
          <div className="md:grid md:grid-cols-7 flex flex-col gap-4">
            {results.map((book) => (
              <Link to={`/book/${book._id}`} key={book._id}>
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
              </Link>
            ))}
          </div>
        ) : (
          <p>No books found matching your search.</p>
        )}
      </div>
    </div>
  );
}
