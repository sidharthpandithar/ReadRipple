import { useState, useEffect } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/books/search?q=${searchTerm}`
      );

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
    <div className="Nav flex justify-between text-zinc-200 p-5 backdrop:blur-md">
      <div className="leftNav">
        <span className="text-xl">
          Read<span className="text-sky-500">Ripple</span>
        </span>
      </div>

      <div className="flex justify-center items-center centerNav w-1/2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex justify-center items-center centerNav w-1/2"
        >
          <input
            type="text"
            className="border-1 rounded-2xl border-zinc-600 w-full h-9 p-2"
            placeholder="Search by title, author or genre"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      <div className="rightNav flex justify-end gap-10">
        <span
          onClick={() => navigate("/")}
          className="hover:cursor-pointer hover:scale-105 hover:text-zinc-50"
        >
          Home
        </span>
        <span
          onClick={() => navigate("/library")}
          className="hover:cursor-pointer hover:scale-105 hover:text-zinc-50"
        >
          My Library
        </span>

        <span className="hover:cursor-pointer hover:scale-105 hover:text-zinc-50">
          Recommended for you
        </span>

        {user ? (
          <ProfileDropdown user={user} />
        ) : (
          <span
            onClick={() => navigate("/login")}
            className="hover:cursor-pointer hover:scale-105 hover:text-zinc-50"
          >
            Log In / Sign Up
          </span>
        )}
      </div>
    </div>
  );
}
