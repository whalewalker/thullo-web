import React from "react";
import DragDropCard from "./DragDropCard";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";
import { useDispatch } from "react-redux";
import { dragAndDropAction } from "../slice/dragAndDropSlice";
import { boardAction } from "../slice/boardSlice";

interface dragDropColumn {
  column: {
    id: string;
    name: string;
    tasks: [];
    createdAt: string;
    updatedAt: string;
  };
}

interface Card {
  comments: [];
  contributors: [];
  createdAt: string;
  description: null;
  id: 1;
  imageUrl: string;
  name: string;
  updatedAt: string;
}

const DragDropColumn: React.FC<dragDropColumn> = ({ column }) => {
  const dispatchFn = useDispatch();

  const onAddCardModalHandler = () => {
    const columnId: any = column.id;

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
            {column.tasks.map((card: Card, i: number) => (
              <DragDropCard key={String(card.id)} card={card} index={i} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
      <button
        onClick={onAddCardModalHandler}
        className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg w-full"
      >
        Add another card
        <BsPlusLg className="text-current " />
      </button>
    </div>
  );
};

export default DragDropColumn;
