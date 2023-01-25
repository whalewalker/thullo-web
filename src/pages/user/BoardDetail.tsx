import React from "react";
import { useParams } from "react-router-dom";
import { IoMdLock } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import boardImg from "../../asset/img/test-board-img.jpg";
import collabs from "../../asset/img/profile-pic - Copy.png";
import DragAndDropBox from "../../components/DragAndDropBox";

interface Board {
  img: string;
  boardName: string;
  collaborators: string[];
  privateState: boolean;
}

const boardsArray: Board[] = [
  {
    img: boardImg,
    boardName: "Devchallenges Board",
    collaborators: [collabs, collabs, collabs],
    privateState: false,
  },
  {
    img: boardImg,
    boardName: "Simple Project Board",
    collaborators: [collabs, "wale", "joker", "chi", "hellen"],
    privateState: true,
  },
  {
    img: boardImg,
    boardName: "Kanban Template",
    collaborators: [collabs, collabs],
    privateState: true,
  },
  {
    img: boardImg,
    boardName: "Habit Building Board",
    collaborators: [collabs, "sam", "abdul", "tobi"],
    privateState: false,
  },
];

const BoardDetail = () => {
  const { boardId } = useParams();

  const [boardItem] = boardsArray.filter(
    (board) => board.boardName === boardId
  );

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <section className="flex items-center flex-col px-8">
      <div className="flex items-center my-8 w-full">
        <p className="flex items-center bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3">
          {boardItem.privateState && (
            <IoMdLock className="w-3 h-3 text-current mr-2" />
          )}
          {boardItem.privateState ? "Private" : "Public"}
        </p>
        <div className="flex items-center ml-4">
          {boardItem.collaborators.map((userAvatar, i) => {
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
                className="w-8 h-8 flex items-center justify-center bg-[#BDBDBD] mr-1 text-color-white rounded-lg text-xs"
              >
                {userAvatar.slice(0, 2).toUpperCase()}
              </p>
            );
          })}
          <div className="w-8 h-8 flex items-center rounded-lg justify-center bg-color-btn ml-2 cursor-pointer">
            <BsPlusLg className="text-color-white " />
          </div>
        </div>
        <p className="ml-auto flex items-center bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3">
          <BsThreeDots className="w-3 h-3 text-current mr-2" />
          Show Menu
        </p>
      </div>
      <div className="w-full bg-[#F8F9FD] rounded-lg p-7 grid grid-cols-16 gap-7 ">
        <DragAndDropBox />
      </div>
    </section>
  );
};

export default BoardDetail;
