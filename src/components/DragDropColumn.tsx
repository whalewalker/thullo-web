import React, {useState} from "react";
import DragDropCard from "./DragDropCard";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { boardAction } from "../slice/boardSlice";
import AddAnotherCardForm from "./AddAnotherCardForm";
import { Task, TaskColumn } from "../utils/types";
import TaskColumnForm from "./TaskColumnForm";
import Btn from "./Btn";
import ThreeDotModal from "./ThreeDotModal";
import {formatTaskColumnName} from "../utils/helperFn";
import DeleteWarningModal from "./DeleteWarningModal";



type MenuContentProps = {
    columnName: string;
    renameLabel: string;
    deleteLabel: string;
};

interface Props {
    handleEdit: () => void;
    handleDelete: () => void;
    content: MenuContentProps
}

const TaskColumnModal: React.FC<Props> = ({content, handleEdit, handleDelete}) => {
    const  {renameLabel, deleteLabel} = content;
    return (
                <ThreeDotModal className="absolute top-10 right-0">
                    <Btn onClick={handleEdit}
                         label={renameLabel}
                         className="text-xs py-1.5 text-color-grey-3 block hover:text-color-black transition-all duration-150 ease-in" />
                    <hr className="border-color-grey-2 w-fu11" />
                    <Btn
                        onClick={handleDelete}
                         label={deleteLabel}
                         className="text-xs py-1.5 text-color-grey-3 block hover:text-color-black transition-all duration-150 ease-in" />
                </ThreeDotModal>
    );
};

const TaskColumnName = ({ name}: {name: string}) => {
    return <p>{formatTaskColumnName(name)}</p>;
};

const ThreeDotsIcon = ({ handleClick }: {handleClick: any}) => {
    return (
        <BsThreeDots
            onClick={handleClick}
            className="ml-auto w-[1.2rem] h-[1.2rem] text-color-grey-3 hover:text-color-black transition-all duration-150 ease-in cursor-pointer"
        />
    );
};

type DragDropColumnProps = {
    editTaskName: string;
    setEditTaskName: (name: string) => void;
    column: TaskColumn;
    showModal: string;
    onShowModalHandler: (name: string) => void;
    closeModal: () => void;
};

export const DragDropColumn = ({
                                   editTaskName,
                                   setEditTaskName,
                                   column,
                                   showModal,
                                   onShowModalHandler,
                                   closeModal,
                               }: DragDropColumnProps) => {
    const [displayAddCardModal, setDisplayAddCardModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const dispatch = useAppDispatch();
    const boardItem = useAppSelector((state) => state.board.boardItem);

    const menuContent = {
        columnName: column.name,
        renameLabel: "Rename",
        deleteLabel: "Delete from list",
    };
    const isCurrentColumn = (columnName: string) => columnName === column.name;

    const handleAddCardModal = async () => {
        const columnId = column.name;
        dispatch(boardAction.setColumnId(columnId));
        setDisplayAddCardModal(true);
    };

    const onDeleteModalHandler = () => {
            setDeleteModal(true);
            closeModal();
    }

    const onCloseModalHandler = () => {
        setDeleteModal(false);
    }

    const onDeleteTaskColumnHandler = () => {
        // Make an API call to the server to delete the column
        console.log("Deleted");
    }

    return (
        <div className="relative snap-center">

            <DeleteWarningModal
                title="Delete task column?"
                message='This will permanently delete this option from the "Status"
                field. This cannot be undone.'
                onConfirm={onDeleteTaskColumnHandler}
                onCancel={onCloseModalHandler}
                isOpen={deleteModal}
            />

            <div className="flex items-center h-16">
                {!isCurrentColumn(editTaskName) && (
                    <>
                        <TaskColumnName name={column.name} />
                        <ThreeDotsIcon handleClick={() => onShowModalHandler(column.name)} />
                    </>
                )}
                {isCurrentColumn(editTaskName) &&
                    <TaskColumnForm
                        value={formatTaskColumnName(column.name)}
                        boardTag={boardItem.boardTag}
                    />
                }
                {isCurrentColumn(showModal) && !isCurrentColumn(editTaskName) && (
                    <TaskColumnModal
                        content={menuContent}
                        handleEdit={() => setEditTaskName(column.name)}
                        handleDelete={onDeleteModalHandler}
                    />
                )}
            </div>

    <StrictModeDroppable droppableId={column.name}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[0.5rem]"
          >
            {/* list of draggable */}
            {column.tasks.map((card: Task, i: number) => (
              <DragDropCard
                key={String(card.id)}
                card={card}
                columnId={column.name}
                index={i}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
      {displayAddCardModal && (
        <AddAnotherCardForm
          boardId={boardItem.id}
          boardTag={boardItem.boardTag}
          removeAddCardModal={setDisplayAddCardModal}
        />
      )}
      {!displayAddCardModal && (
        <Btn label="Add another card"
          onClick={handleAddCardModal}
          className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg w-full hover:text-[#6f99ff] transition-all duration-300 ease-in"
        >
          <BsPlusLg className="text-current " />
        </Btn>
      )}
    </div>
  );
};

export default DragDropColumn;
