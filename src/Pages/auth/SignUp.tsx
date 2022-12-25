import { Link } from "react-router-dom";
import SignUpForm from "../../components/SignUpForm/SignUpForm";
import MediaIcons from "../../components/Utils/MediaIcons/MediaIcons";
import ThulloLogo from "../../asset/img/thullo-logo.png";

function SignUp() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="w-1/3 border border-color-border rounded-3xl p-10 sm:w-full sm:border-0  lg:p-6 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <img src={ThulloLogo} alt="thullo-logo" className="w-24 pb-3 cursor-pointer"/>
        <div className="text-left text-text-p-color">
          <h2 className=" text-lg font-semibold">
            Join thousands of learners from
            around the world
          </h2>
          <p className="my-3.5 text-base text-left">
            Master web development by making real-life projects. There are
            multiple paths for you to choose
          </p>
        </div>
        <SignUpForm />
        <p className="text-center my-2 md:my-6 xl:my-4">
          or continue with these social profile
        </p>
        <MediaIcons />
        <p className="mt-2.5 text-center md:mt-6 xl:mt-4">
          Already a member?
          <Link to={"/login"} className="text-color-btn ml-1">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignUp;
