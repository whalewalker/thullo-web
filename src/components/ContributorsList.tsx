import React from "react";
import { BsPlusLg } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import Contributor from "./Contributor";

const ContributorsList = ({
  boardTag,
  boardRef,
  contributors,
  setMemberModalDisplay,
}: {
  boardTag: string;
  boardRef: string;
  contributors: [];
  setMemberModalDisplay: Function;
}) => {
  return (
    <div>
      <div
        className={`flex w-full items-center  rounded-lg py-1.5 px-2.5 mb-3 text-color-grey-3 font-medium text-sm `}
      >
        <FaUserFriends className="text-current w-2.5 h-2.5 mr-3" />
        <span>Members</span>
      </div>
      {contributors && contributors.length > 0 && (
        <div>
          {contributors.map((contributor: any, i) => (
            <Contributor
              key={i}
              contributor={contributor}
              boardTag={boardTag}
              boardRef={boardRef}
            />
          ))}
        </div>
      )}
      <button
        type="button"
        className="mt-3 flex p-2 items-center text-color-btn bg-[#DAE4FD] text-sm w-full justify-between rounded-lg"
        onClick={() => {
          setMemberModalDisplay(true);
        }}
      >
        <span className="text-xs">Assign a contributor</span>
        <BsPlusLg className="text-current w-2.5 h-2.5" />
      </button>
    </div>
  );
};

export default ContributorsList;
