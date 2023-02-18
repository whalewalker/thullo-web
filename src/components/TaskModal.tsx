import React, { ReactElement, useState } from "react";
import { boardAction } from "../slice/boardSlice";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { Board, dragDropColumn, Task } from "../utils/types";
import emptyImg from "../asset/img/no-image.jpg";
import { RxCross2 } from "react-icons/rx";
import { FaUserCircle, FaUserFriends } from "react-icons/fa";
import { MdLabel } from "react-icons/md";
import { AiFillPicture } from "react-icons/ai";
import DescriptionEditor from "./DescriptionEditor";
import Attachments from "./Attachments";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import { fileHandler } from "../utils/helperFn";

interface Btns {
  title: string;
  icon: ReactElement;
}

const actionBtns: Btns[] = [
  {
    title: "Members",
    icon: <FaUserFriends className="text-current w-2.5 h-2.5 mr-3" />,
  },
  {
    title: "Labels",

    icon: <MdLabel className="text-current w-2.5 h-2.5 mr-3" />,
  },
];

const TaskModal = ({ boardId }: { boardId: number }) => {
  const dispatchFn = useAppDispatch();

  const boardList = useAppSelector((state) => state.board.boardList);
  const columnId = useAppSelector((state) => state.board.columnId);
  const cardId = useAppSelector((state) => state.board.taskId);

  const [boardItem] = boardList.filter((board: Board) => board.id === boardId);

  const columnItem = boardItem.taskColumns.filter(
    (column: dragDropColumn) => column.id === columnId
  )[0];

  const [cardItem] = columnItem.tasks.filter(
    (task: Task) => task.id === cardId
  );

  const [imageUrl, setImgUrl] = useState(cardItem.imageUrl || emptyImg);

  const closeTaskModalHandler: any = (e: {
    target: { dataset: { close: string } };
  }) => {
    if (e.target.dataset.close) {
      dispatchFn(
        boardAction.toggleDisplayTaskModal({
          cardId: undefined,
          columnId: undefined,
        })
      );
    }
  };

  const onSetTaskImageHandler = (e: {}) => {
    const url = fileHandler(e);
    setImgUrl(url);
  };

  return (
    <div
      onClick={closeTaskModalHandler}
      data-close="close"
      className="cursor-pointer w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-color-black-transparent "
    >
      <div className="w-[50%] h-[85vh] bg-color-white p-6 rounded-lg  overflow-y-auto scrollbar-thin scrollbar-thumb-color-grey-3 scrollbar-track-color-grey cursor-default">
        <div className="w-full h-[10rem]  rounded-lg relative">
          <img
            src={imageUrl}
            alt={cardItem.name}
            className="  object-cover w-full h-[10rem] relative rounded-lg"
          />
          <input
            className="hidden"
            type={"file"}
            accept="image/*"
            id="task-image"
            onChange={onSetTaskImageHandler}
          />
          <div className="absolute top-0 -translate-y-4 -right-3  p-2 rounded-lg bg-color-btn text-color-white cursor-pointer ">
            <RxCross2 className="w-6 h-6" />
          </div>
        </div>
        <div className="flex mt-3 justify-between">
          <div className="w-[70%]">
            <p className="text-[#000000] font-normal text-base">
              {cardItem.name}
            </p>
            <p className="text-text-p-color text-xs font-semibold mt-1">
              <span className="text-[#BDBDBD] ">In list: </span>
              {columnItem.name}
            </p>
            <DescriptionEditor />
            <Attachments />
            <CommentBox
              taskId={cardItem.id}
              boardRef={cardItem.boardRef}
              columnId={columnItem.id}
            />
            <CommentList comments={cardItem.comments} />
          </div>
          <div className="w-[25%]">
            <p className="flex items-center text-[#BDBDBD] text-xs font-semibold mb-3">
              <FaUserCircle className="text-current w-2.5 h-2.5 mr-2" />
              Actions
            </p>
            {actionBtns.map((btn: Btns, i) => (
              <button
                key={i}
                className="flex w-full items-center bg-color-grey-1 rounded-lg py-1.5 px-2.5 mb-3 text-color-grey-3 font-medium text-sm "
              >
                {btn.icon}
                {btn.title}
              </button>
            ))}
            <label
              className="flex w-full items-center bg-color-grey-1 rounded-lg py-1.5 px-2.5 mb-3 text-color-grey-3 font-medium text-sm  cursor-pointer"
              htmlFor="task-image"
            >
              <AiFillPicture className="text-current w-2.5 h-2.5 mr-3" />
              <span>Cover</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;
