import React, { useState } from "react";
import DragDropCard from "./DragDropCard";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { boardAction } from "../slice/boardSlice";
import AddAnotherCardForm from "./AddAnotherCardForm";
import { Task, dragDropColumn } from "../utils/types";
import AddAnotherColumnForm from "./AddAnotherColumnForm";
import {log} from "util";


const ModalButton = ({ onClick, label }: { onClick: any, label: string }) => {
    return (
        <button
            onClick={onClick}
            className="text-xs py-1.5 text-color-grey-3 block hover:text-color-black transition-all duration-150 ease-in"
        >
            {label}
        </button>
    );
};

interface Props {
    handleEdit: () => void;
    handleDelete: () => void;
    content: MenuContentProps
}

const TaskColumnModal: React.FC<Props> = ({content, handleEdit, handleDelete}) => {
    const  {renameLabel, deleteLabel} = content;
    return (
        <>
            {
                <div className="border border-color-grey-2 rounded-lg px-3 pr-10 absolute top-3 right-4 bg-color-white ">
                    <ModalButton onClick={handleEdit} label={renameLabel} />
                    <hr className="border-color-grey-2 w-fu11" />
                    <ModalButton onClick={handleDelete} label={deleteLabel} />
                </div>
            }
        </>
    );
};

const TaskColumnName = ({ name, handleClick }: {name: string, handleClick: any}) => {
    const formatTaskColumnName = (name: string) => {
        if (name.trim().length > 0)
            return name.replace(/_/, " ").toLowerCase();
    }

    return (
        <p>
            {formatTaskColumnName(name)}
        </p>
    );
};

const ThreeDotsIcon = ({ handleClick }: {handleClick: any}) => {
    return (
        <BsThreeDots
            onClick={handleClick}
            className="ml-auto w-[1.2rem] h-[1.2rem] text-color-grey-3 hover:text-color-black transition-all duration-150 ease-in cursor-pointer"
        />
    );
};

type MenuContentProps = {
    columnName: string;
    renameLabel: string;
    deleteLabel: string;
};

const DragDropColumn = ({column, showModal, onShowModalHandler}: { column: dragDropColumn, showModal: any, onShowModalHandler: any }) => {
    const [displayAddCardModal, setDisplayAddCardModal] = useState<boolean>(false);
    const dispatchFn = useAppDispatch();
    const boardItem = useAppSelector((state: any) => state.board.boardItem);
    const [showEditForm, setShowEditForm] = useState<string>("");
    const [showMenu, setShowMenu] = useState<string>("");
    const [menuContent, setMenuContent] = useState<MenuContentProps>({
        columnName: column.name,
        renameLabel: "Rename",
        deleteLabel: "Delete from list",
    });

    const handleEditClick = (columnName: string) => {
        setShowEditForm(columnName);
    };

    const handleCloseEditForm = () => {
        setShowEditForm("");
    };

    const handleMenuClick = (columnName: string) => {
        setShowMenu(columnName);
    };

    const handleCloseMenu = () => {
        setShowMenu("");
    };

    const isCurrentColumn = (columnName: string) => columnName === column.name;

    const onAddCardModalHandler = async () => {
        const columnId: string | null | any = column.name;
        dispatchFn(boardAction.setColumnId(columnId));
        setDisplayAddCardModal(true);
    };

    return (
      <div className="relative">
          <div className="flex items-center mb-4 capitalize">
              {(
                  <>
                      <TaskColumnName name={column.name} handleClick={() => handleEditClick(column.name)} />
                      <ThreeDotsIcon handleClick={() => handleMenuClick(column.name)} />
                  </>
              )}
              {/*{isCurrentColumn(showEditForm) && (<AddAnotherColumnForm/>)}*/}
              { (
                  <TaskColumnModal
                      content={menuContent}
                      handleEdit={() => {handleEditClick(column.name)}}
                      handleDelete={() => ()=> console.log("Hello")}
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
            {/* list of draggables */}
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
        <button
          onClick={onAddCardModalHandler}
          className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg w-full hover:text-[#6f99ff] transition-all duration-300 ease-in"
        >
          Add another card
          <BsPlusLg className="text-current " />
        </button>
      )}
    </div>
  );
};

export default DragDropColumn;
