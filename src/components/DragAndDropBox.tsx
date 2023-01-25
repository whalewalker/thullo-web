import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import dragDropColumns from "../utils/dragAndDropData";
import DragDropColumn from "./DragDropColumn";

const DragAndDropBox = () => {
  const [columns, setColumns] = useState(dragDropColumns);

  console.log(columns);

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

  const onDragEnd = ({ destination, source }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    console.log(destination);
    console.log(source);

    // Set start and end variables
    const [start] = Object.values(columns).filter(
      (column) => column.columnId === source.droppableId
    );
    const [end] = Object.values(columns).filter(
      (column) => column.columnId === destination.droppableId
    );

    console.log(start, end);

    // If start is the same as end, we're in the same column
    if (start === end) {
      //   // Move the item within the list
      //   // Start by making a new list without the dragged item
      const newCards = start.cards.slice();
      console.log(newCards);
      const [removedCard] = newCards.splice(source.index, 1);
      console.log(removedCard);

      //   // Then insert the item at the right location
      newCards.splice(destination.index, 0, removedCard);
      console.log(newCards);

      //   // Then create a new copy of the column object
      const newCol = {
        ...start,
        cards: newCards,
      };
      console.log(newCol);
      //   // Update the state
      setColumns((state) => ({ ...state, [newCol.columnId]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartCard = start.cards.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        ...start,
        cards: newStartCard,
      };

      // Make a new end list array
      const newEndCard = [...end.cards];

      // Insert the item into the end list
      newEndCard.splice(destination.index, 0, start.cards[source.index]);

      // Create a new end column
      const newEndCol = {
        ...end,
        cards: newEndCard,
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.columnId]: newStartCol,
        [newEndCol.columnId]: newEndCol,
      }));
      return null;
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {Object.values(columns).map((column, i) => (
        <DragDropColumn key={i} column={column} />
      ))}
    </DragDropContext>
  );
};

export default DragAndDropBox;
