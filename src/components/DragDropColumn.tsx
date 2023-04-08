import React, { useState } from "react";
import DragDropCard from "./DragDropCard";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import { StrictModeDroppable } from "./StrictModeDroppable";
import { useAppDispatch, useAppSelector } from "../hooks/customHook";
import { boardAction } from "../slice/boardSlice";
import AddAnotherCardForm from "./AddAnotherCardForm";
import { Task, dragDropColumn } from "../utils/types";

const DragDropColumn = ({ column }: { column: dragDropColumn }) => {
  const [displayAddCardModal, setDisplayAddCardModal] = useState(false);

  const dispatchFn = useAppDispatch();

  const boardItem = useAppSelector((state: any) => state.board.boardItem);

  const onAddCardModalHandler = async () => {
    const columnId: string | null | any = column.name;

    dispatchFn(boardAction.setColumnId(columnId));

    setDisplayAddCardModal(true);
  };

    const formatTaskColumnName = (name: string) => {
        if (name.trim().length > 0)
            return name.replace(/_/, " ").toLowerCase();
    }

  return (
    <div>
      <p className="flex items-center mb-4 capitalize">
        {formatTaskColumnName(column.name)}
        <BsThreeDots className="w-3 h-3 text-current ml-auto" />
      </p>
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
