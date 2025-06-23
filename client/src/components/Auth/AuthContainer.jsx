export default function AuthContainer({
  leftContent,
  rightContent,
  footerContent,
}) {
  return (
    <div className=" h-full md:h-screen w-full">
      <div className=" h-full w-full bg-zinc-900 flex justify-center items-center">
        <div className="flex  flex-col justify-center items-center text-white">
          <div className="container flex md:flex-row flex-col   md:w-2/3 md:rounded-2xl bg-gradient-to-r from-zinc-600/10 via-zinc-700/40 to-zinc-900/40">
            {leftContent}

            {rightContent}
          </div>
          {footerContent}
        </div>
      </div>
    </div>
  );
}
