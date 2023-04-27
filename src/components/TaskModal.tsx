import React, {ReactElement, useEffect, useRef, useState} from "react";
import {boardAction} from "../slice/boardSlice";
import {useAppDispatch, useAppSelector} from "../hooks/customHook";
import {TaskColumn, Task} from "../utils/types";
import emptyImg from "../asset/img/no-image.jpg";
import {RxCross2} from "react-icons/rx";
import {FaUserCircle, FaUserFriends} from "react-icons/fa";
import {MdLabel} from "react-icons/md";
import {AiFillPicture} from "react-icons/ai";
import DescriptionEditor from "./DescriptionEditor";
import Attachments from "./Attachments";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import {fileHandler} from "../utils/helperFn";
import UnsplashModal from "./UnsplashModal";
import LabelModal from "./LabelModal";
import MembersList from "./MembersList";
import AddMemberModal from "./AddMemberModal";
import ImageCache from "./ImageCache";
import {updateTaskDetails} from "../actions/taskActions";

interface Btn {
    title: string;
    icon: ReactElement;
}

const actionBtn: Btn[] = [
    {
        title: "Cover",
        icon: <AiFillPicture className="text-current w-2.5 h-2.5 mr-3"/>,
    },
    {
        title: "Labels",
        icon: <MdLabel className="text-current w-2.5 h-2.5 mr-3"/>,
    },
    {
        title: "Members",
        icon: <FaUserFriends className="text-current w-2.5 h-2.5 mr-3"/>,
    },
];

const TaskModal = () => {
    const dispatch = useAppDispatch();
    const [addMemberModal, setAddMemberModal] = useState(false);
    const [displayModal, setDisplayModal] = useState("");
    const modalRef = useRef<any>(null);

    const closeModal = () => {
        setDisplayModal("");
    };

    useEffect(() => {
        const handleOutsideClick = (e: any) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal();
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [modalRef]);

    const boardItem = useAppSelector((state) => state.board.boardItem);
    const columnId = useAppSelector((state) => state.board.columnId);
    const cardId = useAppSelector((state) => state.board.taskId);

    const columnItem = boardItem.taskColumn.find(
        (column: TaskColumn) => column.id === columnId
    );

    const cardItem = columnItem?.tasks.find((task: Task) => task.id === cardId);

    const [imageUrl, setImageUrl] = useState(
        cardItem?.imageUrl || emptyImg
    );

    const closeTaskModalHandler: any = (e: {
        target: { dataset: { close: string } };
    }) => {
        if (e.target.dataset.close) {
            dispatch(
                boardAction.toggleDisplayTaskModal({
                    cardId: undefined,
                    columnId: undefined,
                })
            );
            localStorage.setItem("activeTaskModal", "");
        }
    };

    const onSetTaskImageHandler = (e: any) => {
        const imageUrl = fileHandler(e);
        setImageUrl(imageUrl);
        const boardTag = boardItem.boardTag;
        const boardRef = cardItem.boardRef;
        const file = e.target.files[0];

        dispatch(
            updateTaskDetails({boardTag, boardRef, file, imageUrl})
        );
    };

    return (
        <div
            onClick={closeTaskModalHandler}
            data-close="close"
            className="cursor-pointer w-screen h-screen flex items-center justify-center absolute top-0 left-0 bg-color-black-transparent "
        >
            <div className="w-[50%] h-[90vh] md:w-[90%] relative">
                <div
                    className="w-full h-full  bg-color-white p-6 rounded-lg  overflow-y-auto  scrollbar-thin scrollbar-thumb-color-grey-3 scrollbar-track-color-grey cursor-default ">
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
                                dispatch(
                                    boardAction.toggleDisplayTaskModal({
                                        cardId: undefined,
                                        columnId: undefined,
                                    })
                                );
                                localStorage.setItem("activeTaskModal", "");
                            }}
                        >
                            <RxCross2 className="w-6 h-6"/>
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
                            <DescriptionEditor
                                boardTag={boardItem.boardTag}
                                boardRef={cardItem.boardRef}
                                description={cardItem.description}
                            />
                            <Attachments
                                boardTag={boardItem.boardTag}
                                boardRef={cardItem.boardRef}
                                attachments={cardItem.attachments}
                            />
                            <CommentBox
                                taskId={cardItem.id}
                                boardRef={cardItem.boardRef}
                                columnId={columnItem.id}
                            />
                            <CommentList comments={cardItem.comments}/>
                        </div>
                        <div className="w-[25%] h-fit" ref={modalRef}>
                            <p className="flex items-center text-[#BDBDBD] text-xs font-semibold mb-3">
                                <FaUserCircle className="text-current w-2.5 h-2.5 mr-2"/>
                                Actions
                            </p>
                            {actionBtn.map((btn: Btn, i) => (
                                <button
                                    key={i}
                                    className={`flex w-full items-center rounded-lg py-1.5 px-2.5 mb-3 text-color-grey-3 font-medium text-sm ${
                                        displayModal === btn.title
                                            ? "bg-color-grey"
                                            : "bg-color-grey-1"
                                    }`}
                                    onClick={() => setDisplayModal(btn.title)}
                                >
                                    {btn.icon}
                                    {btn.title}
                                </button>
                            ))}
                            <MembersList
                                display={displayModal}
                                setMemberModalDisplay={setAddMemberModal}
                            />

                            <UnsplashModal
                                display={displayModal}
                                setUrl={setImageUrl}
                                setDisplay={setDisplayModal}
                                boardTag={boardItem.boardTag}
                                boardRef={cardItem.boardRef}
                            />
                            <LabelModal display={displayModal}/>
                            <AddMemberModal
                                display={displayModal}
                                addMemberModalDisplay={addMemberModal}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
