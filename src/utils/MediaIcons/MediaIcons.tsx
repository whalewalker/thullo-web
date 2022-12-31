import fbLogo from "../../asset/img/fb-logo.png";
import githubLogo from "../../asset/img/github-logo.png";
import googleLogo from "../../asset/img/google-logo.png";
import twitterLogo from "../../asset/img/twitter-logo.png";
import { useLocation } from "react-router-dom";
import React from "react";

function MediaIcons() {
  const location: { pathname: string } = useLocation();

  const icons: any[] = [
    { logo: googleLogo, name: "Google" },
    { logo: fbLogo, name: "Facebook" },
    { logo: twitterLogo, name: "Twitter" },
    { logo: githubLogo, name: "Github" },
  ].map((logo, i) => (
    <div
      key={i}
      className="flex w-full py-2 px-4 
      items-center text-color-border border border-color-border rounded-lg  mr-2 hover:text-color-btn  mb-2 hover:border-color-btn transition-all ease-in duration-300 cursor-pointer "
    >
      <img src={logo.logo} alt={logo.name} className="w-6 h-6" />
      <p className=" mx-auto text-color-black">
        {location.pathname.slice(1) === "login" ? "Login" : "Sign up"} with
        {` ${logo.name}`}
      </p>
    </div>
  ));

  return <div className="flex flex-col mx-auto">{icons}</div>;
}

export default MediaIcons;
