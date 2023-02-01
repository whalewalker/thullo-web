import React from "react";
import DragDropCard from "./DragDropCard";
import { BsThreeDots, BsPlusLg } from "react-icons/bs";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";
import {useDispatch } from "react-redux";
import { dragAndDropAction } from "../slice/dragAndDropSlice";

interface dragDropColumn {
  column: {
    columnTitle: string;
    columnId: string;
    cards: {
      img: string | undefined;
      cardTitle: string;
      cardId: string;
      labels: { bgColor: string; textColor: string; text: string }[];
      collabs: string[];
    }[];
  };
}

interface Card {
  img: string | undefined;
  cardTitle: string;
  cardId: string;
  labels: { bgColor: string; textColor: string; text: string }[];
  collabs: string[];
}

const DragDropColumn: React.FC<dragDropColumn> = ({ column }) => {
  const dispatchFn = useDispatch();

  const onAddCardHandler = () => {
    const columnId: any = column.columnId;

    dispatchFn(dragAndDropAction.changeColumnId(columnId));
  };

  return (
    <div>
      <p className="flex items-center mb-4 capitalize">
        {column.columnTitle}
        <BsThreeDots className="w-3 h-3 text-current ml-auto" />
      </p>
      <StrictModeDroppable droppableId={column.columnId}>
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}>

            {/* list of draggables */}
            {column.cards.map((card: Card, i: number) => (
              <DragDropCard key={card.cardId} card={card} index={i} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
      <button
        onClick={onAddCardHandler}
        className="bg-[#DAE4FD] flex text-[#2F80ED] justify-between items-center py-2 px-3.5 rounded-lg w-full"
      >
        Add another card
        <BsPlusLg className="text-current " />
      </button>
    </div>
  );
};

export default DragDropColumn;
