import React from "react";
import { DragDropContext, DropResult, DragStart } from "react-beautiful-dnd";
import DragDropColumn from "./DragDropColumn";
import { useAppSelector, useAppDispatch } from "../hooks/customHook";
import { dragAndDropAction } from "../slice/dragAndDropSlice";
import { useParams } from "react-router-dom";
import { Board } from "../utils/types";

const DragAndDropBox = () => {
  const { boardId } = useParams();

  const boardList = useAppSelector((state) => state.board.boardList);

  const [boardItem]: Board[] = boardList.filter(
    (board: Board) => board.name === boardId
  );

  const dispatchFn = useAppDispatch();

  function onDragEnd({ destination, source }: DropResult) {
    // Make sure we have a valid destination
    if (!destination) {
      return;
    }

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // console.log(boardItem.taskColumns);
    // console.log(source);

    // Set start and end variables
    const [start]: any = boardItem.taskColumns.filter(
      (column: any) => String(column.id) === source.droppableId
    );
    const [end]: any = boardItem.taskColumns.filter(
      (column: any) => String(column.id) === destination.droppableId
    );

    // console.log(start, end);

    // If start is the same as end, we're in the same column
    if (start === end) {
      //   // Move the item within the list
      //   // Start by making a new list without the dragged item
      const newTasks = start.tasks.slice();
      const [removedCard] = newTasks.splice(source.index, 1);

      // console.log(removedCard);

      //   // Then insert the item at the right location
      newTasks.splice(destination.index, 0, removedCard);
      // console.log(destination);

      //   // Then create a new copy of the column object
      const newCol: any = {
        ...start,
        tasks: newTasks,
      };
      // console.log(newCol);
      //   // Update the state
      dispatchFn(dragAndDropAction.moveCardWithinColumn(newCol));
      return;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartCard = start.tasks.filter(
        (_: any, idx: number) => idx !== source.index
      );

      // Create a new start column
      const newStartCol = {
        ...start,
        cards: newStartCard,
      };

      // Make a new end list array
      const newEndCard = [...end.tasks];

      // Insert the item into the end list
      newEndCard.splice(destination.index, 0, start.tasks[source.index]);

      // Create a new end column
      const newEndCol = {
        ...end,
        tasks: newEndCard,
      };

      // Update the state

      const newCols: any = {
        newStartCol: newStartCol,
        newEndCol: newEndCol,
      };

      dispatchFn(dragAndDropAction.moveCardBetweenColumns(newCols));

      return;
    }
  }

  function onDragStart(start: DragStart) {
    // console.log(start);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
      {boardItem.taskColumns.map((column: any, _) => (
        <DragDropColumn key={String(column.id)} column={column} />
      ))}
    </DragDropContext>
  );
};

export default DragAndDropBox;
