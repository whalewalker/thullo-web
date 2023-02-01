import React from "react";
import { DragDropContext, DropResult, DragStart } from "react-beautiful-dnd";
import DragDropColumn from "./DragDropColumn";
import { useSelector, useDispatch } from "react-redux";
import { dragAndDropAction } from "../slice/dragAndDropSlice";

interface dragDropColumn {
  columnTitle: string;
  columnId: string;
  cards: {
    img: string | undefined;
    cardTitle: string;
    cardId: string;
    labels: { bgColor: string; textColor: string; text: string }[];
    collabs: string[];
  }[];
}

const DragAndDropBox = () => {
  const dragDropColumnsState = useSelector(
    (state: { dragAndDrop: { data: {} } }) => state.dragAndDrop.data
  );
  const dispatchFn = useDispatch();

  function onDragEnd ({ destination, source }: DropResult)  {
    // Make sure we have a valid destination
    if (!destination) {
      return ;
    }

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return ;
    }

    // Set start and end variables
    const [start]: any = Object.values(dragDropColumnsState).filter(
      (column: any) => column.columnId === source.droppableId
    );
    const [end]: any = Object.values(dragDropColumnsState).filter(
      (column: any) => column.columnId === destination.droppableId
    );

    // If start is the same as end, we're in the same column
    if (start === end) {
      //   // Move the item within the list
      //   // Start by making a new list without the dragged item
      const newCards = start.cards.slice();
      const [removedCard] = newCards.splice(source.index, 1);

      //   // Then insert the item at the right location
      newCards.splice(destination.index, 0, removedCard);

      //   // Then create a new copy of the column object
      const newCol: any = {
        ...start,
        cards: newCards,
      };
      //   // Update the state
      dispatchFn(dragAndDropAction.moveCardWithinColumn(newCol));
      return ;
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

      const newCols: any = {
        newStartCol: newStartCol,
        newEndCol: newEndCol,
      };

      dispatchFn(dragAndDropAction.moveCardBetweenColumns(newCols));

      return ;
    }
  }

  function onDragStart (start: DragStart)  {
    console.log(start);
   
  }


  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {Object.values(dragDropColumnsState).map((column: any, _) => (
        <DragDropColumn key={column.columnId} column={column} />
      ))}
    </DragDropContext>
  );
};

export default DragAndDropBox;
