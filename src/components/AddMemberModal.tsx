import React, { useState } from "react";
import ReactLoading from "react-loading";
import { FiSearch } from "react-icons/fi";

const AddMemberModal = ({
  display, addMemberModalDisplay}: { display: string, addMemberModalDisplay: boolean }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchMemberName, setSearchMemberName] = useState("");
  const [displayedMembers, setDisplayedMembers] = useState([]);

  const searchMemberHandler = (e: { target: { value: string } }) => {
    setSearchMemberName(e.target.value);
  };

  const onSubmitMemberNameHandler = (e: { preventDefault: Function }) => {
    setTimeout(() => {setIsLoading(true)}, 1000)
    e.preventDefault();
    setDisplayedMembers([]);
    setIsLoading(false)
  };

  return (
    <div
      className={`w-[15.5rem] h-max transition-all duration-800 ease-linear bg-color-white rounded-lg p-2 shadow-4xl cursor-default ${
        display === "Members" && addMemberModalDisplay
          ? " visible"
          : "delay-300 hidden"
      }`}
    >
      <p className="text-xs font-semibold text-color-grey-4">Members</p>
      <p className="text-xs font-normal text-color-grey-3 leading-6">
        Assign members to this card
      </p>
      <form
        className={`w-full flex flex-col`}
        onSubmit={onSubmitMemberNameHandler}
      >
        <div className={`w-full flex  shadow-5xl rounded-lg mt-2.5 p-1 `}>
          <input
            type="text"
            placeholder="user..."
            className="px-2 py-1 border-0 outline-0 w-full !text-[12px]"
            value={searchMemberName}
            onChange={searchMemberHandler}
          />
          <button
            type="submit"
            className="bg-color-btn text-color-white p-2 flex justify-center items-center  rounded-lg text-sm flex-1  hover: transition-all duration-300 ease-in"
          >
            {isLoading ? (
              <ReactLoading type="spin" color="#fff" width={16} height={16} />
            ) : (
              <FiSearch className="w-4 h-4 text-color-white" />
            )}
          </button>
        </div>
        {displayedMembers && displayedMembers.length > 0 && (
          <button
            type="button"
            className=" self-center py-1.5 px-4 text-xs mt-2 bg-color-btn text-center font-medium text-color-white rounded-lg"
          >
            invite
          </button>
        )}
      </form>
    </div>
  );
};

export default AddMemberModal;
