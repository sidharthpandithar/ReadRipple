export default function Button({ text }) {
  return (
    <button
      type="submit"
      className="w-full mt-5 border-1 border-zinc-800/50 hover:cursor-pointer hover:bg-zinc-800 h-10 bg-zinc-950 rounded-md"
    >
      {text}
    </button>
  );
}
