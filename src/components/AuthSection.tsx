import MediaIcons from "../utils/MediaIcons/MediaIcons";
import ThulloLogo from "../asset/img/thullo-logo.png";
import React from "react";

const AuthSection = () => {
  return (
      <>
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
        <p className="mb-3 mt-1 after:content-[''] before:content-[''] flex after:flex-1 before:flex-1  after:border-b before:border-b  after:m-auto before:m-auto  after:ml-2 before:mr-2 text-color-border border-color-border">
          OR
        </p>
      </>
  );
};

export default AuthSection;
