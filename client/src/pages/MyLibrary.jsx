import { useState, useEffect } from "react";
import axios from "axios";
import Nav from "../components/Required/Nav";
import { useNavigate } from "react-router-dom";
export default function MyLibrary() {
  const navigate = useNavigate();
  const [libraryData, setLibraryData] = useState(null);
  const [selectedSection, setSelectedSection] = useState("readBooks");
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const userId = user?._id;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/me", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user._id}/profile`,
          { withCredentials: true }
        );
        setLibraryData(res.data);
      } catch (err) {
        console.error("Error fetching library:", err);
      }
    };

    fetchData();
  }, [user]);

  const renderBooks = (books) => (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8">
      {books.map((book) => (
        <div
          key={book._id}
          onClick={() => navigate(`/book/${book._id}`)}
          className="p-4 border rounded shadow hover:scale-102 hover:cursor-pointer"
        >
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-[200px] object-cover mb-2"
          />
          <h3 className="font-semibold font-zinc-200">{book.title}</h3>
          <p className="text-sm text-gray-500 font-sky-500">{book.author}</p>
        </div>
      ))}
    </div>
  );

  const renderReviews = (reviews) => (
    <div className="flex flex-col gap-4 p-4">
      {reviews.map((review) => (
        <div key={review._id} className="p-4 border rounded shadow">
          <h3 className="font-semibold text-lg">{review.book?.title}</h3>
          <p className="text-sm text-gray-600 italic">
            by {review.book?.author}
          </p>
          <p className="mt-2">{review.content}</p>
          <p className="text-sm mt-1">Rating: {review.rating} / 5</p>
        </div>
      ))}
    </div>
  );

  if (loadingUser) {
    return (
      <div className="h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
        <Nav />
        <hr />
        <p className="p-4 text-zinc-200">Checking login status...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
        <Nav />
        <hr />
        <p className="p-4 text-red-500">
          You need to be logged in to view your library.
        </p>
      </div>
    );
  }

  if (!libraryData)
    return (
      <>
        <div className=" h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
          <Nav />
          <hr />
          <p className="text-2xl font-bold p-4 text-zinc-200">
            Loading your library...
          </p>
        </div>
      </>
    );

  return (
    <div className=" h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
      <Nav />
      <hr />
      <div className="w-full mx-auto p-4 text-zinc-200">
        <h2 className="text-2xl font-bold mb-4">My Library</h2>

        <select
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="mb-4 border p-2 border-zinc-200 rounded"
        >
          <option className="bg-zinc-800" value="readBooks">
            Books I've Read
          </option>
          <option className="bg-zinc-800" value="toReadBooks">
            Books To Read
          </option>
          <option className="bg-zinc-800" value="reviews">
            My Reviews
          </option>
        </select>

        {selectedSection === "readBooks" && renderBooks(libraryData.readBooks)}
        {selectedSection === "toReadBooks" &&
          renderBooks(libraryData.toReadBooks)}
        {selectedSection === "reviews" && renderReviews(libraryData.reviews)}
      </div>
    </div>
  );
}
