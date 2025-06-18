import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Bookpage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [book, setBook] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(5);
  const [hasReviewed, setHasReviewed] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [reviewPage, setReviewPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/me", { withCredentials: true })
      .then((res) => {
        console.log("User from session:", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error(
          "Failed to fetch user:",
          err.response?.data || err.message
        );
      });
  }, []);

  const fetchReviews = async (page = 1) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/reviews/book/${id}?page=${page}`
      );
      setReviews(res.data.reviews);
      setTotalPages(res.data.totalPages);
      setReviewPage(res.data.currentPage);
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    }
  };

  useEffect(() => {
    const fetchBook = async () => {
      const res = await axios.get(`http://localhost:5000/api/books/${id}`);
      setBook(res.data);

      const reviewed = res.data.reviews.some((r) => r.user?._id === user?._id);
      setHasReviewed(reviewed);
    };
    fetchBook();
    fetchReviews();
  }, [id, user?._id]);

  const handleAddToRead = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${user._id}/read`, {
        bookId: book._id,
      });
      alert("Book added to your 'Read' list.");
    } catch (err) {
      console.error(err);
      alert("Failed to add book to read list.");
    }
  };

  const handleAddToToRead = async () => {
    try {
      await axios.patch(`http://localhost:5000/api/users/${user._id}/to-read`, {
        bookId: book._id,
      });
      alert("Book added to your 'To Read' list.");
    } catch (err) {
      console.error(err);
      alert("Failed to add book to to-read list.");
    }
  };

  const handleReviewSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/reviews",
        {
          book: book._id,
          content: reviewText,
          rating,
          user: user._id,
        },
        { withCredentials: true }
      );
      alert("Review submitted!");
      setHasReviewed(true);
      setBook((prev) => ({
        ...prev,
        reviews: [...prev.reviews, res.data],
      }));
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to submit review.");
    }
  };

  if (!book) return <p className="text-white p-4">Loading book...</p>;

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-6">
      <div className="max-w-4xl mx-auto flex gap-6 flex-col md:flex-row items-center justify-center ">
        <img
          src={book.coverImage}
          alt={book.title}
          className="w-full md:w-[250px] h-[350px] object-cover rounded-lg shadow-md "
        />
        <div className="flex flex-col ">
          <div>
            <h1 className="text-3xl font-bold text-zinc-200">{book.title}</h1>
            <p className="text-lg  mb-2 text-sky-500">by {book.author}</p>
            <p className="text-yellow-400">
              ⭐ {book.averageRating || "No ratings yet"}
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <button
                onClick={handleAddToRead}
                className="bg-zinc-700 px-4 py-2 rounded text-zinc-200 hover:cursor-pointer hover:scale-103"
              >
                Read Already
              </button>
              <button
                onClick={handleAddToToRead}
                className="bg-sky-500 px-4 py-2 rounded text-zinc-900 hover:cursor-pointer hover:scale-103"
              >
                Add to To-Read
              </button>
            </div>

            {!hasReviewed && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-2">Leave a Review</h2>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full p-2 rounded text-zinc-200 border-1 h-full"
                  rows="4"
                  placeholder="Write your review..."
                />
                <div className="flex items-center mt-2 gap-2">
                  <label>Rating:</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="text-zinc-200 rounded"
                  >
                    {[5, 4, 3, 2, 1].map((r) => (
                      <option className=" bg-zinc-800" key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={handleReviewSubmit}
                    className="bg-yellow-500 px-3 py-1 rounded ml-4"
                  >
                    Submit Review
                  </button>
                </div>
              </div>
            )}

            {hasReviewed && (
              <p className="mt-6 text-green-500">
                You've already reviewed this book.
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-8  flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev) => (
          <div
            key={rev._id}
            className="bg-zinc-800 p-4 rounded mb-3 border-l-4 border-yellow-400"
          >
            <p className="text-sm text-gray-400">By {rev.user?.username}</p>
            <p className="text-yellow-400">⭐ {rev.rating}</p>
            <p>{rev.content}</p>
          </div>
        ))}

        <div className="flex gap-2 mt-4 items-center justify-center">
          <button
            disabled={reviewPage <= 1}
            onClick={() => fetchReviews(reviewPage - 1)}
            className="px-3 py-1 active:hover:scale-102 bg-zinc-700 rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span>
            Page {reviewPage} of {totalPages}
          </span>

          <button
            disabled={reviewPage >= totalPages}
            onClick={() => fetchReviews(reviewPage + 1)}
            className="px-3 py-1 bg-zinc-700 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
