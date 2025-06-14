import { useNavigate } from "react-router-dom";

export default function SignUpPrompt() {
  const navigate = useNavigate();
  function handleClick(path) {
    navigate(path);
  }
  return (
    <div className="right w-1/2 h-full ">
      <div className="flex flex-col pt-[15%] items-center gap-10 h-full w-full pl-10 pr-10 rounded-r-2xl text-zinc-200 ">
        <div>
          <p className="font-bold text-3xl text-center leading-13  text-zinc-200 ">
            {" "}
            Welcome back!
          </p>
          <span className=" text-2xl leading-13  text-zinc-200">
            Access your <span className=" text-sky-500">ReadRipple</span>{" "}
            account and dive back into your reading journey. Logging in is quick
            and easy!
          </span>
        </div>
        <div className="flex flex-col text-center  text-zinc-200">
          <p className="text-md">Not a member yet? </p>
          <p>
            <span
              className=" hover:underline hover:cursor-pointer hover:text-sky-500 "
              onClick={() => handleClick("/signup")}
            >
              Click here{" "}
            </span>
            to create your account
          </p>
        </div>
      </div>
    </div>
  );
}
