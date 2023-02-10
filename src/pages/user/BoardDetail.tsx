import React from "react";
import { useParams } from "react-router-dom";
// import { IoMdLock } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import DragAndDropBox from "../../components/DragAndDropBox";
import AddAnotherCardForm from "../../components/AddAnotherCardForm";
// import AddAnotherColumnForm from "../../components/AddAnotherColumnForm";
import { dragAndDropAction } from "../../slice/dragAndDropSlice";
import { useAppSelector, useAppDispatch } from "../../hooks/customHook";
import { Board } from "../../utils/types";

const BoardDetail = () => {
  const { boardId } = useParams();

  const dispatchFn = useAppDispatch();

  const displayAddTaskForm = useAppSelector(
    (state) => state.board.displayAddTaskForm
  );

  const toggleNewColumnModal = () => {
    dispatchFn(dragAndDropAction.toggleNewColumnModal(true));
  };

  const boardList = useAppSelector((state) => state.board.boardList);

  const [boardItem] = boardList.filter(
    (board: Board) => board.name === boardId
  );

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  return (
    <section className="flex items-center flex-col px-8 pb-4 h-[calc(100vh-5rem)] sm:px-4">
      <div className="flex items-center my-8 w-full sm:mt-[4rem]  sm:flex-wrap sm:justify-between">
        {/* <p className="flex items-center bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3 sm:order-1">
          {boardItem.privateState && (
            <IoMdLock className="w-3 h-3 text-current mr-2" />
          )}
          {boardItem.privateState ? "Private" : "Public"}
        </p> */}

        <div className="flex items-center  sm:ml-0 sm:order-3 sm:w-full sm:mt-1">
          {boardItem.collaborators.length > 0 &&
            boardItem.collaborators.map((userAvatar: string, i: number) => {
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
          <div
            className={`w-8 h-8 flex items-center rounded-lg justify-center bg-color-btn ${
              boardItem.collaborators && boardItem.collaborators.length > 0
                ? "ml-2"
                : ""
            } cursor-pointer`}
          >
            <BsPlusLg className="text-color-white " />
          </div>
        </div>

        <p className="ml-auto flex items-center bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3 sm:order-2">
          <BsThreeDots className="w-3 h-3 text-current mr-2" />
          Show Menu
        </p>
      </div>
      <div className="w-full bg-[#F8F9FD] rounded-lg p-7 grid grid-cols-5 xl:grid-cols-17 gap-7 overflow-auto flex-1 items-start scroll ">
        <DragAndDropBox />
        {
          <button
            className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg"
            onClick={toggleNewColumnModal}
          >
            Add another list
            <BsPlusLg className="text-current " />
          </button>
        }
      </div>
      {displayAddTaskForm && <AddAnotherCardForm boardId={boardItem.id} />}
      {/* {newColumnModal && <AddAnotherColumnForm />} */}
    </section>
  );
};

export default BoardDetail;
