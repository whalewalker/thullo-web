import React from "react";
// import { IoMdLock } from "react-icons/io";
import { BsPlusLg } from "react-icons/bs";
import { BsThreeDots } from "react-icons/bs";
import DragAndDropBox from "../../components/DragAndDropBox";
import AddAnotherColumnForm from "../../components/AddAnotherColumnForm";
import { useAppSelector, useAppDispatch } from "../../hooks/customHook";
import { Board } from "../../utils/types";
import { boardAction } from "../../slice/boardSlice";
import TaskModal from "../../components/TaskModal";

const BoardDetail = () => {
  const dispatchFn = useAppDispatch();

  const displayTaskModal = useAppSelector(
    (state) => state.board.displayTaskModal
  );

  const displayAddColumnFormHandler = () => {
    dispatchFn(boardAction.toggleDispayAddColumnForm(true));
  };

  const boardItem: Board = useAppSelector((state) => state.board.boardItem);

  const displayAddColumnForm = useAppSelector(
    (state) => state.board.displayAddColumnForm
  );

  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
  };

  const closeForms: any = (e: { target: { dataset: { close: string } } }) => {
    if (e.target.dataset.close) {
      dispatchFn(boardAction.toggleDispayAddColumnForm(false));
    }
  };

  return (
    <section
      className="flex items-center flex-col px-8 pb-4 h-[calc(100vh-5rem)] sm:px-4"
      data-close="yes"
      onClick={closeForms}
    >
      <div className="flex items-center my-8 w-full sm:mt-[4rem]  sm:flex-wrap sm:justify-between">
        {/* <p className="flex items-center bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3 sm:order-1">
          {boardItem.privateState && (
            <IoMdLock className="w-3 h-3 text-current mr-2" />
          )}
          {boardItem.privateState ? "Private" : "Public"}
        </p> */}

        <div className="flex items-center  sm:ml-0 sm:order-3 sm:w-full sm:mt-1">
          {boardItem.collaborators && boardItem.collaborators.length > 0
            ? boardItem.collaborators.map((userAvatar: string, i: number) => {
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
              })
            : ""}
          <div
            className={`w-8 h-8 flex items-center rounded-lg justify-center bg-color-btn cursor-pointer`}
          >
            <BsPlusLg className="text-color-white " />
          </div>
        </div>

        <p className="ml-auto flex items-center bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3 sm:order-2">
          <BsThreeDots className="w-3 h-3 text-current mr-2" />
          Show Menu
        </p>
      </div>
      <div
        className="w-full bg-[#F8F9FD] rounded-lg p-7 grid grid-cols-5 xl:grid-cols-17 gap-7 overflow-auto flex-1 items-start scroll "
        data-close="yes"
      >
        <DragAndDropBox />
        {!displayAddColumnForm && (
          <button
            className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg"
            onClick={displayAddColumnFormHandler}
          >
            Add another list
            <BsPlusLg className="text-current " />
          </button>
        )}
        {displayAddColumnForm && <AddAnotherColumnForm />}
      </div>

      {displayTaskModal && <TaskModal boardId={boardItem.id} />}
    </section>
  );
};

export default BoardDetail;
