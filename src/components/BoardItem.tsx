import React from "react";
import { useNavigate } from "react-router-dom";

interface Board {
  img: string;
  boardName: string;
  collaborators: string[];
}

const BoardItem = ({ img, boardName, collaborators }: Board) => {
  const navigate = useNavigate();

  return (
    <div className="bg-color-white p-3 rounded-lg ">
      <div className="rounded-lg cursor-pointer w-full h-[9rem] overflow-hidden">
        <img
          src={img}
          alt="board-img"
          className=" hover:scale-[1.1] object-cover w-full h-[9rem] relative transition-all duration-300 ease-linear"
          onClick={() => {
            navigate(`/user/board/${boardName}`);
          }}
        />
      </div>

      <p
        onClick={() => {
          navigate(`/user/board/${boardName}`);
        }}
      >
        {boardName}
      </p>
      <div className="flex items-center">
        {collaborators.slice(0, 3).map((src, i) => {
          return (
            <img
              src={src}
              alt="collab-img"
              key={i}
              className={`w-11 h-11 mr-1 sm:w-9 sm:h-9 first:ml-0 -ml-3 relative rounded-full ${
                i === 0 ? "z-20" : i === 1 ? "z-10" : "z-0"
              }`}
            />
          );
        })}
        {collaborators.slice(3).length > 0 && (
          <p className="ml-1">
            + {collaborators.slice(3).length}{" "}
            {collaborators.slice(3).length === 1 ? "person" : "people"}
          </p>
        )}
      </div>
    </div>
  );
};

export default BoardItem;
