import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {getBoardItem} from "../actions/boardAction";
import {useAppDispatch} from "../hooks/customHook";
import Members from "./Members";
import {BsThreeDots} from "react-icons/bs";
import DragAndDropBox from "./DragAndDropBox";

const Hello = () => {
    const {boardTag = ''} = useParams(); // set default value to empty string if boardTag is undefined
    const dispatch = useAppDispatch();

    const getBoardItemData = async (boardTag: string) => {
        await dispatch(getBoardItem(boardTag));
    }
    useEffect(() => {
        console.log("Got here")
        getBoardItemData(boardTag);
    }, [boardTag, dispatch, getBoardItemData]);


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
                    {/*    {!displayAddColumnForm && (*/}
                    {/*        <Btn*/}
                    {/*            label="Add another list"*/}
                    {/*            className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg"*/}
                    {/*            onClick={displayAddColumnFormHandler}*/}
                    {/*        >*/}
                    {/*            <BsPlusLg className="text-current "/>*/}
                    {/*        </Btn>*/}
                    {/*    )}*/}
                    {/*    {displayAddColumnForm && <TaskColumnForm action="addTaskColumn" boardTag={boardItem.boardTag}/>}*/}
                </div>

                {/*{displayTaskModal && <TaskModal/>}*/}
            </section>
    );
};

export default Hello;