import { useState, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE_URL;

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`${API}/api/books/search?q=${searchTerm}`);

      const results = res.data;
      const query = searchTerm.trim();
      navigate("/search-results", { state: { results, query } });
    } catch (err) {
      console.error("Search failed", err);
    }
  };
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Logged in user:", user);
    setUser(localUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="Nav backdrop-blur-2xl bg-gradient-to-r from-zinc-900/100 via-zinc-800/90 to-zinc-900/80 flex items-center justify-between text-zinc-200 p-5  sticky top-0 z-99">
      <div className="leftNav">
        <span
          onClick={() => {
            navigate("/");
          }}
          className="text-xl font-semibold hover:cursor-pointer"
        >
          Read<span className="text-sky-500">Ripple</span>
        </span>
      </div>

      <div className="hidden md:flex justify-center items-center w-1/2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="w-full flex"
        >
          <input
            type="text"
            className="border rounded-2xl border-zinc-600 w-full h-9 p-2"
            placeholder="Search by title, author or genre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div className="flex items-center gap-6">
        <div className="md:hidden">
          <button onClick={() => setDropdownOpen(!dropdownOpen)}>
            {dropdownOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>

        <div className="hidden md:flex gap-6 items-center">
          <span
            onClick={() => navigate("/")}
            className="cursor-pointer hover:scale-105 hover:text-zinc-50"
          >
            Home
          </span>
          <span
            onClick={() => navigate("/library")}
            className="cursor-pointer hover:scale-105 hover:text-zinc-50"
          >
            My Library
          </span>
          <span className="cursor-pointer hover:scale-105 hover:text-zinc-50">
            Recommended for you
          </span>
          {user ? (
            <ProfileDropdown user={user} />
          ) : (
            <span
              onClick={() => navigate("/login")}
              className="cursor-pointer hover:scale-105 hover:text-zinc-50"
            >
              Log In / Sign Up
            </span>
          )}
        </div>
      </div>

      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-full bg-zinc-900 p-4 flex flex-col gap-4 z-50 md:hidden rounded-md shadow-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
              setDropdownOpen(false);
            }}
          >
            <div className="flex justify-start items-center p-4 gap-4">
              <input
                type="text"
                className="border rounded-2xl border-zinc-600 w-3/4 h-9 p-2 mb-3"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                className="inline-block mb-3 justify-center items-center"
                type="submit"
              >
                <FaSearch />
              </button>
            </div>
          </form>

          <span
            onClick={() => {
              navigate("/");
              setDropdownOpen(false);
            }}
            className="cursor-pointer hover:text-sky-400"
          >
            Home
          </span>
          <span
            onClick={() => {
              navigate("/library");
              setDropdownOpen(false);
            }}
            className="cursor-pointer hover:text-sky-400"
          >
            My Library
          </span>
          <span className="cursor-pointer hover:text-sky-400">
            Recommended for you
          </span>
          {user?.isAdmin ? (
            <span
              onClick={() => navigate("/add-book")}
              className="hover:text-white hover:bg-zinc-700  cursor-pointer"
            >
              Add a new book
            </span>
          ) : (
            <></>
          )}
          {user ? (
            <span
              onClick={() => {
                handleLogout();
                setDropdownOpen(false);
              }}
              className="cursor-pointer hover:text-sky-400"
            >
              Logout
            </span>
          ) : (
            <span
              onClick={() => {
                navigate("/login");
                setDropdownOpen(false);
              }}
              className="cursor-pointer hover:text-sky-400"
            >
              Login / Signup
            </span>
          )}
        </div>
      )}
    </div>
  );
}
