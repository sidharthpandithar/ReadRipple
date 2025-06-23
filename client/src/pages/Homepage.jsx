import Nav from "../components/Required/Nav";
import BookGrid from "../components/Required/BookGrid";
export default function Homepage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
      <Nav />
      <hr className="md:flex hidden" />
      <div className="min-h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 pb-4">
        <BookGrid />
      </div>
    </div>
  );
}
