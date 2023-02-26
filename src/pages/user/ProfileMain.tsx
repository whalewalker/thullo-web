import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileImg from "../../asset/img/profile-pic.jpg";
import { useAppDispatch, useAppSelector } from "../../hooks/customHook";
import { getUserDetails } from "../../actions/userAction";
import Spinner from "../../components/Spinner";

const ProfileMain = () => {
  const navigate = useNavigate();
  const { currentUserData, isLoading, error } = useAppSelector(
    (state) => state.user
  );

  // interface UserData {
  //   data: {
  //     name: string;
  //     imageUrl: string;
  //     bio: string;
  //     phoneNumber: string;
  //     email: string;
  //   };
  // }

  // const currentUser: any = localStorage.getItem("userData");

  // const currentUserData = JSON.parse(currentUser);

  let imageUrl = "";
  let name = "";
  let bio = "";
  let phoneNumber = "";
  let email = "";

  if (currentUserData && currentUserData.data) {
    imageUrl = currentUserData.data.imageUrl;
    name = currentUserData.data.name;
    bio = currentUserData.data.bio;
    phoneNumber = currentUserData.data.phoneNumber;
    email = currentUserData.data.email;
  }

  const userData = [
    { title: "PHOTO", text: imageUrl },
    { title: "NAME", text: name },
    { title: "BIO", text: bio },
    { title: "PHONE", text: phoneNumber },
    { title: "EMAIL", text: email },
    { title: "PASSWORD", text: "************" },
  ];

  const dispatchFn = useAppDispatch();

  const navigateToEditHandler = () => {
    navigate("edit");
  };

  useEffect(() => {
    dispatchFn(getUserDetails());
  }, [dispatchFn]);

  return (
    <section className=" min-h-screen pt-8 pb-10">
      <div className="mx-auto w-2/3 flex flex-col items-center lg:w-5/6 sm:w-full">
        <h2 className="text-4xl text-color-black">Personal info</h2>
        <p className="text-color-black text-lg font-light mt-2">
          Basic info, like your name and photo
        </p>
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>An error occurred while fetching data. Please try again later.</p>
        ) : (
          <div className="w-full border border-color-grey-2 rounded-lg mt-11 sm:border-0">
            <div className="flex py-7 px-14 justify-between sm:px-5">
              <div>
                <p className="text-2xl">Profile</p>
                <p className="text-sm text-color-grey-3">
                  Some info may be visible to other people
                </p>
              </div>
              <button
                className="border border-color-grey-3 text-color-grey-3 self-start rounded-xl py-2 px-8 hover:bg-color-white hover:text-color-btn transition-all duration-300 ease-in hover:border-color-btn"
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
                      className="w-[7rem] h-[7rem] rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="text-lg w-2/3">{data.text}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileMain;
