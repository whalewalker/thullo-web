import React from "react";
import { useParams } from "react-router-dom";
import { IoMdLock } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import boardImg from "../../asset/img/test-board-img.jpg";
import collabs from "../../asset/img/profile-pic - Copy.png";
import DragAndDropBox from "../../components/DragAndDropBox";
import AddAnotherCardForm from "../../components/AddAnotherCardForm";
import { useSelector, useDispatch } from "react-redux";
import AddAnotherColumnForm from "../../components/AddAnotherColumnForm";
import { dragAndDropAction } from "../../slice/dragAndDropSlice";

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

  const dispatchFn = useDispatch();

  const columnId = useSelector(
    (state: { dragAndDrop: { columnId: string } }) => state.dragAndDrop.columnId
  );

  const columnsState = useSelector(
    (state: { dragAndDrop: { data: {} } }) => state.dragAndDrop.data
  );

  const newColumnModal = useSelector(
    (state: { dragAndDrop: { newColumnModal: boolean } }) =>
      state.dragAndDrop.newColumnModal
  );

  const toggleNewColumnModal = () => {
    dispatchFn(dragAndDropAction.toggleNewColumnModal(true));
  };

  const [boardItem] = boardsArray.filter(
    (board) => board.boardName === boardId
  );

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <section className="flex items-center flex-col px-8 pb-4 h-[calc(100vh-5rem)] ">
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
      <div className="w-full bg-[#F8F9FD] rounded-lg p-7 grid grid-cols-5 gap-7 overflow-y-scroll flex-1 items-start  scrollbar-thin scrollbar-thumb-[#E0E0E0] scrollbar-track-gray-100">
        <DragAndDropBox />
        {Object.values(columnsState).length < 5 && (
          <button
            className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg"
            onClick={toggleNewColumnModal}
          >
            Add another list
            <BsPlusLg className="text-current " />
          </button>
        )}
      </div>
      {columnId && <AddAnotherCardForm />}
      {newColumnModal && <AddAnotherColumnForm />}
    </section>
  );
};

export default BoardDetail;