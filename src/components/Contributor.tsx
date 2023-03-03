import React, { useState } from "react";
import { isImage } from "../utils/helperFn";
import { RxCross2 } from "react-icons/rx";
import { useAppDispatch } from "../hooks/customHook";
import { removeContributorFromTask } from "../actions/taskActions";
import { getTaskContributors } from "../actions/taskActions";

const Contributor = ({ contributor, boardTag, boardRef }: any) => {
  const [onHover, setOnHover] = useState(false);

  const dispatchFn = useAppDispatch();

  const removeContributorInTask = async () => {
    await dispatchFn(
      removeContributorFromTask({ boardTag, boardRef, contributor })
    );
    // dispatchFn(getTaskContributors({ boardTag, boardRef }));
    console.log("inhere");
  };

  return (
    <div
      className={`flex items-center mb-1 transition-all duration-100 ease-in cursor-pointer p-1 ${
        onHover ? "bg-color-grey rounded-md" : ""
      }`}
      onMouseEnter={() => {
        setOnHover(true);
      }}
      onMouseLeave={() => {
        setOnHover(false);
      }}
    >
      {isImage(contributor.imageUrl) ? (
        <img
          src={contributor.imageUrl}
          alt={contributor.name}
          className="w-8 h-8 mr-2 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center bg-[#BDBDBD]  mr-2 uppercase text-color-white rounded-lg text-xs">
          {contributor.name.slice(0, 2)}
        </div>
      )}
      <p className="text-xs">{contributor.name}</p>
      <RxCross2
        className={`w-3 h-3 text-color-black ml-auto cursor-pointer ${
          onHover ? "block" : "hidden"
        }`}
        onClick={removeContributorInTask}
      />
    </div>
  );
};

export default Contributor;
