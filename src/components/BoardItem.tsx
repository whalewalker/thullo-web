import {useNavigate} from "react-router-dom";
import {boardAction} from "../slice/boardSlice";
import {useAppDispatch} from "../hooks/customHook";
import {getBoardItem} from "../actions/boardAction";
import noImage from "../asset/img/no-image.jpg";
import {BsThreeDots} from "react-icons/bs";
import React, {useState} from "react";
import ThreeDotModal from "./ThreeDotModal";
import Btn from "./Btn";
import AddBoardModal from "./AddBoardModal";
import DeleteWarningModal from "./DeleteWarningModal";
import Members from "./Members";


const BoardUpdateModal = ({
                              boardId,
                              display,
                              setDisplay,
                              setDisplayEditBoardForm,
                          }: {
    boardId: number;
    display: null | number;
    setDisplay: Function;
    setDisplayEditBoardForm: Function;
}) => {
    const [deleteModal, setDeleteModal] = useState(false);

    const displayEditBoardFormHandler = () => {
        setDisplayEditBoardForm(true);
    }
    const onCloseModalHandler = () => {
        setDeleteModal(false);
    }

    const deleteBoard = () => {
        // Delete board
        console.log("Board deleted")
    }

    return (
        <>
            <DeleteWarningModal
                title="Delete board?"
                message='This board will permanently delete. This cannot be undone.'
                onConfirm={deleteBoard}
                onCancel={onCloseModalHandler}
                isOpen={deleteModal}
            />

            <ThreeDotModal
                className={`absolute top-[14.5rem] -right-[6rem] ${
                    display === boardId
                        ? "opacity-100 visible scale-100 -translate-y-5 z-50"
                        : "opacity-0 hidden scale-0 translate-y-0"
                }`}
                onClick={() => setDisplay(null)}
            >
                <Btn
                    onClick={displayEditBoardFormHandler}
                    label="Edit board"
                    className="text-xs py-1.5 text-color-grey-3 block hover:text-color-black transition-all duration-150 ease-in"/>
                <hr className="border-color-grey-2 w-fu11"/>
                <Btn
                    onClick={() => setDeleteModal(true)}
                    label="Delete board"
                    className="text-xs py-1.5 text-color-grey-3 block hover:text-color-black transition-all duration-150 ease-in"/>
            </ThreeDotModal>
        </>
    );
};


const BoardItem = ({
                       img,
                       boardName,
                       collaborators,
                       boardRef,
                       boardTag,
                       boardId,
                       boardVisibility,
                       displayUpdateBoardModal,
                       setDisplayUpdateBoardModal,
                   }: {
    img: string;
    boardName: string;
    collaborators: [];
    boardRef: string;
    boardTag: string;
    boardId: number;
    boardVisibility: string;
    displayUpdateBoardModal: null | number;
    setDisplayUpdateBoardModal: Function;
}) => {
    const [displayEditBoardForm, setDisplayEditBoardForm] =
        useState<boolean>(false);

    const dispatchFn = useAppDispatch();
    const navigate = useNavigate();

    const viewBoardHandler: any = async (e: {
        target: { dataset: { board: string } };
    }) => {
        const reference = e.target.dataset.board;
        await dispatchFn(getBoardItem(reference));

        dispatchFn(boardAction.setBoardTag(reference));
        navigate(`/user/board/${boardName}`);
    };

    const displayUpdateBoardModalHandler = () => {
        setDisplayUpdateBoardModal(boardId);
    };

    return (
        <div
            className="bg-color-white p-3 rounded-lg shadow-3xl  cursor-pointer relative"
            data-closeinput="true"
        >

            <div
                className="rounded-lg  w-full h-[10rem] overflow-hidden"
                onClick={viewBoardHandler}
            >
                <img
                    src={img || noImage}
                    data-board={boardRef}
                    alt="board-img"
                    className=" hover:scale-[1.1] object-cover w-full h-[10rem] relative transition-all duration-300 ease-linear"
                />
            </div>

            <div className="flex justify-between items-center my-4 ">
                <p
                    className=" font-semibold capitalize cursor-pointer"
                    onClick={viewBoardHandler}
                    data-board={boardRef}
                >
                    {boardName}
                </p>
                <BsThreeDots
                    className="w-[1.2rem] h-[1.2rem] text-color-grey-3 hover:text-color-black transition-all duration-150 ease-in cursor-pointer"
                    onClick={displayUpdateBoardModalHandler}
                />
            </div>
            <Members collaborators={collaborators}/>
            {displayEditBoardForm && (
                <AddBoardModal
                    action="edit"
                    boardTag={boardTag}
                    imageUrl={img}
                    value={boardName}
                    visibility={boardVisibility}
                    closeModal={() => setDisplayEditBoardForm(false)}
                />
            )}
            <BoardUpdateModal
                boardId={boardId}
                display={displayUpdateBoardModal}
                setDisplay={setDisplayUpdateBoardModal}
                setDisplayEditBoardForm={setDisplayEditBoardForm}
            />
        </div>
    );
};

export default BoardItem;
