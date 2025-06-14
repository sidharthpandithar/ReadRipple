import { useNavigate } from "react-router-dom";
export default function LoginPrompt() {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  return (
    <div className="right w-1/2 h-full ">
      <div className="flex flex-col pt-[35%] items-center gap-10 h-full w-full pl-10 pr-10 rounded-r-2xl ">
        <p className="font-bold text-3xl text-center leading-13 text-zinc-200 ">
          {" "}
          Join us today and unlock a world of possibilities. Signing up is
          quick, easy, and free!
        </p>
        <div className="flex text-zinc-200 flex-col gap-2 justify-between items-center text-md">
          <p> Already have an account?</p>
          <p className=" text-md">
            <span
              onClick={() => {
                handleClick("/login");
              }}
              className=" text-zinc-200 hover:underline hover:cursor-pointer hover:text-sky-500"
            >
              {" "}
              Click here{" "}
            </span>
            to continue your ReadRipple journey.
          </p>
        </div>
      </div>
    </div>
  );
}
