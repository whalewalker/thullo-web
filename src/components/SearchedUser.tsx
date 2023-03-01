import React from "react";
import { isImage } from "../utils/helperFn";
import { boardAction } from "../slice/boardSlice";
import { useAppDispatch } from "../hooks/customHook";

const SearchedUser = ({ user }: any) => {
  const dispatchFn = useAppDispatch();

  const selectUserHandler = () => {
    dispatchFn(boardAction.addSearchedContributor(user));
  };

  return (
    <div
      className={`flex items-center mb-2 p-1 cursor-pointer bg-color-grey-1 hover:bg-color-grey-2 transition-all duration-100 ease-linear`}
      onClick={selectUserHandler}
    >
      {isImage(user.imageUrl) ? (
        <img
          src={user.imageUrl}
          alt={user.name}
          className="w-8 h-8 mr-2 rounded-full"
        />
      ) : (
        <div className="w-8 h-8 flex items-center justify-center bg-[#BDBDBD]  mr-2 uppercase text-color-white rounded-lg text-xs">
          {user.name.slice(0, 2)}
        </div>
      )}
      <p>{user.name}</p>
    </div>
  );
};

export default SearchedUser;
