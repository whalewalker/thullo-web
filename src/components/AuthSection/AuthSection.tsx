import { Link, useLocation } from "react-router-dom";
import SignUpForm from "./SignUpForm/SignUpForm";
import MediaIcons from "../Utils/MediaIcons/MediaIcons";
import ThulloLogo from "../../asset/img/thullo-logo.png";
import LoginForm from "./LoginForm/LoginForm";

const AuthSection = () => {
  const location: { pathname: string } = useLocation();

  return (
    <section className="flex justify-center items-center py-5 min-h-screen ">
      <div className="w-1/3 border border-color-border rounded-3xl px-10 py-7 sm:w-full sm:border-0  lg:p-6 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <img
          src={ThulloLogo}
          alt="thullo-logo"
          className="w-24 pb-3 cursor-pointer"
        />
        <div className="text-left text-text-p-color">
          <h2 className=" text-lg font-semibold">
            Join thousands of learners from around the world
          </h2>
          <p className="my-3.5 text-base text-left">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <MediaIcons />
        <p className="mb-3 mt-1 after:content-[''] before:content-[''] flex after:flex-1 before:flex-1  after:border-b-2 before:border-b-2  after:m-auto before:m-auto  after:ml-2 before:mr-2 text-color-border border-color-border">
          OR
        </p>
        {location.pathname.slice(1) === "login" ? (
          <LoginForm />
        ) : (
          <SignUpForm />
        )}
        <p className="mt-2.5 text-center md:mt-6 xl:mt-4">
          {location.pathname.slice(1) === "login"
            ? "Not a member?"
            : "Already a member?"}
          <Link
            to={location.pathname.slice(1) === "login" ? "/sign-up" : "/login"}
            className="text-color-btn ml-1"
          >
            {location.pathname.slice(1) === "login"
              ? "Create an account"
              : "Login"}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthSection;
