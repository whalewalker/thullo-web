import React from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../asset/img/profile-pic.png";

const ProfileMain = () => {
  const navigate = useNavigate();
  const userData = [
    { title: "PHOTO", image: profileImg },
    { title: "NAME", text: "Xanthe Neal" },
    {
      title: "BIO",
      text: "I am a software developer and a big fan of devchallenges...",
    },
    { title: "PHONE", text: "08167304689" },
    { title: "EMAIL", text: "xanthe.neal@gmail.com" },
    { title: "PASSWORD", text: "************" },
  ];

  const navigateToEditHandler = () => {
    navigate("edit");
  };

  return (
    <section className=" min-h-screen pt-8 pb-10">
      <div className="mx-auto w-2/3 flex flex-col items-center lg:w-5/6 sm:w-full">
        <h2 className="text-4xl text-color-black">Personal info</h2>
        <p className="text-color-black text-lg font-light mt-2">
          Basic info, like your name and photo
        </p>
        <div className="w-full border border-color-grey-2 rounded-lg mt-11 sm:border-0">
          <div className="flex py-7 px-14 justify-between sm:px-5">
            <div>
              <p className="text-2xl">Profile</p>
              <p className="text-sm text-color-grey-3">
                Some info may be visible to other people
              </p>
            </div>
            <button
              className="border border-color-grey-3 text-color-grey-3 self-start rounded-xl py-2 px-8"
              onClick={navigateToEditHandler}
            >
              edit
            </button>
          </div>
          {userData.map((data, i) => (
            <div
              key={i}
              className={`flex items-center border-t sm:border-b sm:last:border-b-0 sm:border-t-0  border-color-grey-2 px-14 sm:px-5 ${
                data.title === "PHOTO" ? "  py-2.5" : "py-7 "
              }`}
            >
              <p className="text-color-border text-sm w-1/3">{data.title}</p>
              {data.title === "PHOTO" ? (
                <div className=" w-2/3">
                  <img
                    src={profileImg}
                    alt={"profile-img"}
                    className="w-[7rem] h-[7rem]"
                  />
                </div>
              ) : (
                <div className="text-lg w-2/3">{data.text}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileMain;
