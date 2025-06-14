import { useNavigate } from "react-router-dom";
export default function ProfileDropdown({ user }) {
  const navigate = useNavigate();
  const isAdmin = user?.isAdmin;

  return (
    <div className="relative group mr-15">
      <span className="hover:cursor-pointer hover:scale-105 hover:text-zinc-50">
        Profile
      </span>
      <div className="absolute hidden group-hover:flex flex-col bg-zinc-800 p-2 rounded-md top-full -right-20 w-40 shadow-md z-50">
        {isAdmin && (
          <span
            onClick={() => navigate("/add-book")}
            className="hover:text-white hover:bg-zinc-700  cursor-pointer"
          >
            Add a new book
          </span>
        )}
        <span
          onClick={() => {
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="hover:text-white cursor-pointer hover:bg-zinc-700 "
        >
          Logout
        </span>
      </div>
    </div>
  );
}
