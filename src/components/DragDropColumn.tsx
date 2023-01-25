import React from "react";
import DragDropCard from "./DragDropCard";
import { BsThreeDots } from "react-icons/bs";
import { StrictModeDroppable } from "../utils/StrictModeDroppable";

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
const DragDropColumn: React.FC<dragDropColumn> = ({ column }) => {
  return (
    <div>
      <p className="flex items-center">
        {column.columnTitle}
        <BsThreeDots className="w-3 h-3 text-current ml-auto" />
      </p>
      <StrictModeDroppable droppableId={column.columnId}>
        {(provided, snapshot) => (
          <ul {...provided.droppableProps} ref={provided.innerRef} className="">
            {/* list of draggables */}
            {column.cards.map((card: any, i: number) => (
              <DragDropCard key={i} card={card} index={i} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </StrictModeDroppable>
    </div>
  );
};

export default DragDropColumn;
