import React, {useEffect, useState} from "react";
import {BsPlusLg, BsThreeDots} from "react-icons/bs";
import DragAndDropBox from "../../components/DragAndDropBox";
import AddAnotherColumnForm from "../../components/AddAnotherColumnForm";
import {useAppSelector, useAppDispatch} from "../../hooks/customHook";
import {Board} from "../../utils/types";
import {boardAction} from "../../slice/boardSlice";
import TaskModal from "../../components/TaskModal";
import Btn from "../../components/Btn";
import Members from "../../components/Members";

const BoardDetail = () => {
    const dispatchFn = useAppDispatch();
    const [taskModal, setTaskModal] = useState<any>(null);
    const [columnModalId, setColumnModalId] = useState<any>(null);
    const [editTaskName, setEditTaskName] = useState<any>(null);
    const onUpdateColumnModalId = (id: any) => setColumnModalId(id);

    const closeModal = () => {
        setEditTaskName(null);
        onUpdateColumnModalId(null)
    };

    useEffect(() => {
        const activeTaskModal = localStorage.getItem("activeTaskModal");
        if (activeTaskModal) {
            setTaskModal(JSON.parse(activeTaskModal));
        }
    }, []);

    useEffect(() => {
        if (taskModal) {
            dispatchFn(boardAction.toggleDisplayTaskModal(taskModal));
        }
    }, [taskModal, dispatchFn]);

    const displayTaskModal = useAppSelector((state) => state.board.displayTaskModal);

    const displayAddColumnFormHandler = () => {
        dispatchFn(boardAction.toggleDispayAddColumnForm(true));
    };

    const boardItem: Board = useAppSelector((state) => state.board.boardItem);

    const displayAddColumnForm = useAppSelector(
        (state) => state.board.displayAddColumnForm
    )

    const closeForms: any = (e: { target: { dataset: { close: string } } }) => {
        if (e.target.dataset.close) {
            closeModal();
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
                <Members collaborators={boardItem.collaborators}/>
                <p className="ml-auto flex items-center bg-color-grey-1 rounded-lg py-2 px-4 cursor-pointer text-xs text-color-grey-3 sm:order-2">
                    <BsThreeDots className="w-3 h-3 text-current mr-2"/>
                    Show Menu
                </p>
            </div>
            <div
                className="w-full bg-[#F8F9FD] rounded-lg p-7 grid grid-cols-5 xl:grid-cols-17 gap-7 overflow-auto flex-1 items-start scroll "
                data-close="yes"
            >
                <DragAndDropBox
                    columnModalId={columnModalId}
                    editTaskName={editTaskName}
                    onUpdateColumnModalId={onUpdateColumnModalId}
                    setEditTaskName={setEditTaskName}
                    closeModal={closeModal}
                />
                {!displayAddColumnForm && (
                    <Btn
                        label="Add another list"
                        className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg"
                        onClick={displayAddColumnFormHandler}
                    >
                        <BsPlusLg className="text-current "/>
                    </Btn>
                )}
                {displayAddColumnForm && <AddAnotherColumnForm/>}
            </div>

            {displayTaskModal && <TaskModal/>}
        </section>
    );
};

export default BoardDetail;
