import React, { ReactElement, useState } from "react";
import { boardAction } from "../slice/boardSlice";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { dragDropColumn, Task } from "../utils/types";
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
import UnsplashModal from "./UnsplashModal";
import LabelModal from "./LabelModal";
import MembersList from "./MembersList";
import AddMemberModal from "./AddMemberModal";
import ImageCache from "./ImageCache";
// import { addImageToTaskCover } from "../actions/taskActions";

interface Btns {
  title: string;
  icon: ReactElement;
}

const actionBtns: Btns[] = [
  {
    title: "Cover",

    icon: <AiFillPicture className="text-current w-2.5 h-2.5 mr-3" />,
  },
  {
    title: "Labels",

    icon: <MdLabel className="text-current w-2.5 h-2.5 mr-3" />,
  },
  {
    title: "Members",
    icon: <FaUserFriends className="text-current w-2.5 h-2.5 mr-3" />,
  },
];

const TaskModal = ({ boardId }: { boardId: number }) => {
  const dispatchFn = useAppDispatch();
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [displayModal, setDisplayModal] = useState("");

  const boardItem = useAppSelector((state) => state.board.boardItem);
  const columnId = useAppSelector((state) => state.board.columnId);
  const cardId = useAppSelector((state) => state.board.taskId);

  const columnItem = boardItem.taskColumn.filter(
    (column: dragDropColumn) => column.name === columnId
  )[0];

  const [cardItem] = columnItem.tasks.filter(
    (task: Task) => task.id === cardId
  );

  const [imageUrl, setImgUrl] = useState(
    (cardItem && cardItem.imageUrl) || emptyImg
  );

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

  const onSetTaskImageHandler = (e: any) => {
    const imageUrl = fileHandler(e);
    setImgUrl(imageUrl);
    // const boardTag = boardItem.boardTag;
    // const boardRef = cardItem.boardRef;
    // const imageObj = e.target.files[0];
    // const imageName = imageObj.name.slice(0, -4);

    // dispatchFn(
    //   addImageToTaskCover({ boardTag, boardRef, imageName, imageObj, imageUrl })
    // );
  };

  return (
    <div
      onClick={closeTaskModalHandler}
      data-close="close"
      className="cursor-pointer w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-color-black-transparent "
    >
      <div className="w-[50%] h-[90vh] md:w-[90%] relative">
        <div className="w-full h-full  bg-color-white p-6 rounded-lg  overflow-y-auto  scrollbar-thin scrollbar-thumb-color-grey-3 scrollbar-track-color-grey cursor-default ">
          <div className="w-full h-[10rem]  rounded-lg relative">
            <label
              htmlFor="task-image"
              className="w-full h-[10rem] cursor-pointer"
            >
              <ImageCache
                img={imageUrl}
                boardRef={cardItem.boardRef}
                className="object-cover w-full h-[10rem] relative rounded-lg"
              />
            </label>

            <input
              className="hidden"
              type={"file"}
              accept="image/*"
              id="task-image"
              onChange={onSetTaskImageHandler}
            />
            <div
              className="absolute top-0 -translate-y-4 -right-3  p-2 rounded-lg bg-color-btn text-color-white cursor-pointer "
              onClick={() => {
                dispatchFn(
                  boardAction.toggleDisplayTaskModal({
                    cardId: undefined,
                    columnId: undefined,
                  })
                );
              }}
            >
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
              <Attachments
                boardTag={boardItem.boardTag}
                boardRef={cardItem.boardRef}
              />
              <CommentBox
                taskId={cardItem.id}
                boardRef={cardItem.boardRef}
                columnId={columnItem.id}
              />
              <CommentList comments={cardItem.comments} />
            </div>
            <div className="w-[25%] relative">
              <p className="flex items-center text-[#BDBDBD] text-xs font-semibold mb-3">
                <FaUserCircle className="text-current w-2.5 h-2.5 mr-2" />
                Actions
              </p>
              {actionBtns.map((btn: Btns, i) => (
                <button
                  key={i}
                  className={`flex w-full items-center  rounded-lg py-1.5 px-2.5 mb-3 text-color-grey-3 font-medium text-sm ${
                    displayModal === btn.title
                      ? "bg-color-grey"
                      : "bg-color-grey-1"
                  }`}
                  onClick={() => {
                    setDisplayModal(btn.title);
                  }}
                  onMouseOver={() => {
                    setDisplayModal(btn.title);
                  }}
                  onMouseLeave={() => {
                    setDisplayModal("");
                  }}
                >
                  {btn.icon}
                  {btn.title}
                </button>
              ))}
              <MembersList
                display={displayModal}
                setDisplay={setDisplayModal}
                setMemberModalDisplay={setAddMemberModal}
              />
            </div>
          </div>
        </div>
        <UnsplashModal
          display={displayModal}
          setUrl={setImgUrl}
          setDisplay={setDisplayModal}
        />
        <LabelModal display={displayModal} setDisplay={setDisplayModal} />
        <AddMemberModal
          display={displayModal}
          setDisplay={setDisplayModal}
          addMemberModalDisplay={addMemberModal}
          setMemberModalDisplay={setAddMemberModal}
        />
      </div>
    </div>
  );
};

export default TaskModal;
