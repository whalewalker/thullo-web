import React from "react";
import DragDropCard from "./DragDropCard";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";
import { useDispatch } from "react-redux";
import { boardAction } from "../slice/boardSlice";
import { Task, dragDropColumn } from "../utils/types";

const DragDropColumn = ({ column }: { column: dragDropColumn }) => {
  const dispatchFn = useDispatch();

  const onAddCardModalHandler = () => {
    const columnId: number | null | any = column.id;

    console.log(typeof columnId);

    dispatchFn(boardAction.setColumnId(columnId));

    dispatchFn(boardAction.toggleDispayAddTaskForm(true));
  };

  return (
    <div>
      <p className="flex items-center mb-4 capitalize">
        {column.name}
        <BsThreeDots className="w-3 h-3 text-current ml-auto" />
      </p>
      <StrictModeDroppable droppableId={String(column.id)}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="min-h-[0.5rem]"
          >
            {/* list of draggables */}
            {column.tasks.map((card: Task, i: number) => (
              <DragDropCard key={String(card.id)} card={card} index={i} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
      <button
        onClick={onAddCardModalHandler}
        className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg w-full hover:text-[#6f99ff] transition-all duration-300 ease-in"
      >
        Add another card
        <BsPlusLg className="text-current " />
      </button>
    </div>
  );
};

export default DragDropColumn;
