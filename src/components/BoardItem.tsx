import React from "react";
import { useNavigate } from "react-router-dom";

interface Board {
  img: string;
  boardName: string;
  collaborators: undefined | string[];
}

const BoardItem = ({ img, boardName, collaborators }: Board) => {
  const navigate = useNavigate();
  const viewBoardHandler = () => navigate(`/user/board/${boardName}`);

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <div className="bg-color-white p-3 rounded-lg shadow-3xl shadow-[#F6F2F1] cursor-pointer">
      <div
        className="rounded-lg  w-full h-[10rem] overflow-hidden"
        onClick={viewBoardHandler}
      >
        <img
          src={img}
          alt="board-img"
          className=" hover:scale-[1.1] object-cover w-full h-[10rem] relative transition-all duration-300 ease-linear"
        />
      </div>

      <p
        className="mb-4 mt-2 font-semibold capitalize"
        onClick={viewBoardHandler}
      >
        {boardName}
      </p>
      <div className="flex items-center">
        {collaborators &&
          collaborators.slice(0, 3).map((userAvatar, i) => {
            return isImage(userAvatar) ? (
              <img
                src={userAvatar}
                alt="collab-img"
                key={i}
                className={`w-8 h-8 mr-1 sm:w-9 sm:h-9 relative rounded-full ${
                  i === 0 ? "z-20" : i === 1 ? "z-10" : "z-0"
                }`}
              />
            ) : (
              <p
                key={i}
                className="w-8 h-8 flex items-center justify-center bg-[#BDBDBD] mr-1 text-color-white rounded-lg text-[12px]"
              >
                {userAvatar.slice(0, 2).toUpperCase()}
              </p>
            );
          })}
        {collaborators && collaborators.slice(3).length > 0 && (
          <small className="ml-1 text-[#BDBDBD]">
            + {collaborators.slice(3).length}{" "}
            {collaborators.slice(3).length === 1 ? "person" : "people"}
          </small>
        )}
      </div>
    </div>
  );
};

export default BoardItem;
