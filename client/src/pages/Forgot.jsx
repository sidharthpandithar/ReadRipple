import AuthContainer from "../components/Auth/AuthContainer";

export default function Forgot() {
  return (
    <div class="relative h-screen w-full">
      <div class="absolute inset-0">
        <div class="relative h-full w-full bg-black [&>div]:absolute [&>div]:h-[100%] [&>div]:w-[100%] [&>div]:rounded-full [&>div]:bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]">
          <div></div>
          <div className="flex flex-col justify-center items-center text-white ">
            <div className="container flex h-[70vh] w-[60vw] rounded-2xl bg-gradient-to-r from-zinc-600/10 via-zinc-700/40 to-zinc-900/40">
              Forgot Password
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
