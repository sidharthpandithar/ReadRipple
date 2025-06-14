import Nav from "../components/Required/Nav";
import Bookpage from "../components/Bookpage/Bookpage";
export default function ViewBook() {
  return (
    <div className="h-screen w-full bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
      <Nav />
      <hr />
      <Bookpage />
    </div>
  );
}
