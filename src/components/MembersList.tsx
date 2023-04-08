import React, {useEffect} from "react";
import user1 from "../asset/img/user1.jpg";
import user2 from "../asset/img/user2.jpg";
import user3 from "../asset/img/user3.jpg";
import { BsPlusLg } from "react-icons/bs";

const users = [
  {
    img: user1,
    name: "Daniel Jensen",
  },
  {
    img: user2,
    name: "Bianca Sosa",
  },
  {
    img: user3,
    name: "Waqar Bloom",
  },
];

const MembersList = ({
  display, setMemberModalDisplay}: { display: string, setMemberModalDisplay: Function }) => {

  useEffect(()=> {if (display === ""){
    setMemberModalDisplay(false);
  }}, [display, setMemberModalDisplay])

  return (
    <div
      className={`${
        display === "Members" ? "visible" : "delay-1000 hidden"
      } transition-all duration-800 ease-linear`}
    >
      <div>
        {users.map((user, i) => (
          <div key={i} className="flex items-center mb-2">
            <img
              src={user.img}
              alt={user.name}
              className="w-8 h-8 mr-3 rounded-lg"
            />
            <p className="text-xs text-text-p-color font-semibold">
              {user.name}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="mt-3 flex p-2 items-center text-color-btn bg-[#DAE4FD] text-sm w-full justify-between rounded-lg"
        onClick={() => {
          setMemberModalDisplay(true);
        }}
      >
        <span className="text-xs">Assign a member</span>
        <BsPlusLg className="text-current w-2.5 h-2.5" />
      </button>
    </div>
  );
};

export default MembersList;
