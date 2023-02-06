import React, { useState } from "react";
import logo from "../asset/img/thullo-logo.png";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { TbLogout } from "react-icons/tb";
import profileImg from "../asset/img/profile-pic.png";
import { ACCESS_TOKEN } from "../utils/constants";
import { useAppSelector } from "../hooks/customHook";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

const NavBar = () => {
  const [displayNav, setDisplayNav] = useState(false);
  const location: string = useLocation().pathname;
  const navigate = useNavigate();
  const { boardId } = useParams();

  const currentUserData: { data: { name: string } } | undefined =
    useAppSelector((state) => state.user.currentUserData);

  let name = "";
  if (currentUserData && currentUserData.data) {
    name = currentUserData.data.name;
  }

  const toggleNavHandler = () => {
    setDisplayNav(!displayNav);
  };

  const signOutHandler = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login");
  };

  return (
    <header
      className={`flex items-center px-16 h-20 2xl:px-8 sm:px-4 shadow-3xl opacity-90 shadow-[#F6F2F1]`}
    >
      <img src={logo} alt="logo-img" className="w-24  cursor-pointer" />
      {boardId && (
        <div className="flex items-center ml-10 lg:ml-auto sm:absolute sm:top-20 sm:left-0 sm:w-full sm:justify-between sm:p-4 ">
          <p className="pr-3 py-1 border-r sm:border-r-0 border-color-grey-2 text-text-p-color font-medium text-lg">
            {boardId}
          </p>
          <p
            className="flex items-center ml-5 bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3"
            onClick={() => {
              navigate("/user/dashboard");
            }}
          >
            <BsFillGrid3X3GapFill className="w-3 h-3 text-current mr-2" />
            All board
          </p>
        </div>
      )}
      {!location.includes("profile") && (
        <div
          className={`ml-auto mr-10 flex justify-between rounded-lg overflow-hidden shadow-md sm:hidden p-1 ${
            boardId && "lg:hidden"
          }`}
        >
          <input
            type="text"
            placeholder="keyword..."
            className="px-4 py-2 border-0 outline-0 w-[17rem]"
          />
          <button className=" bg-color-btn text-color-white px-6 rounded-lg text-sm">
            Search
          </button>
        </div>
      )}
      <div
        className={`flex items-center cursor-pointer sm:ml-auto ${
          location.includes("profile") && "ml-auto"
        }`}
        onClick={toggleNavHandler}
      >
        <img
          src={profileImg}
          alt={"profile-img"}
          className="w-11 h-11 mr-1 sm:w-9 sm:h-9"
        />
        <p className="font-medium">{name}</p>
        {displayNav ? (
          <RiArrowUpSFill className="ml-2 w-6 h-6" />
        ) : (
          <RiArrowDownSFill className="ml-2 w-6 h-6" />
        )}
      </div>
      {displayNav && (
        <div
          className={`absolute right-8 top-16  bg-color-white shadow-lg flex flex-col py-2 px-4 rounded-lg sm:w-full sm:right-0 ${
            displayNav ? "sm:animation-dowm" : "sm:animation-up"
          }`}
          onClick={toggleNavHandler}
        >
          <NavLink
            to="dashboard"
            className={(activeData) =>
              activeData.isActive
                ? "bg-color-grey-1 text-color-grey-4 flex items-center px-3 py-2 rounded-lg "
                : "bg-color-white text-color-grey-4 flex items-center px-3 py-2 rounded-lg "
            }
          >
            <MdDashboard className="mr-2" />
            Dashboard
          </NavLink>
          <NavLink
            to="profile"
            className={(activeData) =>
              activeData.isActive
                ? "bg-color-grey-1 text-color-grey-4 flex items-center px-3 py-2 rounded-lg "
                : "bg-color-white text-color-grey-4 flex items-center px-3 py-2 rounded-lg"
            }
          >
            <FaUserCircle className="mr-2" />
            Profile
          </NavLink>
          <button
            className="flex items-center border-t border-color-grey-2 px-3 py-2 mt-3 text-color-red"
            onClick={signOutHandler}
          >
            <TbLogout className="mr-2" /> Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
