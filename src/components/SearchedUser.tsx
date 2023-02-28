import React, { useState } from "react";
import { isImage } from "../utils/helperFn";

const SearchedUser = ({ user }: any) => {
  const [selectedUser, setSelectedUser] = useState(false);

  const toggleSelectedUserHandler = () => {
    setSelectedUser((prevState) => !prevState);
  };

  return (
    <div
      className={`flex items-center mb-2 p-1 ${
        selectedUser ? "rounded-lg bg-color-grey-1" : ""
      } cursor-pointer`}
      onClick={toggleSelectedUserHandler}
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
