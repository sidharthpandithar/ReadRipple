import Nav from "../components/Required/Nav";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API_BASE_URL;
import { ToastContainer, toast, Bounce } from "react-toastify";
export default function AddBook() {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    tags: "",
    genre: "",
    coverImage: "",
    publishDate: "",
    language: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const payload = {
        ...bookData,
        tags: bookData.tags.split(",").map((tag) => tag.trim()),
        publishDate: new Date(bookData.publishDate),
        userId: user._id,
      };

      await axios.post(`${API}/api/books`, payload);
      toast.success("Book Uploaded", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Book Upload Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
      <Nav />
      <hr />
      <div className="  text-white relative p-6">
        <div className="">
          <div className="max-w-2xl mx-auto  bg-zinc-800 border-1 p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 ">
              <input
                type="text"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                placeholder="Title"
                className="p-2 rounded text-zinc-200 border-1"
                required
              />

              <input
                type="text"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                placeholder="Author"
                className="p-2 rounded text-zinc-200 border-1"
                required
              />

              <input
                type="text"
                name="tags"
                value={bookData.tags}
                onChange={handleChange}
                placeholder="Tags (comma-separated)"
                className="p-2 rounded text-zinc-200 border-1"
              />

              <input
                type="text"
                name="genre"
                value={bookData.genre}
                onChange={handleChange}
                placeholder="Genre"
                className="p-2 rounded text-zinc-200 border-1"
              />

              <input
                type="text"
                name="coverImage"
                value={bookData.coverImage}
                onChange={handleChange}
                placeholder="Cover Image URL"
                className="p-2 rounded text-zinc-200 border-1"
              />

              <input
                type="date"
                name="publishDate"
                value={bookData.publishDate}
                onChange={handleChange}
                className="p-2 rounded text-zinc-200 border-1"
              />

              <input
                type="text"
                name="language"
                value={bookData.language}
                onChange={handleChange}
                placeholder="Language"
                className="p-2 rounded text-zinc-200 border-1"
              />

              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-700 hover:scale-103 hover:cursor-pointer py-2 px-4 rounded text-zinc-900 mt-4"
              >
                Add Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
