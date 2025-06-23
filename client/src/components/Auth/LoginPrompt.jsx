import { useNavigate } from "react-router-dom";
export default function LoginPrompt() {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  return (
    <div className="left flex md:w-1/2 md:pl-10 md:pr-10 rounded-r-2xl  ">
      <div className="flex flex-col items-center justify-center   gap-10 ">
        <p className="font-bold text-xl md:text-3xl text-center md:leading-13 text-zinc-200 px-10 pt-8 md:px-0 md:pt-0 ">
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
            to continue your Read<span className="text-sky-500">
              Ripple
            </span>{" "}
            journey.
          </p>
        </div>
      </div>
    </div>
  );
}
